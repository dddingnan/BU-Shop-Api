const User = require("../models/user_model.js");

// Find a single User by Id
exports.findSingleUser = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving User with userId " + req.params.userId,
      });
    } else res.send(data);
  });
};

// Create and Save a new User
exports.createUser = (req, res) => {
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
    status: req.body.status,
    isAdmin: req.body.isAdmin,
  });

  // Save User in the database
  User.createUser(userData, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

// Update a User status by the id in the request
exports.updateUserStatus = (req, res) => {
  // Validate Request
  if (!req.body || !req.params.userId || req.body.status === null) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.updateStatusById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with userId ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating User with userId " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Update a User admin status by the id in the request
exports.updateUserAdminStatus = (req, res) => {
  // Validate Request
  if (!req.body || !req.params.userId || req.body.isAdmin === null) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.updateAdminStatusById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with userId ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating User with userId " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};
