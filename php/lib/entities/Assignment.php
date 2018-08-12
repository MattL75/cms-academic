<?php
/**
 * Factory for company entity instances from database
 */
class Assignments {
  
  // generic enough to be usable by all entities
  private static function fullFind(array $params) {
    $filtered = filter(Assignment::TABLE_FIELDS, $params);
    // query builder must be included in another file
    $qb = QueryBuilder::select(Assignment::TABLE_NAME, Assignment::TABLE_FIELDS);
    $first = true;
    foreach ($filtered as $field => $value) {
      if ($first) {
        $qb->where(Assignment::TABLE_NAME.".{$field} = \"{$value}\"");
        $first = false;
      } else {
        $qb->and(Assignment::TABLE_NAME.".{$field} = \"{$value}\"");
      }
    }

    return $qb->execute();
  }
  
  static function find(array $params) {
    $result_data = Assignments::fullFind($params)[0];

    return new Assignment($result_data);
  }

  static function create(array $data) {
    // todo validate data
    $record_id = QueryBuilder::insert(Assignment::TABLE_NAME, $data)->execute();
    return Assignments::find(['id' => $record_id]);
  }

  static function findAll(array $params) {
    $result_data = Assignments::fullFind($params);
    $results = [];
    foreach ($result_data as $row) {
      array_push($results, new Assignment($row));
    }

    return $results;
  }
}

/**
 * Object representation of a Assignment entity (will become client)
 */
class Assignment {
  const  TABLE_NAME = 'Assignment';
  const  TABLE_FIELDS = 
  [
    'id',
    'is_active',
    'contract_id',
    'employee_id'
  ];
  public $id;
  public $is_active;
  public $contract_id;
  public $employee_id;

  function __construct(array $data) {
    $this->id = $data['id'];
    $this->is_active = $data['is_active'];
    $this->contract_id = $data['contract_id'];
    $this->employee_id = $data['employee_id'];
  }

  /**
   * function to update fields of a company based on a given map
   * 
   * this function automatically saves the changes to the database
   */
  public function update(array $data): Assignment {
    // check which fields are sent by the request
    if (isset($data['is_active'])) {
      $this->is_active = $data['is_active'];
    }
    if (isset($data['contract_id'])) {
      $this->contract_id = $data['contract_id'];
    }
    if (isset($data['employee_id'])) {
      $this->employee_id = $data['employee_id'];
    }
    $this->save();

    return $this;
  }

  /**
   * Function to write fields to database
   * 
   * TODO(QOL) only update "dirty fields"
   */
  public function save(): Assignment {
    $updata = get_object_vars($this);
    unset($updata['id']); // don't attempt to update id
    
    QueryBuilder::update(Assignment::TABLE_NAME, $updata)
      ->where("id = \"{$this->id}\"")
      ->execute();
    $this->sync();

    return $this;
  }

  /**
   * function to fetch data from DB and update memebers
   */
  public function sync(): Assignment {
    $data = QueryBuilder::select(Assignment::TABLE_NAME, Assignment::TABLE_FIELDS)
              ->where("id = \"{$this->id}\"")
              ->execute()[0];
    if (!isset($data)) {
      // error (could happen if delete is called  before) for now just short circuit
      return $this;
    }
    $this->id = $data['id'];
    $this->is_active = $data['is_active'];
    $this->contract_id = $data['contract_id'];
    $this->employee_id = $data['employee_id'];

    return $this;
  }

  function delete() {
    QueryBuilder::delete(Assignment::TABLE_NAME)
      ->where("id = {$this->id}")
      ->execute();
  }

  function toJson(): string {
    return json_encode($this);
  }
}
?>