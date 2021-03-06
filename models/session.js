const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const sessionSchema = new Schema({
    title: {
        type:String,
        required:true
    },

    description: {
        type:String,
        required:true
    },

    urgency: {
        type: Number,
        required:true
    },
    date: {
        type:Date,
        required:true
    },
    creator: {
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports=mongoose.model('Session',sessionSchema);