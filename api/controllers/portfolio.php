<?php

namespace api\controllers;

class portfolio extends \api\libs\Controller {
    
  public function __construct() {
    parent::__construct();
  }

  public function Index() { }

  /**
   * Get Collection
   * 
   * @param array|bool $params
   * @param array|bool $queries
   * render json
   */
  public function getCollection( $params = false, $queries = false ) {
    if ( $_SERVER['REQUEST_METHOD'] === 'GET' ) {

      if ( isset($queries['collection']) ) {
        $collection = $queries['collection'];
      } else if ( isset($params[0]) ) {
        $collection = $params[0];
      } else {
        $collection = '';
      }
      if ( !file_exists( ROOT . '/response/c.' . $collection . '.json' ) ) {
        $collection = 'error';
      }

      $results = file_get_contents( ROOT . '/response/c.' . $collection . '.json', FILE_USE_INCLUDE_PATH);
      header('Content-Type: application/json; charset=UTF-8');
      echo $results;
    }
  }

  public function __destruct() { }
}