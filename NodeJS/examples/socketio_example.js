var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var catchPhrases = ['Why I oughta...',
  'Nyuk Nyuk Nyuk!', 'Poifect!', 'Spread out!', 'Watchya doin ?',
  'Say a few syllables!', 'Soitenly!', 'Oakily!', 'Hang on a sec!' ];

app.set('view engine', 'jade');
app.set('view options', { layout: true });
app.set('views', __dirname + '/views');

app.get('/stooges/chat', function(req, res, next) {
  res.render('chat');
});

io.sockets.on('connection', function(socket) {
  var sendChat = function( title, text ) {
    socket.emit('chat', {
      title: title,
      contents: text
    });
  };

  setInterval(function() {
    var randomIndex = Math.floor(Math.random()*catchPhrases.length)
    sendChat('Moe', catchPhrases[randomIndex]);
  }, 5000);
  setInterval(function() {
      var randomIndex = Math.floor(Math.random()*catchPhrases.length)
      sendChat('Curly', catchPhrases[randomIndex]);
  }, 8000);
  sendChat('Welcome to Stooge Chat', 'The Stooges are on the line');
  socket.on('chat', function(data){
    sendChat('You', data.text);
  });
});

app.get('/?', function(req, res){
  res.render('index');
});

var port = 8080;
server.listen(port);
console.log('Listening on port ' + port);