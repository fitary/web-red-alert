const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static('public'));

// Lưu trữ dữ liệu các phòng trên RAM (Không cần Database)
const rooms = {}; 

io.on('connection', (socket) => {
    console.log('Một người chơi vừa kết nối:', socket.id);

    // Xử lý tạo phòng
    socket.on('createRoom', () => {
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        rooms[roomCode] = {
            players: [{ id: socket.id, team: 1 }], // Người tạo là Đội 1
            maxPlayers: 8,
            status: 'waiting'
        };
        socket.join(roomCode);
        socket.emit('roomCreated', roomCode);
    });

    // Xử lý tham gia phòng
    socket.on('joinRoom', (roomCode) => {
        if (rooms[roomCode] && rooms[roomCode].players.length < 8) {
            const teamId = rooms[roomCode].players.length + 1; // Cấp đội tiếp theo
            rooms[roomCode].players.push({ id: socket.id, team: teamId });
            socket.join(roomCode);
            
            // Thông báo cho cả phòng biết có người mới
            io.to(roomCode).emit('playerJoined', rooms[roomCode].players);
        } else {
            socket.emit('error', 'Phòng không tồn tại hoặc đã đầy!');
        }
    });

    // Xử lý bắt đầu game và sinh AI
    socket.on('startGame', (roomCode) => {
        const room = rooms[roomCode];
        if(room) {
            room.status = 'playing';
            const humanCount = room.players.length;
            const aiCount = 8 - humanCount;
            
            // Server thông báo game bắt đầu và gán số lượng AI
            io.to(roomCode).emit('gameStarted', {
                humans: humanCount,
                ais: aiCount,
                mapData: "Basic_Map_01"
            });
        }
    });
});

server.listen(3000, () => {
    console.log('Server đang chạy tại port 3000');
});