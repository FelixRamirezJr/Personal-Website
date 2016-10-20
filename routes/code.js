var express = require('express');
var router = express.Router();
// Connect to Server
var mongoose = require ("mongoose"); // The reason for this demo.
// Connecting To Server
var mongoUri = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + mongoUri + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + mongoUri);
      }
});

var ContactSchema = new mongoose.Schema({
      name: String,
      message: String,
      email: String,
      receipt: String,
      status: String
});

/* GET me page. */
router.get('/', function(req, res, next) {
  var code = req.query.info.toString();
  var Cont = mongoose.model('Contacts', ContactSchema);
  Cont.findOne({ 'receipt': code }, 'name email status', function (err, result) {
    if(!result){
      res.render('status_update',{errors: "Invalid Code"});
      return false;
    }
    if (err){
      res.render('status_update',{errors: "Invalid Code"});
    }
    res.render('code',{name: result.name, email: result.email, status: result.status });
  });
});

module.exports = router;
