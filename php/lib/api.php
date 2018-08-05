<?php
include "../../lib/query_builder.php";
// entitiy imports
include "../../lib/entities/company.php"; // template entity
include "../../lib/entities/Employee.php";
include "../../lib/entities/Department.php";
include "../../lib/entities/Manager.php";
include "../../lib/entities/Client.php";
include "../../lib/entities/Contract.php";

QueryBuilder::init();
// send JSON response not HTML
header('Content-Type: application/json');

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