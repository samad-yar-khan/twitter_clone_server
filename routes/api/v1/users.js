const express = require("express");
const router = express.Router();
const usersApi = require("../../../controllers/api/v1/users");
const jwt = require('jsonwebtoken');

const passport = require("passport");

router.get('/all' ,passport.authenticate("jwt", { session: false }), usersApi.allUsers );
router.post('/find',passport.authenticate("jwt", { session: false }), usersApi.findUsers );
router.post('/signup',usersApi.create);
router.post("/login", usersApi.createSession);
router.get("/profile/:id", passport.authenticate("jwt", { session: false }), usersApi.profile);
router.post("/follow/:id", passport.authenticate("jwt", { session: false }), usersApi.follow);
router.post("/unfollow/:id", passport.authenticate("jwt", { session: false }), usersApi.unfollow);
module.exports = router;