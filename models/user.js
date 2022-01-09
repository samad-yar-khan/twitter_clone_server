const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required : true,
        unique :true
    },
    password:{
        type: String,
        required : true,
    },
    user_name:{
        type: String,
        required : true,
        unique :true
    },
    name_ :{
        type: String ,
        required : true
    }
},{
    timestamps:true //this is to  keep track of time at which  user is created and updated
});


userSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
  );

userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}
  

const User = mongoose.model("User" , userSchema);
module.exports = User;
