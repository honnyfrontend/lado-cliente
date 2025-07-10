const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Post', PostSchema);