module.exports = (app) => {
  const users = require("../controllers/user_controller.js");
  const products = require("../controllers/product_controller.js");
  const carts = require("../controllers/cart_controller.js");
  const orders = require("../controllers/order_controller.js");

  var router = require("express").Router();

  // ******User api******
  // Create new User
  router.post("/user", users.createUser);

  // Get single User with id
  router.get("/user/:userId", users.findSingleUser);

  // Update user status
  router.put("/user/admin/status/:userId", users.updateUserStatus);

  // Update user admin status
  // Only admin can add product or update order status
  router.put("/user/admin/adminStatus/:userId", users.updateUserAdminStatus);

  // ******Product api******
  // Get all products
  router.get("/products", products.findAllProduct);

  // Create new product (admin only)
  router.post("/product/admin/:userId", products.createProduct);

  // Update product (admin only)
  router.put("/product/admin/:userId", products.updateProduct);

  // Update product stock only when order created
  router.put("/product/stock/:userId", products.updateProductStock);

  // ******Cart api******
  // Create new cart
  router.post("/cart/:userId", carts.createCart);

  // Get all carts
  router.get("/carts/:userId", carts.findAllCart);

  // Delete cart
  router.delete("/cart/:userId", carts.delete);

  // ******Order api******
  // Create new order
  router.post("/order/:userId", orders.createOrder);

  // Get all user's order
  router.get("/order/:userId", orders.findAllOrder);

  // Update order status (admin only)
  router.put("/order/admin/status/:userId", orders.updateOrderStatus);

  app.use("/api", router);
};
