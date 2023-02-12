var express = require('express');
var router = express.Router();
const User = require("../models/user.js");
const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://ishwar:shane123@cluster0.bt85bam.mongodb.net/?retryWrites=true&w=majority")
//         .then(() => {
//           console.log("MongoDB database connection established successfully !");
//         })
//         .catch((err) => {
//           console.log("MongoDB database connection error !", err);
//         });

const auth = require('./middleware');

router.post('/removefollowers',auth, async function(req, res, next) {
  console.log(req.body);
  var personRemoving = req.body.personRemoving;
  var personToBeRemoved = req.body.personToBeRemoved;

  try {
    var user1 = await User.updateOne({email: personRemoving}, { $pull : {followers : personToBeRemoved}})
    var user2 = await User.updateOne({email: personToBeRemoved}, { $pull : {following : personRemoving}})
    console.log(user1,user2);
    if (!user1 || !user2) {
      console.log("Internal User error")
      return res.status(400).json({ msg: "Internal User error" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
 
router.post('/removefollowing',auth, async function(req, res, next) {
  console.log(req.body);
  var personRemoving = req.body.personRemoving;
  var personToBeRemoved = req.body.personToBeRemoved;

  try {
    var user1 = await User.updateOne({email: personRemoving}, { $pull : {following : personToBeRemoved}})
    var user2 = await User.updateOne({email: personToBeRemoved}, { $pull : {followers : personRemoving}})
    // console.log(user1,user2);
    if (!user1 || !user2) {
      console.log("Internal User error")
      return res.status(400).json({ msg: "Internal User error" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
