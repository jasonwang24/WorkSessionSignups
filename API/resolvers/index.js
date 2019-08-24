const user = require('./user');
const sessions = require('./sessions');
const signup = require('./signup');

const root = { 
    ...user,
    ...sessions,
    ...signup
};

module.exports=root;