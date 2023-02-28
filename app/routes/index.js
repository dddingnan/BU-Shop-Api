module.exports = (app) => {
  const users = require("../controllers/user_controller.js");
  const products = require("../controllers/product_controller.js");
  const carts = require("../controllers/cart_controller.js");
  const orders = require("../controllers/order_controller.js");

  var router = require("express").Router();

  // ******User api******
  // Create new User
  router.post("/user", users.createUser);

  // Retrieve single User with id
  router.get("/user/:id", users.findSingleUser);

  // Update user status
  router.put("/user/:id", users.updateUserStatus);

  // Update user admin status
  // Only admin can add product
  router.put("/user/:id/admin", users.updateUserAdminStatus);

  // ******Product api******
  // Create new product (admin only)
  router.post("/product/admin/:id", products.createProduct);

  // Get all products
  router.get("/products", products.findAllProduct);

  // Update product (admin only)
  router.put("/product/admin/:id", products.updateProduct);

  // Update product stock only
  router.put("/product/stock/:userId", products.updateProductStock);

  // ******Cart api******
  // Create new cart
  router.post("/cart/:id", carts.createCart);

  // Get all carts
  router.get("/carts/:id", carts.findAllCart);

  // Delete cart
  router.delete("/cart/:userId", carts.delete);

  // ******Order api******
  // Create new order
  router.post("/order/:userId", orders.createOrder);

  // Get all order
  router.get("/order/:userId", orders.findAllOrder);

  // Update order status
  router.put("/order/status/:userId", orders.updateOrderStatus);

  app.use("/api", router);
};
