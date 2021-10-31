const inquirer = require("inquirer");
// const consoleTable = require("console.table");

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
        switch (answer.mainMenu) {
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
                connnection.end();
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
        var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
        connection.query(query, function (err, res) {
            console.table(res);
            mainMenu();
        });
    }

    function viewAllDept() {
        var query = "SELECT * FROM department"
        connection.query(query, function (err, res) {
            console.table(res);
            mainMenu();
        });
    }

    function viewAllRoles() {
        var query = "SELECT * FROM role"
        connection.query(query, function (err, res) {
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
                    name: "addEmployeeRole"
                },
                {
                    type: "input",
                    message: "Enter the employee's manager ID",
                    name: "addEmployeeMan"
                }
            ])

            .then(function (res) {
                const firstName = res.firstName;
                const lastName = res.lastName;
                const employeeRoleID = res.addEmployeeRole;
                const employeeManID = res.addEmployeeMan;
                const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                    VALUES ("${firstName}", "${lastName}", "${employeeRoleID}, "${employeeManID}")`;
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
            const newDepartment = res.newDept;
            const query = `INSERT INTO department (department_name) VALUES ("${newDepartment}")`;
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
                name: "roleTitle"
            },
            {
                type: "input",
                message: "Enter the employee's salary",
                name: "roleSalary"
            },
            {
                type: "input",
                message: "Enter the employee's department ID",
                name: "roleDept"
            }
        ])
        .then(function (res) {
            const title = res.roleTitle;
            const salary = res.roleSalary;
            const departmentID = res.roleDept;
            const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
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
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the employee's ID you want to be updated",
                name: "updateEmploy"
            },
            {
                type: "input",
                message: "Enter the new role ID for that employee",
                name: "newRole"
            }
        ])
        .then(function (res) {
            const updateEmploy = res.updateEmploy;
            const newRole = res.newRole;
            const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmploy}"`;
            connection.query(queryUpdate, function (err, res) {
                if (err) {
                    throw err;
                }
                console.table(res);
                mainMenu();
            })
        });
}
