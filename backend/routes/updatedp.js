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
      console.log("newdp sg not found");
    }
        var time = new Date() - subgreddit.creationDate;
        console.log(time);

      const stat = await Stat.findOne({_id: subgreddit.statid});
      console.log("stat = ",stat);
      var newdp = stat.dp;
      newdp = newdp + 1;
      console.log("newdp = ",newdp);

      await Stat.findOneAndUpdate(
        {_id: stat._id},
        {$set:{dp: newdp}},
        {new: true}
       )    
       .then(() => {
        console.log("success");
            next();
      })
  } catch (err) {
    console.error('update newdp error' + err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
