<?php
include "../../../lib/api.php";

function get() {
  return json_encode(QueryBuilder::raw("SELECT Contract.business_line, Client.name, COUNT(Contract.client_id) as contracts FROM Contract, Client WHERE Contract.client_id=Client.id GROUP BY Contract.business_line, Client.name HAVING COUNT(Contract.client_id)+1 > ALL (SELECT COUNT(c1.client_id) FROM Contract c1 WHERE c1.business_line=Contract.business_line GROUP BY c1.business_line, c1.client_id);", ["name", "business_line", "contracts"]));
}
?>