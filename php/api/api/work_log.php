<?php
include "../../lib/api.php"; // script to initialize api

// get request handler
function get() {
  restricted(["Manager", "Employee"]);
  // TODO add data sanitation
  $json_rows = [];
  $companies = WorkLogs::findAll($_GET);

  return json_encode($companies);
}

// post request handler
function post() {
  restricted(["Manager", "Employee"]);
  $post_body = get_object_vars(json_decode(file_get_contents('php://input')));

  return WorkLogs::create($post_body)->toJson();
}

// put request handler
function put() {
  restricted(["Manager", "Employee"]);
  $put_body = json_decode(file_get_contents('php://input'));

  return WorkLogs::find(['id' => $put_body->id])
          ->update(get_object_vars($put_body))
          ->toJson();
}

// delete request handler
function delete() {
  restricted([]);
  $delete_body = json_decode(file_get_contents('php://input'));

  WorkLogs::find(['id' =>  $_GET["id"]])->delete(); // TODO find a good way to ensure deleted entities are not used

  return '{"deleted": true}';
}
?> 