var express = require('express');
const Report = require('../models/report');
var router = express.Router();

const auth = require('./middleware');

router.post('/',auth, async (req, res) => {
  console.log("uwu",req.body);
    try {
      const post = await Report.findOne({_id : req.body.id});
      console.log("post = ",post);
      res.status(200).json({post});
    } catch (error) {
        console.log("Post Info Unavailable")
      res.status(500).json(error);
    }
});


 module.exports = router;