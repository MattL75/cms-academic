<?php

// Database login details
$user = "root";
$pass = "";
$db = "testdb";

// Create connection
$dbConnect = new mysqli('localhost', $user, $pass, $db);

// Check connection status
if ($dbConnect->connect_error) die("Connection failed: " . $dbConnect->connect_error);
echo "Successfully connected to database <strong>$db</strong>.<br>";

// Get creation script content from file
$sql = file_get_contents("sqlScript.sql") or die("Unable to get SqlScript contents.");
$commands = array_filter(explode(";", $sql));
$success = 0;

// Perform all creation commands
foreach ($commands as $command) {
	if ($dbConnect->query($command) === TRUE) {
		$success += 1;
	} else {
		echo "Error executing SQL Script: " . $dbConnect->error . "<br>";
	}
}
if ($success > 0) echo "Successfully executed " . $success . " queries.<br><br>";

// Get content get script from file
$sql = file_get_contents("queries.sql") or die ("Unable to get queries file contents.");
$queries = array_filter(explode(";", $sql));

// Perform all get commands
$count = 1;
foreach ($queries as $query) {
	$result = $dbConnect->query($query);
	if ($result->num_rows > 0) {
		echo "Results from query " . $count . ":<br>";
		while ($row = $result->fetch_assoc()) {
			echo print_r($row) . "<br>";
		}
		echo "<br>";
	} else {
		echo "No data found for query " . $count . ".<br><br>";
	}
	$count += 1;
}

// Close database connection
$dbConnect->close();

?>