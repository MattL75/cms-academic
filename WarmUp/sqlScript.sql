DROP TABLE IF EXISTS Contract;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Manager;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Company;

CREATE TABLE Company (
	id INT(4) NOT NULL AUTO_INCREMENT=1000,
	name VARCHAR(255),
	city VARCHAR(255),
	postal_code VARCHAR(255),
	address VARCHAR(255),
	province VARCHAR(255),
	PRIMARY KEY (id)
);

CREATE TABLE Department (
	id INT(4) NOT NULL AUTO_INCREMENT=2000,
	company_id INT(4) NOT NULL,
	name VARCHAR(255),
	service_type VARCHAR(255),
	PRIMARY KEY (id),
	FOREIGN KEY (company_id) REFERENCES Company(id)
);

CREATE TABLE Manager (
	employee_id INT(4) NOT NULL AUTO_INCREMENT=3000,
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
	id INT(4) NOT NULL AUTO_INCREMENT=4000,
	department_id INT(4) NOT NULL,
	contract_type VARCHAR(255),
	acv DOUBLE,
	initial_amount DOUBLE,
	start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (department_id) REFERENCES Department(id)
);

CREATE TABLE Employee (
	employee_id INT(4) NOT NULL AUTO_INCREMENT=5000,
	manager_id INT(4) NOT NULL,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	PRIMARY KEY (employee_id),
	FOREIGN KEY (manager_id) REFERENCES Manager(employee_id)
);

INSERT INTO Company
VALUES ('GSC Corporation', 'Montreal', 'J2P RP5', '403 Notre-Dame West', 'Quebec');

INSERT INTO Company
VALUES ('Jebabo Incorporated', 'Saskatoon', 'T5P BP7', '403 Maisonneuve', 'Saskatchewan');

INSERT INTO Department
VALUES (1001, 'Local', 'On-premises');

INSERT INTO Department
VALUES (1001, 'Server', 'Cloud');

INSERT INTO Department
VALUES (1002, 'Food', 'Delivery');

INSERT INTO Manager
VALUES (2001, 'juan.vasquez@gsc.ca', '345-4456', 'Juan', 'Vasquez', 'MP');

INSERT INTO Manager
VALUES (2002, 'alain.moreau@gsc.ca', '345-5437', 'Alain', 'Moreau', 'BH');

INSERT INTO Manager
VALUES (2003, 'khaled.jebabo@jebabo.ca', '545-1337', 'Khaled', 'Jebabo', 'JB');

INSERT INTO Contract
VALUES (2001, 'Gold', 90000, 10000, CURRENT_TIMESTAMP);

INSERT INTO Contract
VALUES (2001, 'Bronze', 3000, 100, CURRENT_TIMESTAMP);

INSERT INTO Contract
VALUES (2001, 'Gold', 135000, 12000, CURRENT_TIMESTAMP);

INSERT INTO Contract
VALUES (2002, 'Platinum', 500000, 75000, CURRENT_TIMESTAMP);

INSERT INTO Contract
VALUES (2002, 'Silver', 45000, 6000, CURRENT_TIMESTAMP);

INSERT INTO Contract
VALUES (2003, 'Silver', 50000, 5000, CURRENT_TIMESTAMP);

INSERT INTO Employee
VALUES (3001, 'John', 'Baker');

INSERT INTO Employee
VALUES (3001, 'Gaetan', 'Paquette');

INSERT INTO Employee
VALUES (3001, 'Stephane', 'Granger');

INSERT INTO Employee
VALUES (3001, 'Robert', 'Gates');

INSERT INTO Employee
VALUES (3001, 'Alicia', 'Buffet');

INSERT INTO Employee
VALUES (3001, 'Ginette', 'Desjardins');

INSERT INTO Employee
VALUES (3001, 'Armand', 'Desormiers');

INSERT INTO Employee
VALUES (3001, 'Guillaume', 'Tremblay');

INSERT INTO Employee
VALUES (3001, 'Jean', 'Lafontaine');

INSERT INTO Employee
VALUES (3001, 'Marco', 'Savard');

INSERT INTO Employee
VALUES (3002, 'Louis-Georges', 'Lajoie');

INSERT INTO Employee
VALUES (3002, 'Jean-Guy', 'Pomerleau');

INSERT INTO Employee
VALUES (3002, 'Guy-Robert', 'Savoie');

INSERT INTO Employee
VALUES (3002, 'Ghyslaine', 'Dumoulin');

INSERT INTO Employee
VALUES (3003, 'Elize', 'Samoisette');

INSERT INTO Employee
VALUES (3003, 'Alessandro', 'Power');
