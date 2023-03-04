const sql = require("./db.js");

// constructor
const Product = function (data) {
  this.productID = data.productID;
  this.name = data.name;
  this.description = data.description;
  this.photoUrl = data.photoUrl;
  this.price = data.price;
  this.stock = data.stock;
  this.productStatus = data.productStatus;
  this.createdBy = data.createdBy;
  this.updatedBy = data.updatedBy;
};

Product.getAllproduct = (name, result) => {
  let query = "SELECT productID, name, description, photoUrl, price, stock FROM product WHERE productStatus = 1";
  if (name) {
    query += ` and name LIKE '%${name}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Product.createProduct = (userId, newProduct, result) => {
  // Check User is an admin
  sql.query(`SELECT * FROM user WHERE userID = '${userId}' and isAdmin = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (!res.length) {
      // Throw error message if user is not an admin
      result({ message: "This user has no authority to change products." }, null);
      return;
    }
    // If user is admin, then insert
    sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newProduct });
    });
  });
};

Product.updateProductById = (userId, data, result) => {
  // Check User is an admin
  sql.query(`SELECT * FROM user WHERE userID = '${userId}' and isAdmin = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (!res.length) {
      // Throw error message if user is not an admin
      result({ message: "This user has no authority to change products." }, null);
      return;
    }
    // If user is admin, then update
    sql.query("UPDATE product SET name = ?, description = ?, photoUrl = ?, price = ?, stock = ?, productStatus = ?, updatedBy = ? WHERE ProductID = ?", [data.name, data.description, data.photoUrl, data.price, data.stock, data.productStatus, userId, data.productID], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { userId, ...data });
    });
  });
};

Product.updateProductStockById = (userId, data, result) => {
  // Get all product
  sql.query("SELECT productID, name, description, photoUrl, price, stock FROM product WHERE productStatus = 1", (err, productResponse) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    const currentProduct = productResponse.find((val) => val.productID === data.productID);
    if (!currentProduct || !currentProduct.stock) {
      // Throw error message if user is not an admin
      result({ message: `This product ID - ${data.productID} is not open to order now.` }, null);
      return;
    }
    const currentStock = currentProduct.stock - data.stock;
    if (currentStock < 0) {
      // Check if current order is submit success or not.
      result({ message: `This product - ${currentProduct.name} is out of stock!` }, null);
      return;
    }
    sql.query("UPDATE product SET stock = ?, updatedBy = ? WHERE ProductID = ?", [currentStock, userId, data.productID], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { userId, ...data });
    });
  });
};

module.exports = Product;
