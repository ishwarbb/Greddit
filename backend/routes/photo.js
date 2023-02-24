var express = require('express');
const Post = require('../models/post');
const Subgreddit = require('../models/subgreddit');
var router = express.Router();
const auth = require('./middleware');

router.post('/',auth, async (req, res) => {
  console.log(req.body.id);
    try {
            var newItem = new Item();
            newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
            newItem.img.contentType = 'image/png';
            newItem.save();
      res.status(200).json({post});
    } catch (error) {
        console.log("Post Info Unavailable")
      res.status(500).json(error);
    }
});


 module.exports = router;