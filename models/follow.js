const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({

    from_user : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    to_user : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }

} , {
    timestamps:true
})

const Follow = mongoose.model('Follow' , followerSchema);

module.exports = Follow;