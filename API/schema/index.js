const { buildSchema } =require('graphql');

module.exports= buildSchema(`

        type Signup {
            _id:ID!
            session:Session!
            user:User!
            createdAt:String!
            updatedAt:String!
        }

        type Session {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
          creator:User!
        }

        type User {
            _id:ID!
            email:String!
            password:String
            createdSessions: [Session!]
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

        type Check {
            userCheck: ID!
            token: String!
            tokenExpire: Int!
        }

        type RootQuery {
            sessions: [Session!]!
            signups:[Signup!]!
            login(email:String!,password:String!): Check!
        }

        type RootMutation {
            createSession(sessionInput: SessionInput): Session
            createUser(userInput: UserInput): User
            signupSession(sessionId:ID!):Signup!
            cancelSignup(signupId:ID!):Session!
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)