const fs = require("fs");
const path = require("path");
const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
const serverCa = [fs.readFileSync(path.resolve() + "/app/ssl/key/DigiCertGlobalRootCA.crt.pem", "utf8")];

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: 3306,
  ssl: {
    rejectUnauthorized: true,
    ca: serverCa,
  },
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
