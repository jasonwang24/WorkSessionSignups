const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose=require('mongoose');

const APISchema=require('./API/schema/index');
const APIResolvers=require('./API/resolvers/index');
const checkTrue= require('./bridge/check');

const app = express();

app.use(bodyParser.json());

app.use(checkTrue);

app.use(
  '/graphql',
  graphqlHttp({
    schema: APISchema,
    rootValue: APIResolvers,
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

