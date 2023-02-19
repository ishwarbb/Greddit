var express = require('express');
const User = require('../models/user');
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
    const user = await User.findOne({email: req.body.targetemail});
    console.log("found us = ",user);
    var newFollowers = user.followers;
    newFollowers.push(req.user.email);
    User.findOneAndUpdate(
        {email: req.body.targetemail},
        {$set:{followers: newFollowers}},
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
