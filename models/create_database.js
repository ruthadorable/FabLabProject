require('dotenv').config();

const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  database: "mysql",
});

connection.query("create database fablabdb", function (err, results, fields) {
  connection.close();
});