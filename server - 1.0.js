const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static('public'));
const rooms = {};

io.on('connection', (socket) => {
    console.log('⚡ Thiết bị kết nối:', socket.id);

    // 1. Tạo phòng
    socket.on('createRoom', (username) => {
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        rooms[roomCode] = { 
            host: socket.id, 
            status: 'waiting',
            players: [{ id: socket.id, team: 'player', name: username || 'Host' }] // Host mặc định phe 'player'
        };
        socket.join(roomCode);
        socket.emit('init', { role: 'host', team: 'player', roomCode: roomCode, players: rooms[roomCode].players });
    });

    // 2. Tham gia phòng
    socket.on('joinRoom', (data) => {
        let room = rooms[data.code];
        // Cho phép tối đa 3 người tham gia (Host + 3 Guest = 4 người)
        if (room && room.status === 'waiting' && room.players.length < 4) {
            // Cấp phe cho Guest: bot1, bot2, bot3...
            const teamId = `bot${room.players.length}`; 
            const newPlayer = { id: socket.id, team: teamId, name: data.username || `Guest ${room.players.length}` };
            
            room.players.push(newPlayer);
            socket.join(data.code);
            
            socket.emit('init', { role: 'guest', team: teamId, roomCode: data.code, players: room.players });
            io.to(data.code).emit('roomUpdated', room.players);
            io.to(data.code).emit('systemMsg', `⚡ ${newPlayer.name} đã tham gia!`);
        } else {
            socket.emit('systemMsg', '❌ Mã phòng sai hoặc phòng đã đầy/đang chơi!');
        }
    });

    // 3. Host bấm Bắt đầu Game
    socket.on('startGame', (roomCode) => {
        let room = rooms[roomCode];
        if(room && room.host === socket.id) {
            room.status = 'playing';
            // Báo cho mọi người trong phòng biết game bắt đầu, kèm danh sách phe do người thật điều khiển
            io.to(roomCode).emit('gameStarted', room.players.map(p => p.team)); 
        }
    });

    // ==========================================
    // KÊNH ĐỒNG BỘ GAMEPLAY (HOST <-> GUEST)
    // ==========================================
    
    // Host gửi tọa độ lính, nhà, máu... xuống cho các Guest
    socket.on('syncGameState', (data) => {
        socket.to(data.roomCode).emit('updateGameState', data.state);
    });

    // Guest gửi lệnh (Mua lính, xây nhà, điều quân) lên cho Host xử lý
    socket.on('playerAction', (data) => {
        let room = rooms[data.roomCode];
        if(room && room.host) {
            io.to(room.host).emit('executeAction', data);
        }
    });

    // ==========================================

    // Xử lý khi có người tắt web
    socket.on('disconnect', () => {
        console.log('❌ Ngắt kết nối:', socket.id);
        for (let roomCode in rooms) {
            let room = rooms[roomCode];
            let playerIndex = room.players.findIndex(p => p.id === socket.id);
            
            if (playerIndex !== -1) {
                if (room.host === socket.id) {
                    // Nếu Host thoát -> Sập phòng
                    io.to(roomCode).emit('systemMsg', '❌ Host đã mất kết nối! Phòng bị hủy.');
                    io.to(roomCode).emit('hostDisconnected');
                    delete rooms[roomCode];
                } else {
                    // Nếu Guest thoát -> Báo cho những người còn lại
                    let playerName = room.players[playerIndex].name;
                    room.players.splice(playerIndex, 1);
                    io.to(roomCode).emit('roomUpdated', room.players);
                    io.to(roomCode).emit('systemMsg', `⚠️ ${playerName} đã rời phòng!`);
                }
                break;
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server v0.1.5 đang chạy tại port ${PORT}`));