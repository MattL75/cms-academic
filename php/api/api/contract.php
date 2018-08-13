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
  $post_body["is_active"] = $post_body["is_admin"] === "true" ? 1 : 0;
  $post_body["start_date"] = explode("T", $post_body["start_date"])[0];

  return Contracts::create($post_body)->toJson();
}

// put request handler
function put() {
  restricted(["Sales Associate", "Client"]);
  $put_body = json_decode(file_get_contents('php://input'));
  $post_body["is_active"] = $post_body["is_admin"] === "true" ? 1 : 0;
  $post_body["start_date"] = explode("T", $post_body["start_date"])[0];

  return Contracts::find(['id' => $put_body->id])
          ->update(get_object_vars($put_body))
          ->toJson();
}

// delete request handler
function delete() {
  restricted(["Sales Associate"]);
  $delete_body = json_decode(file_get_contents('php://input'));

  Contracts::find(['id' => $_GET["id"]])->delete(); // TODO find a good way to ensure deleted entities are not used

  return '{"deleted": true}';
}
?> 