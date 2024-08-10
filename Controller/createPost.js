const apiResponse = require("../utils/apiResponse")
const Blog = require("../Models/Blog");
const User = require("../Models/User");
const {verifyToken} = require("../auth/jsonwebtoken")
require('dotenv').config();
const createPost = async(request, response)=>{
    try {
        const { title, content, tags, author } = request.body;
        if(!title) return apiResponse.validationError(response, "title is required")
        if(!content) return apiResponse.validationError(response, "content is required")
        if(!tags) return apiResponse.validationError(response, "tags is required")
        if(!author) return apiResponse.validationError(response, "author is required")
        // Check if the author exists
        const data = await verifyToken(request.body.token, process.env.AUTHTOKEN_SECRETKEY);
        const user = await User.findById({_id: data.id});
        if (!user._doc) return apiResponse.notFoundResponse(response, "user not found")
        const newBlog = {
          title:title,
          content:content,
          // tags:tags,
          author:data.id
        };
    
        const savedBlog = await Blog.create(newBlog);
        if(!savedBlog._doc) return apiResponse.somethingResponse(response, "unable to create post")
        return apiResponse.successResponseWithData(response, "successfully created", savedBlog._doc);
      } catch (error) {
        return apiResponse.somethingResponse(response, error.message)
      }
}
module.exports = { createPost };