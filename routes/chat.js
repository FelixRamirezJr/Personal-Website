var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
    server.listen(process.env.PORT || 3000);

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
