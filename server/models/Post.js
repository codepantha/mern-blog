const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
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
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', PostSchema);
