<?php
class QueryBuilder {
  private static $conn;

  public static function init() { // allow db params to be args
    $servername = "test_db2"; // name of container on docker network
    $username = "php";
    $password = "1234";
    $dbname = "test_db"; // name of database
    QueryBuilder::$conn = new PDO("mysql:host={$servername};dbname={$dbname};charset=utf8", $username, $password);
  }
  
  public static function select(string $table, array $columns) {
    if (!isset(QueryBuilder::$conn)) {
      die("must call init before querying");
    }
    return new SelectBuilder(QueryBuilder::$conn, $table, $columns);
  }

  public static function insert(string $table, array $column_value) {
    if (!isset(QueryBuilder::$conn)) {
      die("must call init before querying");
    }

    return new InsertBuilder(QueryBuilder::$conn, $table, $column_value);
  }

  public static function update(string $table, array $column_value) {
    if (!isset(QueryBuilder::$conn)) {
      die("must call init before querying");
    }

    return new UpdateBuilder(QueryBuilder::$conn, $table, $column_value);
  }
}

class SelectBuilder {
  private $connection;
  private $select_string;
  private $from_string;
  private $join_string;
  private $where_string;
  private $tokens; // store key value pair
  
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
    // echo $this->getQuery();
    return $this->connection->query($this->getQuery())->fetchAll();
  }
}

class InsertBuilder {
  private $key_strings = '';
  private $value_strings = '';
  private $insert_string;
  private $connection;
  private $data;
  
  public function __construct(PDO $connection, string $table, array $column_value_pair) {
    $this->connection = $connection;
    $this->data = $column_value_pair;
    $this->insert_string = "INSERT INTO {$table}";
    $comma = '';
    foreach ($column_value_pair as $column => $value) {
      $this->key_strings .= "{$comma} {$column}";
      $this->value_strings .= "{$comma} :{$column}";
      $comma = ', ';
    }
  }

  public function getQuery() {
    return "{$this->insert_string} ({$this->key_strings}) VALUES ({$this->value_strings});";
  }

  public function execute() {
    // echo $this->getQuery();
    $stmnt = $this->connection->prepare($this->getQuery());
    if ($stmnt->execute($this->data)) {
      return $this->connection->lastInsertId();
    } else {
      die ($stmnt->errorInfo());
    }
    // $err = $stmnt->errorInfo(); // uncomment to see possible errors
  }
}

class UpdateBuilder {
  private $connection;
  private $update_string;
  private $set_string = '';
  private $filter_string;

  function __construct(PDO $connection, string $table_name, array $data) {
    $this->connection = $connection;
    $this->update_string = "UPDATE {$table_name} SET";
    $comma = '';
    foreach ($data as $column => $value) {
      $this->set_string .= "{$comma}{$table_name}.{$column} = \"{$value}\"";
      $comma = ', ';
    }
  }

  // make this work with prepared statements to protect from injection
  public function where(string $condition) {
    $this->filter_string = "WHERE {$condition}";

    return $this;
  }
  
     // make this work with prepared statements to protect from injection
  public function or(string $condition) {
    if (isset($this->filter_string)) {
      $this->filter_string .= "\nOR {$condition}";
    } else {
      // error
    }

    return $this;
  }
  
     // make this work with prepared statements to protect from injection
  public function and(string $condition) {
    if (isset($this->filter_string)) {
      $this->filter_string .= "\nAND {$condition}";
    } else {
      // error
    }

    return $this;
  }

  public function getQuery() {
    return "{$this->update_string} {$this->set_string} {$this->filter_string};";
  }
  
  public function execute() {
    // echo $this->getQuery();
    return $this->connection->query($this->getQuery());
  }
  
}
?>