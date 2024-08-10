const Blog = require('../Models/Blog');
const apiResponse = require("../utils/apiResponse")

const getPublicPost = async (request, response)=>{
    try {
        // Fetch all public posts
        const allPost = await Blog.find({});

        if(!allPost[0]._doc) return apiResponse.notFoundResponse(response, "posts not fonnd")
        // Prepare response
        return apiResponse.successResponseWithData(response, "all post", allPost[0]._doc)
      } catch (error) {
        console.error(error);
        return apiResponse.somethingResponse(response, error.message)
      }
}

module.exports = { getPublicPost }