var connect = require('connect'),
   http = require('http');
connect()
   .use(connect.static('Canas.html'))
   .use(connect.directory('examples'))
   .listen(8080);