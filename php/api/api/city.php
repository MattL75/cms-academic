<?php
  include "../../lib/api.php";

  function get() {
    if (!isset($_GET["province_name"])) {
      throw new Exception("requires province name");
    }
    
    $cities = QueryBuilder::select("City", ["name"])
    ->where("province_name = \"{$_GET["province_name"]}\"")
    ->execute();
    $filtered = [];
    foreach ($cities as $city) {
      array_push($filtered, filter(["name"], $city));
    }
    
    return json_encode($filtered);
  }
?>