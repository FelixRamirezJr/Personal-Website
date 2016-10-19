/* 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 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
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

/* *********** MODELS *************/
var ContactSchema = new mongoose.Schema({
      name: String,
      message: String,
      email: String,
      receipt: String,
      status: String
});
/************ END ****************/

var routes = require('./routes/index');
var users = require('./routes/users');
var me = require('./routes/me');
var about = require('./routes/about');
var vu = require('./routes/vu');
var contact = require('./routes/contact');
var status_update = require('./routes/status_update');

// Adding React To The appvar React = require('react');
var React = require('react');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// For the use of sass
app.use(
  sassMiddleware({
    src: __dirname + '/sass',
    dest: __dirname + '/src/css',
    debug: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/me',me);
app.use('/about',about);
app.use('/vu',vu);
app.use('/contact',contact);
app.use('/status_update',status_update);

// Sends email and creates receipt number
app.post('/send_email',function(req,res){
  var sendgrid = require('sendgrid')("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");
  var full_name = req.body.name;
  var contact_email = req.body.email;
  var message = req.body.info;
  var randomNum = Math.floor(Math.random() * 10000) + 1;
  var rec = full_name.charAt(0) + contact_email.charAt(0) + randomNum.toString();
  // Insert into database
  var cont = mongoose.model('Contacts', ContactSchema);
  var submittedContact = new cont ({
    name: full_name,
    email: contact_email,
    message: message,
    receipt: rec,
    status: "Pending"
  });
  // Saving it to the database.
  submittedContact.save(function (err) {if (err) console.log ('Error on save!')});
  // Sending Email
  var the_val = message + " From: " + full_name + " Email: " + contact_email + " Receipt Code: " + rec;
  sendgrid.send({
    to:       'felix.ramirezjr@gmail.com',
    from:     'contact@mywebsite.com',
    subject:  full_name + " has contacted you",
    text:     the_val
  }, function(err, json) {
    if (err) { return res.send("Not Good"); }
    res.render('contact_complete',{ key: rec });
  });
});

app.get('/code',function(req,res){
  var code = req.query.info.toString();
  var Cont = mongoose.model('Contacts', ContactSchema);
  Cont.findOne({ 'receipt': code }, 'name email status', function (err, result) {
    if (err) return handleError(err);
    res.render('code',{name: result.name, email: result.email, status: result.status });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
