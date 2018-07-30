<?php

class Companies {
  
  // generic enough to be usable by all entities
  private static function fullFind(array $params) {
    $qb = QueryBuilder::select(Company::$TABLE_NAME, Company::$TABLE_FIELDS);
    $first = true;
    foreach ($params as $field => $value) {
      if ($first) {
        $qb->where(Company::$TABLE_NAME.".{$field} = \"{$value}\"");
        $first = false;
      } else {
        $qb->and(Company::$TABLE_NAME.".{$field} = \"{$value}\"");
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
    $record_id = QueryBuilder::insert(Company::$TABLE_NAME, $data)->execute();
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

class Company {
  public static $TABLE_NAME = 'Company';
  public static $TABLE_FIELDS = 
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

  public function update(array $data) {
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
  }

  public function save() {
    $updata = get_object_vars($this);
    unset($updata['id']); // don't attempt to update id
    
    QueryBuilder::update(Company::$TABLE_NAME, $updata)
      ->where("id = \"{$this->id}\"")
      ->execute();
    $this->sync();
  }

  public function sync() {
    $data = QueryBuilder::select(Company::$TABLE_NAME, Company::$TABLE_FIELDS)
              ->where("id = \"{$this->id}\"")
              ->execute()[0];
    $this->id = $data['id'];
    $this->name = $data['name'];
    $this->city = $data['city'];
    $this->postal_code = $data['postal_code'];
    $this->address = $data['address'];
    $this->province = $data['province'];
    $this->email_id = $data['email_id'];
  }

  function toJson() {
    return json_encode(get_object_vars($this));
  }
}

?>