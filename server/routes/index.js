var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({message: 'Welcome to my REST API'});
});

module.exports = router;
