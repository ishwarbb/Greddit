var express = require('express');
var router = express.Router();
const User = require("../models/user.js");

const auth = require('./middleware');

router.post('/',auth, async function(req, res, next) {
  console.log("post id = ",req.body.postid);
  console.log("user = ",req.user);

  try {
    var user = await User.updateOne({email: req.user.email}, { $pull : {savedPosts : req.body.postid }})
    console.log(user);
    if (!user) {
      console.log("Internal user post error")
      return res.status(400).json({ msg: "Internal user post error" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
