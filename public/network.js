const socket = io();

const Network = {
    myRole: null,
    myTeamId: null,
    myRoomCode: null,
    isConnected: false,
    
    // === GỬI SỰ KIỆN ===
    createRoom(name) { 
        socket.emit('createRoom', name); 
    },
    
    joinRoom(code, name) { 
        socket.emit('joinRoom', { code, username: name }); 
    },
    
    startGame(roomCode) { 
        socket.emit('startGame', roomCode); 
    },
    
    sendAction(roomCode, team, action, payload = {}) {
        socket.emit('playerAction', { roomCode, team, action, payload });
    },
    
    syncGameState(roomCode, state) {
        socket.emit('syncGameState', { roomCode, state });
    },

    // === LẮNG NGHE SỰ KIỆN ===
    onInit(callback) { 
        socket.on('init', (data) => { 
            this.myRole = data.role;
            this.myTeamId = data.team;
            this.myRoomCode = data.roomCode;
            this.isConnected = true;
            callback(data); 
        }); 
    },
    
    onRoomUpdate(callback) { 
        socket.on('roomUpdated', callback); 
    },
    
    onSystemMsg(callback) { 
        socket.on('systemMsg', callback); 
    },
    
    onGameStarted(callback) {
        socket.on('gameStarted', callback);
    },
    
    onHostDisconnected(callback) {
        socket.on('hostDisconnected', callback);
    },
    
    onUpdateGameState(callback) {
        socket.on('updateGameState', callback);
    },
    
    onExecuteAction(callback) {
        socket.on('executeAction', callback);
    },
    
    // === QUẢN LÝ KẾT NỐI ===
    onConnect(callback) {
        socket.on('connect', callback);
    },
    
    onDisconnect(callback) {
        socket.on('disconnect', callback);
    },
    
    onReconnect(callback) {
        socket.on('reconnect', callback);
    },
    
    onConnectError(callback) {
        socket.on('connect_error', callback);
    },
    
    // === TIỆN ÍCH ===
    isHost() {
        return this.myRole === 'host';
    },
    
    isGuest() {
        return this.myRole === 'guest';
    },
    
    isOnline() {
        return this.isConnected && this.myRoomCode !== null;
    }
};

// Tự động reconnect
socket.on('disconnect', () => {
    console.log('🔌 Mất kết nối! Đang thử kết nối lại...');
    Network.isConnected = false;
});

socket.on('reconnect', () => {
    console.log('✅ Đã kết nối lại!');
    Network.isConnected = true;
});

socket.on('connect_error', (err) => {
    console.error('❌ Lỗi kết nối:', err.message);
});