var express = require('express');
const SubGreddit = require('../models/subgreddit');
var router = express.Router();

const auth = require('./middleware');

router.post('/',auth, async (req, res) => {
    console.log(req.body.user);
    console.log(req.body.sgid);

    const subgreddit = await SubGreddit.findOne({_id: req.body.sgid});
    console.log("found sg = ",subgreddit);

    var newRequestingPeople = subgreddit.requestingpeople;
    console.log("array = ",newRequestingPeople);
    console.log("to be removed - ",req.body.user)
    const index = newRequestingPeople.indexOf(req.body.user);
    console.log("index = ",index)
    if (index > -1) { // only splice array when item is found
        newRequestingPeople.splice(index, 1); // 2nd parameter means remove one item only
        console.log("final array = ",newRequestingPeople);
    }else{
        console.log("something fishy");
    }

    SubGreddit.findOneAndUpdate(
        {_id: req.body.sgid},
        {$set:{requestingpeople : newRequestingPeople}},
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
