<?php
function get() {
  if (!isset($__GET["employee_id"])) {
    throw new Exception("Requires employee id");
  }
  $results = Employees::find(["id" => $__GET["employee_id"]]);
  $worklogs = [];
  foreach ($results as $worklog) {
    array_push($worklogs, new WorkLog($worklog));
  }

  return json_encode($worklogs);
}

function post() {
  $post_body = get_object_vars(json_decode(file_get_contents('php://input')));

  return Companies::create($post_body)->toJson();
}
?>