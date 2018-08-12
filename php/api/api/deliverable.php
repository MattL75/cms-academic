<?php
include "../../lib/api.php";
function get() {
return json_encode(QueryBuilder::raw("SELECT Contract.name AS \"contract_name\", Deliverable.deliv_number, Deliverable.is_final, Deliverable.days_to_delivery, Deliverable.days_taken, Deliverable.month_scheduled, Deliverable.month_delivered, Deliverable.is_active FROM Contract, Deliverable WHERE Contract.id=Deliverable.contract_id;", ["Contract Name", "deliv_number", "is_final", "days_to_delivery", "days_taken", "month_scheduled", "month_delivered", "is_active"]));
}
?>