module.exports = (app) => {
  const users = require("../controllers/user_controller.js");
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // User api
  // Create a new User
  router.post("/user", users.create);

  // Retrieve a single Tutorial with id
  router.get("/user/:id", users.findOne);

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
