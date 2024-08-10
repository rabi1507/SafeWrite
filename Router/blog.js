const express = require("express");
var router = express.Router();
const {isLogin, isRegister} = require("../auth/auth")
const {createPost} = require('../Controller/createPost')
const {editPost} = require("../Controller/editPost")
const {deletePost} = require("../Controller/deletePost")
const auth = require("../middleware/auth")
const { getPublicPost } = require("../Controller/getPublicPost")
const { getPostById } = require("../Controller/getPostById")

        ///////// Routes///////////////
router.post('/create/post', isRegister, isLogin, createPost )  // correct
router.patch('/edit/:id', isLogin, auth.isAdminOrOwner, editPost);  // correct
router.delete("/delete/:id", isLogin, auth.isAdmin, deletePost); // correct
router.get("/get/all/post", getPublicPost ); // correct
router.get("/get/:id", getPostById);  // correct

module.exports = {blogPath: router};