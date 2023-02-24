var express = require('express');
const Stat = require('../models/stat');
var router = express.Router();

const auth = require('./middleware');

router.post('/',auth, async (req, res) => {
  console.log("uwu",req.body.id);
    try {
      const post = await Stat.findOne({_id : req.body.id});
      console.log("stat = ",post);
      res.status(200).json({post});
    } catch (error) {
        console.log("Report Info Unavailable")
      res.status(500).json(error);
    }
});


 module.exports = router;