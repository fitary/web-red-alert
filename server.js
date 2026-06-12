const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Cấp quyền truy cập thư mục public chứa index.html
app.use(express.static('public'));
const rooms = {};

io.on('connection', (socket) => {
    // 1. Host tạo phòng
    socket.on('createRoom', () => {
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        rooms[roomCode] = { host: socket.id, players: { [socket.id]: 1 }, playerCount: 1 };
        socket.join(roomCode);
        // Gửi tín hiệu 'init' kèm mã phòng cho Host
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
            
            // Gửi tín hiệu 'init' cho Guest
            socket.emit('init', { role: 'guest', team: teamId, roomCode: code });
            // Báo cho Host biết để cập nhật số lượng người
            io.to(room.host).emit('playerJoined', teamId);
        }
    });

    // 3. Chuyển lệnh (Mua lính, tấn công) từ Guest sang Host
    socket.on('sendAction', (data) => {
        let room = rooms[data.roomCode];
        if (room) io.to(room.host).emit('receiveAction', data);
    });

    // 4. Host gửi dữ liệu hình ảnh cho tất cả Guest
    socket.on('syncState', (data) => {
        socket.broadcast.to(data.roomCode).emit('updateState', data.state);
    });
});

server.listen(3000, () => {
    console.log('Server dang chay tai port 3000');
});