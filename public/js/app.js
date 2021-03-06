var name   = getQueryVariable('name') || 'Anonymous'; // func in queryParams.js
var room   = getQueryVariable('room'); // takes string as argument
var socket = io(); // defined when io library is loaded

console.log('=====> ' + name + ' wants to join ' + room);

// update chat.html h1 tag:
jQuery('.room-title').text(room);

socket.on('connect', function(){
    console.log("JS script loaded!");
    // our custom name "joinRoom"
    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});


//------------------------------------------------------
socket.on('message', function(message){
    var momentTimestamp = moment.utc(message.timestamp);
    //  $ to show we are handling JQuery in the var
    var $messages = jQuery('.messages'); //
    var $message = jQuery('<li class="list-group-item"></li>');//add to unordered list on chat.html

    console.log('>>> New Message: ');
    console.log(message.text);

    // append message to the browser window
    $message.append('<p><strong>' + message.name + ' '
            + momentTimestamp.local().format('h:mm a')
            + ': </strong></p>');
    $message.append('<p>' + message.text + '</p>');
    $messages.append($message);
});
//-------------------------------------------------------


// handles submiting a new message:
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();
    //                   find searches inside an element
    var $message = $form.find('input[name = message]');
    socket.emit('message', {
        name: name,
        text: $message.val()
    });

    $message.val(''); // clear input box
});
