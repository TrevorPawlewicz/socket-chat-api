var PORT    = process.env.PORT || 3000;
var express = require('express');
var app     = express();
var http    = require('http').Server(app); // tells express to start a new server using our app as the boiler plate.
var io      = require('socket.io')(http);
var moment  = require('moment'); // momentjs.com

app.use(express.static(__dirname + '/public'));

var clientInfo = {}; // to store keys/values of socket.io

// sends current users to provided socket ------------------
function sendCurrentUsers(socket){
    var info = clientInfo[socket.id];
    var users = [];

    if (typeof info === 'undefined') {
        return;
    }
    // iterate over all keys in clientInfo looking for ID
    Object.keys(clientInfo).forEach(function(socketId){
        var userInfo = clientInfo[socketId];

        if(info.room === userInfo.room){
            users.push(userInfo.name);
        }
    });

    socket.emit('message', {
        name:'System',
        text:'Current users: ' + users.join(', '),
        timestamp: moment().valueOf()
    });
} //----------------------------------------------------------

// io.on listens to events(name of the event, callback func())
io.on('connection', function(socket) {
    console.log('server.js - User connected via socket.io!');

    //         disconnect is a io key word
    socket.on('disconnect', function(){
        var userData = clientInfo[socket.id];
        if (typeof userData !== 'undefined'){
            socket.leave(userData.room);
            io.to(userData.room).emit('message', {
                name: 'System',
                text: userData.name + ' has left the room.',
                timestamp: moment.valueOf()
            });
            delete clientInfo[socket.id];
        }
    }); //---------------------------------------------------

    socket.on('joinRoom', function(req){
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' has joined!',
            timestamp: moment().valueOf()
        });
    }); //------------------------------------------------------

    // on takes two args (string of event name, callback func):
    socket.on('message', function(message){
        console.log('Message input received: ' + message.text);

        if (message.text === '@currentUsers') {
            sendCurrentUsers(socket);
        } else {
            message.timestamp = moment().valueOf();
            io.to(clientInfo[socket.id].room).emit('message', message);
        }
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
