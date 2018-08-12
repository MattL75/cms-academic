<?php
include "../../../lib/api.php";

function get() {
  return json_encode(QueryBuilder::raw("SELECT Contract.name, month_scheduled, month_delivered FROM Deliverable INNER JOIN Contract on Contract.id = contract_id WHERE Deliverable.deliv_number=1 AND Contract.start_date>'2016-12-31' AND Contract.start_date<'2018-1-01' ORDER BY CASE  month_scheduled when 'January' then 1 when 'February' then 2 when 'March' then 3 when 'April' then 4 when 'May' then 5 when 'June' then 6 when 'July' then 7 when 'August' then 8 when 'September' then 9 when 'October' then 10 when 'November' then 11 when 'December' then 12 END;", ["name", "month_scheduled", "month_delivered"]));
}
?>