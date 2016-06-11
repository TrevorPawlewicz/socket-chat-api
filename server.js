var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app); // tells express to start a new server using our app as the boiler plate.
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
// io.on listens to events(name of the event, callback func())
io.on('connection', function() {
    console.log('User connected via socket.io!');
});

















http.listen(PORT, function() {
    console.log('...server has started!');
});
