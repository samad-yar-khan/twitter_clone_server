const express = require("express");
const router = express.Router();
const githubApi = require("../../../controllers/api/v1/github");


router.get("/", githubApi.main);
router.get("/issues", githubApi.issues);
router.get("/contributors", githubApi.contributors);

module.exports = router;