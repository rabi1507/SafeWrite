const express = require("express");
const { addComment } = require("../Controller/addComment");
const { getPostByTag } = require("../Controller/getPostByTag");
const {getAllComment} = require("../Controller/getAllComment");
const {isLogin} = require("../auth/auth");
var router = express.Router();

// router.post('/create', auth);
router.post('/blogs/:id', isLogin, addComment );
router.get("/blogs/:blogId/comments", getPostByTag);
router.get("/blogs/comments", getAllComment)

module.exports = {commentPath: router};