var express = require('express');
const SubGreddit = require('../models/subgreddit');
const Report = require('../models/report');

var router = express.Router();

const auth = require('./middleware');

router.post('/',auth, async (req, res) => {
    console.log(req.body.blockeduser);
    console.log(req.body.sgid);
    console.log(req.body.rid);

    const subgreddit = await SubGreddit.findOne({_id: req.body.sgid});
    console.log("found sg = ",subgreddit);
    var newPeople = subgreddit.blockedpeople; 
    newPeople.push(req.body.blockeduser);
    newPeople = [...new Set(newPeople)]; 
    console.log(newPeople);

    var newReports = subgreddit.reportedPosts;
    console.log("reports of sg = ",newReports);
    console.log("to be removed - ", req.body.rid)
    const index = newReports.indexOf(req.body.rid);
    console.log("index = ", index)
    if (index > -1) { // only splice array when item is found
        newReports.splice(index, 1); // 2nd parameter means remove one item only
        console.log("final array = ", newReports);
    } else {
        console.log("something fishy");
    }

    SubGreddit.findOneAndUpdate(
        {_id: req.body.sgid},
        {$set:{blockedpeople: newPeople, reportedPosts: newReports}},
        {new: true}
       )    
       .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
});


 module.exports = router;
