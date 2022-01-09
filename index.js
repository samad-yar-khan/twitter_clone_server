const express = require("express");
const app =  express();
const port = 8000;
const path = require('path');
const db = require('./config/database');
const cookieParser = require("cookie-parser");
//middleware 
app.use(express.urlencoded());
app.use(cookieParser());


app.use('/' , require('./routes'));

app.listen(port , (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Server Up and Running on port ${port}`);
    }

})


