// var for WebSocket connection
let socket;

// connect to WebSockets server
function init(url) {
    socket = new WebSocket(url);
    console.log('connecting...');
}

function registerOpenHandler(handlerFunction) {
    // arrow functions are annonymous functions
    socket.onopen = () => {
        console.log('open');
        handlerFunction();
    };
}

function registerMessageHandler(handlerFunction) {
    // e is the arrow function parameter
    socket.onmessage = (e) => {
        console.log('message', e.data);
        let data = JSON.parse(e.data);
        handlerFunction(data);
    };
}

// turn message payload into JSON string
function sendMessage(payload) {
    socket.send(JSON.stringify(payload));
}

export default {
    init,
    registerOpenHandler,
    registerMessageHandler,
    sendMessage
};
