const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const signupSchema = new Schema({
    session: {
        type:Schema.Types.ObjectId,
        ref:'Session'
    },
    user: {
        type:Schema.Types.ObjectId,
        ref:'User'
    }
   },
   { timestamps:true }
);

module.exports = mongoose.model('Signup',signupSchema);