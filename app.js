const express =require('express');
const parser = require('body-parser');
const graphql = require('express-graphql');
const {buildSchema} =require('graphql');
const mongoose=require('mongoose');

const Session=require('./models/sessions');


const app=express();


app.use(parser.json());

app.use(
   '/graphql',
   graphql({
    schema: buildSchema(`
        
        type Session {
            _id: ID!
            title: String!
            description: String!
            price:Float!
            date:String!
        }    

        input SessionInput {
            title:String!
            description: String!
            price:Float!
            date:String!
        }

        type RootQuery{
            sessions:[Session!]!
        }

        type RootMutation{
            createSession(sessionInput:SessionInput):Session
        }

        schema{
            query:RootQuery
            mutation:RootMutation
        }
    `),
    rootValue:{
        sessions:() => {
            return sessions;
        },
        createSession:(args) => {

          const session=new Session({
            title:args.sessionInput.title,
            description:args.sessionInput.description,
            price: +args.sessionInput.price,
            date: new Date(args.sessionInput.date)
          });
          return session
            .save()
            .then(result=>{
                console.log(result);
                return { ...result._doc, _id: result._doc._id.toString() };
            })
            .catch(err=>{
                console.log(err);
                throw err;
            });
        }
    },
    graphiql:true
   })
);

mongoose
    .connect(
        'mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-imdcc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true'
    )
    .then(()=>{
       app.listen(3000);
    })
    .catch(err=> {
        console.log(err);
    });

app.listen(3000);