<?php
/**
 * Factory for User entity instances from database
 */
class Users {
  
  // generic enough to be usable by all entities
  private static function fullFind(array $params) {
    $filtered = filter(User::TABLE_FIELDS, $params);
    // query builder must be included in another file
    $qb = QueryBuilder::select(User::TABLE_NAME, User::TABLE_FIELDS);
    $first = true;
    foreach ($filtered as $field => $value) {
      if ($first) {
        $qb->where(User::TABLE_NAME.".{$field} = \"{$value}\"");
        $first = false;
      } else {
        $qb->and(User::TABLE_NAME.".{$field} = \"{$value}\"");
      }
    }

    return $qb->execute();
  }
  
  static function find(array $params) {
    $result_data = Users::fullFind($params)[0];

    return new User($result_data);
  }

  static function create(array $data) {
    // todo validate data
    $record_id = QueryBuilder::insert(User::TABLE_NAME, $data)->execute();
    return Users::find(['id' => $record_id]);
  }

  static function findAll(array $params) {
    $result_data = Users::fullFind($params);
    $results = [];
    foreach ($result_data as $row) {
      array_push($results, new User($row));
    }

    return $results;
  }
}

/**
 * Object representation of a Company entity (will become client)
 */
class User {
  const  TABLE_NAME = 'User';
  const  TABLE_FIELDS = 
  [
    'id',
    'username',
    'password',
    'is_admin',
    'role'
  ];
  public $id;
  public $username;
  // public $password;
  public $is_admin;
  public $role;

  function __construct(array $data) {
    $this->id = $data['id'];
    $this->username = $data['username'];
    // $this->password = $data['password'];
    $this->is_admin = $data['is_admin'];
    $this->role = $data['role']; // eager load?
  }

  /**
   * function to update fields of a company based on a given map
   * 
   * this function automatically saves the changes to the database
   */
  public function update(array $data): Company {
    // check which fields are sent by the request
    if (isset($data['username'])) {
      $this->username = $data['username'];
    }
    // if (isset($data['password'])) {
    //   $this->city = $data['password'];
    // }
    if (isset($data['is_admin'])) {
      $this->is_admin = $data['is_admin'];
    }
    if (isset($data['role'])) {
      $this->role = $data['role'];
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
    
    QueryBuilder::update(User::TABLE_NAME, $updata)
      ->where("id = \"{$this->id}\"")
      ->execute();
    $this->sync();

    return $this;
  }

  /**
   * function to fetch data from DB and update memebers
   */
  public function sync(): User {
    $data = QueryBuilder::select(User::TABLE_NAME, User::TABLE_FIELDS)
              ->where("id = \"{$this->id}\"")
              ->execute()[0];
    if (!isset($data)) {
      // error (could happen if delete is called  before) for now just short circuit
      return $this;
    }
    $this->id = $data['id'];
    $this->username = $data['username'];
    // $this->password = $data['password'];
    $this->is_admin = $data['is_admin'];
    $this->role = $data['role']; // eager load?

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