var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');


const Post = require("../models/post.js");
const SubGreddit = require("../models/subgreddit.js");

mongoose.connect("mongodb+srv://ishwar:shane123@cluster0.bt85bam.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
          console.log("MongoDB database connection established successfully !");
        })
        .catch((err) => {
          console.log("MongoDB database connection error !", err);
        });


router.post('/', async (req, res) => {
    const newPost = new Post({
    text: req.body.text,
    postedBy: req.body.postedBy,
    postedIn: req.body.postedIn, 
    upvotes: req.body.upvotes,
    downvotes: req.body.downvotes
  });

  // console.log(req);
  console.log(newPost)

  try {
    await newPost.save();
    const subgreddit = await SubGreddit.findOne({_id: req.body.postedIn});
    console.log("found sg = ",subgreddit);
    var newPosts = subgreddit.posts;
    newPosts.push(newPost._id);
    SubGreddit.findOneAndUpdate(
      {_id: newPost.postedIn},
      {$set:{posts: newPosts}},
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
