const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
const rooms = {};

io.on('connection', (socket) => {
    console.log('Thiết bị kết nối:', socket.id);

    // 1. Host tạo phòng
    socket.on('createRoom', (username) => {
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        rooms[roomCode] = { 
            host: socket.id, 
            players: { [socket.id]: { team: 1, name: username || 'Host' } }, 
            playerCount: 1 
        };
        socket.join(roomCode);
        socket.emit('init', { role: 'host', team: 1, roomCode: roomCode, username: username });
        console.log(`[HOST] ${username} đã tạo phòng: ${roomCode}`);
    });

    // 2. Guest tham gia
    socket.on('joinRoom', (data) => {
        let room = rooms[data.code];
        if (room && room.playerCount < 3) {
            room.playerCount++;
            const teamId = room.playerCount; 
            room.players[socket.id] = { team: teamId, name: data.username || `Guest ${teamId}` };
            socket.join(data.code);
            
            // Khởi tạo cho Guest
            socket.emit('init', { role: 'guest', team: teamId, roomCode: data.code });
            
            // Báo cho toàn bộ phòng biết có người mới
            io.to(data.code).emit('systemMsg', `⚡ ${data.username} đã tham gia chiến dịch!`);
            io.to(room.host).emit('playerJoined', teamId);
        }
    });

    socket.on('disconnect', () => {
        console.log('Thiết bị ngắt kết nối:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`[RTS SERVER] Đang chạy tại port ${PORT}`));