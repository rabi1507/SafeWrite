// models/tagModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  tags: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

module.exports = mongoose.model('Tag', tagSchema);
