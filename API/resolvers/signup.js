const Session = require('../../models/session');
const Signup = require('../../models/signup');
const { Modify, ModSignup }=require('./extra');


module.exports={
      signups:async (args,req)=> {
        if(!req.checked){
           throw new Error('Bad check'); 
        }
        try {
            const signups=await Signup.find();
            return signups.map(signup=> {
                return ModSignup(signup);
            });
        } catch (err) {
            throw err;
        }
      },
   
    signupSession: async (args,req) => {
        if(!req.checked){
           throw new Error('Bad check'); 
        }
        const fetchSession = await Session.findOne({_id:args.sessionId});
        const signup = new Signup({
            user:req.userId,
            session: fetchSession
        });
        const result = await signup.save();
        return ModSignup(result);
      },
    cancelSignup: async (args,req)=> {
        if(!req.checked){
           throw new Error('Bad check'); 
        }
        try {
            const signup = await Signup.findById(args.signupId).populate('session');
            const session = Modify(signup.session);
            await Signup.deleteOne({_id:args.signupId});
            return session;
        } catch (err){
            throw err;
        }
    }
    };