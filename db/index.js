const connection = require("./connection")

class DB {

    constructor(connection){
        this.connection = connection;
    }

    findallEmps(){
        return this.connection.promise().query(
            "SELECT * FROM employee;"
        )
    }

    findallRoles(){
        return this.connection.promise().query(
            "SELECT * FROM roles;"
        )
    }
    findallDepartments(){
        return this.connection.promise().query(
            "SELECT * FROM departments;"
        )
    }
}


module.exports = new DB(connection);