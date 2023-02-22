var express = require('express');
const Post = require('../models/post');
var router = express.Router();

const auth = require('./middleware');

router.post('/',auth, async (req, res) => {
    console.log(req.body.pid);
    console.log(req.body.comment);

    const post = await Post.findOne({_id: req.body.pid});
    console.log("found p = ",post);
    var newComments = post.comments;
    newComments.push(req.body.comment);
    console.log(newComments);

    Post.findOneAndUpdate(
        {_id: req.body.pid},
        {$set:{comments: newComments}},
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
