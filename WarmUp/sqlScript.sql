DROP TABLE IF EXISTS Contract;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Manager;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Company;

CREATE TABLE Company (
	id INT(4) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255),
	city VARCHAR(255),
	postal_code VARCHAR(255),
	address VARCHAR(255),
	province VARCHAR(255),
	PRIMARY KEY (id)
);
ALTER TABLE Company AUTO_INCREMENT=1001;

CREATE TABLE Department (
	id INT(4) NOT NULL AUTO_INCREMENT,
	company_id INT(4) NOT NULL,
	name VARCHAR(255),
	service_type VARCHAR(255),
	PRIMARY KEY (id),
	FOREIGN KEY (company_id) REFERENCES Company(id)
);
ALTER TABLE Department AUTO_INCREMENT=2001;

CREATE TABLE Manager (
	employee_id INT(4) NOT NULL AUTO_INCREMENT,
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
ALTER TABLE Manager AUTO_INCREMENT=3001;

CREATE TABLE Contract (
	id INT(4) NOT NULL AUTO_INCREMENT,
	department_id INT(4) NOT NULL,
	contract_type VARCHAR(255),
	acv DOUBLE,
	initial_amount DOUBLE,
	start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (department_id) REFERENCES Department(id)
);
ALTER TABLE Contract AUTO_INCREMENT=4001;

CREATE TABLE Employee (
	employee_id INT(4) NOT NULL AUTO_INCREMENT,
	manager_id INT(4) NOT NULL,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	PRIMARY KEY (employee_id),
	FOREIGN KEY (manager_id) REFERENCES Manager(employee_id)
);
ALTER TABLE Employee AUTO_INCREMENT=5001;

INSERT INTO Company (name, city, postal_code, address, province)
VALUES ('GSC Corporation', 'Montreal', 'J2P RP5', '403 Notre-Dame West', 'Quebec');

INSERT INTO Company (name, city, postal_code, address, province)
VALUES ('Jebabo Incorporated', 'Saskatoon', 'T5P BP7', '403 Maisonneuve', 'Saskatchewan');

INSERT INTO Department (company_id, name, service_type)
VALUES (1001, 'Local', 'On-premises');

INSERT INTO Department (company_id, name, service_type)
VALUES (1001, 'Server', 'Cloud');

INSERT INTO Department (company_id, name, service_type)
VALUES (1002, 'Food', 'Delivery');

INSERT INTO Manager (department_id, email, phone_number, first_name, last_name, initials)
VALUES (2001, 'juan.vasquez@gsc.ca', '345-4456', 'Juan', 'Vasquez', 'MP');

INSERT INTO Manager (department_id, email, phone_number, first_name, last_name, initials)
VALUES (2002, 'alain.moreau@gsc.ca', '345-5437', 'Alain', 'Moreau', 'BH');

INSERT INTO Manager (department_id, email, phone_number, first_name, last_name, initials)
VALUES (2003, 'khaled.jebabo@jebabo.ca', '545-1337', 'Khaled', 'Jebabo', 'JB');

INSERT INTO Contract (department_id, contract_type, acv, initial_amount, start_date)
VALUES (2001, 'Gold', 90000, 10000, CURRENT_TIMESTAMP);

INSERT INTO Contract (department_id, contract_type, acv, initial_amount, start_date)
VALUES (2001, 'Bronze', 3000, 100, CURRENT_TIMESTAMP);

INSERT INTO Contract (department_id, contract_type, acv, initial_amount, start_date)
VALUES (2001, 'Gold', 135000, 12000, CURRENT_TIMESTAMP);

INSERT INTO Contract (department_id, contract_type, acv, initial_amount, start_date)
VALUES (2002, 'Platinum', 500000, 75000, CURRENT_TIMESTAMP);

INSERT INTO Contract (department_id, contract_type, acv, initial_amount, start_date)
VALUES (2002, 'Silver', 45000, 6000, CURRENT_TIMESTAMP);

INSERT INTO Contract (department_id, contract_type, acv, initial_amount, start_date)
VALUES (2003, 'Silver', 50000, 5000, CURRENT_TIMESTAMP);

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3001, 'John', 'Baker');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3001, 'Gaetan', 'Paquette');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3001, 'Stephane', 'Granger');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3001, 'Robert', 'Gates');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3001, 'Alicia', 'Buffet');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3001, 'Ginette', 'Desjardins');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3001, 'Armand', 'Desormiers');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3001, 'Guillaume', 'Tremblay');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3001, 'Jean', 'Lafontaine');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3001, 'Marco', 'Savard');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3002, 'Louis-Georges', 'Lajoie');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3002, 'Jean-Guy', 'Pomerleau');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3002, 'Guy-Robert', 'Savoie');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3002, 'Ghyslaine', 'Dumoulin');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3003, 'Elize', 'Samoisette');

INSERT INTO Employee (manager_id, first_name, last_name)
VALUES (3003, 'Alessandro', 'Power');
