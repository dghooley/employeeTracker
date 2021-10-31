const inquirer = require("inquirer");
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

/*                {
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
}
*/
function viewAllEmployees(){
    db.findallEmps()
    .then(([rows])=>{
        let employees = rows;
        console.table(employees)
    })
    .then(()=> mainMenu());
}

function viewAllRoles(){
    db.findallRoles()
    .then(([rows])=>{
        let roles = rows;
        console.table(roles)
    })
    .then(()=> mainMenu());
}

function viewAllDepartments(){
    db.findallRoles()
    .then(([rows])=>{
        let roles = rows;
        console.table(roles)
    })
    .then(()=> mainMenu());
}

