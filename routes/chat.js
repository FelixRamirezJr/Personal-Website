var express = require('express');
var router = express.Router();
var io = require('socket.io').listen(app);

/* GET me page. */
router.get('/', function(req, res, next) {
  io.sockets.on('connection', function(socket) {
      socket.on('message_to_server', function(data) {
          io.sockets.emit("message_to_client",{ message: data["message"] });
      });
  });

  res.render('chat');
});

module.exports = router;
