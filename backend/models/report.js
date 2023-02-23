const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReportSchema = new Schema({
    pid: {
    type: String,
    required: true,
    unique: false,
  },
  sgid: {
    type: String,
    required: true,
    unique: false,
  },
  text : {
    type: String,
    required: false,
    unique: false,
  },
  concern : {
    type: String,
    required: true,
    unique: false,     
  },
  reportedby : {
    type: String,
    required: true,
    unique: false,  
  },
  postedby : {
    type: String,
    required: true,
    unique: false,  
  },
  ignored:{
    type : Boolean,
    required: false,
    unique: false,
  },
  creationdate:{
    type : Date,
    required: false,
    unique: false,
  },
});

module.exports = Report = mongoose.model("Report", ReportSchema);
