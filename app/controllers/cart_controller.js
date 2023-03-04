const Cart = require("../models/cart_model.js");

// Retrieve all Carts from the database (with condition).
exports.findAllCart = (req, res) => {
  // Validate request
  if (!req.params.userId) {
    res.status(400).send({
      message: "UserID can not be empty!",
    });
  }

  Cart.getAllCart(req.params.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving carts.",
      });
    else res.send(data);
  });
};

// Create and Save a new Cart
exports.createCart = (req, res) => {
  // Validate request
  if (!req.body || !req.params.userId || !req.body.productID || req.body.stock === null) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Cart
  const cartData = new Cart({
    userID: req.params.userId,
    productID: req.body.productID,
    stock: req.body.stock,
  });

  // Save Cart in the database
  Cart.createCart(req.params.userId, cartData, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Cart.",
      });
    else res.send(data);
  });
};

// Delete a Cart with the specified id in the request
exports.delete = (req, res) => {
  Cart.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cart with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Cart with id " + req.params.userId,
        });
      }
    } else res.send({ message: `Cart was deleted successfully!` });
  });
};
