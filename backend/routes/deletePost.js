var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');


const Post = require("../models/post.js");
const SubGreddit = require("../models/subgreddit.js");
const Report = require("../models/report.js");


router.post('/', async (req, res) => {
    console.log(req.body.pid);
    console.log(req.body.rid);
  try {
    const post = await Post.findOne({_id : req.body.pid});

    const subgreddit = await SubGreddit.findOne({_id: post.postedIn});
    console.log("found sg = ",subgreddit);
    var newPosts = subgreddit.posts;
    console.log("posts of sg = ",newPosts);
    console.log("to be removed - ",req.body.pid)
    const index = newPosts.indexOf(req.body.pid);
    console.log("index = ", index)
    if (index > -1) { // only splice array when item is found
        newPosts.splice(index, 1); // 2nd parameter means remove one item only
        console.log("final array = ", newPosts);
    } else {
        console.log("something fishy");
    }

      var newReports = subgreddit.reportedPosts;
      console.log("reports of sg = ",newReports);
      console.log("to be removed - ", req.body.rid)
      const index2 = newReports.indexOf(req.body.rid);
      console.log("index2 = ", index2)
      if (index2 > -1) { // only splice array when item is found
          newReports.splice(index2, 1); // 2nd parameter means remove one item only
          console.log("final array = ", newReports);
      } else {
          console.log("something fishy");
      }
    
    Post.findOneAndDelete({_id : req.body.pid}).then(() => {
    Report.findOneAndDelete({_id : req.body.rid}).then(() => {
      SubGreddit.findOneAndUpdate(
        {_id:post.postedIn},
        {$set:{posts: newPosts, reportedPosts: newReports}},
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
  });
    // res.status(200).send('Post Deleted');
    }
     catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
);

module.exports = router; 
