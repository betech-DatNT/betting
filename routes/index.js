var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('backend/home/index', { title: 'this admin'});
});

module.exports = router;
