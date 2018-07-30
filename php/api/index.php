<?php
include "../lib/query_builder.php";

QueryBuilder::init();

$results = QueryBuilder::select("Company", array("name", "address"))
  ->where('name = "GSC Corporation"')
  ->execute();

foreach ($results as $row) {
    echo $row['name'] . "\t";
    echo $row['address'] . "\n";
}
?> 