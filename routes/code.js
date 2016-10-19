var express = require('express');
var router = express.Router();

/* GET me page. */
var sendgrid = require('sendgrid')("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");
router.get('/', function(req, res, next) {
  var code = req.query.info.toString();
  var Cont = mongoose.model('Contacts', ContactSchema);
  Cont.findOne({ 'receipt': code }, 'name email status', function (err, result) {
    if (err) return handleError(err);
    res.render('code',{name: result.name, email: result.email, status: result.status });
  });
});

module.exports = router;
