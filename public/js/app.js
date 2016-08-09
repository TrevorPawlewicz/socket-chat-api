var socket = io(); // defined when io library is loaded

socket.on('connect', function(){
    console.log("JS script loaded!");
});

socket.on('message', function(message){
    var momentTimestamp = moment.utc(message.timestamp);

    console.log('New Message: ');
    console.log(message.text);

    // append message to the browser window
    jQuery('.messages').append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ': </strong>' + message.text + '</p>');
});

// handles submiting a new message:
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();
    //                   find searches inside an element
    var $message = $form.find('input[name = message]');
    socket.emit('message', {
        text: $message.val()
    });

    $message.val(''); // clear input box
});
