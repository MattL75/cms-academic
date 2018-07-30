<?php
include "../../lib/query_builder.php";

QueryBuilder::init();

$result =  QueryBuilder::insert("Company", [
  "name" => "test",
  "city" => "Montreal",
  "postal_code" => "a1a1a1",
  "address" => "123 street place",
  "province" => "QC",
  "email_id" => "test@example.com",
  ])->execute();

echo $result;

$results = QueryBuilder::select("Company", array("name", "address"))
->where("Company.id = {$result}")
->execute();

foreach ($results as $row) {
    echo $row['name'] . "\t";
    echo $row['address'] . "\n";
}
?> 