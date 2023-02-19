var express = require('express');
const User = require('../models/user');
var router = express.Router();

const auth = require('./middleware');

router.post('/',auth, async (req, res) => {
    try {
        console.log("targetemail = ",req.body);
      const user = await User.findOne({email : req.body.targetemail}).select('-password');
      console.log(user);
      res.status(200).json({user});
    } catch (error) {
        console.log("User Info Unavailable")
      res.status(500).json(error);
    }
});


 module.exports = router;