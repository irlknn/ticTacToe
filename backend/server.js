const express = require('express')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server) // на тій же адресі, CORS не потрібен


// const server = http.createServer(app)
// const io = new Server(server, {
//   cors: {
//     origin: "https://tic-tac-toe-lmel.onrender.com",
//   },
// });
// const io = new Server(server, { cors: { origin: "*" } })

const distPath = path.join(__dirname, '../frontend/dist')
app.use(express.static(distPath))

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
})

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('joinRoom', (data) => {
        const roomId = typeof data === 'string' ? data : (data && data.roomId);

        if (!roomId) {
            socket.emit('roomJoinError', { error: 'Invalid room id' });
            return;
        }

        const room = io.sockets.adapter.rooms.get(roomId);
        const size = room ? room.size : 0;

        if (size >= 2) {
            socket.emit('roomJoinError', { error: 'Room is full' });
            console.log(`Room ${roomId} is full`);
            return;
        }

        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
        io.to(roomId).emit('playerJoined', size + 1);

        socket.emit('roomJoined', roomId);
    });

    socket.on("play", ({ roomId, index }) => {
        console.log(`server recived ${index} in room ${roomId}`);
        socket.to(roomId).emit("play", { roomId, index });
    });

    socket.on("resetGame", (roomId) => {
        io.to(roomId).emit("resetGame");
    });

    socket.on('disconnect', () => {
        for (const roomId of socket.rooms) {
            if (roomId !== socket.id) {
                const room = io.sockets.adapter.rooms.get(roomId);
                const size = room ? room.size : 0;
                console.log(`Room ${roomId} now has ${size} players`);

                if (size === 0) {
                    console.log(`Room ${roomId} is empty — destroyed automatically`);
                    // here you could also reset any server-side state for that room
                }
            }
        }
        console.log('user disconnected:', socket.id);
    });

    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`Socket ${socket.id} left room ${roomId}`);
        const room = io.sockets.adapter.rooms.get(roomId);
        const size = room ? room.size : 0;
        console.log(`Socket ${socket.id} left room ${roomId}. Now ${size} players left.`)

    });
});

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// const server = require('http').createServer();
// const io = require('socket.io')(server, {
//     cors: {
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST'],
//     }
// });


// serve frontend build
// app.use(express.static(path.join(__dirname, '../frontend/dist')))

// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
// })

// const { error } = require('console');
