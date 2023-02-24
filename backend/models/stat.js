const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StatSchema = new Schema({
  sgvmD: {
    type: Array,
    required: false,
    unique: false,
  },
  sgvmV: {
    type: Array,
    required: false,
    unique: false,
  },
  dpvdD: {
    type: Array,
    required: false,
    unique: false,
  },
  dpvdV: {
    type: Array,
    required: false,
    unique: false,
  },
  dvvdD: {
    type: Array,
    required: false,
    unique: false,
  },
  dvvdV: {
    type: Array,
    required: false,
    unique: false,
  },
  rpvdp: {
    type: Array,
    required: false,
    unique: false,
  },
  rp: {
    type: Number,
    required: false,
    unique: false,
  },
  dp: {
    type: Number,
    required: false,
    unique: false,
  },
});

module.exports = Stat = mongoose.model("Stat", StatSchema);
