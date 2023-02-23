var nodemailer = require('nodemailer');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  try{
    console.log(req.body.target);
    console.log(req.body.subject);
    console.log(req.body.text);

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
    to: req.body.target,
    subject: req.body.subject,
    text: req.body.text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  }
  catch (err) {
    console.error('Email error') ;
    res.status(500).json({ msg: 'Server Error' });
  }
    // res.send('respond with a resource');
});

module.exports = router;
