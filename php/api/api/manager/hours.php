<?php
include "../../../lib/api.php";

function get() {
  if (!isset($_GET["manager_id"])) {
    throw new Exception("Requires manager id");
  }
  $employees = Managers::find(["id" => $_GET["manager_id"]])->getEmployees();
  $logs = [];
  foreach ($employees as $employee) {
    try {
      foreach ($employee->getHours() as $log) {
        array_push($logs, $log);
      }
    } catch (Exception $e) {}
  }


  return json_encode($logs);
}
?>