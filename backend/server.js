const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('joinRoom', roomId => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);

        socket.emit('roomJoined', roomId);
    });

    socket.on("play", ({ roomId, index }) => {
        console.log(`server recived ${index} in room ${roomId}`);
        socket.to(roomId).emit("play", index);
    });

    // socket.on('disconnect', () => {
    //     console.log('user disconnected:', socket.id);
    // });
});

io.of("/").adapter.on("joinRoom", (roomId) => {
    console.log(`room ${roomId} created`);
});

server.listen(3000);