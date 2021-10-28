const mysql = require("mysql2")

// create connection to our db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "employee_db"
});

connection.connect( function(){
    if(err) throw err;
});

module.exports = connection;
