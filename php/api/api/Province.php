<?php
  include "../../lib/api.php";

  function get() {
    $provinces = QueryBuilder::select("Province", ["name"])->execute();

    return json_encode($provinces);
  }
?>