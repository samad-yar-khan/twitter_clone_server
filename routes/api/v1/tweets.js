const express = require("express");
const router = express.Router();
const tweetsApi = require("../../../controllers/api/v1/tweets");
const jwt = require('jsonwebtoken');
const passport = require("passport");



router.post("/create", passport.authenticate("jwt", { session: false }), tweetsApi.create);
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), tweetsApi.destroy);
// router.get("/", passport.authenticate("jwt", { session: false }), tweetsApi.getPosts);
//passport will put an authentication check on out delete request and

module.exports = router;