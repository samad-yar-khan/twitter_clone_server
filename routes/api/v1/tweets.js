const express = require("express");
const router = express.Router();
const tweetsApi = require("../../../controllers/api/v1/tweets");
const jwt = require('jsonwebtoken');
const passport = require("passport");



router.post("/create", passport.authenticate("jwt", { session: false }), tweetsApi.create);
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), tweetsApi.destroy);
router.get("/timeline", passport.authenticate("jwt", { session: false }), tweetsApi.timeLineTweets);
router.get("/self", passport.authenticate("jwt", { session: false }), tweetsApi.ownTweets);
//passport will put an authentication check on out delete request and

module.exports = router;