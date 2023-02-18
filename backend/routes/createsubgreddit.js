var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const SubGreddit = require("../models/subgreddit.js");

mongoose.connect("mongodb+srv://ishwar:shane123@cluster0.bt85bam.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
          console.log("MongoDB database connection established successfully !");
        })
        .catch((err) => {
          console.log("MongoDB database connection error !", err);
        });


router.post('/', async (req, res) => {
    const newSubGreddit = new SubGreddit({
    creator: req.body.creator,
    name: req.body.name,
    description: req.body.description, 
    tags: req.body.tags,
    bannedKeywords: req.body.bannedKeywords,
    people: req.body.people,
    posts: req.body.posts
  });

  console.log(req);
  console.log(newSubGreddit)

  try {
    await newSubGreddit.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
);

module.exports = router; 
