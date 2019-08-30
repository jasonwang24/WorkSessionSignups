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
           urgency: +args.sessionInput.urgency,
           date: new Date(args.sessionInput.date),
           creator: req.userId
        });
        let createdSession;

        try{
            const result=await session.save();
            createdSession=Modify(result);
            const creator=await User.findById(req.userId);

            if(!creator){
                throw new Error('User not found.');
            }      
            creator.createdSessions.push(session);
            await creator.save();

            return createdSession;
        } catch(err){
            console.log(err);
            throw err;
        } 
 
      }
   
    };