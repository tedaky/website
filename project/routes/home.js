var express = require('express');
var router = express.Router();
var ga = require('../ga/ga').ga;
var age = require('../extras/birthday').age;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index', {
    title: 'Translated JavaScript | Game Designer and Developer | Web Designer and Developer | Portfolio | Eric Tiedeken',
    ga: ga,
    age: age
  });
});

module.exports = router;
