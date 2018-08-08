<?php
/**
 * Factory for SalesAssociate entity instances from database
 */
class SalesAssociates {
  
  // generic enough to be usable by all entities
  private static function fullFind(array $params) {
    $filtered = filter(SalesAssociate::TABLE_FIELDS, $params);
    // query builder must be included in another file
    $qb = QueryBuilder::select(SalesAssociate::TABLE_NAME, SalesAssociate::TABLE_FIELDS);
    $first = true;
    foreach ($filtered as $field => $value) {
      if ($first) {
        $qb->where(SalesAssociate::TABLE_NAME.".{$field} = \"{$value}\"");
        $first = false;
      } else {
        $qb->and(SalesAssociate::TABLE_NAME.".{$field} = \"{$value}\"");
      }
    }

    return $qb->execute();
  }
  
  static function find(array $params) {
    $result_data = SalesAssociates::fullFind($params)[0];

    return new SalesAssociate($result_data);
  }

  static function create(array $data) {
    // todo validate data
    $record_id = QueryBuilder::insert(SalesAssociate::TABLE_NAME, $data)->execute();
    return SalesAssociates::find(['id' => $record_id]);
  }

  static function findAll(array $params) {
    $result_data = SalesAssociates::fullFind($params);
    $results = [];
    foreach ($result_data as $row) {
      array_push($results, new SalesAssociate($row));
    }

    return $results;
  }
}

/**
 * Object representation of a SalesAssociate entity (will become client)
 */
class SalesAssociate {
  const  TABLE_NAME = 'Sales_Associate';
  const  TABLE_FIELDS = 
  [
    'id',
    'first_name',
    'last_name'
  ];
  public $id;
  public $first_name;
  public $last_name;
  
  function __construct(array $data) {
    $this->id = $data['id'];
    $this->first_name = $data['first_name'];
    $this->last_name = $data['last_name'];
  }

  /**
   * function to update fields of a SalesAssociate based on a given map
   * 
   * this function automatically saves the changes to the database
   */
  public function update(array $data): SalesAssociate {
    // check which fields are sent by the request
    if (isset($data['name'])) {
      $this->name = $data['name'];
    }
    if (isset($data['first_name'])) {
      $this->first_name = $data['first_name'];
    }
    if (isset($data['last_name'])) {
      $this->last_name = $data['last_name'];
    }
    
    $this->save();

    return $this;
  }

  /**
   * Function to write fields to database
   * 
   * TODO(QOL) only update "dirty fields"
   */
  public function save(): SalesAssociate {
    $updata = get_object_vars($this);
    unset($updata['id']); // don't attempt to update id
    
    QueryBuilder::update(SalesAssociate::TABLE_NAME, $updata)
      ->where("id = \"{$this->id}\"")
      ->execute();
    $this->sync();

    return $this;
  }

  /**
   * function to fetch data from DB and update memebers
   */
  public function sync(): SalesAssociate {
    $data = QueryBuilder::select(SalesAssociate::TABLE_NAME, SalesAssociate::TABLE_FIELDS)
              ->where("id = \"{$this->id}\"")
              ->execute()[0];
    if (!isset($data)) {
      // error (could happen if delete is called  before) for now just short circuit
      return $this;
    }
    $this->id = $data['id'];
    $this->first_name = $data['first_name'];
    $this->last_name = $data['last_name'];

    return $this;
  }

  function delete() {
    QueryBuilder::delete(SalesAssociate::TABLE_NAME)
      ->where("id = {$this->id}")
      ->execute();
  }

  function toJson(): string {
    return json_encode($this);
  }
}
?>