'use strict';

window.onload = function() {
  var io = window.io,
      socket = io('http://localhost:3000'),
      speechEl = document.getElementById('speech'),
      usersEl = document.getElementById('users');

  socket.on('users', function(data) {
    var users = JSON.parse(data).users;

    usersEl.innerHTML = '';

    for (var i = 0; i < users.length; i++) {
      usersEl.innerHTML += '<li>' + users[i] + '</li>';
    }
  });

  socket.on('updated', function (data) {
    var d = JSON.parse(data);

    if (socket.id !== d.id) {
      speechEl.innerHTML = d.speech;
    }
  });

  speechEl.addEventListener('keyup', function() {
    socket.emit('update', {id: socket.id, speech: speechEl.innerHTML});
  }, false);
};