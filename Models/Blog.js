const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    tags: [String], 
    text: [String], 

    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment' // Reference the Comment model
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });

  module.exports=mongoose.model("blog",blogSchema );