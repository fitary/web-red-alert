const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Cấu hình CORS mở rộng tương tự bản gốc để Render không chặn
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static('public'));
const rooms = {};

io.on('connection', (socket) => {
    console.log('Thiết bị kết nối:', socket.id);

    // 1. Tạo phòng
    socket.on('createRoom', (username) => {
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        rooms[roomCode] = { 
            host: socket.id, 
            status: 'waiting',
            players: [{ id: socket.id, team: 1, name: username || 'Host' }]
        };
        socket.join(roomCode);
        socket.emit('init', { role: 'host', team: 1, roomCode: roomCode, players: rooms[roomCode].players });
    });

    // 2. Tham gia phòng
    socket.on('joinRoom', (data) => {
        let room = rooms[data.code];
        if (room && room.status === 'waiting' && room.players.length < 3) {
            const teamId = room.players.length + 1; 
            const newPlayer = { id: socket.id, team: teamId, name: data.username || `Guest ${teamId}` };
            
            room.players.push(newPlayer);
            socket.join(data.code);
            
            socket.emit('init', { role: 'guest', team: teamId, roomCode: data.code, players: room.players });
            io.to(data.code).emit('roomUpdated', room.players);
            io.to(data.code).emit('systemMsg', `⚡ ${newPlayer.name} đã tham gia!`);
        } else {
            socket.emit('systemMsg', '❌ Phòng không tồn tại hoặc đã đầy!');
        }
    });

    // 3. Bắt đầu Game
// Thay đoạn kiểm tra trong server.js thành:
socket.on('startGame', (roomCode) => {
    console.log("Server nhận lệnh START từ:", socket.id);
    let room = rooms[roomCode];
    if (room) {
        room.status = 'playing';
        console.log("Đang kích hoạt game cho phòng:", roomCode);
        io.to(roomCode).emit('gameStarted'); 
    } else {
        console.log("LỖI: Không tìm thấy phòng!");
    }
});

    socket.on('disconnect', () => {
        console.log('Ngắt kết nối:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server v0.1.4 đang chạy tại port ${PORT}`));