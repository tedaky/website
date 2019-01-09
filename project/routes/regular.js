var express = require('express');
var router = express.Router();
var ga = require('../ga').ga;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('regular/index', {
    title: 'Translated JavaScript | Game Designer and Developer | Web Designer and Developer | Portfolio | Eric Tiedeken',
    ga: ga
  });
});

module.exports = router;
