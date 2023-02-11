var express = require('express');
const User = require('../models/user');
var router = express.Router();

const auth = require('./middleware');

router.get('/',auth, async (req, res) => {
    try {
        console.log(req.user.email);
      const user = await User.findOne({email : req.user.email}).select('-password');
      console.log(user);
      res.status(200).json({user});
    } catch (error) {
        console.log("User Info Unavailable")
      res.status(500).json(error);
    }
});


 module.exports = router;
