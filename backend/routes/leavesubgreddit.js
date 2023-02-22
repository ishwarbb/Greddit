var express = require('express');
const SubGreddit = require('../models/subgreddit');
const User = require('../models/user');
var router = express.Router();

const auth = require('./middleware');

router.post('/', auth, async (req, res) => {
    try {
        console.log(req.body.sgid);

        const subgreddit = await SubGreddit.findOne({ _id: req.body.sgid });
        console.log("found sg = ", subgreddit);
        var newPeople = subgreddit.people;
        newPeople = [...new Set(newPeople)];

        console.log("array = ", newPeople);
        console.log("to be removed - ", req.user.email)
        const index = newPeople.indexOf(req.user.email);
        console.log("index = ", index)
        if (index > -1) { // only splice array when item is found
            newPeople.splice(index, 1); // 2nd parameter means remove one item only
            console.log("final array = ", newPeople);
        } else {
            console.log("something fishy");
        }

        const user = await User.findOne({ email: req.user.email });
        console.log(user);
        var newLeftsubgreddits = user.leftsubgreddits;
        newLeftsubgreddits.push(req.body.sgid);
        newLeftsubgreddits = [...new Set(newLeftsubgreddits)];


        
        console.log(req.user.email);
        User.findOneAndUpdate(
            { email: req.user.email },
            { $set: { leftsubgreddits: newLeftsubgreddits } },
            { new: true }
        )
        .then(() => {
        console.log(newPeople);
        SubGreddit.findOneAndUpdate(
            { _id: req.body.sgid },
            { $set: { people: newPeople } },
            { new: true }
        )})
        .then((user) => {
            res.status(200).json(user);
          })
        .catch((err) => {
            console.log(err);
            res.status(400).send(err);
        });

    } catch (error) {
        console.log("Could not leave");
        res.status(500).json(error);
    }
});


module.exports = router;
