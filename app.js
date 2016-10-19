/* 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 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var mongo = require('mongodb');

// Connecting To Server
var mongoUri = process.env.MONGOLAB_URI;
var MongoClient = mongodb.MongoClient;

MongoClient.connect(mongoUri, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});

var routes = require('./routes/index');
var users = require('./routes/users');
var me = require('./routes/me');
var about = require('./routes/about');
var vu = require('./routes/vu');
var contact = require('./routes/contact');

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

app.post('/send_email',function(req,res){
  var sendgrid = require('sendgrid')("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");
  console.log(req.body.info);
  var the_val = req.body.info;
  sendgrid.send({
    to:       'felix.ramirezjr@gmail.com',
    from:     'contact@mywebsite.com',
    subject:  'Contacted',
    text:     the_val
  }, function(err, json) {
    if (err) { return res.send("Not Good"); }
    res.render('contact');
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
