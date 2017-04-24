// import http module
var http = require('http');
// import file system module
var fs = require('fs');
// import extract to use extractFilePath function
var extract = require('./extract');
// import websockets-server.js
var wss = require('./websockets-server');
// import mime
var mime = required('mime');

// handler function for 404 page not found
var handleError = function (err, res) {
    res.writeHead(404);
    res.end();
}

var server = http.createServer(function (req, res) {
    console.log('Responding to a request.');

    // use extract to get filePath using extractFilePath function
    var filePath = extract(req.url);
    // open filePath, and send contents of file
    fs.readFile(filePath, function (err, data) {
        // if page not found, 404
        if (err) {
            handleError(err, res);
            return;
        } else {
            res.setHeader('Content-Type', mime.lookup(filePath));
            res.end(data);
        }
    });
});

// listen on port 3000
server.listen(3000);
