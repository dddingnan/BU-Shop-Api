const Product = require("../models/product_model.js");

// Retrieve all Products from the database (with condition).
exports.findAllProduct = (req, res) => {
  const name = req.query.name;
  Product.getAllproduct(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products.",
      });
    else res.send(data);
  });
};

// Create and Save a new Product
exports.createProduct = (req, res) => {
  // Validate request
  if (!req.body || !req.params.id || !req.body.name || !req.body.description || !req.body.photoUrl || req.body.price === null || req.body.stock === null || !req.body.createdBy || !req.body.updatedBy) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Product
  const ProductData = new Product({
    name: req.body.name,
    description: req.body.description,
    photoUrl: req.body.photoUrl,
    price: req.body.price,
    stock: req.body.stock,
    createdBy: req.body.createdBy,
    updatedBy: req.body.updatedBy,
  });

  // Save Product in the database
  Product.createProduct(req.params.id, ProductData, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Product.",
      });
    else res.send(data);
  });
};

// Update a Product by the id in the request
exports.updateProduct = (req, res) => {
  // Validate Request
  if (!req.body || !req.params.id || !req.body.productID || !req.body.name || !req.body.description || !req.body.photoUrl || req.body.price === null || req.body.stock === null || !req.body.updatedBy) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Product.updateProductById(req.params.id, new Product(req.body), (err, data) => {
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
