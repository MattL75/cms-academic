DROP TABLE IF EXISTS Contract;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Manager;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Company;

CREATE TABLE Company (
	id INT(4) NOT NULL,
	name VARCHAR(255),
	city VARCHAR(255),
	postal_code VARCHAR(255),
	address VARCHAR(255),
	province VARCHAR(255),
	PRIMARY KEY (id)
);

CREATE TABLE Department (
	id INT(4) NOT NULL,
	company_id INT(4) NOT NULL,
	manager_id INT(4) NOT NULL,
	name VARCHAR(255),
	service_type VARCHAR(255),
	PRIMARY KEY (id),
	FOREIGN KEY (company_id) REFERENCES Company(id)
);

CREATE TABLE Manager (
	employee_id INT(4) NOT NULL,
	department_id INT(4) NOT NULL,
	email VARCHAR(255),
	phone_number VARCHAR(8),
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	initials VARCHAR(255),
	PRIMARY KEY (employee_id),
	FOREIGN KEY (department_id) REFERENCES Department(id),
	UNIQUE (department_id)
);

CREATE TABLE Contract (
	id INT(4) NOT NULL,
	department_id INT(4) NOT NULL,
	manager_id INT(4) NOT NULL,
	contract_type VARCHAR(255),
	acv DOUBLE,
	initial_amount DOUBLE,
	start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (department_id) REFERENCES Department(id)
);

CREATE TABLE Employee (
	employee_id INT(4) NOT NULL,
	manager_id INT(4) NOT NULL,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	PRIMARY KEY (employee_id),
	FOREIGN KEY (manager_id) REFERENCES Manager(employee_id)
);

INSERT INTO Company
VALUES (1001, 'GSC Corporation', 'Montreal', 'J2P RP5', '403 Notre-Dame West', 'Quebec');

INSERT INTO Department
VALUES (2001, 1001, 3001, 'Local', 'On-premises');

INSERT INTO Manager
VALUES (3001, 2001, 'juan.vasquez@gsc.ca', '345-4456', 'Juan', 'Vasquez', 'MP');

INSERT INTO Contract
VALUES (4001, 2001, 3001, 'Gold', 90000, 10000, CURRENT_TIMESTAMP);

INSERT INTO Employee
VALUES (5001, 3001, 'John', 'Baker');

INSERT INTO Employee
VALUES (5002, 3001, 'Gaetan', 'Paquette');

INSERT INTO Employee
VALUES (5003, 3001, 'Stephane', 'Granger');

INSERT INTO Employee
VALUES (5004, 3001, 'Robert', 'Gates');

INSERT INTO Employee
VALUES (5005, 3001, 'Warren', 'Buffet');

INSERT INTO Employee
VALUES (5006, 3001, 'Joe', 'Desjardins');

INSERT INTO Employee
VALUES (5007, 3001, 'Armand', 'Desormiers');

INSERT INTO Employee
VALUES (5008, 3001, 'Guillaume', 'Tremblay');

INSERT INTO Employee
VALUES (5009, 3001, 'Jean', 'Lafontaine');

INSERT INTO Employee
VALUES (5010, 3001, 'Marco', 'Savard');