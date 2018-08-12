<?php
include "../../../lib/api.php";

function get() {
  return json_encode(QueryBuilder::raw("SELECT COUNT(*) as employees FROM Employee e1 WHERE e1.insurance_type='Premium' AND (600000 > (SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(hours_worked))) FROM Work_Log, Assignment WHERE Work_Log.assignment_id=Assignment.id AND Assignment.employee_id=e1.id AND Work_Log.date_worked>NOW() - INTERVAL 30 DAY));", ["employees"])[0]);
}
?>