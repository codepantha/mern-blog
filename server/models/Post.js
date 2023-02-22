const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  cover: {
    type: String
  }
});

module.exports = mongoose.model('Post', PostSchema);
