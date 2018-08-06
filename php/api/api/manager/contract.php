<?php
include "../../../lib/api.php";

function get() {
  restricted(["Manager"]);
  // TODO add data sanitation
  if (!isset($_GET["manager_id"])) {
    throw new Exception("Requires ID");
  }
  $contracts = Managers::find(["id" => $_GET["manager_id"]])->getContracts();

  return json_encode($contracts);
}

function post() {
  restricted(["Manager"]);
  $post_body = get_object_vars(json_decode(file_get_contents('php://input')));
  if (!isset($post_body["manager_id"]) || !isset($post_body["contract_id"])) {
    throw new Exception("requires both manager id and employee id");
  }

  $manager = Managers::find(["id" => $post_body["manager_id"]]);
  $manager->addContract($post_body["contract_id"]);

  return json_encode($manager->getEmployees());
}
?>