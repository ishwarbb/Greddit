var express = require('express');
const Post = require('../models/post');
const Subgreddit = require('../models/subgreddit');

var router = express.Router();
const mongoose = require('mongoose');

const auth = require('./middleware');
const clearPosts = require('./clearPosts');

mongoose.connect("mongodb+srv://ishwar:shane123@cluster0.bt85bam.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
          console.log("MongoDB database connection established successfully !");
        })
        .catch((err) => {
          console.log("MongoDB database connection error !", err);
        });

router.post('/',auth,clearPosts,async (req, res) => {
  console.log(req.body.id);
    try {
      const post = await Post.findOne({_id : req.body.id}).select('-postedBy2');
      console.log("post = ",post);    

      var text = post.text;
      const subgreddit = await Subgreddit.findOne({_id : post.postedIn});
      const index = subgreddit.blockedpeople.indexOf(post.postedBy);
      console.log("index = ",index)
      if(index > -1) {
        post.postedBy = "[Blocked User]";
      }
      for(let i = 0; i < subgreddit.bannedKeywords.length; i++)
      {
        text = text.replace(subgreddit.bannedKeywords[i], '*'.repeat(subgreddit.bannedKeywords[i].length));
      }
      post.text = text;

      res.status(200).json({post});
    } catch (error) {
        console.log("Post Info Unavailable")
      res.status(500).json(error);
    }
});


 module.exports = router;