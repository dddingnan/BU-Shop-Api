const Cart = require("../models/cart_model.js");

// Retrieve all Carts from the database (with condition).
exports.findAllCart = (req, res) => {
  // Validate request
  if (!req.params.id) {
    res.status(400).send({
      message: "UserID can not be empty!",
    });
  }

  Cart.getAllCart(req.params.id, (err, data) => {
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
  if (!req.body || !req.params.id || !req.body.productID || req.body.stock === null) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Cart
  const CartData = new Cart({
    userID: req.params.id,
    productID: req.body.productID,
    stock: req.body.stock,
  });

  // Save Cart in the database
  Cart.createCart(req.params.id, CartData, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Cart.",
      });
    else res.send(data);
  });
};
