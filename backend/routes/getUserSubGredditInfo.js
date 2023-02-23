var express = require('express');
const SubGreddit = require('../models/subgreddit');
var router = express.Router();

const auth = require('./middleware');

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
