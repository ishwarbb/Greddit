var express = require('express');
var router = express.Router();

const User = require("../models/user.js");

/* GET home page. */
router.post('/', function(req, res, next) {
  var user = req.body.user; // here user is an email
  var password = req.body.passowrd;

  var Userpassword = User.findOne({email: user}).passowrd;

  if(bcrypt.compareSync(data.get('password'),user['password']) === false)
  {
        res.status(400);
  }
  else
  {
        res.status(200);
  }
  
});

module.exports = router;
