var express = require('express');
const SubGreddit = require('../models/subgreddit');
var router = express.Router();

const auth = require('./middleware');
const updatesgvm = require('./updatesgvm');

router.post('/',auth,updatesgvm, async (req, res) => {
    console.log(req.body.newuser);
    console.log(req.body.sgid);

    const subgreddit = await SubGreddit.findOne({_id: req.body.sgid});
    console.log("found sg = ",subgreddit);
    var newPeople = subgreddit.people;
    newPeople.push(req.body.newuser);
    newPeople = [...new Set(newPeople)]; 

    var newRequestingPeople = subgreddit.requestingpeople;
    console.log("array = ",newRequestingPeople);
    console.log("to be removed - ",req.body.newuser)
    const index = newRequestingPeople.indexOf(req.body.newuser);
    console.log("index = ",index)
    if (index > -1) { // only splice array when item is found
        newRequestingPeople.splice(index, 1); // 2nd parameter means remove one item only
        console.log("final array = ",newRequestingPeople);
    }else{
        console.log("something fishy");
    }

    console.log(newPeople);
    SubGreddit.findOneAndUpdate(
        {_id: req.body.sgid},
        {$set:{people: newPeople, requestingpeople : newRequestingPeople}},
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
