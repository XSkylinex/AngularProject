const UserProfile = require("../models/userProfileModel");

exports.newInfo = (req, res, next) => {
  const data = new UserProfile({

    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    country: req.body.country,
    creator: req.userData.userId

  });
  data.save().then(result => {
      res.status(201).json({
        message: "Profile created!",
        result: result
      });
    }).catch(err =>{
     res.status(500).json({
       message: "Missing information"
     })
  });
};

exports.getAllUserData = (req, res, next) => {
  UserProfile.find(req.body.creator).then(info => {
    if (info) {
      res.status(200).json({
        message: "get user information",
        data: info
      });
    } else {
      res.status(404).json({ message: "user not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Error"
    });
  });
};

