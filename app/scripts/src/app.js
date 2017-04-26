// import socket, the object exported from ws-client.js
import socket from './ws-client';
// import UserStore
import {UserStore} from './storage';
// import ChatForm, {} signifies named import
import {ChatForm, ChatList, promptForUsername} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

let userStore = new UserStore('x-chattrbox/u');
let username = userStore.get();
if (!username) {
    username = promptForUsername();
    userStore.set(username);
}


class ChatApp {
    constructor() {
        // create an instance of ChatForm
        this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
        this.chatList = new ChatList(LIST_SELECTOR, username);

        socket.init('ws://localhost:3001');
        socket.registerOpenHandler(() => {
            // call chatForm.init, passing data
            this.chatForm.init((data) => {
                let message = new ChatMessage({message: data}); //FIXED now showing messages
                //console.log('Message: ' + message);
                socket.sendMessage(message.serialize());
            });
            this.chatList.init();
        });
        socket.registerMessageHandler((data) => {
            console.log(data);
            let message = new ChatMessage(data);
            this.chatList.drawMessage(message.serialize());
        });
    }
}
// helper class for formatting message data
class ChatMessage {
    constructor({
        // defaults using default arguments and destructuring assignmnet syntax
        message: m,
        user: u=username,
        timestamp: t=(new Date()).getTime()
    }) {
        this.message = m;
        this.user = u;
        this.timestamp = t;
    }
    // strip down data to the essentials
    serialize() {
        return {
            user: this.user,
            message: this.message,
            timestamp: this.timestamp
        };
    }
}
// create ChatApp instance
export default ChatApp;
