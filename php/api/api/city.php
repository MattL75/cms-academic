<?php
  include "../../lib/api.php";

  function get() {
    
    $cities = QueryBuilder::select("City", ["name", "province_name"])
    ->execute();
    $filtered = [];
    foreach ($cities as $city) {
      array_push($filtered, filter(["name", "province_name"], $city));
    }
    
    return json_encode($filtered);
  }
?>