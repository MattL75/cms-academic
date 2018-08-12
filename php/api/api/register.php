<?php
include "../../lib/api.php";
// not sure this makes sense
function post() {
  $post_body = get_object_vars(json_decode(file_get_contents('php://input')));
  $post_body["is_admin"] = 0;
  $user= Users::create($post_body);
  $post_body["id"] = $user->id;
  Clients::create($post_body)->toJson();
  $_SESSION['user'] = serialize($user);

  return $user->toJson();
}

?>