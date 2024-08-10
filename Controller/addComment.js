const apiResponse = require("../utils/apiResponse");
const Blog = require('../Models/Blog'); 
const Comment = require('../Models/Comment');
const mongoose = require('mongoose');
const { verifyToken } = require("../auth/jsonwebtoken");
require('dotenv').config();

const addComment = async (request, response) => {
    const { id } = request.params;
    const { text } = request.body;

    const data = await verifyToken(request.body.token, process.env.AUTHTOKEN_SECRETKEY);
    const author = data.id || data.email;

    if (!author || !text) return apiResponse.validationError(response, "Both, Author and Text are required");
    if (!id) return apiResponse.validationError(response, "Blog id is missing");

    const _id = new mongoose.Types.ObjectId(id);

    try {
        // Create new comment
        const newComment = new Comment({ author, text });
        const saveComment = await newComment.save();
        if (!saveComment) return apiResponse.somethingResponse(response, "Failed to save comment");

        // Add comment to the blog post
        const updatedBlog = await Blog.findByIdAndUpdate(
            _id,
            { $push: { comments: saveComment._id } },
            {
                $set : {text: saveComment._doc.text}
            },
            
            { new: true } 
        ).populate('comments');

        if (!updatedBlog._doc) return apiResponse.somethingResponse(response, "Blog not updated with comments");

        return apiResponse.successResponseWithData(response, "Comment added successfully", updatedBlog._doc);
    } catch (error) {
        return apiResponse.ErrorResponse(response, error.message);
    }
}

module.exports = { addComment };
