<?php
/**
 * Factory for company entity instances from database
 */
class Departments {
  
  // generic enough to be usable by all entities
  private static function fullFind(array $params) {
    $filtered = filter(Department::TABLE_FIELDS, $params);
    // query builder must be included in another file
    $qb = QueryBuilder::select(Department::TABLE_NAME, Department::TABLE_FIELDS);
    $first = true;
    foreach ($filtered as $field => $value) {
      if ($first) {
        $qb->where(Department::TABLE_NAME.".{$field} = \"{$value}\"");
        $first = false;
      } else {
        $qb->and(Department::TABLE_NAME.".{$field} = \"{$value}\"");
      }
    }

    return $qb->execute();
  }
  
  static function find(array $params) {
    $result_data = Departments::fullFind($params)[0];

    return new Department($result_data);
  }

  static function create(array $data) {
    // todo validate data
    $record_id = QueryBuilder::insert(Department::TABLE_NAME, $data)->execute();
    return Departments::find(['id' => $record_id]);
  }

  static function findAll(array $params) {
    $result_data = Departments::fullFind($params);
    $results = [];
    foreach ($result_data as $row) {
      array_push($results, new Department($row));
    }

    return $results;
  }
}

/**
 * Object representation of a Department entity (will become client)
 */
class Department {
  const  TABLE_NAME = 'Department';
  const  TABLE_FIELDS = 
  [
    'id',
    'name',
    'service_type'
  ];
  public $id;
  public $name;
  public $service_type;

  function __construct(array $data) {
    $this->id = $data['id'];
    $this->name = $data['name'];
    $this->service_type = $data['service_type'];
  }

  /**
   * function to update fields of a company based on a given map
   * 
   * this function automatically saves the changes to the database
   */
  public function update(array $data): Department {
    // check which fields are sent by the request
    if (isset($data['name'])) {
      $this->name = $data['name'];
    }
    if (isset($data['service_type'])) {
      $this->service_type = $data['service_type'];
    }
    $this->save();

    return $this;
  }

  /**
   * Function to write fields to database
   * 
   * TODO(QOL) only update "dirty fields"
   */
  public function save(): Department {
    $updata = get_object_vars($this);
    unset($updata['id']); // don't attempt to update id
    
    QueryBuilder::update(Department::TABLE_NAME, $updata)
      ->where("id = \"{$this->id}\"")
      ->execute();
    $this->sync();

    return $this;
  }

  /**
   * function to fetch data from DB and update memebers
   */
  public function sync(): Department {
    $data = QueryBuilder::select(Department::TABLE_NAME, Department::TABLE_FIELDS)
              ->where("id = \"{$this->id}\"")
              ->execute()[0];
    if (!isset($data)) {
      // error (could happen if delete is called  before) for now just short circuit
      return $this;
    }
    $this->id = $data['id'];
    $this->name = $data['name'];
    $this->service_type = $data['service_type'];
    
    return $this;
  }

  function delete() {
    QueryBuilder::delete(Department::TABLE_NAME)
      ->where("id = {$this->id}")
      ->execute();
  }

  function toJson(): string {
    return json_encode($this);
  }
}

?>