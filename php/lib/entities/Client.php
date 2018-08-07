<?php
/**
 * Factory for company entity instances from database
 */
class Clients {
  
  // generic enough to be usable by all entities
  private static function fullFind(array $params) {
    $filtered = filter(Client::TABLE_FIELDS, $params);
    // query builder must be included in another file
    $qb = QueryBuilder::select(Client::TABLE_NAME, Client::TABLE_FIELDS);
    $first = true;
    foreach ($filtered as $field => $value) {
      if ($first) {
        $qb->where(Client::TABLE_NAME.".{$field} = \"{$value}\"");
        $first = false;
      } else {
        $qb->and(Client::TABLE_NAME.".{$field} = \"{$value}\"");
      }
    }

    return $qb->execute();
  }
  
  static function find(array $params) {
    $result_data = Clients::fullFind($params)[0];

    return new Client($result_data);
  }

  // TODO create user before creating client
  static function create(array $data) {
    // todo validate data
    $record_id = QueryBuilder::insert(Client::TABLE_NAME, $data)->execute();
    return Clients::find(['id' => $record_id]);
  }

  static function findAll(array $params) {
    $result_data = Clients::fullFind($params);
    $results = [];
    foreach ($result_data as $row) {
      array_push($results, new Client($row));
    }

    return $results;
  }
}

/**
 * Object representation of a Client entity (will become client)
 */
class Client {
  const  TABLE_NAME = 'Client';
  const  TABLE_FIELDS = 
  [
    'id',
    'name',
    'email_domain',
    'user_id'
  ];
  public $id;
  public $name;
  public $email_domain;
  public $user_id;

  function __construct(array $data) {
    $this->id = $data['id'];
    $this->name = $data['name'];
    $this->email_domain = $data['email_domain'];
    $this->user_id = $data['user_id'];
  }

  /**
   * function to update fields of a company based on a given map
   * 
   * this function automatically saves the changes to the database
   */
  public function update(array $data): Client {
    // check which fields are sent by the request
    if (isset($data['name'])) {
      $this->name = $data['name'];
    }
    if (isset($data['email_domain'])) {
      $this->email_domain = $data['email_domain'];
    }
    if (isset($data['user_id'])) {
      $this->user_id = $data['user_id'];
    }
    $this->save();

    return $this;
  }

  /**
   * Function to write fields to database
   * 
   * TODO(QOL) only update "dirty fields"
   */
  public function save(): Client {
    $updata = get_object_vars($this);
    unset($updata['id']); // don't attempt to update id
    
    QueryBuilder::update(Client::TABLE_NAME, $updata)
      ->where("id = \"{$this->id}\"")
      ->execute();
    $this->sync();

    return $this;
  }

  /**
   * function to fetch data from DB and update memebers
   */
  public function sync(): Client {
    $data = QueryBuilder::select(Client::TABLE_NAME, Client::TABLE_FIELDS)
              ->where("id = \"{$this->id}\"")
              ->execute()[0];
    if (!isset($data)) {
      // error (could happen if delete is called  before) for now just short circuit
      return $this;
    }
    $this->id = $data['id'];
    $this->name = $data['name'];
    $this->email_domain = $data['email_domain'];
    $this->user_id = $data['user_id'];

    return $this;
  }

  function delete() {
    QueryBuilder::delete(Client::TABLE_NAME)
      ->where("id = {$this->id}")
      ->execute();
  }

  function toJson(): string {
    return json_encode($this);
  }
}

?>