<?php
include "../../../lib/api.php";

function get() {
  restricted(["Manager", "Employee"]);
  // TODO add data sanitation
  if (!isset($_GET["manager_id"])) {
    throw new Exception("Requires ID");
  }
  $employees = Managers::find(["id" => $_GET["manager_id"]])->getEmployees();

  return json_encode($employees);
}

function post() {
  restricted(["Manager"]);
  $post_body = get_object_vars(json_decode(file_get_contents('php://input')));
  if (!isset($post_body["manager_id"]) || !isset($post_body["employee_id"])) {
    throw new Exception("requires both manager id and employee id");
  }

  $manager = Managers::find(["id" => $post_body["manager_id"]]);
  $manager->addEmployee($post_body["employee_id"]);

  return json_encode($manager->getEmployees());
}

function delete() {
  restricted(["Manager"]);
  if (!isset($_GET["manager_id"]) || !isset($_GET["employee_id"])) {
    throw new Exception("requires both manager id and employee id");
  }
  
  $manager = Managers::find(["id" => $_GET["manager_id"]]);
  $manager->removeEmployee($_GET["employee_id"]);

  return json_encode($manager->getEmployees());
}
?>