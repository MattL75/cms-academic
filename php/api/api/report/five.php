<?php
include "../../../lib/api.php";

function get() {
  return json_encode(QueryBuilder::raw("SELECT DISTINCT Client.city, Client.name, Contract.client_satisfaction FROM Contract, Client WHERE Contract.contract_type=\"{$_GET["type"]}\" AND Contract.client_id=Client.id AND Contract.client_satisfaction IN (SELECT MAX(c1.client_satisfaction) FROM Contract c1 WHERE c1.contract_type=\"{$_GET["type"]}\") ORDER BY Client.city;", ["city", "name", "client_satisfaction"]));
}
?>