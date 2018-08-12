<?php
include "../../../lib/api.php";

function get() {
  return json_encode(QueryBuilder::raw("SELECT * FROM Employee WHERE province_name=\"Quebec\";", Employee::TABLE_FIELDS));
}
?>