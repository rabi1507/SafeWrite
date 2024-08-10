const apiResponse = require("../utils/apiResponse")
const Blog = require("../Models/Blog");
const User = require("../Models/User");
const mongoose = require('mongoose');

const editPost = async(request, response)=>{
    const {  id } = request.params;
    const { title, content, tags } = request.body;
    const _id = new mongoose.Types.ObjectId(id);
    try {
        // Find and update the blog post
        const updatedBlog = await Blog.findByIdAndUpdate(
          _id,
          {
            title,
            content,
            tags,
            updatedAt: Date.now() 
          },
          { new: true, runValidators: true } 
        );
    
        // Check if the blog post exists
        if (!updatedBlog._doc) return apiResponse.notFoundResponse(response, " Blog not found");
        return apiResponse.successResponseWithData(response, "blog updated", updatedBlog._doc)
      } catch (error) {
        return apiResponse.somethingResponse(response, error.message )
        
      }
}

module.exports = {editPost}
