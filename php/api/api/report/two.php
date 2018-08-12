<?php
include "../../../lib/api.php";

function get() {
  return json_encode(QueryBuilder::raw("SELECT * FROM Contract WHERE start_date > NOW() - INTERVAL 10 DAY ORDER BY recorded_by;", Contract::TABLE_FIELDS));
}
?>