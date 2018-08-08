<?php
include "../../lib/api.php"; // script to initialize api


// get request handler
function get() {
  restricted(["Manager", "Employee"]);
  // TODO add data sanitation
  $json_rows = [];
  $Users = Users::findAll($_GET);

  return json_encode($Users);
}

// post request handler
function post() {
  restricted([]);
  $post_body = get_object_vars(json_decode(file_get_contents('php://input')));

  return Users::create($post_body)->toJson();
}

// put request handler
function put() {
  restricted([]);
  $put_body = json_decode(file_get_contents('php://input'));

  return Users::find(['id' => $put_body->id])
          ->update(get_object_vars($put_body))
          ->toJson();
}

// delete request handler
function delete() {
  restricted([]);
  $delete_body = json_decode(file_get_contents('php://input'));

  Users::find(['id' => $delete_body->id])->delete(); // TODO find a good way to ensure deleted entities are not used

  return '{"deleted": true}';
}
?> 