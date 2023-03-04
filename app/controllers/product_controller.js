const Product = require("../models/product_model.js");
const { checkIsXml, fortmatXml } = require("../method/index.js");

// Retrieve all Products with product status is opened
exports.findAllProduct = (req, res) => {
  const name = req.query.name;
  const description = req.query.description;
  const isXml = checkIsXml(req.headers["content-type"]);
  Product.getAllproduct(name, description, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products.",
      });
    else res.send(isXml ? fortmatXml(data, "product") : data);
  });
};

// Create and Save a new Product
exports.createProduct = (req, res) => {
  // Validate request
  if (!req.body || !req.params.userId || !req.body.name || !req.body.description || !req.body.photoUrl || req.body.price === null || req.body.stock === null || req.body.productStatus === null || !req.body.createdBy || !req.body.updatedBy) {
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
    productStatus: req.body.productStatus,
    createdBy: req.body.createdBy,
    updatedBy: req.body.updatedBy,
  });

  // Save Product in the database
  Product.createProduct(req.params.userId, ProductData, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Product.",
      });
    else res.send(data);
  });
};

// Update a Product detail
exports.updateProduct = (req, res) => {
  // Validate Request
  if (!req.body || !req.params.userId || !req.body.productID || !req.body.name || !req.body.description || !req.body.photoUrl || req.body.price === null || req.body.stock === null || req.body.productStatus === null || !req.body.updatedBy) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Product.updateProductById(req.params.userId, new Product(req.body), (err, data) => {
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

// Update a Product stock
exports.updateProductStock = (req, res) => {
  // Validate Request
  if (!req.body || !req.params.userId || !req.body.productID || req.body.stock === null) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Product.updateProductStockById(req.params.userId, new Product(req.body), (err, data) => {
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
