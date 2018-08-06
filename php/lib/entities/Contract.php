<?php
/**
 * Factory for company entity instances from database
 */
class Contracts {
  
  // generic enough to be usable by all entities
  private static function fullFind(array $params) {
    // query builder must be included in another file
    $qb = QueryBuilder::select(Contract::TABLE_NAME, Contract::TABLE_FIELDS);
    $first = true;
    foreach ($params as $field => $value) {
      if ($first) {
        $qb->where(Contract::TABLE_NAME.".{$field} = \"{$value}\"");
        $first = false;
      } else {
        $qb->and(Contract::TABLE_NAME.".{$field} = \"{$value}\"");
      }
    }

    return $qb->execute();
  }
  
  static function find(array $params) {
    $result_data = Contracts::fullFind($params)[0];

    return new Contract($result_data);
  }

  static function create(array $data) {
    // todo validate data
    $record_id = QueryBuilder::insert(Contract::TABLE_NAME, $data)->execute();
    return Contracts::find(['id' => $record_id]);
  }

  static function findAll(array $params) {
    $result_data = Contracts::fullFind($params);
    $results = [];
    foreach ($result_data as $row) {
      array_push($results, new Contract($row));
    }

    return $results;
  }
}

/**
 * Object representation of a Contract entity (will become client)
 */
class Contract {
  const  TABLE_NAME = 'Contract';
  const  TABLE_FIELDS = 
  [
    'id',
    'acv',
    'initial_amount',
    'recorded_by',
    'start_date',
    'client_satisfaction',
    'department_id',
    'client_id',
    'business_line',
    'contract_type',
    'manager_id'
  ];
  public $id;
  public $acv;
  public $initial_amount;
  public $recorded_by;
  public $start_date;
  public $client_satisfaction;
  public $department_id;
  public $client_id;
  public $business_line;
  public $contract_type;
  public $manager_id;

  function __construct(array $data) {
    $this->id = $data['id'];
    $this->acv = $data['acv'];
    $this->initial_amount = $data['initial_amount'];
    $this->recorded_by = $data['recorded_by'];
    $this->start_date = $data['start_date'];
    $this->client_satisfaction = $data['client_satisfaction'];
    $this->department_id = $data['department_id'];
    $this->client_id = $data['client_id'];
    $this->business_line = $data['business_line'];
    $this->contract_type = $data['contract_type'];
    $this->manager_id = $data['manager_id'];
  }

  /**
   * function to update fields of a company based on a given map
   * 
   * this function automatically saves the changes to the database
   */
  public function update(array $data): Contract {
    // check which fields are sent by the request
    if (isset($data['acv'])) {
      $this->acv = $data['acv'];
    }
    if (isset($data['initial_amount'])) {
      $this->initial_amount = $data['initial_amount'];
    }
    if (isset($data['recorded_by'])) {
      $this->recorded_by = $data['recorded_by'];
    }
    if (isset($data['start_date'])) {
      $this->start_date = $data['start_date'];
    }
    if (isset($data['client_satisfaction'])) {
      $this->client_satisfaction = $data['client_satisfaction'];
    }
    if (isset($data['department_id'])) {
      $this->department_id = $data['department_id'];
    }
    if (isset($data['client_id'])) {
      $this->client_id = $data['client_id'];
    }
    if (isset($data['business_line'])) {
      $this->business_line = $data['business_line'];
    }
    if (isset($data['contract_type'])) {
      $this->contract_type = $data['contract_type'];
    }
    if (isset($data['manager_id'])) {
      $this->manager_id = $data['manager_id'];
    }
    $this->save();

    return $this;
  }

  /**
   * Function to write fields to database
   * 
   * TODO(QOL) only update "dirty fields"
   */
  public function save(): Contract {
    $updata = get_object_vars($this);
    unset($updata['id']); // don't attempt to update id
    
    QueryBuilder::update(Contract::TABLE_NAME, $updata)
      ->where("id = \"{$this->id}\"")
      ->execute();
    $this->sync();

    return $this;
  }

  /**
   * function to fetch data from DB and update memebers
   */
  public function sync(): Contract {
    $data = QueryBuilder::select(Contract::TABLE_NAME, Contract::TABLE_FIELDS)
              ->where("id = \"{$this->id}\"")
              ->execute()[0];
    if (!isset($data)) {
      // error (could happen if delete is called  before) for now just short circuit
      return $this;
    }
    $this->id = $data['id'];
    $this->acv = $data['acv'];
    $this->initial_amount = $data['initial_amount'];
    $this->recorded_by = $data['recorded_by'];
    $this->start_date = $data['start_date'];
    $this->client_satisfaction = $data['client_satisfaction'];
    $this->department_id = $data['department_id'];
    $this->client_id = $data['client_id'];
    $this->business_line = $data['business_line'];
    $this->contract_type = $data['contract_type'];
    $this->manager_id = $data['manager_id'];

    return $this;
  }

  public function getHours() {
    return WorkLogs::findAll(["contract_id" => $this->id]);
  }

  public function getManager() {
    return Managers::find(["id" => $this->manager_id]);
  }

  public function addHours(string $employee_id, Date $date, string $hours) {

  }

  function delete() {
    QueryBuilder::delete(Contract::TABLE_NAME)
      ->where("id = {$this->id}")
      ->execute();
  }

  function toJson(): string {
    return json_encode($this);
  }
}

?>