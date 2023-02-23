var nodemailer = require('nodemailer');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("hello");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ishwarbb24@gmail.com',
      pass: 'jwpnsgtseckfhxhv',
    },
  });
  
  var mailOptions = {
    from: 'ishwarbb24@gmail.com',
    to: 'ishwarbb25@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

    res.send('respond with a resource');
});

module.exports = router;
