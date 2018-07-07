DROP TABLE IF EXISTS Contract;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Manager;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Company;

CREATE TABLE Company (
	id INT NOT NULL,
	name VARCHAR(255),
	city VARCHAR(255),
	postal_code VARCHAR(255),
	address VARCHAR(255),
	province VARCHAR(255),
	PRIMARY KEY (id)
);

CREATE TABLE Department (
	id INT NOT NULL,
	company_id INT NOT NULL,
	manager_id INT NOT NULL,
	name VARCHAR(255),
	service_type VARCHAR(255),
	PRIMARY KEY (id),
	FOREIGN KEY (company_id) REFERENCES Company(id)
);

CREATE TABLE Manager (
	employee_id INT NOT NULL,
	department_id INT NOT NULL,
	email VARCHAR(255),
	phone_number VARCHAR(255),
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	initials VARCHAR(255),
	PRIMARY KEY (employee_id),
	FOREIGN KEY (department_id) REFERENCES Department(id),
	UNIQUE (department_id)
);

CREATE TABLE Contract (
	id INT NOT NULL,
	department_id INT NOT NULL,
	manager_id INT NOT NULL,
	contract_type VARCHAR(255),
	acv DOUBLE,
	initial_amount DOUBLE,
	start_date DATE DEFAULT CURRENT_DATE,
	PRIMARY KEY (id),
	FOREIGN KEY (department_id) REFERENCES Department(id)
);

CREATE TABLE Employee (
	employee_id INT NOT NULL,
	manager_id INT NOT NULL,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	PRIMARY KEY (employee_id),
	FOREIGN KEY (manager_id) REFERENCES Manager(employee_id)
);