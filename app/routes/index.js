module.exports = (app) => {
  const users = require("../controllers/user_controller.js");
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // ******User api******
  // Create new User
  router.post("/user", users.create);

  // Retrieve single User with id
  router.get("/user/:id", users.findOne);

  // Update user status
  router.put("/user/:id", users.updateUserStatus);

  // Update user admin status
  // Only admin can add product
  router.put("/user/:id/admin", users.updateUserAdminStatus);

  // ******Product api******
  // Create a product for admin only - POST
  // Get product by 10 each - GET
  // Update product detail included price, name, url, stock for admin user only - PUT

  // // Create a new Tutorial
  // router.post("/", tutorials.create);

  // router.get("/test", tutorials.test);

  // // Retrieve all Tutorials
  // router.get("/", tutorials.findAll);

  // // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", tutorials.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", tutorials.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);

  // // Delete all Tutorials
  // router.delete("/", tutorials.deleteAll);

  app.use("/api", router);
};
