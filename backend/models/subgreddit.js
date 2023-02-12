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
  }


});

module.exports = SubGreddit = mongoose.model("SubGrediits", SubGredditSchema);
