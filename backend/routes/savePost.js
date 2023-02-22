var express = require('express');
const User = require('../models/user');
var router = express.Router();

const auth = require('./middleware');

router.post('/',auth, async (req, res) => {
    try {
        console.log(req.body.postid);
      const user = await User.findOne({email : req.user.email}).select('-password');
      var newSavedPosts = user.savedPosts;
      newSavedPosts.push(req.body.postid); 
      newSavedPosts = [...new Set(newSavedPosts)]; 
      
      User.findOneAndUpdate(
        {email: req.user.email},
        {$set:{savedPosts: newSavedPosts}},
        {new: true}
       )    
       .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
    } catch (error) {
        console.log("User Info Unavailable")
      res.status(500).json(error);
    }
});


 module.exports = router;
