const sql = require("./db.js");

// constructor
const User = function (data) {
  this.userID = data.userID;
  this.name = data.name;
  this.email = data.email;
  this.photoUrl = data.photoUrl;
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM user WHERE userID = '${id}'`, (err, res) => {
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

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

module.exports = User;
