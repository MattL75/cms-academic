<?php
include "../../../lib/api.php";

function get() {
  return json_encode(QueryBuilder::raw("SELECT * FROM Contract WHERE contract_type=\"Gold\";", Contract::TABLE_FIELDS));
}
?>