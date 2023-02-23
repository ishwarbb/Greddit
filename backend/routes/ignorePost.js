var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Report = require("../models/report.js");

router.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.body._id);

  Report.findOneAndUpdate(
    {_id: req.body._id},
    {$set:{ignored: true}},
    {new: true}
   )    
   .then((user) => {
    res.status(200).json(user);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
});

module.exports = router; 
