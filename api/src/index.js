var http = require('http');

// Send index.html to all requests
var app = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('string');
});

var names = [];
// Socket.io server listens to our app
var io = require('socket.io').listen(app);


function sendMessage(socketId) {
    return function (data) {
        const emitData = {
            content: data,
            authorId: socketId,
            authorName: names[socketId],
            date: new Date().getTime(),
        }
        io.emit('message', emitData);
    };
}
function setSettings(socketId) {
    return function (settings) {
        var oldName = names[socketId];
        names[socketId] = settings.name;
        if (oldName) {
            var newName = settings.name;
            io.emit('newSettings', { id: socketId, newName: newName, oldName: oldName });
            return;
        }

        io.emit('newJoiner', { id: socketId, name: settings.name });

    }
}
// Emit welcome message on connection
io.on('connection', function (socket) {
    console.log('New connection: ', socket.id);
    console.log(Object.keys(io.sockets.sockets));
    socket.emit('init', { id: socket.id });
    socket.on('setSettings', setSettings(socket.id));
    socket.on('message', sendMessage(socket.id));
    socket.on('disconnect', function () {

        // socket.sockets.socket(socket.id).emit('disconnected', true);
        console.log('Disconnected: ', socket.id);
        io.emit('leftJoiner', {});
    });
});

app.listen(3000);