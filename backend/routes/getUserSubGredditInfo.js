var express = require('express');
const SubGreddit = require('../models/subgreddit');
var router = express.Router();
const mongoose = require('mongoose');

const auth = require('./middleware');

mongoose.connect("mongodb+srv://ishwar:shane123@cluster0.bt85bam.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
          console.log("MongoDB database connection established successfully !");
        })
        .catch((err) => {
          console.log("MongoDB database connection error !", err);
        });

router.get('/',auth, async (req, res) => {
    try {
        console.log(req.user.email);
      const subgreddit = await SubGreddit.find({creator : req.user.email});
      console.log(subgreddit);
      res.status(200).json({subgreddit});
    } catch (error) {
        console.log("User Info Unavailable")
      res.status(500).json(error);
    }
});


 module.exports = router;
