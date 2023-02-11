var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = require("../models/user.js");

mongoose.connect("mongodb+srv://ishwar:shane123@cluster0.bt85bam.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
          console.log("MongoDB database connection established successfully !");
        })
        .catch((err) => {
          console.log("MongoDB database connection error !", err);
        });


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send("pushing...");
// });


router.post("/", (req, res) => {
//   console.log("Hewwo req = ",req);

  const newUser = new User({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    contactNumber: req.body.contactnumber, 
    email: req.body.email,
    userName: req.body.username,
    password: req.body.password,
    age: req.body.age
  });

  User.findOneAndUpdate(
    {email: newUser.email.trim()},
    {$set:{firstName: newUser.firstName ,
    lastName: newUser.lastName ,
    contactNumber: newUser.contactNumber ,
    email: newUser.email ,
    userName: newUser.userName,
    age: newUser.age}},
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
