var express = require('express');
const SubGreddit = require('../models/subgreddit');
const Stat = require('../models/stat');

module.exports = async function (req, res, next) {
  // Verify token
  try {
    const subgreddit = await SubGreddit.findOne({_id : req.body.sgid});
    console.log("sg for stat = ",subgreddit);
    console.log("statid = ",subgreddit.statid);
    if(!subgreddit)
    {
      console.log("sgvm sg not found");
    }
        var time = new Date() - subgreddit.creationDate;
        console.log(time);

      const stat = await Stat.findOne({_id: subgreddit.statid});
      console.log("stat = ",stat);
      var newD = stat.sgvmD;
      newD.push(time);
      console.log("newD = ",newD);
      var newV = stat.sgvmV;
      newV.push(subgreddit.people.length + 1);
      console.log("newV = ",newV);

      await Stat.findOneAndUpdate(
        {_id: stat._id},
        {$set:{sgvmD: newD,sgvmV : newV}},
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
    console.error('update sgvm error' + err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
