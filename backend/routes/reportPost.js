var express = require('express');
var router = express.Router();

const Post = require("../models/post.js");
const User = require("../models/user.js");
const SubGreddit = require("../models/subgreddit.js");
const Report = require("../models/report.js");

const auth = require('./middleware');

router.post('/',auth, async (req, res) => {
    console.log(req.body.pid);
    console.log(req.body.sgid);
    try {
        const post = await Post.findOne({_id: req.body.pid});
        console.log("found p = ",post);

        var now = new Date();

    const newReport = new Report({
        pid: req.body.pid,
        sgid: req.body.sgid,
        text: req.body.text,
        concern: req.body.concern, 
        reportedby : req.user.email,
        postedby : post.postedBy,
        ignored : false,
        creationdate : now
      });


    await newReport.save();
    const subgreddit = await SubGreddit.findOne({_id: req.body.sgid});
    console.log("found sg = ",subgreddit);
    var newPosts = subgreddit.reportedPosts;
    newPosts.push(newReport._id);
    // newPosts.push(newReport);
    console.log(newPosts)
    SubGreddit.findOneAndUpdate(
      {_id: req.body.sgid},
      {$set:{reportedPosts: newPosts}},
      {new: true}
     )    
     .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
);

module.exports = router; 
