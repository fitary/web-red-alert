const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// THÊM CORS ĐỂ RENDER KHÔNG CHẶN KẾT NỐI
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.static('public'));
const rooms = {};

io.on('connection', (socket) => {
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

    // 3. Host bấm Bắt Đầu
    socket.on('startGame', (roomCode) => {
        let room = rooms[roomCode];
        if(room && room.host === socket.id) {
            room.status = 'playing';
            io.to(roomCode).emit('gameStarted');
        }
    });

    socket.on('disconnect', () => {});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`[RTS SERVER] Đang chạy tại port ${PORT} - Phiên bản v0.1.3`));