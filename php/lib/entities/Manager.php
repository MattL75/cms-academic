<?php
/**
 * Factory for Manager entity instances from database
 */
class Managers {
  
  // generic enough to be usable by all entities
  private static function fullFind(array $params) {
    $filtered = filter(Manager::TABLE_FIELDS, $params);
    // query builder must be included in another file
    $qb = QueryBuilder::select(Manager::TABLE_NAME, Manager::TABLE_FIELDS)
          ->join(Employee::TABLE_NAME, Employee::TABLE_FIELDS, 'Employee.id', 'Manager.id')
          ->join('Insurance_Plan', ["rate"], 'insurance_type', 'type');
    $first = true;
    foreach ($filtered as $field => $value) {
      if ($first) {
        $qb->where(Manager::TABLE_NAME.".{$field} = \"{$value}\"");
        $first = false;
      } else {
        $qb->and(Manager::TABLE_NAME.".{$field} = \"{$value}\"");
      }
    }

    return $qb->execute();
  }
  
  static function find(array $params) {
    $result_data = Managers::fullFind($params)[0];

    return new Manager($result_data);
  }

  // should have an employee record already created
  static function create(array $data) {
    // todo validate data
    $record_id = QueryBuilder::insert(Manager::TABLE_NAME, $data)->execute(); // data must include employee id
    return Managers::find(['id' => $record_id]);
  }

  static function findAll(array $params) {
    $result_data = Managers::fullFind($params);
    $results = [];
    foreach ($result_data as $row) {
      array_push($results, new Manager($row));
    }

    return $results;
  }
}

/**
 * Object representation of a Manager entity (will become client)
 */
class Manager {
  const  TABLE_NAME = 'Manager';
  const  TABLE_FIELDS = 
  [
    'id',
    'email',
    'phone_number',
    'middle_initial'
  ];
  public $id;
  public $first_name;
  public $middle_initial;
  public $last_name;
  public $department_id;
  public $insurance_type;
  public $insurance_rate;
  public $province_name;
  public $phone_number;
  public $email;
  public $rating;

  function __construct(array $data) {
    $this->id = $data['id'];
    $this->first_name = $data['first_name'];
    $this->middle_initial = $data['middle_initial'];
    $this->last_name = $data['last_name'];
    $this->department_id = $data['department_id'];
    $this->insurance_type = $data['insurance_type'];
    $this->insurance_rate = $data['rate'];
    $this->province_name = $data['province_name'];
    $this->phone_number = $data['phone_number'];
    $this->email = $data['email'];
    $this->rating = $this->getRating();
  }

  /**
   * function to update fields of a Manager based on a given map
   * 
   * this function automatically saves the changes to the database
   */
  public function update(array $data): Manager {
    // check which fields are sent by the request
    if (isset($data['first_name'])) {
      $this->first_name = $data['first_name'];
    }
    if (isset($data['middle_initial'])) {
      $this->middle_initial = $data['middle_initial'];
    }
    if (isset($data['last_name'])) {
      $this->last_name = $data['last_name'];
    }
    if (isset($data['department_id'])) {
      $this->department_id = $data['department_id'];
    }
    if (isset($data['insurance_type'])) {
      $this->insurance_type = $data['insurance_type'];
    }
    if (isset($data['province_name'])) {
      $this->province_name = $data['province_name'];
    }
    if (isset($data['email'])) {
      $this->email = $data['email'];
    }
    if (isset($data['phone_number'])) {
      $this->phone_number = $data['phone_number'];
    }
    $this->save();

    return $this;
  }

  /**
   * Function to write fields to database
   * 
   * TODO(QOL) only update "dirty fields"
   */
  public function save(): Manager {
    $manager_updata = ['email' => $this->email, 'phone_number' => $this->phone_number, 'middle_initial' => $this->middle_initial];
    $employee_updata = get_object_vars($this);
    unset($employee_updata['id']); // don't attempt to update id
    unset($employee_updata['email']); // don't attempt to update id
    unset($employee_updata['phone_number']); // don't attempt to update id
    unset($employee_updata['middle_initial']); // don't attempt to update id
    // update manager and employee record
    QueryBuilder::update(Manager::TABLE_NAME, $manager_updata)
      ->where("id = \"{$this->id}\"")
      ->execute();
    QueryBuilder::update(Employee::TABLE_NAME, $employee_updata)
      ->where("id = \"{$this->id}\"")
      ->execute();
    $this->sync();

    return $this;
  }

  public function getEmployees() {
    $results = QueryBuilder::select(Employee::TABLE_NAME, Employee::TABLE_FIELDS)
                ->join("Supervises", [], "employee_id", "Employee.id")
                ->join("Insurance_Plan", ["rate"], "type", "insurance_type")
                ->where("manager_id = \"{$this->id}\"")->execute();
    $employees = [];
    foreach ($results as $emp) {
      array_push($employees, new Employee($emp));
    }

    return $employees;
  }

  public function addEmployee(string $employee_id) {
    QueryBuilder::insert("Supervises", ["manager_id"=>"{$this->id}", "employee_id" => "{$employee_id}"])->execute();
  }

  public function removeEmployee(string $employee_id) {
    QueryBuilder::delete("Supervises")
    ->where("manager_id = \"{$this->id}\"")
    ->and("employee_id = \"{$employee_id}\"")
    ->execute();
  }

  public function getContracts() {
    return Contracts::findAll(["manager_id" => $this->id]);
  }

  public function addContract(string $contract_id) {
    Contracts::find(["id" => $contract_id])->update(["manager_id" => $this->id]);
  }

  public function getRating() {
    $result = QueryBuilder::select(Contract::TABLE_NAME, ["AVG(client_satisfaction)"])
      ->where("manager_id = {$this->id}")
      ->groupBy("manager_id")
      ->execute();
      
    return $result["0"]["0"];
  }

  /**
   * function to fetch data from DB and update memebers
   */
  public function sync(): Manager {
    $data = QueryBuilder::select(Manager::TABLE_NAME, Manager::TABLE_FIELDS)
              ->join(Employee::TABLE_NAME, Employee::TABLE_FIELDS, 'Employee.id', 'Manager.id')
              ->where("Manager.id = \"{$this->id}\"")
              ->execute()[0];
    if (!isset($data)) {
      // error (could happen if delete is called  before) for now just short circuit
      return $this;
    }
    $this->id = $data['id'];
    $this->first_name = $data['first_name'];
    $this->middle_initial = $data['middle_initial'];
    $this->last_name = $data['last_name'];
    $this->department_id = $data['department_id'];
    $this->insurance_type = $data['insurance_type'];
    $this->insurance_rate = $data['rate'];
    $this->province_name = $data['province_name'];
    $this->phone_number = $data['phone_number'];
    $this->email = $data['email'];
    $this->rating = $this->getRating();

    return $this;
  }

  function delete() {
    QueryBuilder::delete(Manager::TABLE_NAME)
      ->where("id = {$this->id}")
      ->execute();
  }

  function toJson(): string {
    return json_encode($this);
  }
}

?>