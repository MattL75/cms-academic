SELECT DISTINCT first_name, last_name
FROM Manager, Contract
WHERE Contract.acv > 80000 AND Manager.department_id = Contract.department_id;

SELECT DISTINCT Employee.first_name, Employee.last_name
FROM Employee, Contract, Manager
WHERE Contract.acv >= 85000 AND Manager.department_id = Contract.department_id AND Employee.manager_id = Manager.employee_id;

SELECT id, contract_type, acv, initial_amount
FROM Manager, Contract
WHERE Contract.department_id = Manager.department_id AND Manager.first_name = 'Juan' AND Manager.last_name = 'Vasquez';
