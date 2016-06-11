var socket = io(); // defined when io library is loaded

socket.on('connect', function(){
    console.log("JS script loaded!");
});
