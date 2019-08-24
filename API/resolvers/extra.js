const Session = require('../../models/session');
const User = require('../../models/user');

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

const oneSession = async sessionId => {
    try {
        const session = await Session.findById(sessionId);
        return Modify(session);
    } catch (err){
        throw err;
    }
};

const user = userId => {
    return User.findById(userId)
        .then(user=>{
            return{...user._doc,createdSessions:sessions.bind(this,user._doc.createdSessions)};
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