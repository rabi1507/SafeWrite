const express = require("express");
const { signup, login } = require("../auth/auth");
var router = express.Router();

// router.post('/create', auth);
router.post('/create', signup ); // correct
router.post("/login", login ) // correct

module.exports = {userPath: router};
