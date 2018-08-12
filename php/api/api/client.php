<?php
// test change
include "../../lib/api.php"; // script to initialize api

// get request handler
function get() {
  restricted(["Sales Associate", "Client", "Manager", "Employee"]);
  // TODO add data sanitation
  $json_rows = [];
  $companies = Clients::findAll($_GET);

  return json_encode($companies);
}

// not sure this makes sense
function post() {
  restricted(["Sales Associate"]);
  $post_body = get_object_vars(json_decode(file_get_contents('php://input')));
  $post_body["is_admin"] = $post_body["is_admin"] === "true" ? 1 : 0;
  $post_body["id"] = Users::create($post_body)->id;
  
  return Clients::create($post_body)->toJson();
}

// put request handler
function put() {
  restricted(["Sales Associate", "Client"]);
  $put_body = json_decode(file_get_contents('php://input'));

  return Clients::find(['id' => $put_body->id])
          ->update(get_object_vars($put_body))
          ->toJson();
}

// delete request handler
function delete() {
  restricted(["Sales Associate"]);
  if (!isset($_GET["id"])) {
    throw new Exception("requires id");
  }

  Clients::find(['id' =>  $_GET["id"]])->delete(); // TODO find a good way to ensure deleted entities are not used

  return '{"deleted": true}';
}
?> 