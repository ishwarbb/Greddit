var express = require('express');
const Post = require('../models/post');
const SubGreddit = require('../models/subgreddit');
var router = express.Router();
const mongoose = require('mongoose');

const auth = require('./middleware');
const updatedvvd = require('./updatedvvd');

mongoose.connect("mongodb+srv://ishwar:shane123@cluster0.bt85bam.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
          console.log("MongoDB database connection established successfully !");
        })
        .catch((err) => {
          console.log("MongoDB database connection error !", err);
        });

router.post('/',auth,updatedvvd,async (req, res) => {
    try {
      const posts = await Post.find({postedIn : req.body.id}).select('-postedBy2');
      console.log("postss = ",posts);

      for(let i = 0; i < posts.length; i++)
      {
        console.log("post = ",posts[i]);
        console.log("posted In = ",posts[i].postedIn);
        const subgreddit = await SubGreddit.findOne({_id : posts[i].postedIn});
        console.log("sg = ",subgreddit);
        const index = subgreddit.blockedpeople.indexOf(posts[i].postedBy);
        console.log("index = ",index)
        if(index > -1) {
          posts[i].postedBy = "[Blocked User]";
        }
        var text = posts[i].text;
        for(let i = 0; i < subgreddit.bannedKeywords.length; i++)
        {
          text = text.replaceAll(subgreddit.bannedKeywords[i], '*'.repeat(subgreddit.bannedKeywords[i].length));
        }
        posts[i].text = text;
      }

      console.log("posts sending = ",posts);
      res.status(200).json({posts});
    } catch (error) {
        console.log("Post Info Unavailable")
      res.status(500).json(error);
    }
});


 module.exports = router;