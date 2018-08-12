<?php
include "../../../lib/api.php";

function get() {
  if (!isset($_GET["manager_id"])) {
    throw new Exception("Requires manager id");
  }
  $employees = Managers::find(["id" => $_GET["manager_id"]])->getEmployees();
  $assignments = [];
  
  foreach ($employees as $employee) {
    $assignments += $employee->getAssignments();
  }


  return json_encode($assignments);
}
?>