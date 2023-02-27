const sql = require("./db.js");

// constructor
const User = function (data) {
  this.userID = data.userID;
  this.name = data.name;
  this.email = data.email;
  this.photoUrl = data.photoUrl;
  this.status = data.status;
  this.isAdmin = data.isAdmin;
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM user WHERE userID = '${id}' and status = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result(null, {});
  });
};

User.createUser = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

User.updateStatusById = (id, data, result) => {
  sql.query("UPDATE user SET status = ? WHERE userID = ?", [data.status, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, { id: id, ...data });
  });
};

User.updateAdminStatusById = (id, data, result) => {
  sql.query("UPDATE user SET isAdmin = ? WHERE userID = ?", [data.isAdmin, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, { id: id, ...data });
  });
};

module.exports = User;
