const express =require('express');
const parser = require('body-parser');
const graphql = require('express-graphql');
const {buildSchema} =require('graphql');

const app=express();

app.use(parser.json());

app.use(
   '/graphql',
   graphql({
    schema: buildSchema(`
        type RootQuery{
            sessions:[String!]!
        }

        type RootMutation{
            createSession(name:String): String
        }

        schema{
            query:RootQuery
            mutation:RootMutation
        }
    `),
    rootValue:{
        sessions:() => {
            return ['Mech','Software','Electrical']
        },
        createSession:(args) => {
            const sessionName=args.name;
            return sessionName;
        }
    },
    graphiql:true
   })
);

app.listen(3000);