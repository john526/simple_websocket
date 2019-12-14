require('babel-register');
const http = require('http');
var express = require('express');
const socket = require('socket.io');

// App setup
var app = express();
//listen
var server = app.listen(4000, function(){
  console.log("connection start on port : 4000");
});

// static files

app.use(express.static('public'));


// socket-io setup
var io = socket(server);

io.on('connection', function(socket){
  console.log("made in connection ",socket.id);

  socket.on('chat', function(data){
    io.sockets.emit('chat',data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing',data);
  });
});
