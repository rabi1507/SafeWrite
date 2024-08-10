const apiResponse = require("../utils/apiResponse")
const Tag = require('../Models/Tag');
const getTag = async(request, response) =>{
    try {
        const tags = await Tag.find({});
        if (tags.length === 0) return apiResponse.notFoundResponse(response, "Tag Not Found");
        return apiResponse.successResponseWithData(response,  "All tags found", tags);
    } catch (error) {
        return apiResponse.ErrorResponse(response, error.message);
    }
}

module.exports = { getTag }