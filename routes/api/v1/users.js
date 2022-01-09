const express = require("express");
const router = express.Router();
const usersApi = require("../../../controllers/api/v1/users");
const jwt = require('jsonwebtoken');

const passport = require("passport");

router.post('/signup',usersApi.create);
router.post("/login", usersApi.createSession);
router.get("/profile/:id", passport.authenticate("jwt", { session: false }), usersApi.profile);
router.post("/follow/:id", passport.authenticate("jwt", { session: false }), usersApi.follow);
router.post("/unfollow/:id", passport.authenticate("jwt", { session: false }), usersApi.unfollow);
module.exports = router;