var express = require('express');
const SubGreddit = require('../models/subgreddit');
const Stat = require('../models/stat');

module.exports = async function (req, res, next) {
  // Verify token
  console.log(req.body);
  try {
    const subgreddit = await SubGreddit.findOne({_id : req.body.id});
    console.log("sg for stat = ",subgreddit);
    console.log("statid = ",subgreddit.statid);
    if(!subgreddit)
    {
      console.log("dvvd sg not found");
    }
        var time = new Date() - subgreddit.creationDate;
        console.log(time);

      const stat = await Stat.findOne({_id: subgreddit.statid});
      console.log("stat = ",stat);
      var newD = stat.dvvdD;
      newD.push(time);
      console.log("newD = ",newD);
      var newV = stat.dvvdV;
      newV.push(stat.dvvdV.length + 1);
      console.log("newV = ",newV);

      await Stat.findOneAndUpdate(
        {_id: stat._id},
        {$set:{dvvdD: newD,dvvdV : newV}},
        {new: true}
       )    
       .then(() => {
        console.log("success");
            next();
      })
    //   .catch((err) => {
        // console.log(err);
        // res.status(400).send(err);
    //   });

  } catch (err) {
    console.error('update dvvd error' + err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
