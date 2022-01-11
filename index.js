const express = require("express");
const app =  express();
const env = require("./config/environment")
const port = env.port;
const path = require('path');
const db = require('./config/database');
const cookieParser = require("cookie-parser");
//middleware 
app.use(express.urlencoded());
app.use(cookieParser());
const passport = require("passport");
const passportStrategy = require("./config/passport");


app.use('/' , require('./routes'));

app.listen(port , (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Server Up and Running on port ${port}`);
    }

})


