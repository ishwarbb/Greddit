const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    text: {
    type: String,
    required: true,
    unique: false,
  },
  postedBy: {
    type: String,
    required: true,
    unique: false,
  },    
  postedIn: {
    type: String,
    required: true,
    unique: false,
  },    
  upvotes: {
    type: String,
    required: true,
    unique: false,
  },
  downvotes: {
    type: String,
    required: true,
    unique: false,
  },

});

module.exports = Post = mongoose.model("Posts", PostSchema);
