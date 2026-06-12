// public/network.js
const socket = io();

const Network = {
    myRole: null, // Lưu lại role của chính mình
    
    createRoom(name) { socket.emit('createRoom', name); },
    joinRoom(code, name) { socket.emit('joinRoom', { code, username: name }); },
    startGame(roomCode) { socket.emit('startGame', roomCode); },

    // Các hàm lắng nghe
    onInit(callback) { socket.on('init', (data) => { this.myRole = data.role; callback(data); }); },
    onRoomUpdate(callback) { socket.on('roomUpdated', callback); },
    onSystemMsg(callback) { socket.on('systemMsg', callback); }
};