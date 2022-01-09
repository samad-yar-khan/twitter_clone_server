const express = require("express");

const router = express.Router();


// router.use('/tweets' , require('./tweets') );
router.use('/users' , require('./users'));


module.exports = router;

//
//npm install --save bcrypt body-parser jsonwebtoken passport passport-jwt passport-local
