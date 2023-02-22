const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SubGredditSchema = new Schema({
    name: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: false,
    unique: false,
  },
  tags : {
    type: Array,
    required: false,
    unique: false,
  },
  bannedKeywords : {
    type: Array,
    required: false,
    unique: false,     
  },
  people : {
    type : Array,
    required : false,
    unique: false
  },
  bannedpeople : {
    type : Array,
    required : false,
    unique: false
  },
  requestingpeople : {
    type : Array,
    required : false,
    unique: false
  },
  posts : {
    type : Array,
    required : false,
    unique : false    
  },
  creator : {
    type : String,
    required : false,
    unique : false    
  },
  creationDate : {
    type : Date,
    required : false,
    unique : true
  },
  reportedPosts : {
    type : Array,
    required : false,
    unique : true
  },

});

module.exports = SubGreddit = mongoose.model("SubGreddits", SubGredditSchema);
