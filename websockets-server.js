// import ws module
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
// establish WebSockets server and bind port to 3001
var ws = new WebSocketServer({
    port: port
});
// array for holding messages (history)
var messages = [];

console.log('websockets server started');
// when a client makes a connection, access connection via socket object
ws.on('connection', function (socket) {
    console.log('client connection established');

    // send all old messages to each new connection
    messages.forEach(function (msg) {
        socket.send(msg);
    });

    // any info sent by client is sent back to same socket connection
    socket.on('message', function (data) {
        console.log('message received: ' + data);
        // push message into messages array
        messages.push(data);
        // send back data to client
        ws.clients.forEach(function (clientSocket) {
            clientSocket.send(data);
        });
    });
});
