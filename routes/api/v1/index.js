const express = require("express");

const router = express.Router();



router.use('/users' , require('./users'));
router.use('/tweets' , require('./tweets') );
router.use('/github' , require('./github'));




module.exports = router;

//
//npm install --save bcrypt body-parser jsonwebtoken passport passport-jwt passport-local
