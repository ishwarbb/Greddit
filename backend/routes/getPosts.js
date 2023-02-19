var express = require('express');
const Post = require('../models/post');
var router = express.Router();
const mongoose = require('mongoose');

const auth = require('./middleware');

mongoose.connect("mongodb+srv://ishwar:shane123@cluster0.bt85bam.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
          console.log("MongoDB database connection established successfully !");
        })
        .catch((err) => {
          console.log("MongoDB database connection error !", err);
        });

router.post('/',auth, async (req, res) => {
    try {
      const post = await Post.find();
      console.log("post = ",post);
      res.status(200).json({post});
    } catch (error) {
        console.log("Post Info Unavailable")
      res.status(500).json(error);
    }
});


 module.exports = router;
