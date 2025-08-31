const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    socket.on("play", index => {
        console.log(`server recived ${index}`);
        socket.broadcast.emit("play", index);
    });
});

server.listen(3000);