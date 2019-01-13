var express = require('express');
var router = express.Router();
var ga = require('../ga/ga').ga;
var age = require('../extras/birthday').age;

/* GET page. */
router.get('/:page', function(req, res, next) {
  var params = {
    title: '',
    ga: ga,
    age: age
  };
  switch (req.params.page) {
    case 'es6':
      params.title = 'ES6 Version | Game Designer and Developer | Web Designer and Developer | Portfolio | Eric Tiedeken';
      res.render('es6/index', params);
      break;
    case 'angularjs':
      params.title = 'AngularJS Version | Game Designer and Developer | Web Designer and Developer | Portfolio | Eric Tiedeken';
      res.render('angularjs/index', params);
      break;
    case 'pwa':
      params.title = 'PWA | Game Designer and Developer | Web Designer and Developer | Portfolio | Eric Tiedeken';
      res.render('pwa/index', params);
      break;
    case 'amp':
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
      res.header('AMP-Access-Control-Allow-Source-Origin', 'http://localhost:3000');
      res.render('amp/index', { title: 'AMP Version | Game Designer and Developer | Web Designer and Developer | Portfolio | Eric Tiedeken'});
      break;
    default:
      next();
  }
});

module.exports = router;
