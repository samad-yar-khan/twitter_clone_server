const express = require("express");

const router = express.Router();


console.log("router loaded!");

router.use('/api' , require('./api'));



module.exports = router;