--CMS1 As a sales associate, I should be able to create an account of a client by entering client details from the browser. (All details as in P-2: Warm up project)

------Fill in appropriate values, all mandatory------
INSERT INTO User (username, password, is_admin, role) VALUES ('name', 'pw', FALSE, 'Client');

INSERT INTO Client (name, email_domain, city, address, postal_code, id) VALUES ('Name', 'email.ca', 'city', 'address', 'postalcode', userid);

INSERT INTO Works_In (client_id, business_line) VALUES (clientid, 'businessline');

--CMS2 As a sales associate, I should be able to select a “Province” and “City” from pre-populated list of Provinces and Cities of Canada.

SELECT *
FROM Province;

SELECT name
FROM City
Where province_name='name';

--CMS3 As a sales associate, I should be able to select from the list of managers assigned to the contract.

------Assuming that this means "As a sales associate, I should be able to select from the list of managers to assign to the contract." This shows all managers.------
Select *
FROM Manager;

--CMS4 As an employee, I should be able to select a category of the contracts such as Premium, Gold, Diamond or Silver on the platform which I wish to work on.

SELECT type
FROM Insurance_Plan;

------change type to desired type and employeeid to the id of the employee------
UPDATE Employee SET insurance_type="type" WHERE id=employeeid;

--CMS5 As a manager, I should be able to allocate employees to the contracts based on their selection (selected in feature --4).

------Shows employee preferences as a reference to the manager (it is not a restriction on what an employee CAN work on)------
SELECT id, contract_preference_type
FROM Employee;

------change contractid to desired contract id and employeeid to the id of the employee being assigned------
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (TRUE, contractid, employeeid);

--CMS6 As a client, I should be able to see all my active/expired contracts.

------change clientid to id of the client and BOOLEAN to TRUE or FALSE (or remove condition entirely if all contracts wanted------
SELECT *
FROM Contract
WHERE Contract.client_id=clientid AND Contract.is_active=BOOLEAN;

--CMS7 As a manager, I should be able to retrieve the report of number of hours and employee works on the contract.

------change employeeid to the id of the employee being queried on and contractid to the id of the contract being queried on------
SELECT SUM(hours_worked)
FROM Work_Log, Assignment
WHERE Work_Log.assignment_id=Assignment.id AND Assignment.employee_id=employeeid AND Assignment.contract_id=contractid;

--CMS8 As a manager, I should be able to remove employees from the contract.

------change employeeid to the id of the employee to remove from the contract------
UPDATE Assignment SET is_active=FALSE WHERE employee_id=employeeid;

--CMS9 As a client, I should be able to provide my satisfaction score (1 – low :10 – highest) in the database.

------change rating to the desired value and clientid to the client's id------
UPDATE Contract SET client_satisfaction=rating WHERE client_id=clientid;

--CMS10 As a client, I should be able to check satisfaction score of all the contracts managed by the manager leading the contract.

------change clientid to id of the client making the request------
SELECT Employee.first_name, Employee.last_name, (SELECT AVG(client_satisfaction) FROM Contract WHERE Contract.manager_id=m1.id)
FROM Manager m1, Employee, Contract
WHERE m1.id = Employee.id AND Contract.manager_id=m1.id AND Contract.client_id=clientid;

--CMS11 As an admin, I should be able to update any details in the contract.

------change value to desired value, optional to desired value or removed(in which case client_satisfaction must also be removed)------
UPDATE Contract SET acv=value, initial_amount=value, recorded_by=value, is_active=value, start_date=value, client_satisfaction=optional, department_id=value, manager_id=value, client_id=value, business_line=value, contract_type=value;

--CMS12 As an admin, I should be able to remove/alter any contract from the platform.

------change contractid to the id of the contract to be deleted------
------change whatever to the assignment list and condition to any condition------
DELETE FROM Contract WHERE id=contractid;
UPDATE Contract SET whatever WHERE condition;












--BROWSER1 Number of employees with Premium Employee plan with working hours less than 60 hrs/month.

------change 30daysago to correct date (ie. 2017-7-04)------
SELECT COUNT(*)
FROM Employee e1
WHERE e1.insurance_type='Premium'
AND (600000 > (SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(hours_worked)))
            FROM Work_Log, Assignment
            WHERE Work_Log.assignment_id=Assignment.id AND Assignment.employee_id=e1.id AND Work_Log.date_worked>'30daysago'));

--BROWSER2 Number of Premium contracts delivered in more than 10 business days having more than 35 employees with “Silver Employee Plan”.

SELECT COUNT(*)
FROM Contract c1, Deliverable
WHERE c1.contract_type='Premium' AND c1.id=Deliverable.contract_id AND Deliverable.is_final=TRUE AND Deliverable.days_taken>10 
AND 35<(SELECT COUNT(*)
		FROM Assignment, Employee
		WHERE Assignment.employee_id=Employee.id AND Employee.insurance_type='Silver' AND Assignment.contract_id=c1.id);

--BROWSER3 Make a report to compare the delivery schedule of "First deliverable" of all type of contracts (Premium/Diamond etc.) in each month of year 2017.

SELECT Contract.name, month_scheduled, month_delivered
FROM Deliverable, Contract
WHERE Deliverable.deliv_number=1 AND Contract.start_date>'2016-12-31' AND Contract.start_date<'2018-1-01'
ORDER BY
	CASE  month_scheduled
		when 'January' then 1
        when 'February' then 2
		when 'March' then 3
        when 'April' then 4
		when 'May' then 5
        when 'June' then 6
		when 'July' then 7
        when 'August' then 8
		when 'September' then 9
        when 'October' then 10
		when 'November' then 11
        when 'December' then 12
	END;

--BROWSERNOTE2 Upon successful authentication/login/register, the sales associate should select the line of business of the contracts and the type of contracts from a list of at least 5 lines of businesses and 10 contracts in the browser.

------Showing line of business and contract type info for contracts in system------
SELECT business_line, contract_type
FROM Contract;












--INTERFACE1 Give a list of clients who have the highest number of contracts in each line of business.

SELECT Contract.business_line, Client.name, COUNT(Contract.client_id)
FROM Contract, Client
WHERE Contract.client_id=Client.id
GROUP BY Contract.business_line, Client.name
HAVING COUNT(Contract.client_id)+1 > ALL (SELECT COUNT(c1.client_id)
	FROM Contract c1
    WHERE c1.business_line=Contract.business_line
	GROUP BY c1.business_line, c1.client_id);

--INTERFACE2 Give the details of the contracts recorded within the last 10 days in all categories by sales associate.

------change 10daysago to correct date (ie. 2017-7-04)------
SELECT *
FROM Contract
WHERE start_date>'10daysago'
ORDER BY recorded_by;

--INTERFACE3 Fetch all the details of the employees from the “Quebec” province.

SELECT *
FROM Employee
WHERE province_name="Quebec";

--INTERFACE4 Give a list of all the contracts in the “Gold” category.

------Change type to wanted type------
SELECT name
FROM Contract
WHERE contract_type="type";

--INTERFACE5 Generate one report for each category that indicates the clients whose contracts have the highest satisfaction scores in that category, grouped by the cities of clients.

------Change type to wanted type------
SELECT DISTINCT Client.city, Client.name, Contract.client_satisfaction
FROM Contract, Client
WHERE Contract.contract_type="type" AND Contract.client_id=Client.id 
AND Contract.client_satisfaction IN (SELECT MAX(c1.client_satisfaction)
                                         FROM Contract c1
                                         WHERE c1.contract_type="type")
ORDER BY Client.city;
