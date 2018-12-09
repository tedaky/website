var express = require('express');
var router = express.Router();

/* GET home page AMP. */
router.get('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
  res.header('AMP-Access-Control-Allow-Source-Origin', 'http://localhost:3000');
  res.render('amp/index', { title: 'AMP Version | Game Designer and Developer | Web Designer and Developer | Portfolio | Eric Tiedeken'});
});

module.exports = router;
