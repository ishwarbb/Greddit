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
    unique : false
  },
  reportedPosts : {
    type : Array,
    required : false,
    unique : false
  },
  blockedpeople : {
    type : Array,
    required : false,
    unique : false
  },
  image : {
    data: Buffer, 
    contentType: String ,
    unique : false
  },
  statid : {
    data: String, 
    contentType: String ,
    unique : false
  },
});

module.exports = SubGreddit = mongoose.model("SubGreddits", SubGredditSchema);
