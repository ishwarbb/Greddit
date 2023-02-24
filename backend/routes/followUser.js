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
    const user1 = await User.findOne({email: req.body.targetemail});
    console.log("found u1 = ",user1);
    var newFollowers = user1.followers;
    newFollowers.push(req.user.email);
    newFollowers = [...new Set(newFollowers)];

    const user2 = await User.findOne({email: req.user.email});
    console.log("found u2 = ",user2);
    var newFollowing = user2.following;
    newFollowing.push(req.body.targetemail);
    newFollowing = [...new Set(newFollowing)];

    User.findOneAndUpdate(
        {email: req.body.targetemail},
        {$set:{followers: newFollowers}},
        {new: true}
       )    
       .then(() => {User.findOneAndUpdate(
        {email: req.user.email},
        {$set:{following: newFollowing}},
        {new: true}
       ) 
      .then((user)=> {
        res.status(200).json(user);
       })
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
});


 module.exports = router;
