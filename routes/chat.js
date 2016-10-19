var express = require('express');
var router = express.Router();
const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

  var io = require('socket.io').listen(server);

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
