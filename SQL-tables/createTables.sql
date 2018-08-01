CREATE TABLE Department
(
  service_type VARCHAR(255) NOT NULL UNIQUE,
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

CREATE TABLE Deliverables
(
  due_date DATE NOT NULL,
  deliverable_number INT(3) NOT NULL,
  is_final BOOLEAN NOT NULL,
  name VARCHAR(30) NOT NULL,
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  FOREIGN KEY (name) REFERENCES Contract_Type(name)
);

CREATE TABLE Insurance_Plan
(
  insurance_type VARCHAR(255) NOT NULL UNIQUE,
  rate DOUBLE NOT NULL,
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY 
);

CREATE TABLE Role
(
  name VARCHAR(30) NOT NULL UNIQUE,
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY 
);

CREATE TABLE Province
(
  province_name VARCHAR(30) NOT NULL UNIQUE,
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY 
);

CREATE TABLE City
(
  city_name VARCHAR(30) NOT NULL UNIQUE,
  province_name VARCHAR(30) NOT NULL,
  id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  FOREIGN KEY (province_name) REFERENCES Province(province_name)
);

CREATE TABLE Address
(
  id INT(10) AUTO_INCREMENT PRIMARY KEY,
  postal_code VARCHAR(6) NOT NULL,
  street_address VARCHAR(30) NOT NULL,
  city_name VARCHAR(30) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  FOREIGN KEY (city_name) REFERENCES City(city_name),
  FOREIGN KEY (province_name) REFERENCES Province(province_name)
);

CREATE TABLE User
(
  id INT(6) NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(30) NOT NULL,
  is_admin BOOLEAN NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (name) REFERENCES Role(name)
);

CREATE TABLE Client
( 
  id INT(6) NOT NULL AUTO_INCREMENT,
  email_domain VARCHAR(255) NOT NULL,
  name VARCHAR(30) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  user_id INT(6) NOT NULL ,
  PRIMARY KEY (id),
  FOREIGN KEY (province_name) REFERENCES Province(province_name),
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Employee
(
  id INT(6) NOT NULL AUTO_INCREMENT,
  last_name VARCHAR(30) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  department_id INT(6) NOT NULL,
  insurance_type VARCHAR(255) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  user_id INT(6) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES Department(id),
  FOREIGN KEY (insurance_type) REFERENCES Insurance_Plan(insurance_type),
  FOREIGN KEY (province_name) REFERENCES Province(province_name),
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE works_in
(
  client_id INT(6) NOT NULL,
  name VARCHAR(30) NOT NULL,
  line_id int(6) NOT NULL,
  PRIMARY KEY (client_id, line_id),
  FOREIGN KEY (client_id) REFERENCES Client(id),
  FOREIGN KEY (name) REFERENCES Business_Line(name),
  FOREIGN KEY (line_id) REFERENCES Business_Line(id)
);

CREATE TABLE Contract
(
  id INT(6) NOT NULL AUTO_INCREMENT,
  acv INT(20) NOT NULL,
  start_date DATE NOT NULL,
  initial_amount INT(10) NOT NULL,
  client_satisfaction INT(2) NOT NULL,
  recorded_by INT(6) NOT NULL,
  department_id INT(6) NOT NULL,
  client_id INT(6) NOT NULL,
  line_of_buisness VARCHAR(30) NOT NULL,
  contract_type VARCHAR(30) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES Department(id),
  FOREIGN KEY (client_id) REFERENCES Client(id),
  FOREIGN KEY (line_of_buisness) REFERENCES Business_Line(name),
  FOREIGN KEY (contract_type) REFERENCES Contract_Type(name)
);

CREATE TABLE Manager
(
  email VARCHAR(30) NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  middle_initial VARCHAR(30) NOT NULL,
  id INT(6) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES Employee(id)
);

CREATE TABLE Hours
(
  hours_worked INT(10) NOT NULL,
  employee_id INT(6) NOT NULL,
  date_worked DATE NOT NULL,
  contract_id INT(6) NOT NULL,
  PRIMARY KEY (contract_id,employee_id),
  FOREIGN KEY (contract_id) REFERENCES Contract(id),
  FOREIGN KEY (employee_id) REFERENCES Employee(id)
);

CREATE TABLE Manages
(
  contract_id INT(6) NOT NULL,
  manager_id INT(6) NOT NULL,
  PRIMARY KEY (contract_id, manager_id),
  FOREIGN KEY (contract_id) REFERENCES Contract(id),
  FOREIGN KEY (manager_id) REFERENCES Manager(id)
);

CREATE TABLE Supervises
(
  manager_id INT(6) NOT NULL,
  employee_id INT(6) NOT NULL,
  PRIMARY KEY (manager_id),
  FOREIGN KEY (manager_id) REFERENCES Manager(id),
  FOREIGN KEY (employee_id) REFERENCES Employee(id)
);
