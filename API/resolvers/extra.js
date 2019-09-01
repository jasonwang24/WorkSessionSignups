const Session = require('../../models/session');
const User = require('../../models/user');
const DataLoader=require('dataloader');


const Modify = session => {
    return{...session._doc,_id:session.id,date:new Date(session._doc.date).toISOString(),creator:user.bind(this,session.creator)};
}

const sessions=async sessionIds=>{
    try{
        const sessions = await Session.find({_id:{$in: sessionIds}});
        return sessions.map(session=>{
            return Modify(session);
    });
    } catch(err){
        throw err;
    }
};

const sessionLoader=new DataLoader((sessionIds)=>{
    return sessions(sessionIds);
});

const userLoader=new DataLoader(userIds=>{
    return User.find({_id:{$in:userIds}});
});

const oneSession = async sessionId => {
    try {
        const session = await sessionLoader.load(sessionId.toString());
        return session;
    } catch (err){
        throw err;
    }
};

const user = userId => {
    return userLoader.load(userId.toString())
        .then(user=>{
            return{...user._doc,createdSessions:sessionLoader.load.bind(this,user._doc.createdSessions)};
        })
        .catch(err=>{throw err;
        });
};

const ModSignup = signup =>{
    return {...signup._doc,
                        _id:signup.id,
                        user:user.bind(this,signup._doc.user),
                        session:oneSession.bind(this,signup._doc.session),
                        createdAt: new Date(signup._doc.createdAt).toISOString(),
                        updatedAt: new Date(signup._doc.updatedAt).toISOString()
                }
};

exports.Modify=Modify;
exports.ModSignup = ModSignup;

//exports.user = user;
//exports.sessions=sessions;
//exports.oneSession = oneSession;