CREATE TABLE Department
(
  service_type VARCHAR(255) NOT NULL,
  name VARCHAR(30) NOT NULL,
  departmentID INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY 
);

CREATE TABLE Lines_of_Buisness
(
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (name)
);

CREATE TABLE Contract_Type
(
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (name)
);

CREATE TABLE Deliverables
(
  due_date DATE NOT NULL,
  deliverable_number INT(3) NOT NULL,
  is_final BOOLEAN NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (deliverable_number, name),
  FOREIGN KEY (name) REFERENCES Contract_Type(name)
);

CREATE TABLE Insurance_Plan
(
  insurance_type VARCHAR(255) NOT NULL,
  rate DOUBLE NOT NULL,
  PRIMARY KEY (insurance_type)
);

CREATE TABLE Role
(
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (name)
);

CREATE TABLE Province
(
  province_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (province_name)
);

CREATE TABLE City
(
  city_name VARCHAR(30) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (city_name, province_name),
  FOREIGN KEY (province_name) REFERENCES Province(province_name)
);

CREATE TABLE Address
(
  postal_code VARCHAR(6) NOT NULL,
  street VARCHAR(30) NOT NULL,
  number INT(10) NOT NULL,
  city_name VARCHAR(30) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (street, city_name, province_name),
  FOREIGN KEY (city_name, province_name) REFERENCES City(city_name, province_name)
);

CREATE TABLE User
(
  user_id INT(6) NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  is_admin BOOLEAN NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (name) REFERENCES Role(name)
);

CREATE TABLE Client
(
  email_domain VARCHAR(255) NOT NULL,
  name VARCHAR(30) NOT NULL,
  client_id INT(6) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  user_id INT(6) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (client_id),
  FOREIGN KEY (province_name) REFERENCES Province(province_name),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Employee
(
  employee_id INT(6) NOT NULL AUTO_INCREMENT,
  last_name VARCHAR(30) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  departmentID INT(6) NOT NULL,
  insurance_type VARCHAR(255) NOT NULL,
  province_name VARCHAR(30) NOT NULL,
  user_id INT(6) NOT NULL,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (departmentID) REFERENCES Department(departmentID),
  FOREIGN KEY (insurance_type) REFERENCES Insurance_Plan(insurance_type),
  FOREIGN KEY (province_name) REFERENCES Province(province_name),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE works_in
(
  client_id INT(6) NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (client_id, name),
  FOREIGN KEY (client_id) REFERENCES Client(client_id),
  FOREIGN KEY (name) REFERENCES Lines_of_Buisness(name)
);

CREATE TABLE Contract
(
  contract_id INT(6) NOT NULL AUTO_INCREMENT,
  acv INT(20) NOT NULL,
  start_date DATE NOT NULL,
  initial_amount INT(10) NOT NULL,
  client_satisfaction INT(2) NOT NULL,
  recorded_by INT(6) NOT NULL,
  departmentID INT(6) NOT NULL,
  client_id INT(6) NOT NULL,
  line_of_buisness VARCHAR(30) NOT NULL,
  contract_type VARCHAR(30) NOT NULL,
  PRIMARY KEY (contract_id),
  FOREIGN KEY (departmentID) REFERENCES Department(departmentID),
  FOREIGN KEY (client_id) REFERENCES Client(client_id),
  FOREIGN KEY (line_of_buisness) REFERENCES Lines_of_Buisness(name),
  FOREIGN KEY (contract_type) REFERENCES Contract_Type(name)
);

CREATE TABLE Manager
(
  email VARCHAR(30) NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  middle_initial VARCHAR(30) NOT NULL,
  employee_id INT(6) NOT NULL,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);

CREATE TABLE Hours
(
  hours_worked INT(10) NOT NULL,
  employee_id INT(6) NOT NULL,
  date_worked DATE NOT NULL,
  contract_id INT(6) NOT NULL,
  PRIMARY KEY (contract_id,employee_id),
  FOREIGN KEY (contract_id) REFERENCES Contract(contract_id),
  FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);

CREATE TABLE Manages
(
  contract_id INT(6) NOT NULL,
  manager_id INT(6) NOT NULL,
  PRIMARY KEY (contract_id, manager_id),
  FOREIGN KEY (contract_id) REFERENCES Contract(contract_id),
  FOREIGN KEY (manager_id) REFERENCES Manager(employee_id)
);

CREATE TABLE Supervises
(
  manager_id INT(6) NOT NULL,
  employee_id INT(6) NOT NULL,
  PRIMARY KEY (manager_id),
  FOREIGN KEY (manager_id) REFERENCES Manager(employee_id),
  FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);