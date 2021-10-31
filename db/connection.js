const mysql = require("mysql2")
require("dotenv").config();

// create connection to our db
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employee_db"
});

connection.connect( function(err){
    if(err) throw err;
});

module.exports = connection;
