var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const auth = require('./middleware');


const SubGreddit = require("../models/subgreddit.js");
const Stat = require("../models/stat.js");

mongoose.connect("mongodb+srv://ishwar:shane123@cluster0.bt85bam.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
          console.log("MongoDB database connection established successfully !");
        })
        .catch((err) => {
          console.log("MongoDB database connection error !", err);
        });

        var now = new Date();

router.post('/',auth, async (req, res) => {
  const newStat = new Stat({
    rp : 0,
    dp : 0
  });

      const newSubGreddit = new SubGreddit({
      creator: req.body.creator,
      name: req.body.name,
      description: req.body.description, 
      tags: req.body.tags,
      bannedKeywords: req.body.bannedKeywords,
      people: req.body.people,
      posts: req.body.posts,
      creationDate: now,
    });  
    await newSubGreddit.save();
    await newStat.save();

  console.log(req);

  try {
    const subgreddit = await SubGreddit.findOne({_id: newSubGreddit._id});
    console.log("found sg = ",subgreddit);
    SubGreddit.findOneAndUpdate(
      { _id: newSubGreddit._id},
      {$set:{statid: newStat._id}},
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
