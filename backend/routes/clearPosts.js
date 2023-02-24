var express = require('express');
const SubGreddit = require('../models/subgreddit');
const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  // Verify token
  try {
    const post = await Post.findOne({_id : req.body.id});
    if(!post)
    {
      console.log("Report timed out")

      const user = await User.findOne({_id:  req.user.email});
      console.log("found user = ",user);
      var newSavedPosts = user.savedPosts;
      console.log("newSavedPosts of sg = ",newSavedPosts);
      console.log("to be removed - ", req.body.id)
      const index = newSavedPosts.indexOf(req.body.id);
      console.log("index = ", index)
      if (index > -1) { // only splice array when item is found
        newSavedPosts.splice(index, 1); // 2nd parameter means remove one item only
          console.log("final array = ", newSavedPosts);
      } else {
          console.log("something fishy");
      }

      User.findOneAndUpdate(
        {_id:req.user.email},
        {$set:{savedPosts: newSavedPosts}},
        {new: true}
       )    
       .then(() => {
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
    }
    next();
  } catch (err) {
    console.error('something wrong with clear posts middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
