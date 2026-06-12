// public/game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let cam = { x: 3000, y: 3000, zoom: 0.5 };
const stars = [];
for(let i=0; i<1500; i++) stars.push({ x: Math.random()*6000, y: Math.random()*6000, size: Math.random()*2, alpha: Math.random() });

function gameLoop() {
    ctx.fillStyle = "#030308"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
    ctx.scale(cam.zoom, cam.zoom); ctx.translate(-cam.x, -cam.y);

    // Vẽ biên bản đồ (Bỏ viền thừa)
    ctx.strokeStyle = "#0ff"; ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, 6000, 6000);

    // Vẽ sao (Logic parallax)
    ctx.fillStyle = "white";
    stars.forEach(s => {
        ctx.globalAlpha = s.alpha;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); ctx.fill();
    });

    ctx.restore();
    requestAnimationFrame(gameLoop);
}

// Chạy game
function startRendering() {
    requestAnimationFrame(gameLoop);
}