USE employee_db;

INSERT INTO department
    (name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roles
    (title, salary, department_id)
VALUES
("Salesperson", 80000, 1),
("Lead Engineer", 190000, 2),
("Accountant", 150000, 3),
("Lawyer", 250000, 4);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES
("Brian", "Gearty", 1),
("Derick", "Hooley", 2),
("George", "Clooney", 3),
("Alec", "Baldwin", 4);