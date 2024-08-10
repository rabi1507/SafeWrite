const Blog = require('../Models/Blog');
const apiResponse = require("../utils/apiResponse")
const mongoose = require('mongoose');
const getPostById = async (request, response)=>{
    const { id } = request.params;
    if( !id ) return apiResponse.validationError(response, "id is required")
    const _id = new mongoose.Types.ObjectId(id);
    try {
        const allPost = await Blog.findById({_id});

        if(!allPost._doc) return apiResponse.notFoundResponse(response, "posts not fonnd")
            
        return apiResponse.successResponseWithData(response, "all post", allPost._doc)
      } catch (error) {
        console.error(error);
        return apiResponse.somethingResponse(response, error.message)
      }
}

module.exports = { getPostById }