const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Thiết bị kết nối:', socket.id);
    
    // Khung sườn quản lý phòng sẽ được đắp logic vào các bản cập nhật sau
    socket.on('disconnect', () => {
        console.log('Thiết bị ngắt kết nối:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`[RTS SERVER] Đang chạy tại port ${PORT}`);
});