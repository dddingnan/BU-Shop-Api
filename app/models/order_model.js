const sql = require("./db.js");

// constructor
const Order = function (data) {
  this.userID = data.userID;
  this.status = data.status;
  this.orderTime = data.orderTime;
  this.updatedTime = data.updatedTime;
  this.orderDetail = data.orderDetail;
};

Order.getAllOrder = (userID, result) => {
  let query = `
    SELECT Order.OrderID, Order.stock, product.productID, product.name, product.description, product.photoUrl, product.price
    FROM Order
    INNER JOIN product ON Order.productID = product.productID
    where Order.userID = '${userID}'`;
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
        SET userID = '${userID}', status = 0, orderTime = '${currentTime}', updatedTime = '${currentTime};';
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

module.exports = Order;
