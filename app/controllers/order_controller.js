const Order = require("../models/order_model.js");

// Retrieve all Orders from the database (with condition).
exports.findAllOrder = (req, res) => {
  // Validate request
  if (!req.params.userId) {
    res.status(400).send({
      message: "UserID can not be empty!",
    });
  }

  Order.getAllOrder(req.params.userId, (err, data) => {
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

// Update a Order status by the id in the request
exports.updateOrderStatus = (req, res) => {
  // Validate Request
  if (!req.body || !req.params.userId || !req.body.orderID || req.body.status === null) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Order.updateOrderStatusById(req.params.userId, new Order(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.body.productID}.`,
        });
      } else {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Product.",
        });
      }
    } else res.send(data);
  });
};
