var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


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


// router.post("/", (req, res) => {
//   // console.log("Hewwo req = ",req);

//   const newUser = new User({
//     firstName: req.body.firstname,
//     lastName: req.body.lastname,
//     contactNumber: req.body.contactnumber, 
//     email: req.body.email,
//     userName: req.body.username,
//     password: req.body.password,
//     age: req.body.age
//   });



//   newUser
//     .save()
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).send(err);
//     });
// });

const auth = require('./middleware');
router.post('/', async (req, res) => {
    const newUser = new User({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    contactNumber: req.body.contactnumber, 
    email: req.body.email,
    userName: req.body.username,
    password: req.body.password,
    age: req.body.age
  });

  try {
    // check if the user already exists
    var user = await User.findOne({ email : newUser.email});
    if (user) {
      console.log("email already taken")
      return res.status(400).json({ msg: 'Email already exists' });
    }

    // hash user password
    // const salt = await bcrypt.genSalt(10);
    // newUser.password = await bcrypt.hash( req.body.password, salt);
    await newUser.save();

    // return jwt
    const payload = {
      user: {
        email: newUser.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
);

module.exports = router; 
