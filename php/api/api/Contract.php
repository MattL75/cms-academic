<?php
include "../../lib/api.php"; // script to initialize api

// get request handler
function get() {
  restricted(["Manager", "Sales Associate", "Employee", "Client"]);
  // TODO add data sanitation
  $json_rows = [];
  $companies = Contracts::findAll($_GET);

  return json_encode($companies);
}

// post request handler
function post() {
  restricted(["Sales Associate"]);
  $post_body = get_object_vars(json_decode(file_get_contents('php://input')));

  return Contracts::create($post_body)->toJson();
}

// put request handler
function put() {
  restricted(["Sales Associate"]);
  $put_body = json_decode(file_get_contents('php://input'));

  return Contracts::find(['id' => $put_body->id])
          ->update(get_object_vars($put_body->data))
          ->toJson();
}

// delete request handler
function delete() {
  restricted(["Sales Associate"]);
  $delete_body = json_decode(file_get_contents('php://input'));

  Contracts::find(['id' => $delete_body->id])->delete(); // TODO find a good way to ensure deleted entities are not used

  return '{"deleted": true}';
}
?> 