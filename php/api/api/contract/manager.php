<?php
include "../../../lib/api.php";

function get() {
  return Contracts::find(["id" => $_GET["contract_id"]])->getManager()->toJson();
}

?>