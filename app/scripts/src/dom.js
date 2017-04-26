import $ from 'jquery';
import md5 from 'crypto-js/md5';
import moment from 'moment';

function createGravatarUrl(username) {
    let userhash = md5(username);
    return `http://www.gravatar.com/avatar/${userhash.toString()}`;
}

export function promptForUsername() {
    let username = prompt('Enter a username');
    return username.toLowerCase();
}

// used to manage the form element in the DOM
export class ChatForm {
    constructor(formSel, inputSel) {
        this.$form = $(formSel);
        this.$input = $(inputSel);
    }

    init(submitCallback) {
        this.$form.submit((event) => {
            event.preventDefault();
            // retrieve value from input field
            let val = this.$input.val();
            //console.log('message:' + val);
            // pass value to submitCallback
            submitCallback(val);
            // reset value of input
            this.$input.val('');
        });
        // click handler that fires submit method when button is clicked
        this.$form.find('button').on('click', () => this.$form.submit());
    }
}

// used to list chat messages the user sees
export class ChatList {
    constructor(listSel, username) {
        this.$list = $(listSel);
        this.username = username;
    }

    drawMessage({user: u, timestamp: t, message: m}) {
        let $messageRow = $('<li>', {
            'class': 'message-row'
        });

        if (this.username === u) {
            $messageRow.addClass('me');
        }

        let $message = $('<p>');

        $message.append($('<span>', {
            'class': 'message-username',
            text: u
        }));

        $message.append($('<span>', {
            'class': 'timestamp',
            'data-time': t,
            text: moment(t).fromNow()
        }));

        $message.append($('<span>', {
            'class': 'message-message',
            text: m
        }));

        let $img = $('<img>', {
            src: createGravatarUrl(u),
            title: u
        });

        $messageRow.append($img);
        $messageRow.append($message);
        this.$list.append($messageRow); // FIXED
        $messageRow.get(0).scrollIntoView();
    }

    init() {
        this.timer = setInterval(() => {
            $('[data-time]').each((idx, element) => {
                let $element = $(element);
                let timestamp = new Date().setTime($element.attr('data-time'));
                let ago = moment(timestamp).fromNow();
                $element.html(ago);
            });
        }, 1000);
    }
}
