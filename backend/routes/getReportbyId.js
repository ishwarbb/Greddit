var express = require('express');
const Report = require('../models/report');
const SubGreddit = require('../models/subgreddit');
var router = express.Router();

const auth = require('./middleware');
const clearReport = require('./clearReports');

router.post('/',auth,clearReport, async (req, res) => {
  console.log("uwu",req.body);
    try {
      const post = await Report.findOne({_id : req.body.id});
      // var now = new Date();
      // console.log("Diff = ",now - post.creationdate);
      // if(now - post.creationdate > 180000)
      // {
      //   console.log("Report timed out")

      //   const subgreddit = await SubGreddit.findOne({_id: post.sgid});
      //   console.log("found sg = ",subgreddit);
      //   var newReports = subgreddit.reportedPosts;
      //   console.log("reports of sg = ",newReports);
      //   console.log("to be removed - ", req.body.id);
      //   const index = newReports.indexOf(req.body.id);
      //   console.log("index = ", index)
      //   if (index > -1) { // only splice array when item is found
      //       newReports.splice(index, 1); // 2nd parameter means remove one item only
      //       console.log("final array = ", newReports);
      //   } else {
      //       console.log("something fishy");
      //   }

      //   SubGreddit.findOneAndUpdate(
      //     {_id: req.body.sgid},
      //     {$set:{reportedPosts: newReports}},
      //     {new: true}
      //    )    
      //    .then((user) => {
      //     res.status(200).json(user);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     res.status(400).send(err);
      //   });
      //   return;
      // }
      console.log("post = ",post);
      res.status(200).json({post});
    } catch (error) {
        console.log("Report Info Unavailable")
      res.status(500).json(error);
    }
});


 module.exports = router;