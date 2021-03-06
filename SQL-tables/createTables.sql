SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS Department CASCADE;
DROP TABLE IF EXISTS Business_Line CASCADE;
DROP TABLE IF EXISTS Contract_Type CASCADE;
DROP TABLE IF EXISTS Insurance_Plan CASCADE;
DROP TABLE IF EXISTS Role CASCADE;
DROP TABLE IF EXISTS Province CASCADE;
DROP TABLE IF EXISTS City CASCADE;
DROP TABLE IF EXISTS User CASCADE;
DROP TABLE IF EXISTS Sales_Associate CASCADE;
DROP TABLE IF EXISTS Client CASCADE;
DROP TABLE IF EXISTS Employee CASCADE;
DROP TABLE IF EXISTS Works_In CASCADE;
DROP TABLE IF EXISTS Contract CASCADE;
DROP TABLE IF EXISTS Manager CASCADE;
DROP TABLE IF EXISTS Work_Log CASCADE;
DROP TABLE IF EXISTS Assignment CASCADE;
DROP TABLE IF EXISTS Supervises CASCADE;
DROP TABLE IF EXISTS Deliverable CASCADE;
DROP TABLE IF EXISTS Address CASCADE;
DROP TABLE IF EXISTS Hours CASCADE;
DROP TABLE IF EXISTS Manages CASCADE;
DROP TABLE IF EXISTS Province CASCADE;
SET FOREIGN_KEY_CHECKS=1;

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
  is_admin BOOLEAN NOT NULL DEFAULT TRUE,
  role VARCHAR(30) NOT NULL,
  FOREIGN KEY (role) REFERENCES Role(name) ON DELETE CASCADE
);

CREATE TABLE Sales_Associate
(
  id INT(6) NOT NULL  PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE Client
( 
  id INT(6) NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email_domain VARCHAR(255) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  city VARCHAR(30) NOT NULL,
  address VARCHAR(60) NOT NULL,
  postal_code CHAR(6) NOT NULL,
  FOREIGN KEY (province_name) REFERENCES City(province_name),
  FOREIGN KEY (city) REFERENCES City(name),
  CONSTRAINT FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE Employee
(
  id INT(6) NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  department_id INT(6),
  insurance_type VARCHAR(255),
  province_name VARCHAR(30) NOT NULL,
  contract_type_preference VARCHAR(30) NOT NULL,
  FOREIGN KEY (department_id) REFERENCES Department(id) ON DELETE SET NULL,
  FOREIGN KEY (insurance_type) REFERENCES Insurance_Plan(type),
  FOREIGN KEY (province_name) REFERENCES Province(name) ON DELETE CASCADE,
  FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE,
  FOREIGN KEY (contract_type_preference) REFERENCES Contract_Type(name)
);

CREATE TABLE Works_In
(
  client_id INT(6) NOT NULL,
  business_line VARCHAR(30) NOT NULL,
  PRIMARY KEY (client_id, business_line),
  FOREIGN KEY (client_id) REFERENCES Client(id) ON DELETE CASCADE,
  FOREIGN KEY (business_line) REFERENCES Business_Line(name)
);

CREATE TABLE Manager
(
  id INT(6) NOT NULL,
  email VARCHAR(60) NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  middle_initial CHAR(1),
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES Employee(id) ON DELETE CASCADE
);

CREATE TABLE Contract
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  acv DECIMAL(12,2) NOT NULL,
  initial_amount DECIMAL(12,2) NOT NULL,
  recorded_by INT(6),
  is_active BOOLEAN NOT NULL,
  start_date DATE NOT NULL,
  client_satisfaction INT(2),
  department_id INT(6),
  manager_id INT(6),
  client_id INT(6),
  business_line VARCHAR(30) NOT NULL,
  contract_type VARCHAR(30) NOT NULL,
  FOREIGN KEY (recorded_by) REFERENCES User(id) ON DELETE SET NULL,
  FOREIGN KEY (department_id) REFERENCES Department(id) ON DELETE SET NULL,
  FOREIGN KEY (client_id) REFERENCES Client(id) ON DELETE SET NULL,
  FOREIGN KEY (business_line) REFERENCES Business_Line(name),
  FOREIGN KEY (contract_type) REFERENCES Contract_Type(name),
  FOREIGN KEY (manager_id) REFERENCES Manager(id) ON DELETE SET NULL
);


CREATE TABLE Deliverable
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  deliv_number INT(1) NOT NULL,
  is_final BOOLEAN NOT NULL,
  days_to_delivery INT(3) NOT NULL,
  days_taken INT(3) NOT NULL,
  month_scheduled VARCHAR(20) NOT NULL,
  month_delivered VARCHAR(20),
  is_active BOOLEAN NOT NULL,
  contract_id INT(6) NOT NULL,
  FOREIGN KEY (contract_id) REFERENCES Contract(id) ON DELETE CASCADE
);

CREATE TABLE Assignment
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  is_active BOOLEAN NOT NULL,
  contract_id INT(6) NOT NULL,
  employee_id INT(6) NOT NULL,
  FOREIGN KEY (contract_id) REFERENCES Contract(id) ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES Employee(id) ON DELETE CASCADE
);

CREATE TABLE Work_Log
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  date_worked DATE NOT NULL,
  hours_worked TIME NOT NULL,
  assignment_id INT(6) NOT NULL,
  FOREIGN KEY (assignment_id) REFERENCES Assignment(id) ON DELETE CASCADE
);

CREATE TABLE Supervises
(
  manager_id INT(6) NOT NULL,
  employee_id INT(6) NOT NULL,
  PRIMARY KEY (employee_id, manager_id),
  FOREIGN KEY (manager_id) REFERENCES Manager(id) ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES Employee(id) ON DELETE CASCADE
);
