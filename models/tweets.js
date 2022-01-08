const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content:{
        type: String ,
        required:true
    },
    user:{ //this user refers to our user in the DB and will take ref from the user schemaa
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps:true
});

const Tweet = mongoose.model("Tweet" , tweetSchema);
module.exports = Tweet;