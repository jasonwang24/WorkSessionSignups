const { buildSchema } =require('graphql');

module.exports= buildSchema(`

        //define type for session signups
        type Signup {
            _id:ID!
            session:Session!
            user:User!
            createdAt:String!
            updatedAt:String!
        }

        //define type for sessions created
        type Session {
          _id: ID!
          title: String!
          description: String!
          urgency: Float!
          date: String!
          creator:User!
        }

        //define type for each existing user
        type User {
            _id:ID!
            email:String!
            password:String
            createdSessions: [Session!]
        }

        //define type for input fields on login page
        input UserInput {
            email:String!
            password:String!
        }

        //define type for input fields to create session
        input SessionInput {
          title: String!
          description: String!
          urgency: Float!
          date: String!
        }

        //define type to validate user account
        type Check {
            checkUser: ID!
            token: String!
            tokenExpire: Int!
        }

        //define endpoints for queries
        type RootQuery {
            sessions: [Session!]!
            signups:[Signup!]!
            login(email:String!,password:String!): Check!
        }

        //define various mutations for creating sessions, creating users...
        type RootMutation {
            createSession(sessionInput: SessionInput): Session
            createUser(userInput: UserInput): User
            signupSession(sessionId:ID!):Signup!
            cancelSignup(signupId:ID!):Session!
        }

        //connect schema to defined endpoints
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)