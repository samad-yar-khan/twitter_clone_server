const express = require("express");

const router = express.Router();


console.log("Api loaded!");

router.use('/v1' , require('./v1'));



module.exports = router;