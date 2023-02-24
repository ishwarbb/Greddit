var express = require('express');
const Post = require('../models/post');

var router = express.Router();

const auth = require('./middleware');

router.post('/',auth,async (req, res) => {
  console.log(req.body.id);
    try {
      const post = await Post.findOne({_id : req.body.id}).select('-postedBy2');
      console.log("post = ",post);  
      var newDownvotes = post.downvotes - 1; 
      console.log("post upvotes = ",newDownvotes);  

      Post.findOneAndUpdate(
        {_id: req.body.id},
        {$set:{downvotes:newDownvotes}},
        {new: true}
       )    
       .then(() => {
        console.log("success");
        res.status(200).json({post});
      })
    } catch (error) {
        console.log("Post Info Unavailable")
      res.status(500).json(error);
    }
});


 module.exports = router;