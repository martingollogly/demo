var http = require('http');
var fs = require('fs');

// Comments
http.createServer(function(req, res){
    fs.readFile('Canvas.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
}).listen(8000);
