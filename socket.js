'use strict';

var socket = function(redisClient, server) {
  var io = require('socket.io')(server);

  io.on('connection', function (socket) {
    io.emit('users', JSON.stringify({users: Object.keys(io.sockets.connected)}));

    socket.on('disconnect', function() {
      io.emit('users', JSON.stringify({users: Object.keys(io.sockets.connected)}));
    });

    socket.on('update', function (data) {
      redisClient.set('speech', data.speech, function() {
        io.emit('updated', JSON.stringify({id: data.id, speech: data.speech}));
      });
    });
  });
};

module.exports = socket;