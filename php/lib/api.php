<?php
include __DIR__."/query_builder.php";
include __DIR__."/auth.php";
// entitiy imports
include __DIR__."/entities/company.php"; // template entity
include __DIR__."/entities/User.php";
include __DIR__."/entities/Employee.php";
include __DIR__."/entities/Department.php";
include __DIR__."/entities/Manager.php";
include __DIR__."/entities/Client.php";
include __DIR__."/entities/Contract.php";

QueryBuilder::init();
// send JSON response not HTML
// header('Content-Type: application/json');

// these methods should be defined in the file that includes this
try {
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
} catch (Exception $e) {
  echo "{\"error\": \"true\", \"message\":\"{$e->getMessage()}\"}";
}
?>