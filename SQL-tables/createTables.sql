CREATE TABLE Department
(
  service_type VARCHAR(255) NOT NULL,
  name VARCHAR(30) NOT NULL UNIQUE,
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY 
);

CREATE TABLE Business_Line 
(
  name VARCHAR(30) NOT NULL UNIQUE,
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY 
);

CREATE TABLE Contract_Type
(
  name VARCHAR(30) NOT NULL UNIQUE,
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY 
);

CREATE TABLE Deliverable
(
  due_date DATE NOT NULL,
  number INT(3) NOT NULL,
  is_final BOOLEAN NOT NULL,
  contract_type VARCHAR(30) NOT NULL,
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  FOREIGN KEY (contract_type) REFERENCES Contract_Type(name)
);

CREATE TABLE Insurance_Plan
(
  type VARCHAR(255) NOT NULL UNIQUE,
  rate INT(2) NOT NULL,
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY 
);

CREATE TABLE Role
(
  name VARCHAR(30) NOT NULL UNIQUE,
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY 
);

CREATE TABLE Province
(
  name VARCHAR(30) NOT NULL UNIQUE,
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY 
);

CREATE TABLE City
(
  name VARCHAR(30) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  FOREIGN KEY (province_name) REFERENCES Province(name)
);

CREATE TABLE Address
(
  id INT(10) AUTO_INCREMENT PRIMARY KEY,
  postal_code CHAR(6) NOT NULL,
  street_address VARCHAR(30) NOT NULL,
  city_name VARCHAR(30) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  FOREIGN KEY (city_name) REFERENCES City(name),
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

CREATE TABLE Client
( 
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email_domain VARCHAR(255) NOT NULL,
  name VARCHAR(30) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  user_id INT(6) NOT NULL ,
  FOREIGN KEY (province_name) REFERENCES Province(name),
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Employee
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  department_id INT(6) NOT NULL,
  insurance_type VARCHAR(255),
  province_name VARCHAR(30) NOT NULL,
  user_id INT(6) NOT NULL,
  FOREIGN KEY (department_id) REFERENCES Department(id),
  FOREIGN KEY (insurance_type) REFERENCES Insurance_Plan(type),
  FOREIGN KEY (province_name) REFERENCES Province(name),
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE works_in
(
  client_id INT(6) NOT NULL,
  business_line VARCHAR(30) NOT NULL,
  line_id int(6) NOT NULL,
  PRIMARY KEY (client_id, line_id),
  FOREIGN KEY (client_id) REFERENCES Client(id),
  FOREIGN KEY (business_line) REFERENCES Business_Line(name),
  FOREIGN KEY (line_id) REFERENCES Business_Line(id)
);

CREATE TABLE Contract
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  acv DECIMAL(10,2) NOT NULL,
  start_date DATE NOT NULL,
  initial_amount DECIMAL(10,2) NOT NULL,
  client_satisfaction INT(2),
  recorded_by INT(6) NOT NULL,
  department_id INT(6) NOT NULL,
  client_id INT(6) NOT NULL,
  business_line VARCHAR(30) NOT NULL,
  contract_type VARCHAR(30) NOT NULL,
  FOREIGN KEY (department_id) REFERENCES Department(id),
  FOREIGN KEY (client_id) REFERENCES Client(id),
  FOREIGN KEY (business_line) REFERENCES Business_Line(name),
  FOREIGN KEY (contract_type) REFERENCES Contract_Type(name)
);

CREATE TABLE Manager
(
  email VARCHAR(30) NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  middle_initial CHAR(1),
  id INT(6) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES Employee(id)
);

CREATE TABLE Hours
(
  hours_worked TIME NOT NULL,
  employee_id INT(6) NOT NULL,
  date_worked DATE NOT NULL,
  contract_id INT(6) NOT NULL,
  PRIMARY KEY (contract_id,employee_id,date_worked),
  FOREIGN KEY (contract_id) REFERENCES Contract(id),
  FOREIGN KEY (employee_id) REFERENCES Employee(id)
);

CREATE TABLE Manages
(
  contract_id INT(6) NOT NULL,
  manager_id INT(6) NOT NULL,
  PRIMARY KEY (contract_id),
  FOREIGN KEY (contract_id) REFERENCES Contract(id),
  FOREIGN KEY (manager_id) REFERENCES Manager(id)
);

CREATE TABLE Supervises
(
  manager_id INT(6) NOT NULL,
  employee_id INT(6) NOT NULL,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (manager_id) REFERENCES Manager(id),
  FOREIGN KEY (employee_id) REFERENCES Employee(id)
);
