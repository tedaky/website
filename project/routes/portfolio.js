var express = require('express');
var router = express.Router();

/* GET portfolio page. */
router.get('/', function(req, res, next) {
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(req.query));
});

module.exports = router;
