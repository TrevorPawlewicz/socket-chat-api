var socket = io(); // defined when io library is loaded

socket.on('connect', function(){
    console.log("JS script loaded!");
});

socket.on('message', function(message){
    console.log('New Message: ');
    console.log(message.text);
});
