<?php
/**
 * Factory for company entity instances from database
 */
class Companies {
  
  // generic enough to be usable by all entities
  private static function fullFind(array $params) {
    $filtered = filter(Company::TABLE_FIELDS, $params);
    // query builder must be included in another file
    $qb = QueryBuilder::select(Company::TABLE_NAME, Company::TABLE_FIELDS);
    $first = true;
    foreach ($filtered as $field => $value) {
      if ($first) {
        $qb->where(Company::TABLE_NAME.".{$field} = \"{$value}\"");
        $first = false;
      } else {
        $qb->and(Company::TABLE_NAME.".{$field} = \"{$value}\"");
      }
    }

    return $qb->execute();
  }
  
  static function find(array $params) {
    $result_data = Companies::fullFind($params)[0];

    return new Company($result_data);
  }

  static function create(array $data) {
    // todo validate data
    $record_id = QueryBuilder::insert(Company::TABLE_NAME, $data)->execute();
    return Companies::find(['id' => $record_id]);
  }

  static function findAll(array $params) {
    $result_data = Companies::fullFind($params);
    $results = [];
    foreach ($result_data as $row) {
      array_push($results, new Company($row));
    }

    return $results;
  }
}

/**
 * Object representation of a Company entity (will become client)
 */
class Company {
  const  TABLE_NAME = 'Company';
  const  TABLE_FIELDS = 
  [
    'id',
    'name',
    'city',
    'postal_code',
    'address',
    'province',
    'email_id'
  ];
  public $id;
  public $name;
  public $city;
  public $postal_code;
  public $address;
  public $province;
  public $email_id;

  function __construct(array $data) {
    $this->id = $data['id'];
    $this->name = $data['name'];
    $this->city = $data['city'];
    $this->postal_code = $data['postal_code'];
    $this->address = $data['address'];
    $this->province = $data['province'];
    $this->email_id = $data['email_id'];
  }

  /**
   * function to update fields of a company based on a given map
   * 
   * this function automatically saves the changes to the database
   */
  public function update(array $data): Company {
    // check which fields are sent by the request
    if (isset($data['name'])) {
      $this->name = $data['name'];
    }
    if (isset($data['city'])) {
      $this->city = $data['city'];
    }
    if (isset($data['postal_code'])) {
      $this->postal_code = $data['postal_code'];
    }
    if (isset($data['address'])) {
      $this->address = $data['address'];
    }
    if (isset($data['province'])) {
      $this->province = $data['province'];
    }
    if (isset($data['email_id'])) {
      $this->email_id = $data['email_id'];
    }
    $this->save();

    return $this;
  }

  /**
   * Function to write fields to database
   * 
   * TODO(QOL) only update "dirty fields"
   */
  public function save(): Company {
    $updata = get_object_vars($this);
    unset($updata['id']); // don't attempt to update id
    
    QueryBuilder::update(Company::TABLE_NAME, $updata)
      ->where("id = \"{$this->id}\"")
      ->execute();
    $this->sync();

    return $this;
  }

  /**
   * function to fetch data from DB and update memebers
   */
  public function sync(): Company {
    $data = QueryBuilder::select(Company::TABLE_NAME, Company::TABLE_FIELDS)
              ->where("id = \"{$this->id}\"")
              ->execute()[0];
    if (!isset($data)) {
      // error (could happen if delete is called  before) for now just short circuit
      return $this;
    }
    $this->id = $data['id'];
    $this->name = $data['name'];
    $this->city = $data['city'];
    $this->postal_code = $data['postal_code'];
    $this->address = $data['address'];
    $this->province = $data['province'];
    $this->email_id = $data['email_id'];

    return $this;
  }

  function delete() {
    QueryBuilder::delete(Company::TABLE_NAME)
      ->where("id = {$this->id}")
      ->execute();
  }

  function toJson(): string {
    return json_encode($this);
  }
}
?>