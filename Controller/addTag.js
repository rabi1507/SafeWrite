const Blog = require('../Models/Blog');
const apiResponse = require("../utils/apiResponse");
const mongoose = require('mongoose');

const addTag = async(request, response)=>{
    const { id } = request.params;
    const {tags} = request.body;

    if( !id && !tags) return apiResponse.validationError(response, "Both, Id and Tags required");
    if (!mongoose.Types.ObjectId.isValid(id)) return apiResponse.validationError(response, "'Invalid blog post ID' ")
    if (!Array.isArray(tags)) return apiResponse.validationError(response, "'Tags should be an array of strings'")
    try {
        const blogPost = await Blog.findById({_id: new mongoose.Types.ObjectId(id)});

        if (!blogPost._doc) return apiResponse.notFoundResponse(response, "Post Not Found")
    
        // Add new tags (ensure no duplicates)
        blogPost.tags = [...new Set([...blogPost.tags, ...tags])];
        const saveData = await blogPost.save();
        if(!saveData._doc) return apiResponse.somethingResponse(response, "Not able add tag in the post")
        return apiResponse.successResponse(response, "Tags added successfully")
       
    } catch (error) {
        return apiResponse.ErrorResponse(response, error.message)
    }
}
module.exports = {addTag}