var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require("dotenv").config();

const User = require("../models/user.js");

/* GET home page. */
router.post('/', async (req, res) => {
      // console.log(req);
  var email = req.body.email; // here user is an email
  var password = req.body.password;

  console.log(email,password);

  try {
      // check if the user already exists
      userdetails = await User.findOne({ email : email});
      console.log(userdetails);
      console.log(password);
      if (!userdetails) {
            console.log("Invalid email");
          return res.status(400).json({ msg: 'Email or password incorrect' });
      }

      const isMatch = await bcrypt.compare(password, userdetails.password);
      // const isMatch = (password == userdetails.password);
      console.log("isMatch = ",isMatch);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Email or password incorrect' });
      }

      // console.log("User exists");

      // return jwt
      const payload = {
            user: {
              email: email,
            },
      };

      console.log(process.env.JWT_SECRET);
    
      jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '30 days' },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
      }
      catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          }
      } 
);

module.exports = router;
