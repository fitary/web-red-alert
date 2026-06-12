const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
const rooms = {};

io.on('connection', (socket) => {
    console.log('Một thiết bị vừa kết nối:', socket.id);

    // 1. Host tạo phòng
    socket.on('createRoom', () => {
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        rooms[roomCode] = { host: socket.id, players: { [socket.id]: 1 }, playerCount: 1 };
        socket.join(roomCode);
        console.log(`[HOST] Đã tạo phòng: ${roomCode}`);
        socket.emit('init', { role: 'host', team: 1, roomCode: roomCode });
    });

    // 2. Guest tham gia phòng
    socket.on('joinRoom', (code) => {
        let room = rooms[code];
        if (room && room.playerCount < 3) {
            room.playerCount++;
            const teamId = room.playerCount; 
            room.players[socket.id] = teamId;
            socket.join(code);
            
            console.log(`[GUEST] Đã tham gia phòng: ${code} - Đội: ${teamId}`);
            socket.emit('init', { role: 'guest', team: teamId, roomCode: code });
            io.to(room.host).emit('playerJoined', teamId);
        }
    });

    // 3. Chuyển lệnh (Mua lính, tấn công)
    socket.on('sendAction', (data) => {
        let room = rooms[data.roomCode];
        if (room) io.to(room.host).emit('receiveAction', data);
    });

    // 4. Host gửi dữ liệu hình ảnh
    socket.on('syncState', (data) => {
        socket.broadcast.to(data.roomCode).emit('updateState', data.state);
    });
});

server.listen(3000, () => {
    console.log('Server v2.1 đang chạy...');
});