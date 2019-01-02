<?php

define( 'ROOT', __DIR__ );

require_once( ROOT . '/polyfills/apache.request.headers.php' );
require_once( ROOT . '/libs/Bootstrap.php' );
require_once( ROOT . '/libs/Controller.php' );

$app = new api\libs\Bootstrap();
