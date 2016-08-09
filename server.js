var PORT    = process.env.PORT || 3000;
var express = require('express');
var app     = express();
var http    = require('http').Server(app); // tells express to start a new server using our app as the boiler plate.
var io      = require('socket.io')(http);
var moment  = require('moment'); // momentjs.com

app.use(express.static(__dirname + '/public'));

// io.on listens to events(name of the event, callback func())
io.on('connection', function(socket) {
    console.log('server.js - User connected via socket.io!');

    // on takes two args (string of event name, callback func):
    socket.on('message', function(message){
        console.log('Message input received: ' + message.text);

        message.timestamp = moment().valueOf();
        // send to everyone except the sender:
        //socket.broadcast.emit('message', message);
        // -OR-
        // send message to all browsers:
        io.emit('message', message);
    });

    socket.emit('message', {
        name: 'System',
        text:'Welcome to the chat application!',
        timestamp: moment().valueOf()
    });
});
















//------------------------------------------
http.listen(PORT, function() {
    console.log('...server has started!');
});
//------------------------------------------
