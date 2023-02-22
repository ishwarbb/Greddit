var express = require('express');
const SubGreddit = require('../models/subgreddit');
var router = express.Router();

const auth = require('./middleware');

router.post('/',auth, async (req, res) => {
    console.log(req.body);
    console.log(req.body.sgid);

    const subgreddit = await SubGreddit.findOne({_id: req.body.sgid});
    console.log("found sg = ",subgreddit);
    var newPeople = subgreddit.requestingpeople;
    newPeople.push(req.user.email);
    newPeople = [...new Set(newPeople)]; 

    console.log(newPeople);
    SubGreddit.findOneAndUpdate(
        {_id: req.body.sgid},
        {$set:{requestingpeople: newPeople}},
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
