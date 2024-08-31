// Node server which will handle socket io connections
// npm i cors as both backend and frontend servers are different
const io = require('socket.io')(8000, {cors: {origin: "*"}});

const users = {};

// io.on bahut saare connections ko listen krega
// socket.on particular connection ke saath kya hoga, vo handle krega
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        // if someone joined sbke pass message ayega ki someone joined
        socket.broadcast.emit('user-joined', name);
        // broadcast.emit() jisne join kiye uske alava sbko msg bhejega
    });

    // if someone sends a new message
    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
});