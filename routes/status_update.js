var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/status_update', function(req, res, next) {
  res.render('status_update');
});

module.exports = router;
