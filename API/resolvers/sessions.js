const Session=require('../../models/session');
const { Modify } = require('./extra');
const User = require('../../models/user');

module.exports={
      sessions: () => {
        return Session.find()
            .then(sessions=> {
                return sessions.map(session=> {
                    return Modify(session);
                });
            })
            .catch(err=> {
                throw err;
            });
      },  

      createSession: async (args,req) => {
        if(!req.checked){
           throw new Error('Bad check'); 
        }
        const session=new Session({
           title: args.sessionInput.title,
           description: args.sessionInput.description,
           price: +args.sessionInput.price,
           date: new Date(args.sessionInput.date),
           creator: req.userId
        });
        let createdSession;
        return session
          .save()
          .then(result=>{
            createdSession= Modify(result)
            return User.findById(req.userId)
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
   
    };