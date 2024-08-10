const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Comment schema
const commentSchema = new Schema({
    author: [{
        type: Schema.Types.ObjectId,
        ref: "User",  
        required: true
      }],
    text: {
    type: String,
    required: true
     },
    createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports=mongoose.model("Comment", commentSchema );