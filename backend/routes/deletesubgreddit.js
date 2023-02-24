var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const auth = require('./middleware');


const Post = require("../models/post.js");
const SubGreddit = require("../models/subgreddit.js");
const Report = require("../models/report.js");
const User = require("../models/user.js");


router.post('/', auth, async (req, res) => {
    console.log(req.body.sgid);
    try {
        var subgreddit = await SubGreddit.findOne({ _id: req.body.sgid });
            console.log("found sg = ",subgreddit);
            var newPosts = subgreddit.posts;
            console.log("posts of sg = ",newPosts);
            for(let i = 0; i < subgreddit.posts.length; i++)
            {
                // User.update({},{ $pull : {savedPosts : subgreddit.posts[i]}});
                // User.savedPosts.pull(subgreddit.posts[i]);
                Post.findOneAndDelete({_id : subgreddit.posts[i]});
                console.log("Deleting saved post = ",subgreddit.posts[i].toString());
                User.updateMany({},{ $pull : {savedPosts : subgreddit.posts[i].toString() }});
            }
            // console.log("posts of sg = ",newPosts);
              var newReports = subgreddit.reportedPosts;
              console.log("reports of sg = ",newReports);
            for(let i = 0; i < subgreddit.reportedPosts.length; i++)
            {
                await Report.findOneAndDelete({_id : subgreddit.reportedPosts[i]});
            }
        // }).then(() => {
            // SubGreddit.findOne({_id:req.body.sgid}).then((x) => console.log(x));
            // console.log("new sg = ",sg);
           var x = await SubGreddit.findOneAndDelete({ _id: req.body.sgid });
        // }).then(() => {
            res.status(200).send("Yes");
        // })
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
);

module.exports = router; 
