const apiResponse = require("../utils/apiResponse");
const Comment = require("../Models/Comment")
const getAllComment = async(request, response) =>{
try {
    const comments = await Comment.find({});
    if (comments.length === 0) return apiResponse.notFoundResponse(response, "comment not found");
    return apiResponse.successResponseWithData(response, "all comment found", comments)
} catch (error) {
    return apiResponse.ErrorResponse(response, error.message);
 }
}

module.exports = {getAllComment}