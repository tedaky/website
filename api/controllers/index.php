<?php

namespace api\controllers;

class index extends \api\libs\Controller {
    
  function __construct() {
    parent::__construct();
  }
  
  function index() {
    phpinfo();
  }

  function __destruct() { }
}