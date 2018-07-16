DROP TABLE IF EXISTS Contract;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Manager;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Company;

CREATE TABLE Company (
	id INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	city VARCHAR(100),
	postal_code VARCHAR(6),
	address VARCHAR(255),
	province VARCHAR(2),
	email_id VARCHAR(255)
);

CREATE TABLE Department (
	id INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	company_id INT(4) NOT NULL,
	name VARCHAR(255),
	service_type VARCHAR(100),
	FOREIGN KEY (company_id) REFERENCES Company(id)
);

CREATE TABLE Manager (
	employee_id INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	department_id INT(4) NOT NULL UNIQUE,
	email VARCHAR(255),
	phone_number VARCHAR(12),
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	middle_initial VARCHAR(1),
	FOREIGN KEY (department_id) REFERENCES Department(id)
);

CREATE TABLE Contract (
	id INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	department_id INT(4) NOT NULL,
	contract_type VARCHAR(255),
	acv DECIMAL(10, 2),
	initial_amount DECIMAL(10, 2),
	start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (department_id) REFERENCES Department(id)
);

CREATE TABLE Employee (
	employee_id INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	manager_id INT(4) NOT NULL,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	FOREIGN KEY (manager_id) REFERENCES Manager(employee_id)
);

INSERT INTO Company (name, city, postal_code, address, province, email_id)
VALUES ('GSC Corporation', 'Montreal', 'J2PRP5', '403 Notre-Dame West', 'QC', 'gsc.ca');

INSERT INTO Company (name, city, postal_code, address, province, email_id)
VALUES ('Jababo Incorporated', 'Saskatoon', 'T5PBP7', '403 Maisonneuve', 'SK', 'jababo.ca');

INSERT INTO Department (company_id, name, service_type)
VALUES (1, 'Local', 'On-premises');

INSERT INTO Department (company_id, name, service_type)
VALUES (1, 'Server', 'Cloud');

INSERT INTO Department (company_id, name, service_type)
VALUES (2, 'Food', 'Delivery');

INSERT INTO Manager (department_id, email, phone_number, first_name, last_name, middle_initial)
VALUES (1, 'juan.vasquez@gsc.ca', '514-345-4456', 'Juan', 'Vasquez', 'C');

INSERT INTO Manager (department_id, email, phone_number, first_name, last_name, middle_initial)
VALUES (2, 'alain.moreau@gsc.ca', '514-345-5437', 'Alain', 'Moreau', 'D');

INSERT INTO Manager (department_id, email, phone_number, first_name, last_name, middle_initial)
VALUES (3, 'khaled.jababo@jababo.ca', '306-545-1337', 'Khaled', 'Jababo', 'P');

INSERT INTO Contract (department_id, contract_type, acv, initial_amount, start_date)
VALUES (1, 'Gold', 90000, 10000, CURRENT_TIMESTAMP);

INSERT INTO Contract (department_id, contract_type, acv, initial_amount, start_date)
VALUES (1, 'Bronze', 3000, 100, CURRENT_TIMESTAMP);

INSERT INTO Contract (department_id, contract_type, acv, initial_amount, start_date)
VALUES (1, 'Gold', 135000, 12000, CURRENT_TIMESTAMP);

INSERT INTO Contract (department_id, contract_type, acv, initial_amount, start_date)
VALUES (2, 'Platinum', 500000, 75000, CURRENT_TIMESTAMP);

INSERT INTO Contract (department_id, contract_type, acv, initial_amount, start_date)
VALUES (2, 'Silver', 45000, 6000, CURRENT_TIMESTAMP);

INSERT INTO Contract (department_id, contract_type, acv, initial_amount, start_date)
VALUES (3, 'Silver', 50000, 5000, CURRENT_TIMESTAMP);

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (1, 'John', 'Baker');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (1, 'Gaetan', 'Paquette');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (1, 'Stephane', 'Granger');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (1, 'Robert', 'Gates');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (1, 'Alicia', 'Buffet');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (1, 'Ginette', 'Desjardins');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (1, 'Armand', 'Desormiers');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (1, 'Guillaume', 'Tremblay');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (1, 'Jean', 'Lafontaine');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (1, 'Marco', 'Savard');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (2, 'Louis-Georges', 'Lajoie');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (2, 'Jean-Guy', 'Pomerleau');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (2, 'Guy-Robert', 'Savoie');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (2, 'Ghyslaine', 'Dumoulin');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3, 'Elize', 'Samoisette');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3, 'Alessandro', 'Power');
