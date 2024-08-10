const Blog = require('../Models/Blog');
const apiResponse = require("../utils/apiResponse");

const getPostByTag = async (request, response) =>{
    const { tag } = request.params;
    if( !tag ) return apiResponse.validationError(response, "Tag is required")

    try {
        const blogs = await Blog.find({ tags: tag })
    
        if (blogs.length === 0) return apiResponse.notFoundResponse(response, "Blog not found by given Tags")
    
        return apiResponse.successResponseWithData(response, "all post by tag", blogs)
      } catch (error) {
        console.error(error);
        return apiResponse.ErrorResponse(response, error.message)
      }
}

module.exports = { getPostByTag }