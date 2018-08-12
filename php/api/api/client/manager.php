<?php
include "../../../lib/api.php";

function get() {
  if (!isset($_GET["client_id"])) {
    throw new Exception("requires client id");
  }
  
  $contracts = Contracts::findAll(["client_id" => $_GET["client_id"]]);
  $managers = [];
  foreach ($contracts as $contract) {
    array_push($managers, $contract->getManager());
  }

  return json_encode($managers);
}

?>