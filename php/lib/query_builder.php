<?php
class QueryBuilder {
  private static $conn;

  public static function init() { // allow db params to be args
    $servername = "mysql_comp353"; // name of container on docker network
    $username = "root";
    $password = "1234";
    $dbname = "warmup_project"; // name of database
    QueryBuilder::$conn = new PDO("mysql:host={$servername};dbname={$dbname};charset=utf8", $username, $password);
  }
  
  public static function select(string $table, array $columns) {
    if (!isset(QueryBuilder::$conn)) {
      die("must call init before querying");
    }
    return new SelectBuilder(QueryBuilder::$conn, $table, $columns);
  }

}

class SelectBuilder {
  private $connection;
  private $select_string;
  private $from_string;
  private $join_string;
  private $where_string;
  
  public function __construct(PDO $connection, string $table, array $columns) {
    $this->connection = $connection;
    
    // TODO add column list as argument
    $this->select_string = "SELECT ";
    $comma = '';
    foreach ($columns as $column) {
      $this->select_string .= "{$comma}{$table}.{$column}";
      $comma = ', ';
    }
    $this->from_string = "FROM {$table}";
    $this->join_string = '';
  }

  public function join(string $table, array $columns, string $left_field, string $right_field) {
    $this->join_string .= "INNER JOIN {$table} ON {$left_field} = {$right_field}\n";
    // TODO add column list as argument
    foreach ($columns as $column) {
      $this->select_string .= ",{$table}.{$column}";
    }

    return $this;
  }

  // make this work with prepared statements to protect from injection
  public function where(string $condition) {
    $this->where_string = "WHERE {$condition}";

    return $this;
  }

   // make this work with prepared statements to protect from injection
  public function or(string $condition) {
    if (isset($this->where_string)) {
      $this->where_string .= "\nOR {$condition}";
    } else {
      // error
    }

    return $this;
  }

   // make this work with prepared statements to protect from injection
  public function and(string $condition) {
    if (isset($this->where_string)) {
      $this->where_string .= "\nAND {$condition}";
    } else {
      // error
    }

    return $this;
  }

  public function getQuery() {
    return "{$this->select_string}\n{$this->from_string}\n{$this->join_string}{$this->where_string};";
  }

  public function execute() {
    echo $this->getQuery();
    return $this->connection->query($this->getQuery())->fetchAll();
  }
}

?>