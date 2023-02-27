const sql = require("./db.js");

// constructor
const Cart = function (data) {
  this.cartID = data.cartID;
  this.userID = data.userID;
  this.productID = data.productID;
  this.stock = data.stock;
};

Cart.getAllCart = (userID, result) => {
  let query = `
    SELECT cart.cartID, cart.stock, product.productID, product.name, product.description, product.photoUrl, product.price
    FROM cart
    INNER JOIN product ON cart.productID = product.productID
    where cart.userID = '${userID}'`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    const tempData = [];
    for (let index = 0; index < res.length; index++) {
      const element = res[index];
      const sum = res.filter((val) => val.productID === element.productID).reduce((acc, curr) => acc + curr.stock, 0);
      tempData.push({
        ...element,
        total: sum,
      });
    }
    const uniqueData = [...new Map(tempData.map((item) => [item["productID"], item])).values()];
    result(null, uniqueData);
  });
};

Cart.createCart = (userId, newCart, result) => {
  // Check User is an admin
  sql.query(`SELECT * FROM user WHERE userID = '${userId}' and status = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (!res.length) {
      // Throw error message if user status is disabled
      result({ message: "This user has no authority to change Carts." }, null);
      return;
    }
    sql.query(`SELECT stock FROM product WHERE productID = '${newCart.productID}'`, newCart, (productError, productResponse) => {
      if (productError) {
        console.log("productError: ", productError);
        result(productError, null);
        return;
      }
      if (!productResponse[0] || productResponse[0].stock - newCart.stock < 0) {
        // Throw error message if there is no more stock
        result({ message: "This product is out of stock!" }, null);
        return;
      }
      // If user status is not disabled and stock is avaliable then insert
      sql.query("INSERT INTO cart SET ?", newCart, (cartError, carResponse) => {
        if (cartError) {
          console.log("cartError: ", cartError);
          result(cartError, null);
          return;
        }
        result(null, { id: carResponse.insertId, ...newCart });
      });
    });
  });
};

module.exports = Cart;