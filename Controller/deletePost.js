const apiResponse = require("../utils/apiResponse")
const mongoose = require('mongoose');
const Blog = require('../Models/Blog'); 
const deletePost = async(request, response, next) => {
    const { id } = request.params;
    if(!id ) return apiResponse.validationError(response, "Id is required");

    try {
        const mongoId = new mongoose.Types.ObjectId(id);
    
        const deletedBlog = await Blog.findByIdAndDelete({_id: mongoId});
    
        if (!deletedBlog) return apiResponse.notFoundResponse(response, "Blog not found")
    
       return apiResponse.successResponse(response, "Blog deleted successfully")
      } catch (error) {
        console.error(error);
        return apiResponse.somethingResponse(response, "Something went wrong")
      }
}

module.exports = {deletePost}