const inquirer = require("inquirer");
const { connection } = require("./db");
const db = require("./db")



init()

function init(){
    console.log("Welcome to the Employee Manager!")
    mainMenu()
}

function mainMenu(){
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

/*             {
                name: "View All Employees",
                value:"VIEW_EMPLOYEES"
                },
                {
                    name: "View All Roles",
                value:"VIEW_ROLES"
                },
                {
                    name: "View All Departments",
                    value:"VIEW_DEPARTMENTS"
                },
*/ 
                ]
        }
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
            
/*    ]).then(response =>{
        let userChoice = response.userChoice;
        switch(userChoice){
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
        }
    })
    */
    ])
}

function viewAllEmployees(){
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
    connection.query(query, function (err, res) {
        console.table(res);
        mainMenu();
    });
}

function viewAllDept(){
    var query = "SELECT * FROM department"
    connection.query(query, function (err, res) {
        console.table(res);
        mainMenu();
    });
}

function viewAllRoles(){
    var query = "SELECT * FROM role"
    connection.query(query, function (err, res) {
        console.table(res);
        mainMenu();
    });
}

