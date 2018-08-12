<?php
include "../../../lib/api.php";

function get() {
  if (!isset($_GET["employee_id"])) {
    throw new Exception("Requires employee id");
  }
  $results = Employees::find(["id" => $_GET["employee_id"]])->getHours();


  return json_encode($results);
}

function post() {
  $post_body = get_object_vars(json_decode(file_get_contents('php://input')));

  return WorkLogs::create($post_body)->toJson();
}
?>