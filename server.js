const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
    cors: { origin: "*" },
    pingTimeout: 60000,
    pingInterval: 25000
});

app.use(express.static('public'));
const rooms = {};

io.on('connection', (socket) => {
    console.log('⚡ Thiết bị kết nối:', socket.id);

    // 1. Tạo phòng
    socket.on('createRoom', (data) => {
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        rooms[roomCode] = { 
            host: socket.id, 
            status: 'waiting',
            mode: data.mode || 'ffa', // 'ffa' hoặc 'team'
            players: [{ id: socket.id, team: 'player', name: data.username || 'Host' }]
        };
        socket.join(roomCode);
        socket.emit('init', { 
            role: 'host', 
            team: 'player', 
            roomCode: roomCode, 
            players: rooms[roomCode].players,
            mode: rooms[roomCode].mode
        });
        console.log(`🏠 Phòng ${roomCode} được tạo bởi ${data.username || 'Host'} (Mode: ${rooms[roomCode].mode})`);
    });

    // 2. Tham gia phòng
    socket.on('joinRoom', (data) => {
        let room = rooms[data.code];
        
        if (room && room.status === 'waiting' && room.players.length < 8) {
            const teamId = `bot${room.players.length}`; 
            const newPlayer = { 
                id: socket.id, 
                team: teamId, 
                name: data.username || `Guest ${room.players.length}` 
            };
            
            room.players.push(newPlayer);
            socket.join(data.code);
            
            socket.emit('init', { 
                role: 'guest', 
                team: teamId, 
                roomCode: data.code, 
                players: room.players,
                mode: room.mode
            });
            
            io.to(data.code).emit('roomUpdated', room.players);
            io.to(data.code).emit('systemMsg', `⚡ ${newPlayer.name} đã tham gia!`);
            console.log(`👤 ${newPlayer.name} tham gia phòng ${data.code}`);
        } 
        else if (room && room.players.length >= 8) {
            socket.emit('systemMsg', '❌ Phòng đã đầy (Tối đa 8 người)!');
        } 
        else {
            socket.emit('systemMsg', '❌ Mã phòng sai hoặc trận đấu đã bắt đầu!');
        }
    });

    // 3. Host bấm Bắt đầu Game
    socket.on('startGame', (roomCode) => {
        let room = rooms[roomCode];
        if(room && room.host === socket.id) {
            room.status = 'playing';
            const humanTeams = room.players.map(p => p.team);
            io.to(roomCode).emit('gameStarted', { 
                humanTeams: humanTeams, 
                mode: room.mode 
            });
            console.log(`🎮 Trận đấu bắt đầu tại phòng ${roomCode} (Mode: ${room.mode})`);
        }
    });

    // 4. Host gửi tọa độ lính, nhà, máu... xuống cho các Guest
    socket.on('syncGameState', (data) => {
        socket.to(data.roomCode).emit('updateGameState', data.state);
    });

    // 5. Guest gửi lệnh lên cho Host xử lý
    socket.on('playerAction', (data) => {
        let room = rooms[data.roomCode];
        if(room && room.host) {
            io.to(room.host).emit('executeAction', data);
        }
    });

    // 6. Xử lý khi có người tắt web
    socket.on('disconnect', () => {
        console.log('❌ Ngắt kết nối:', socket.id);
        for (let roomCode in rooms) {
            let room = rooms[roomCode];
            let playerIndex = room.players.findIndex(p => p.id === socket.id);
            
            if (playerIndex !== -1) {
                const playerName = room.players[playerIndex].name;
                
                if (room.host === socket.id) {
                    io.to(roomCode).emit('systemMsg', '❌ Host đã mất kết nối! Phòng bị hủy.');
                    io.to(roomCode).emit('hostDisconnected');
                    delete rooms[roomCode];
                    console.log(`💥 Phòng ${roomCode} bị hủy do Host thoát`);
                } else {
                    room.players.splice(playerIndex, 1);
                    
                    if (room.players.length === 0) {
                        delete rooms[roomCode];
                        console.log(`🗑️ Phòng ${roomCode} bị xóa do không còn ai`);
                    } else {
                        io.to(roomCode).emit('roomUpdated', room.players);
                        io.to(roomCode).emit('systemMsg', `⚠️ ${playerName} đã rời phòng!`);
                    }
                }
                break;
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server v0.3.0 đang chạy tại port ${PORT}`));