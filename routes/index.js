var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Game Designer and Developer | Web Designer and Developer | Portfolio | Eric Tiedeken'});
});

/* GET home page AMP. */
router.get('/amp/', function(req, res, next) {
  res.render('amp_index', { title: 'Hello, AMPs'});
});

module.exports = router;
