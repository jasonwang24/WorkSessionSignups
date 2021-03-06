const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql'); //function for middleware that takes incoming requests and send through graphql query parser
const mongoose=require('mongoose');

const APISchema=require('./API/schema/index');
const APIResolvers=require('./API/resolvers/index');
const checkTrue= require('./bridge/check');

const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    if(req.method==='OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});

app.use(checkTrue);

app.use(
  '/graphql', graphqlHttp({
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
    app.listen(8000);
})
.catch(err=>{
    console.log(err);
});

