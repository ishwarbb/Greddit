var express = require('express');
const SubGreddit = require('../models/subgreddit');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  // Verify token
  try {
    const post = await Report.findOne({_id : req.body.id});
    var now = new Date();
    console.log("Diff = ",now - post.creationdate);
    if(now - post.creationdate > 60000000)
    {
      console.log("Report timed out")

      const subgreddit = await SubGreddit.findOne({_id: post.sgid});
      console.log("found sg = ",subgreddit);
      var newReports = subgreddit.reportedPosts;
      console.log("reports of sg = ",newReports);
      console.log("to be removed - ", req.body.id)
      const index = newReports.indexOf(req.body.id);
      console.log("index = ", index)
      if (index > -1) { // only splice array when item is found
          newReports.splice(index, 1); // 2nd parameter means remove one item only
          console.log("final array = ", newReports);
      } else {
          console.log("something fishy");
      }

        Report.findOneAndDelete({_id : req.body.id});

      SubGreddit.findOneAndUpdate(
        {_id: post.sgid},
        {$set:{reportedPosts: newReports}},
        {new: true}
       )    
       .then((user) => {
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
    }
    next();
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
