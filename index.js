const inquirer = require("inquirer");
const consoleTable = require("console.table");

const { connection } = require("./db");
const db = require("./db")

init()

function init() {
    console.log("Welcome to the Employee Manager!")
    mainMenu()
}


function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "userChoice",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Exit"
            ],
        }
    ])

        .then(function (answer) {
            switch (answer.userChoice) {
                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "View All Departments":
                    viewAllDept();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Department":
                    addDept();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        })
    /*
            .then(response => {
                let userChoice = response.userChoice;
                switch (userChoice) {
                    case "VIEW_EMPLOYEES":
                        viewAllEmployees()
                        break;
                    case "VIEW_ROLES":
                        // fire off view all roles function;
                        viewAllRoles()
                        break;
                    case "VIEW_DEPARTMENTS":
                        // fore off view all departments function;
                        viewAllDepartments()
                        break;
                    default:
                    // fire off quit function
                    case "Exit":
                        connection.end();
                        break;
                }
            })
    */
    function viewAllEmployees() {
        var query = "SELECT * FROM employee"
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table(res);
            mainMenu();
        });
    }

    function viewAllDept() {
        var query = "SELECT * FROM department"
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table(res);
            mainMenu();
        });
    }

    function viewAllRoles() {
        var query = "SELECT * FROM role"
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table(res);
            mainMenu();
        });
    }

    function addEmployee() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Enter the employee's first name",
                    name: "firstName"
                },
                {
                    type: "input",
                    message: "Enter the employee's last name",
                    name: "lastName"
                },
                {
                    type: "input",
                    message: "Enter the employee's role ID",
                    name: "role_id"
                },
                {
                    type: "input",
                    message: "Enter the employee's manager ID",
                    name: "manager_id"
                }
            ])

            .then(function (res) {
                const firstName = res.first_name;
                const lastName = res.last_name;
                const role_id = res.role_id;
                const manager_id = res.manager_id;
                const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                    VALUE ("${firstName}", "${lastName}", "${role_id}, "${manager_id}")`;
                connection.query(query, function (err, res) {
                    if (err) {
                        throw err;
                    }
                    console.table(res);
                    mainMenu();
                });
            })
    }
}

function addDept() {
    inquirer
        .prompt({
            type: "input",
            message: "Enter the name of the new department",
            name: "newDept"
        })
        .then(function (res) {
            const department = res.department;
            const query = `INSERT INTO department (name) VALUES ("${department}")`;
            connection.query(query, function (err, res) {
                if (err) {
                    throw err;
                }
                console.table(res);
                mainMenu();
            });
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the employee's title",
                name: "title"
            },
            {
                type: "input",
                message: "Enter the employee's salary",
                name: "salary"
            },
            {
                type: "input",
                message: "Enter the employee's department ID",
                name: "department_id"
            }
        ])
        .then(function (res) {
            const title = res.title;
            const salary = res.salary;
            const department_id = res.department_id;
            const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`;
            connection.query(query, function (err, res) {
                if (err) {
                    throw err;
                }
                console.table(res);
                mainMenu();
            });
        });
}

function updateEmployeeRole() {
    const query = "SELECT id, first_name, last_name, role_id  FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        {
            inquirer.prompt({
                type: "input",
                message: "Which employee needs to be updated? (please use number from id column only)",
                name: "employee"
            });
        }
    });
}