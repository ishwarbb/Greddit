var express = require('express');
const SubGreddit = require('../models/subgreddit');
const Stat = require('../models/stat');

module.exports = async function (req, res, next) {
  // Verify token
  console.log(req.body);
  try {
    const subgreddit = await SubGreddit.findOne({_id : req.body.sgid});
    console.log("sg for stat = ",subgreddit);
    console.log("statid = ",subgreddit.statid);
    if(!subgreddit)
    {
      console.log("newrp sg not found");
    }
        var time = new Date() - subgreddit.creationDate;
        console.log(time);

      const stat = await Stat.findOne({_id: subgreddit.statid});
      console.log("stat = ",stat);
      var newrp = stat.rp;
      newrp = newrp + 1;
      console.log("newrp = ",newrp);

      await Stat.findOneAndUpdate(
        {_id: stat._id},
        {$set:{rp: newrp}},
        {new: true}
       )    
       .then(() => {
        console.log("success");
            next();
      })
  } catch (err) {
    console.error('update newrp error' + err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
