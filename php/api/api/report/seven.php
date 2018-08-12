<?php
include "../../../lib/api.php";

function get() {
  return json_encode(QueryBuilder::raw("SELECT COUNT(*) as contracts FROM Contract c1, Deliverable WHERE c1.contract_type='Premium' AND c1.id=Deliverable.contract_id AND Deliverable.is_final=TRUE AND Deliverable.days_taken>10 AND 35<(SELECT COUNT(*) FROM Assignment, Employee WHERE Assignment.employee_id=Employee.id AND Employee.insurance_type='Silver' AND Assignment.contract_id=c1.id);", ["contracts"])[0]);
}
?>