const bcrypt = require('bcryptjs');
const User=require('../../models/user');
const webtoken = require('jsonwebtoken');


module.exports={

      createUser:args=> {

            return User.findOne({email:args.userInput.email}).then(user=>{

            if(user) {
                throw new Error('User exists already.');
            }                      

            return bcrypt
            .hash(args.userInput.password,12)
            })
            .then(hashedPassword=>{
               const user = new User({
                email:args.userInput.email,
                password:hashedPassword
               });
              return user.save();
            })
            .then(result=> {
                return{...result._doc,password:null};
            })
            .catch(err=>{
                throw err;
            });    
      },
      login: async ({email,password}) => {
            const user = await User.findOne({email:email});
            if(!user) {
                throw new Error('User doesn\'t exist');
            }
            const isTrue = await bcrypt.compare(password,user.password);
            if (!isTrue){
                throw new Error('Wrong password');
            }
            const token = webtoken.sign({ userId:user.id,email:user.email },'somesupersecretkey',{expiresIn:'1h'});
            return { userCheck: user.id, token:token, tokenExpire: 1};
      }
    };