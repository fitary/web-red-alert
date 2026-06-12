const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
const rooms = {};

io.on('connection', (socket) => {
    socket.on('createRoom', () => {
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        rooms[roomCode] = { host: socket.id, players: { [socket.id]: 1 }, playerCount: 1 };
        socket.join(roomCode);
        socket.emit('init', { role: 'host', team: 1, roomCode });
    });

    socket.on('joinRoom', (code) => {
        let room = rooms[code];
        if (room && room.playerCount < 3) {
            room.playerCount++;
            const teamId = room.playerCount; // Gán Đội 2 hoặc 3
            room.players[socket.id] = teamId;
            socket.join(code);
            
            socket.emit('init', { role: 'guest', team: teamId, roomCode: code });
            // Báo cho Host biết để tắt AI của đội này
            io.to(room.host).emit('playerJoined', teamId);
        }
    });

    // Chuyển lệnh của Guest cho Host xử lý
    socket.on('sendAction', (data) => {
        let room = rooms[data.roomCode];
        if (room) io.to(room.host).emit('receiveAction', data);
    });

    // Host gửi bức tranh toàn cảnh cho các Guest
    socket.on('syncState', (data) => {
        socket.broadcast.to(data.roomCode).emit('updateState', data.state);
    });
});

server.listen(3000, () => console.log('Server running on port 3000'));