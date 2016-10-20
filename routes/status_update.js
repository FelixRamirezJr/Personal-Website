var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('status_update',{errors: ""});
});

module.exports = router;
