CREATE TABLE Department
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  service_type VARCHAR(255) NOT NULL
);

CREATE TABLE Business_Line 
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE Contract_Type
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE Deliverable
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  number INT(1) NOT NULL,
  is_final BOOLEAN NOT NULL,
  days_to_delivery INT(3) NOT NULL,
  contract_type VARCHAR(30) NOT NULL,
  FOREIGN KEY (contract_type) REFERENCES Contract_Type(name)
);

CREATE TABLE Insurance_Plan
(
  -- id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(255) NOT NULL UNIQUE,
  rate INT(2) NOT NULL
);

CREATE TABLE Role
(
  -- id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY, -- UNUSED
  name VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE Province
(
  -- id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY, -- UNUSED
  name VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE City
(
  id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  FOREIGN KEY (province_name) REFERENCES Province(name)
);

CREATE TABLE Address
(
  id INT(10) AUTO_INCREMENT PRIMARY KEY,
  street_address VARCHAR(30) NOT NULL,
  postal_code CHAR(6) NOT NULL,
  city_id INT(10) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  FOREIGN KEY (city_id) REFERENCES City(id),
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
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  user_id INT(6) NOT NULL ,
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Client
( 
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email_domain VARCHAR(255) NOT NULL,
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

CREATE TABLE Works_In
(
  client_id INT(6) NOT NULL,
  line_id int(6) NOT NULL,
  business_line VARCHAR(30) NOT NULL,
  PRIMARY KEY (client_id, line_id),
  FOREIGN KEY (client_id) REFERENCES Client(id),
  FOREIGN KEY (line_id) REFERENCES Business_Line(id),
  FOREIGN KEY (business_line) REFERENCES Business_Line(name)
);

CREATE TABLE Contract
(
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  acv DECIMAL(10,2) NOT NULL,
  initial_amount DECIMAL(10,2) NOT NULL,
  recorded_by INT(6) NOT NULL,
  start_date DATE NOT NULL,
  client_satisfaction INT(2),
  department_id INT(6) NOT NULL,
  client_id INT(6) NOT NULL,
  business_line VARCHAR(30) NOT NULL,
  contract_type VARCHAR(30) NOT NULL,
  FOREIGN KEY (recorded_by) REFERENCES Sales_Associate(id),
  FOREIGN KEY (department_id) REFERENCES Department(id),
  FOREIGN KEY (client_id) REFERENCES Client(id),
  FOREIGN KEY (business_line) REFERENCES Business_Line(name),
  FOREIGN KEY (contract_type) REFERENCES Contract_Type(name)
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

CREATE TABLE Hours
(
  date_worked DATE NOT NULL,
  hours_worked TIME NOT NULL,
  contract_id INT(6) NOT NULL,
  employee_id INT(6) NOT NULL,
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
