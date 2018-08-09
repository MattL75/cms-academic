DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Business_Line;
DROP TABLE IF EXISTS Contract_Type;
DROP TABLE IF EXISTS Insurance_Plan;
DROP TABLE IF EXISTS Role;
DROP TABLE IF EXISTS Province;
DROP TABLE IF EXISTS City;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Sales_Associate;
DROP TABLE IF EXISTS Client;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Works_In;
DROP TABLE IF EXISTS Contract;
DROP TABLE IF EXISTS Manager;
DROP TABLE IF EXISTS Work_Log;
DROP TABLE IF EXISTS Deliverable;
DROP TABLE IF EXISTS Assignment;
DROP TABLE IF EXISTS Supervises;


CREATE TABLE Department
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  service_type VARCHAR(255) NOT NULL
);

CREATE TABLE Business_Line 
(
  name VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE Contract_Type
(
  name VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE Insurance_Plan
(
  type VARCHAR(255) NOT NULL PRIMARY KEY,
  rate INT(2) NOT NULL
);

CREATE TABLE Role
(
  name VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE Province
(
  name VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE City
(
  name VARCHAR(30) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (name, province_name),
  FOREIGN KEY (province_name) REFERENCES Province(name)
);

CREATE TABLE User
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(30) NOT NULL,
  is_admin BOOLEAN NOT NULL,
  role VARCHAR(30) NOT NULL,
  FOREIGN KEY (role) REFERENCES Role(name)
);

CREATE TABLE Sales_Associate
(
  id INT(6) NOT NULL  PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  FOREIGN KEY (id) REFERENCES User(id)
);

CREATE TABLE Client
( 
  id INT(6) NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email_domain VARCHAR(255) NOT NULL,
  city VARCHAR(30) NOT NULL,
  address VARCHAR(60) NOT NULL,
  postal_code CHAR(6) NOT NULL,
  FOREIGN KEY (city) REFERENCES City(name),
  FOREIGN KEY (id) REFERENCES User(id)
);

CREATE TABLE Employee
(
  id INT(6) NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  department_id INT(6) NOT NULL,
  insurance_type VARCHAR(255),
  province_name VARCHAR(30) NOT NULL,
  contract_type_preference VARCHAR(30) NOT NULL,
  FOREIGN KEY (department_id) REFERENCES Department(id),
  FOREIGN KEY (insurance_type) REFERENCES Insurance_Plan(type),
  FOREIGN KEY (province_name) REFERENCES Province(name),
  FOREIGN KEY (id) REFERENCES User(id),
  FOREIGN KEY (contract_type_preference) REFERENCES Contract_Type(name)
);

CREATE TABLE Works_In
(
  client_id INT(6) NOT NULL,
  business_line VARCHAR(30) NOT NULL,
  PRIMARY KEY (client_id, business_line),
  FOREIGN KEY (client_id) REFERENCES Client(id),
  FOREIGN KEY (business_line) REFERENCES Business_Line(name)
);

CREATE TABLE Manager
(
  id INT(6) NOT NULL,
  email VARCHAR(60) NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  middle_initial CHAR(1),
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES Employee(id)
);

CREATE TABLE Contract
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  acv DECIMAL(12,2) NOT NULL,
  initial_amount DECIMAL(12,2) NOT NULL,
  recorded_by INT(6) NOT NULL,
  is_active BOOLEAN NOT NULL,
  start_date DATE NOT NULL,
  client_satisfaction INT(2),
  department_id INT(6) NOT NULL,
  manager_id INT(6) NOT NULL,
  client_id INT(6) NOT NULL,
  business_line VARCHAR(30) NOT NULL,
  contract_type VARCHAR(30) NOT NULL,
  FOREIGN KEY (recorded_by) REFERENCES User(id),
  FOREIGN KEY (department_id) REFERENCES Department(id),
  FOREIGN KEY (client_id) REFERENCES Client(id),
  FOREIGN KEY (business_line) REFERENCES Business_Line(name),
  FOREIGN KEY (contract_type) REFERENCES Contract_Type(name),
  FOREIGN KEY (manager_id) REFERENCES Manager(id)
);


CREATE TABLE Deliverable
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  deliv_number INT(1) NOT NULL,
  is_final BOOLEAN NOT NULL,
  days_to_delivery INT(3) NOT NULL,
  days_taken INT(3) NOT NULL,
  is_active BOOLEAN NOT NULL,
  contract_id INT(6) NOT NULL,
  FOREIGN KEY (contract_id) REFERENCES Contract(id)
);

CREATE TABLE Assignment
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  is_active BOOLEAN NOT NULL,
  contract_id INT(6) NOT NULL,
  employee_id INT(6) NOT NULL,
  FOREIGN KEY (contract_id) REFERENCES Contract(id),
  FOREIGN KEY (employee_id) REFERENCES Employee(id)
);

CREATE TABLE Work_Log
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  date_worked DATE NOT NULL,
  hours_worked TIME NOT NULL,
  assignment_id INT(6) NOT NULL,
  FOREIGN KEY (assignment_id) REFERENCES Assignment(id)
);

CREATE TABLE Supervises
(
  manager_id INT(6) NOT NULL,
  employee_id INT(6) NOT NULL,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (manager_id) REFERENCES Manager(id),
  FOREIGN KEY (employee_id) REFERENCES Employee(id)
);
