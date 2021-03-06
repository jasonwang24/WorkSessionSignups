const webtoken=require('jsonwebtoken');

module.exports=(req,res,next) => {
    const checkHeader = req.get('Authorization');
    if(!checkHeader){
        req.checked = false;
        return next();
    }
    const token = checkHeader.split(' ')[1];
    //may be able to remove the === check
    if(!token || token==='') {
        req.checked=false;
        return next();
    }
    let newToken;
    try
    {
        newToken = webtoken.verify(token,'somekey');
    }
    catch(err){
        req.checked=false;
        return next();
    }
    if(!newToken){
        req.checked=false;
        return next();
    }
    req.checked=true;
    req.userId=newToken.userId;
    next(); 
}