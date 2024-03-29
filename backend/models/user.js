const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
  },
  contactNumber: {
    type: Number,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  age: {
    type: Number,
    required: true,
    unique: false,
  },
  followers :{
    type: Array,
    required: false,
    unique: false
  },
  following :{
    type: Array,
    required: false,
    unique: false
  },
  savedPosts :{
    type: Array,
    required: false,
    unique: false
  },
  leftsubgreddits :{
    type: Array,
    required: false,
    unique: false
  }
});

module.exports = User = mongoose.model("Users", UserSchema);
