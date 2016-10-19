var express = require('express');
var app = express.createServer()
var io = require('socket.io').listen(app);
var port = process.env.PORT || 3000;
app.listen(port);

    // Required for Heroku Cloud Server
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});
var router = express.Router();

/* GET me page. */
router.get('/', function(req, res, next) {
  io.sockets.on('connection', function(socket) {
      socket.emit('message', { message: 'Welcome to my chat...' });
      socket.on('send', function(data) {
          io.sockets.emit("message",data);
      });
  });
  res.render('chat');
});

module.exports = router;
