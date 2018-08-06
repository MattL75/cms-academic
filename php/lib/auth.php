<?php
session_start();

// throws if user is not logged in
function restricted(Array $roles) {
  if (isset($_SESSION['user'])) {
    $user = unserialize($_SESSION['user']);
    $userRole = $user->role;
    if ($userRole == 'Admin') {
      return;
    }
    foreach ($roles as $role) {
      if ($role == $userRole) {
        return;
      }
    }
  }
  throw new Exception("Unauthorized User");
}
?>