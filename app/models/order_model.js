const sql = require("./db.js");

// constructor
const Order = function (data) {
  this.orderID = data.orderID;
  this.userID = data.userID;
  this.status = data.status;
  this.orderTime = data.orderTime;
  this.updatedTime = data.updatedTime;
  this.orderDetail = data.orderDetail;
  this.updatedBy = data.updatedBy;
};

Order.getAllOrder = (userID, result) => {
  let query = `
    SELECT userorder.orderID, userorder.status, orderdetail.productID, product.name, orderdetail.stock, product.price
    from userorder 
    INNER JOIN orderdetail ON userorder.orderID = orderdetail.orderID
    INNER JOIN product ON product.productID = orderdetail.productID
    where userID = '${userID}'`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    const groupBy = (items, key) =>
      items.reduce(
        (result, item) => ({
          ...result,
          [item[key]]: [...(result[item[key]] || []), item],
        }),
        {}
      );
    const data = groupBy(res, "orderID");
    result(null, data);
  });
};

Order.createOrder = (orderData, result) => {
  // Check user status is not disabled
  const { userID, orderDetail } = orderData;
  sql.query(`SELECT * FROM user WHERE userID = '${userID}' and status = 1`, (err, res) => {
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
    const currentTime = new Date().toJSON().slice(0, 19).replace("T", ":");
    // If user status is not disabled and stock is avaliable then insert
    const orderQueryString = `
        INSERT INTO userOrder
        SET userID = '${userID}', status = 0, orderTime = '${currentTime}', updatedTime = '${currentTime}', updatedBy = '${userID}';
    `;
    sql.query(orderQueryString, (orderError, orderResponse) => {
      if (orderError) {
        console.log("orderError: ", orderError);
        result(orderError, null);
        return;
      }
      const orderId = orderResponse.insertId;
      const detailValue = orderDetail.map((val) => `(${orderId}, ${val.productID}, ${val.stock})`).join(",");
      const orderDetailString = `
        INSERT INTO orderDetail
            (orderID, productID, stock)
            VALUES
            ${detailValue};
      `;
      sql.query(orderDetailString, (orderDetailError) => {
        if (orderDetailError) {
          // Remove userOrder record if there have error during inserting order detail.
          console.log("orderDetailError: ", orderDetailError);
          sql.query(`DELETE FROM userOrder WHERE orderID = ${orderId};`);
          result(orderDetailError, null);
          return;
        }
        result(null, { orderId, ...orderData });
      });
    });
  });
};

Order.updateOrderStatusById = (userId, data, result) => {
  // Check User is an admin
  sql.query(`SELECT * FROM user WHERE userID = '${userId}' and isAdmin = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (!res.length) {
      // Throw error message if user is not an admin
      result({ message: "This user has no authority to change orders." }, null);
      return;
    }
    // If user is admin, then update
    const currentTime = new Date().toJSON().slice(0, 19).replace("T", ":");
    sql.query("UPDATE userOrder SET status = ?, updatedBy = ?, updatedTime = ?  WHERE orderID = ?", [data.status, userId, currentTime, data.orderID], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Order with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { userId, ...data });
    });
  });
};

module.exports = Order;
