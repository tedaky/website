<?php

namespace api\libs;

class Bootstrap {

  public function __construct() {
    $this->execute();
  }

  /**
   * Execute Bootstrap
   */
  private function execute() {
    // get the url reference
    $url = $this->getURL();

    // URL Query String Parameters
    $queries = $this->getQueries();

    // Reset URL
    $url = $this->resetURL($url);

    // Get the controller
    $controller = $this->getController($url);
    $loadController = $this->loadController($controller);

    // Get the action|method
    $action = $this->getAction($url);

    // Get parameters for action|method
    $params = $this->getParams($url);

    $controllerName = '\\api\\controllers\\' . $controller;
    $theController = new $controllerName;
    $this->loadAction($theController, $action, $params, $queries);
  }

  /**
   * Get Full URL
   * 
   * @return string
   */
  private function getURL(): string {
    return ( isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https': 'http' ) . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  }

  /**
   * Get Query String
   * 
   * @return array
   */
  private function getQueries(): array {
    return $_GET;
  }

  /**
   * Reset API URL
   * 
   * @param string $url
   * @return string
   */
  private function resetURL(string $url): string {
    $url = parse_url($url, PHP_URL_PATH);
    
    // strip away '/api/' from the beginning of url and strip away '/' at the end of url
    $url = ltrim( ltrim( ltrim( rtrim( $url, '/' ), '/' ), 'api' ), '/' );

    return $url;
  }

  /**
   * Get Controller Name
   * 
   * @param string $url
   * @return string
   */
  private function getController(string $url): string {
    $url = explode( '/', $url );
    return ( isset($url[0]) && $url[0] !== '' ) ? $url[0] : 'index';
  }

  /**
   * Load Controller
   * 
   * @param string $controller
   */
  private function loadController(string $controller) {
    // set the controller file to use
    $controllerFile = ROOT . '/controllers/' . $controller . '.php';
    // check if the controller file exists
    if ( !file_exists( $controllerFile ) ) {
      $controllerFile = ROOT . '/controllers/myerror.php';
    }

    require_once $controllerFile;
  }

  /**
   * Get Action Name
   * 
   * @param string $url
   * @return string
   */
  private function getAction(string $url): string {
    $url = explode( '/', $url );
    return ( isset($url[1]) && $url[1] !== '' ) ? $url[1] : 'index'; 
  }

  /**
   * Load Action
   * 
   * @param class $controller
   * @param string $action
   * @param array $params
   * @param array $queries
   */
  private function loadAction($controller, string $action, array $params, array $queries) {
    if ( method_exists( $controller, $action ) ) {
      $controller->{ $action }( $params, $queries );
    } else {
      $controller->index($params, $queries);
    }
  }

  /**
   * Get Action|Method Params
   * 
   * @param string $url
   * @return array
   */
  private function getParams(string $url): array {
    $url = explode( '/', $url );

    if ( isset($url[2]) && $url[2] !== '' ) {
      $temp0 = array_shift($url);
      $temp1 = array_shift($url);
    } else {
      $url = [];
    }

    return $url;
  }

}
