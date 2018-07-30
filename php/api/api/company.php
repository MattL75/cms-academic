<?php
include "../../lib/query_builder.php";
include "../../lib/entities/company.php";

QueryBuilder::init();
header('Content-Type: application/json');


function get() {
  // TODO add data sanitation
  $json_rows = [];
  $companies = Companies::findAll($_GET);

  return json_encode($companies);
}

function post() {
  $post_body = file_get_contents('php://input');

  return Companies::create(get_object_vars(json_decode($post_body)))->toJson();
}

function put() {
  $put_body = json_decode(file_get_contents('php://input'));;
  $company = Companies::find(['id' => $put_body->id]);
  $company->update(get_object_vars($put_body->data));
  $company->save();
  return $company->toJson();
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
}
?> 