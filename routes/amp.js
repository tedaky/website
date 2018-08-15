var express = require('express');
var router = express.Router();

/* GET home page AMP. */
router.get('/', function(req, res, next) {
  res.render('amp/index', { title: 'AMP Version | Game Designer and Developer | Web Designer and Developer | Portfolio | Eric Tiedeken'});
});

module.exports = router;
