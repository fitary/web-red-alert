// public/network.js
const socket = io();

const Network = {
    myRole: '',
    myRoom: '',
    
    // Gọi hàm này để tạo phòng
    createRoom(name) { socket.emit('createRoom', name); },
    
    // Gọi hàm này để tham gia
    joinRoom(code, name) { socket.emit('joinRoom', { code, username: name }); },
    
    // Bắt đầu game
    startGame(roomCode) { socket.emit('startGame', roomCode); },

    // Lắng nghe các sự kiện (callback)
    onInit(callback) { socket.on('init', (data) => { this.myRole = data.role; this.myRoom = data.roomCode; callback(data); }); },
    onRoomUpdate(callback) { socket.on('roomUpdated', callback); },
    onGameStart(callback) { socket.on('gameStarted', callback); },
    onSystemMsg(callback) { socket.on('systemMsg', callback); }
};