<?php
/**
 * Factory for Employee entity instances from database
 */
class Employees {
  
  // generic enough to be usable by all entities
  private static function fullFind(array $params) {
    // query builder must be included in another file
    $qb = QueryBuilder::select(Employee::TABLE_NAME, Employee::TABLE_FIELDS);
    $first = true;
    foreach ($params as $field => $value) {
      if ($first) {
        $qb->where(Employee::TABLE_NAME.".{$field} = \"{$value}\"");
        $first = false;
      } else {
        $qb->and(Employee::TABLE_NAME.".{$field} = \"{$value}\"");
      }
    }

    return $qb->execute();
  }
  
  static function find(array $params) {
    $result_data = Employees::fullFind($params)[0];

    return new Employee($result_data);
  }

  // TODO create user before creating client
  static function create(array $data) {
    // todo validate data
    $record_id = QueryBuilder::insert(Employee::TABLE_NAME, $data)->execute();
    return Employees::find(['id' => $record_id]);
  }

  static function findAll(array $params) {
    $result_data = Employees::fullFind($params);
    $results = [];
    foreach ($result_data as $row) {
      array_push($results, new Employee($row));
    }

    return $results;
  }
}

/**
 * Object representation of a Employee entity (will become client)
 */
class Employee {
  const  TABLE_NAME = 'Employee';
  const  TABLE_FIELDS = 
  [
    'id',
    'first_name',
    'last_name',
    'department_id',
    'insurance_type',
    'province_name',
    'user_id'
  ];
  public $id;
  public $first_name;
  public $last_name;
  public $department_id;
  public $insurance_type;
  public $province_name;
  public $user_id;

  function __construct(array $data) {
    $this->id = $data['id'];
    $this->first_name = $data['first_name'];
    $this->last_name = $data['last_name'];
    $this->department_id = $data['department_id'];
    $this->insurance_type = $data['insurance_type'];
    $this->province_name = $data['province_name'];
    $this->user_id = $data['user_id'];
  }

  /**
   * function to update fields of a Employee based on a given map
   * 
   * this function automatically saves the changes to the database
   */
  public function update(array $data): Employee {
    // check which fields are sent by the request
    if (isset($data['first_name'])) {
      $this->name = $data['first_name'];
    }
    if (isset($data['last_name'])) {
      $this->city = $data['last_name'];
    }
    if (isset($data['department_id'])) {
      $this->postal_code = $data['department_id'];
    }
    if (isset($data['insurance_type'])) {
      $this->address = $data['insurance_type'];
    }
    if (isset($data['province_name'])) {
      $this->province = $data['province_name'];
    }
    if (isset($data['user_id'])) {
      $this->email_id = $data['user_id'];
    }
    $this->save();

    return $this;
  }

  /**
   * Function to write fields to database
   * 
   * TODO(QOL) only update "dirty fields"
   */
  public function save(): Employee {
    $updata = get_object_vars($this);
    unset($updata['id']); // don't attempt to update id
    
    QueryBuilder::update(Employee::TABLE_NAME, $updata)
      ->where("id = \"{$this->id}\"")
      ->execute();
    $this->sync();

    return $this;
  }

  /**
   * function to fetch data from DB and update memebers
   */
  public function sync(): Employee {
    $data = QueryBuilder::select(Employee::TABLE_NAME, Employee::TABLE_FIELDS)
              ->where("id = \"{$this->id}\"")
              ->execute()[0];
    if (!isset($data)) {
      // error (could happen if delete is called  before) for now just short circuit
      return $this;
    }
    $this->id = $data['id'];
    $this->first_name = $data['first_name'];
    $this->last_name = $data['last_name'];
    $this->department_id = $data['department_id'];
    $this->insurance_type = $data['insurance_type'];
    $this->province_name = $data['province_name'];
    $this->user_id = $data['user_id'];

    return $this;
  }

  function delete() {
    QueryBuilder::delete(Employee::TABLE_NAME)
      ->where("id = {$this->id}")
      ->execute();
  }

  function toJson(): string {
    return json_encode($this);
  }
}

?>