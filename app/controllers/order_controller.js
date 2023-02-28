const Order = require("../models/order_model.js");

// Retrieve all Orders from the database (with condition).
exports.findAllOrder = (req, res) => {
  // Validate request
  if (!req.params.id) {
    res.status(400).send({
      message: "UserID can not be empty!",
    });
  }

  Order.getAllOrder(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Orders.",
      });
    else res.send(data);
  });
};

// Create and Save a new Order
exports.createOrder = (req, res) => {
  // Validate request
  if (!req.body || !req.params.userId || !req.body.orderDetail.length) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Order
  const orderData = new Order({
    userID: req.params.userId,
    orderDetail: req.body.orderDetail,
  });

  // Save Order in the database
  Order.createOrder(orderData, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    else res.send(data);
  });
};
