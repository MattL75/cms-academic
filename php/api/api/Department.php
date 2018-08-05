<?php
include "../../lib/api.php"; // script to initialize api

// get request handler
function get() {
  restricted(["Manager", "Employee"]);
  // TODO add data sanitation
  $json_rows = [];
  $companies = Departments::findAll($_GET);

  return json_encode($companies);
}

// post request handler
function post() {
  restricted([]);
  $post_body = get_object_vars(json_decode(file_get_contents('php://input')));

  return Departments::create($post_body)->toJson();
}

// put request handler
function put() {
  restricted(["Manager"]);
  $put_body = json_decode(file_get_contents('php://input'));

  return Departments::find(['id' => $put_body->id])
          ->update(get_object_vars($put_body->data))
          ->toJson();
}

// delete request handler
function delete() {
  restricted([]);
  $delete_body = json_decode(file_get_contents('php://input'));

  Departments::find(['id' => $delete_body->id])->delete(); // TODO find a good way to ensure deleted entities are not used

  return '{"deleted": true}';
}
?> 