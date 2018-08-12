<?php
/**
 * Factory for WorkLog entity instances from database
 */
class WorkLogs {
  
  // generic enough to be usable by all entities
  private static function fullFind(array $params) {
    $filtered = filter(WorkLog::TABLE_FIELDS, $params);
    // query builder must be included in another file
    $qb = QueryBuilder::select(WorkLog::TABLE_NAME, WorkLog::TABLE_FIELDS)
      ->join(Assignment::TABLE_NAME, ["employee_id"], "Assignment.id", "assignment_id");
    $first = true;
    foreach ($filtered as $field => $value) {
      if ($first) {
        $qb->where(WorkLog::TABLE_NAME.".{$field} = \"{$value}\"");
        $first = false;
      } else {
        $qb->and(WorkLog::TABLE_NAME.".{$field} = \"{$value}\"");
      }
    }

    return $qb->execute();
  }
  
  static function find(array $params) {
    $result_data = WorkLogs::fullFind($params)[0];

    return new WorkLog($result_data);
  }

  static function create(array $data) {
    $filtered = filter(WorkLog::TABLE_FIELDS, $data);
    // todo validate data
    $record_id = QueryBuilder::insert(WorkLog::TABLE_NAME, $filtered)->execute();
    return WorkLogs::find(['id' => $record_id]);
  }

  static function findAll(array $params) {
    $result_data = WorkLogs::fullFind($params);
    $results = [];
    foreach ($result_data as $row) {
      array_push($results, new WorkLog($row));
    }

    return $results;
  }
}

/**
 * Object representation of a WorkLog entity (will become client)
 */
class WorkLog {
  const  TABLE_NAME = 'Work_Log';
  const  TABLE_FIELDS = 
  [
    'id',
    'date_worked',
    'hours_worked',
    'assignment_id'
  ];
  public $id;
  public $date_worked;
  public $hours_worked;
  public $assignment_id;

  function __construct(array $data) {
    $this->id = $data['id'];
    $this->date_worked = $data['date_worked'];
    $this->hours_worked = $data['hours_worked'];
    $this->assignment_id = $data['assignment_id'];
    $this->employee_id = $data['employee_id'];
  }

  /**
   * function to update fields of a WorkLog based on a given map
   * 
   * this function automatically saves the changes to the database
   */
  public function update(array $data): WorkLog {
    // check which fields are sent by the request
    if (isset($data['date_worked'])) {
      $this->date_worked = $data['date_worked'];
    }
    if (isset($data['hours_worked'])) {
      $this->hours_worked = $data['hours_worked'];
    }
    if (isset($data['assignment_id'])) {
      $this->assignment_id = $data['assignment_id'];
    }
    $this->save();

    return $this;
  }

  /**
   * Function to write fields to database
   * 
   * TODO(QOL) only update "dirty fields"
   */
  public function save(): WorkLog {
    $updata = get_object_vars($this);
    unset($updata['id']); // don't attempt to update id
    unset($updata['employee_id']); // don't attempt to update id
    
    QueryBuilder::update(WorkLog::TABLE_NAME, $updata)
      ->where("id = \"{$this->id}\"")
      ->execute();
    $this->sync();

    return $this;
  }

  function getContract() {
    QueryBuilder::select(Contract::TABLE_NAME, Contract::TABLE_FIELDS)
      ->join("Assignment", [], "Contract.id", "contract_id");
  }

  /**
   * function to fetch data from DB and update memebers
   */
  public function sync(): WorkLog {
    $data = QueryBuilder::select(WorkLog::TABLE_NAME, WorkLog::TABLE_FIELDS)
              ->where("id = \"{$this->id}\"")
              ->execute()[0];
    if (!isset($data)) {
      // error (could happen if delete is called  before) for now just short circuit
      return $this;
    }
    $this->id = $data['id'];
    $this->employee_id = $data['employee_id'];
    $this->date_worked = $data['date_worked'];
    $this->hours_worked = $data['hours_worked'];
    $this->assignment_id = $data['assignment_id'];

    return $this;
  }

  function delete() {
    QueryBuilder::delete(WorkLog::TABLE_NAME)
      ->where("id = {$this->id}")
      ->execute();
  }

  function toJson(): string {
    return json_encode($this);
  }
}

?>