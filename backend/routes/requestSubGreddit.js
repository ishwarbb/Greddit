var express = require('express');
const SubGreddit = require('../models/subgreddit');
const User = require('../models/user');
var router = express.Router();

const auth = require('./middleware');

router.post('/',auth, async (req, res) => {
    console.log(req.body);
    console.log(req.body.sgid);

    var user = await User.findOne({email : req.user.email})
    console.log(user);

    console.log("array = ",user.leftsubgreddits);
    console.log("to be removed - ",req.body.sgid)
    const index = user.leftsubgreddits.indexOf(req.body.sgid);
    console.log("index = ",index)
    // if (index <= -1) { // only splice array when item is found
    //   res.status(399).send("You cant join again");
    //   return;
    // }

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
