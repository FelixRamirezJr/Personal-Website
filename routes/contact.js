var express = require('express');
var router = express.Router();

/* GET me page. */
var sendgrid = require('sendgrid')("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");
router.get('/', function(req, res, next) {
  res.render('contact');
});

module.exports = router;

/*
sendgrid.send({
  to:       'felix.ramirezjr@gmail.com',
  from:     'contact@mywebsite.com',
  subject:  'Testing',
  text:     'Hello.'
}, function(err, json) {
  if (err) { return res.send("Not Good"); }
  res.render('contact');
});
*/
