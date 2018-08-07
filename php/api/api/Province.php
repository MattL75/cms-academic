<?php
  include "../../lib/api.php";

  function get() {
    $provinces = QueryBuilder::select("Province", ["name"])->execute();
    $filtered = [];
    foreach ($provinces as $province) {
      array_push($filtered, filter(["name"], $province));
    }
    
    return json_encode($filtered);
  }
?>