<?php
include "../../lib/query_builder.php";
include "../../lib/entities/company.php";

QueryBuilder::init();
// send JSON response not HTML
header('Content-Type: application/json');

// get request handler
function get() {
  // TODO add data sanitation
  $json_rows = [];
  $companies = Companies::findAll($_GET);

  return json_encode($companies);
}

// post request handler
function post() {
  $post_body = get_object_vars(json_decode(file_get_contents('php://input')));

  return Companies::create($post_body)->toJson();
}

// put request handler
function put() {
  $put_body = json_decode(file_get_contents('php://input'));

  return Companies::find(['id' => $put_body->id])
          ->update(get_object_vars($put_body->data))
          ->toJson();
}

// delete request handler
function delete() {
  $delete_body = json_decode(file_get_contents('php://input'));

  Companies::find(['id' => $delete_body->id])->delete(); // TODO find a good way to ensure deleted entities are not used

  return '{"deleted": true}';
}

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    echo get();
    break;
  case 'POST':
    echo post();
    break;
  case 'PUT':
    echo put();
    break;
  case 'DELETE':
    echo delete();
    break;
}
?> 