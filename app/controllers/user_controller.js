const User = require("../models/user_model.js");

// Find a single User by Id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving User with id " + req.params.id,
      });
    } else res.send(data);
  });
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body || !req.body.userID || !req.body.name || !req.body.email || !req.body.photoUrl) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a User
  const userData = new User({
    userID: req.body.userID,
    name: req.body.name,
    email: req.body.email,
    photoUrl: req.body.photoUrl,
  });
  console.log("user----", userData);

  // Save User in the database
  User.create(userData, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};
