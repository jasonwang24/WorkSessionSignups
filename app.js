const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');

const Session=require('./models/session');
const User=require('./models/user');

const app = express();


app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
        type Session {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        type User {
            _id:ID!
            email:String!
            password:String
        }

        input UserInput {
            email:String!
            password:String!
        }

        input SessionInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        type RootQuery {
            sessions: [Session!]!
        }

        type RootMutation {
            createSession(sessionInput: SessionInput): Session
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      sessions: () => {
        return Session.find()
            .then(sessions=> {
                return sessions.map(event=> {
                    return {...event._doc};
                });
            })
            .catch(err=> {
                throw err;
            });
      },
      createSession: args => {

        const session=new Session({
           title: args.sessionInput.title,
           description: args.sessionInput.description,
           price: +args.sessionInput.price,
           date: new Date(args.sessionInput.date),
           creator: '5d3fc22b352c06b43c883645'
        });
        let createdSession;
        return session
          .save()
          .then(result=>{
            createdSession={...result._doc}
            return User.findById('5d3fc22b352c06b43c883645')
        })
        .then(user=> {
            if(!user){
                throw new Error('User not found.')
            }
            user.createdSessions.push(session);
            return user.save();
        })
        .then(result=>{
            return createdSession;
        })
          .catch(err=>{
            console.log(err);
            throw err;
        });      
      },
      createUser:args=> {
           return User.findOne({email:args.userInput.email}).then(user=>{
            
            return bcrypt
            .hash(args.userInput.password,12)
            })
            .then(hashedPassword=>{
               const user = new User({
                email:args.userInput.email,
                password:hashedPassword
               });
              return user.save();
            })
            .then(result=> {
                return{...result._doc,password:null};
            })
            .catch(err=>{
                throw err;
            });
           
      }
    },
    graphiql: true
  })
);

mongoose
    .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
    }@cluster0-imdcc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
)
.then(()=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
});

