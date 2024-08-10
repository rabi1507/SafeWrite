const express = require("express");
const { addTag } = require("../Controller/addTag");
const { getPostByTag } = require("../Controller/getPostByTag");
const {getTag} = require("../Controller/getTag")
const router = express.Router();
const {isLogin} = require("../auth/auth")


// router.post('/create', auth);
router.patch("/tags/:id", isLogin, addTag ); // correct
router.get("/tags/:tag", isLogin, getPostByTag); // we can handle it from frontend
router.get("/tags/tag", isLogin, getTag);  // we can handle it from frontend

module.exports = {tagPath: router};