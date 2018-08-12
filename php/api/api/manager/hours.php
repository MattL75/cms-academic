<?php
include "../../../lib/api.php";

function get() {
  if (!isset($_GET["manager_id"])) {
    throw new Exception("Requires manager id");
  }
  $employees = Managers::find(["id" => $_GET["manager_id"]])->getEmployees();
  $logs = [];
  foreach ($employees as $employee) {
    $logs += $employee->getHours();
  }


  return json_encode($logs);
}
?>