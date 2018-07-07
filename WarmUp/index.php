<?php

// Database login details
$user = "root";
$pass = "";
$db = "testdb";

// Create connection
$dbConnect = new mysqli('localhost', $user, $pass, $db);

// Check connection status
if ($dbConnect->connect_error) {
	die("Connection failed: " . $dbConnect->connect_error);
}
echo "Successfully connected to database <strong>$db</strong>.<br>";

// Get script content from file
$sql = file_get_contents("sqlScript.sql") or die("Unable to get SqlScript contents.");
$commands = array_filter(explode(";", $sql));
$success = 0;

// Perform all queries
foreach ($commands as $command) {
	if ($dbConnect->query($command) === TRUE) {
		$success += 1;
	} else {
		echo "Error executing SQL Script: " . $dbConnect->error . "<br>";
	}
}
if ($success > 0) echo "Successfully executed " . $success . " queries.";

// Close database connection
$dbConnect->close();

?>