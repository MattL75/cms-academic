<?php
include "../../lib/api.php";

function post() {
  $post_body = get_object_vars(json_decode(file_get_contents('php://input')));
  if (!isset($post_body["username"]) || !isset($post_body["password"])) {
    throw new Exception("Username and Password required");
  }
  try {
    $user = Users::find($post_body);
  } catch (Exception $e) {
    throw new Exception("login failed");
  }
  $_SESSION['user'] = serialize($user);

  return $user->toJson();
}

function delete() {
  session_destroy();
}
?>