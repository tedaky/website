var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('angularjs/index', { title: 'AngularJS Version | Game Designer and Developer | Web Designer and Developer | Portfolio | Eric Tiedeken'});
});

module.exports = router;
