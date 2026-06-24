// ============================================
// GALACTIC RTS - CORE GAME ENGINE
// ============================================

// --- CẤU HÌNH GAME ---
const GAME_CONFIG = {
    permanentUpgrades: [
        { key: 'hq_hp', name: 'Gia Cố Lõi HQ', baseCost: 30 },
        { key: 'turret_atk', name: 'Nòng Plasma (Tháp ATK)', baseCost: 40 },
        { key: 'miner_spd', name: 'Động Cơ Khai Thác (Mỏ SPD)', baseCost: 30 },
        { key: 'interceptor_atk', name: 'Đạn Xuyên Giáp (Tiêm Kích ATK)', baseCost: 30 },
        { key: 'corvette_hp', name: 'Vỏ Hợp Kim Titan (Tuần Tra HP)', baseCost: 40 },
        { key: 'repairer_atk', name: 'Tia Phục Hồi X2 (Tàu Hỗ Trợ)', baseCost: 50 },
        { key: 'railgun_atk', name: 'Pháo Điện Từ (Pháo Kích ATK)', baseCost: 60 },
        { key: 'dreadnought_hp', name: 'Giáp Hấp Thụ (Tàu C3 HP)', baseCost: 100 },
        { key: 'dreadnought_spd', name: 'Lõi Phản Vật Chất (Tàu C3 SPD)', baseCost: 150 }
    ],
    map: {
        width: 6000,
        height: 6000,
        maxMines: 40,
        edgePadding: 80,
        starDensityDivisor: 6000,
        mineSpawnChance: 0.05
    },
    economy: {
        startGold: 200,
        minerCost: 50,
        turretCost: 100,
        reactorCost: 60,
        barracksCost: 50,
        barracksUpgradeCosts: { 1: 120, 2: 250 },
        techUpgradeCost: 150,
        reactorGoldPerTick: 1,
        reactorTickFrames: 60,
        playerTurretLimit: 5,
        playerReactorLimit: 5,
        droneLimit: 5
    },
    scaling: {
        inGameUpgradeStep: 0.10,
        playerMetaStep: 0.05,
        sectorEnemyStep: 0.05,
        turretHpUpgradeStep: 0.10,
        turretAtkFlatStep: 1
    },
    units: {
        interceptor: { hp: 200, atk: 18, spd: 1.0, range: 100, aggro: 350, cost: 20, mpCost: 15, cd: 40, radius: 8, buildTime: 600 },
        corvette: { hp: 400, atk: 25, spd: 0.6, range: 150, aggro: 300, cost: 40, mpCost: 20, cd: 60, radius: 10, buildTime: 900 },
        repairer: { hp: 300, atk: 40, spd: 0.5, range: 180, aggro: 250, cost: 60, mpCost: 30, cd: 60, radius: 11, buildTime: 1200 },
        railgun: { hp: 600, atk: 80, spd: 0.4, range: 300, aggro: 350, cost: 80, mpCost: 50, cd: 150, radius: 12, buildTime: 1500 },
        base_repairer: { hp: 80, atk: 2, spd: 0.8, range: 120, aggro: 450, cost: 50, mpCost: 0, cd: 12, radius: 4, buildTime: 480 },
        carrier: { hp: 4000, atk: 0, spd: 0.25, range: 300, aggro: 400, cost: 250, mpCost: 150, cd: 60, radius: 70, buildTime: 3600 },
        leviathan: { hp: 3000, atk: 120, spd: 0.35, range: 250, aggro: 350, cost: 250, mpCost: 60, cd: 120, radius: 70, buildTime: 3600 },
        driller: { hp: 2500, atk: 12, spd: 0.4, range: 200, aggro: 300, cost: 250, mpCost: 0, cd: 15, radius: 70, buildTime: 3600 }
    },
    buildings: {
        hq: { hp: 12000, atk: 40, spd: 0, range: 250, cd: 30 },
        barracks: { hp: 2500, radius: 35 },
        turret: { hp: 1500, atk: 3, spd: 0, range: 350, cd: 8, radius: 7.5 },
        miner: { hp: 800, atk: 0, spd: 0.6, buildTime: 480 },
        reactor: { hp: 1200, radius: 20 }
    },
    skills: {
        carrier: { maxDrones: 10, droneHpMult: 0.8, droneAtkMult: 0.8, mpRegen: 0.5 },
        leviathan: { splashRadius: 150, splashDamageMult: 0.5, explosionFrames: 60 },
        driller: { heatMax: 12, heatDamageStep: 0.25 },
        repairer: { mpRegen: 0.25 },
        railgun: { mpRegen: 0.15 },
        baseRepairer: { healAmount: 2, healCooldown: 12, guardRadius: 450 }
    },
    ai: {
        tickFrames: 45,
        upgradeChance: 0.18,
        trainChance: 0.85,
        droneChance: 0.35,
        reactorChance: 0.35,
        turretChance: 0.45,
        rallyDistanceFromBase: 260,
        rallyReleaseDistance: 55,
        targetSwitchChance: 0.18,
        defenseHpRatio: 0.8,
        evaluation: {
            ownBaseThreatRadius: 520,
            pressureRadius: 700,
            weakBaseWeight: 120,
            closeTargetRange: 2200,
            closeTargetDivisor: 20,
            turretPenaltyRush: 18,
            turretPenaltyDefault: 10,
            enemyArmyPenalty: 3,
            pressureWeight: 35,
            playerBias: 8,
            armyHpDivisor: 8,
            armyAtkWeight: 3,
            armyRangeDivisor: 10,
            queuedPowerMult: 0.55
        },
        barracksOffset: { x: 180, y: 180 },
        turretPlacement: { minR: 150, maxR: 310, attempts: 18, enemyBias: 0.72 },
        reactorPlacement: { minR: 100, maxR: 220 },
        styles: {
            RUSH: { attackThreshold: 5, minAttackPower: 150, retreatAt: 1, miners: 5, turrets: 2, reactors: 3, upgradeBarracksAtArmy: 4, saveForUpgradeAtArmy: 6, unitMix: ['interceptor', 'interceptor', 'corvette', 'corvette'], maxQueue: 3 },
            FLEX: { attackThreshold: 7, minAttackPower: 260, retreatAt: 2, miners: 6, turrets: 3, reactors: 3, upgradeBarracksAtArmy: 5, saveForUpgradeAtArmy: 4, unitMix: ['interceptor', 'corvette', 'repairer', 'railgun'], maxQueue: 3 },
            LATE: { attackThreshold: 10, minAttackPower: 420, retreatAt: 3, miners: 7, turrets: 5, reactors: 3, upgradeBarracksAtArmy: 3, saveForUpgradeAtArmy: 3, unitMix: ['corvette', 'repairer', 'railgun', 'railgun'], maxQueue: 4 }
        }
    },
    movement: {
        separationRadius: 30,
        alignmentRadius: 60,
        cohesionRadius: 80,
        maxForce: 0.05,
        maxSpeed: 1.2,
        avoidWallDistance: 50,
        formationSpacing: 25,
        swarmUpdateInterval: 5
    }
};

// --- BIẾN TOÀN CỤ ---
// ============================================
// THÊM VÀO ĐẦU FILE - BIẾN TOÀN CỤ
// ============================================
let gameMode = 'ffa'; // 'ffa' hoặc 'team'
const TEAM_PLAYER = ['player'];
const TEAM_BOT = ['bot1', 'bot2', 'bot3', 'bot4', 'bot5', 'bot6', 'bot7'];

// Hàm kiểm tra có phải là kẻ thù không
function isEnemy(team1, team2) {
    if (gameMode === 'ffa') return team1 !== team2;
    if (team1 === team2) return false;
    
    // TEAM mode: player vs bot
    if (TEAM_PLAYER.includes(team1) && TEAM_BOT.includes(team2)) return true;
    if (TEAM_BOT.includes(team1) && TEAM_PLAYER.includes(team2)) return true;
    
    return false;
}

// Hàm lấy danh sách kẻ thù của một team
function getEnemyTeams(team) {
    if (gameMode === 'ffa') {
        return ALL_TEAMS.filter(t => t !== team);
    } else {
        if (TEAM_PLAYER.includes(team)) {
            return TEAM_BOT.slice(); // Player team đánh bot
        } else {
            return TEAM_PLAYER.slice(); // Bot team đánh player
        }
    }
}
const ALL_TEAMS = ['player', 'bot1', 'bot2', 'bot3', 'bot4', 'bot5', 'bot6', 'bot7'];
const MAP_W = GAME_CONFIG.map.width;
const MAP_H = GAME_CONFIG.map.height;
const MAX_MINES = GAME_CONFIG.map.maxMines;

let canvas, ctx;
let gameStarted = false;
let gameOver = false;
let animationId = null;
let frameCount = 0;
let matchStartTime = 0;
let zoom = 0.5;
let dpr = 1.0;
let cam = { x: 0, y: 0 };
let isDragging = false;
let panStart = { x: 0, y: 0 };
let selectStart = { x: 0, y: 0 };
let selectEnd = { x: 0, y: 0 };
let dragDist = 0;
let placementMode = null;
let selectedUnitIds = [];
let guestCameraSet = false;
let serverGameState = null;
let humanTeams = [];
let globalBotBuff = 0;
let lobbyPlayers = [];

let gameData = {};
let buildings = [];
let units = [];
let miners = [];
let turrets = [];
let reactors = [];
let mines = [];
let explosions = [];
let stars = [];

// --- PROFILE ---
const defaultProfile = {
    darkMatter: 0,
    sector: 1,
    capturedGenerals: [],
    upgrades: {
        hq_hp: 0,
        turret_atk: 0,
        miner_spd: 0,
        interceptor_atk: 0,
        corvette_hp: 0,
        repairer_atk: 0,
        railgun_atk: 0,
        dreadnought_hp: 0,
        dreadnought_spd: 0
    }
};

let profile = loadProfile();

// --- HÀM TIỆN ÍCH ---
function cloneDefaultProfile() {
    return JSON.parse(JSON.stringify(defaultProfile));
}

function normalizeProfile(rawProfile) {
    let clean = cloneDefaultProfile();
    if (!rawProfile || typeof rawProfile !== 'object') return clean;
    clean.darkMatter = Number.isFinite(rawProfile.darkMatter) ? rawProfile.darkMatter : clean.darkMatter;
    clean.sector = Number.isFinite(rawProfile.sector) && rawProfile.sector > 0 ? rawProfile.sector : clean.sector;
    clean.capturedGenerals = Array.isArray(rawProfile.capturedGenerals) ? rawProfile.capturedGenerals : [];
    clean.upgrades = Object.assign(clean.upgrades, rawProfile.upgrades || {});
    return clean;
}

function loadProfile() {
    try {
        return normalizeProfile(JSON.parse(localStorage.getItem('galacticRTS_profile')));
    } catch (err) {
        return cloneDefaultProfile();
    }
}

function saveProfile() {
    try {
        localStorage.setItem('galacticRTS_profile', JSON.stringify(profile));
    } catch (err) {
        showToast("Không thể lưu dữ liệu trình duyệt", "#ff4444");
    }
}

function getEffectiveStat(baseStat, inGameLevel, team, statKey) {
    let inGameMult = 1 + (inGameLevel * GAME_CONFIG.scaling.inGameUpgradeStep);
    let metaMult = 1.0;

    if (team === 'player' || (humanTeams && humanTeams.includes(team))) {
        if (statKey) {
            let mappedKey = statKey.replace(/^(carrier|leviathan|driller)_/, 'dreadnought_');
            if (profile.upgrades[mappedKey]) metaMult = 1 + (profile.upgrades[mappedKey] * GAME_CONFIG.scaling.playerMetaStep);
        }
    } else {
        let buff = globalBotBuff || 0;
        metaMult = 1 + ((profile.sector - 1) * GAME_CONFIG.scaling.sectorEnemyStep) + buff;
    }
    return baseStat * inGameMult * metaMult;
}

function createInitialUpgrades() {
    return {
        hq: { hpLv: 0 },
        turret: { hpLv: 0, atkLv: 0 },
        miner: { hpLv: 0, spdLv: 0 },
        interceptor: { hpLv: 0, atkLv: 0, spdLv: 0 },
        corvette: { hpLv: 0, atkLv: 0, spdLv: 0 },
        repairer: { hpLv: 0, atkLv: 0, spdLv: 0 },
        railgun: { hpLv: 0, atkLv: 0, spdLv: 0 },
        spc: { hpLv: 0, atkLv: 0, spdLv: 0 }
    };
}

function getBase(team) {
    return buildings.find(b => b.team === team && b.type === 'Base');
}

function getSpecialShipHelper(theme) {
    if (theme === 'std') return { type: 'carrier', name: 'MẪU HẠM' };
    if (theme === 'sea') return { type: 'leviathan', name: 'THỦY THẦN' };
    if (theme === 'under') return { type: 'driller', name: 'NHIỆT HẠCH' };
    return { type: 'carrier', name: 'MẪU HẠM' };
}

function getSafePos(baseX, baseY, minR, maxR, obstacles, clearDist) {
    for (let i = 0; i < 20; i++) {
        let ang = Math.random() * Math.PI * 2;
        let r = minR + Math.random() * (maxR - minR);
        let bx = baseX + Math.cos(ang) * r;
        let by = baseY + Math.sin(ang) * r;
        if (bx < GAME_CONFIG.map.edgePadding || by < GAME_CONFIG.map.edgePadding ||
            bx > MAP_W - GAME_CONFIG.map.edgePadding || by > MAP_H - GAME_CONFIG.map.edgePadding) continue;
        let overlap = false;
        for (let o of obstacles) {
            if (Math.hypot(o.x - bx, o.y - by) < clearDist) { overlap = true; break; }
        }
        if (!overlap) return { x: bx, y: by };
    }
    return null;
}

function getValidSpawnPos(existingPositions) {
    let limit = 2000;
    while (limit > 0) {
        let x = 400 + Math.random() * (MAP_W - 800);
        let y = 400 + Math.random() * (MAP_H - 800);
        let valid = true;
        for (let pos of existingPositions) {
            if (Math.hypot(pos.x - x, pos.y - y) < 1400) { valid = false; break; }
        }
        if (valid) return { x, y };
        limit--;
    }
    return { x: Math.random() * MAP_W, y: Math.random() * MAP_H };
}

function showToast(msg, color = "#00ffff") {
    let t = document.getElementById('toast-msg');
    if (!t) return;
    t.innerText = msg;
    t.style.color = color;
    t.style.borderColor = color;
    t.style.display = 'block';
    clearTimeout(t._timeout);
    t._timeout = setTimeout(() => t.style.display = 'none', 3000);
}

function unlockGeneral(team) {
    const generalProfiles = {
        bot1: { name: 'TITAN', desc: 'Thiên về đội hình trâu máu và ép giao tranh trực diện.' },
        bot2: { name: 'SWIFT', desc: 'Ưa tốc độ, mở rộng nhanh và đánh sớm.' },
        bot3: { name: 'PSIONIC', desc: 'Tận dụng nâng cấp để kéo dài giao tranh.' },
        bot4: { name: 'NOVA', desc: 'Dồn tài nguyên cho đợt công kích lớn.' },
        bot5: { name: 'ABYSS', desc: 'Phòng thủ sâu, phản công khi đủ hạm đội.' },
        bot6: { name: 'GALAXY', desc: 'Chiến thuật linh hoạt, đổi mục tiêu liên tục.' },
        bot7: { name: 'NEBULA', desc: 'Thích kéo trận về cuối và dùng tàu cấp cao.' }
    };
    if (!generalProfiles[team] || profile.capturedGenerals.includes(team)) return;
    profile.capturedGenerals.push(team);
    saveProfile();
}

// --- CLASS ENTITY ---
class Entity {
    constructor(x, y, team, typeStr, baseHp) {
        this.x = x;
        this.y = y;
        this.team = team;
        this.entityType = typeStr;
        this.markedForDeletion = false;
        this.color = gameData[team] ? gameData[team].color : '#ffffff';
        this.sides = gameData[team] ? gameData[team].sides : 3;
        
        let upgKey = ['carrier', 'leviathan', 'driller'].includes(typeStr) ? 'spc' : typeStr;
        let hpLv = gameData[team] && gameData[team].upg[upgKey] ? gameData[team].upg[upgKey].hpLv : 0;
        let metaKey = ['carrier', 'leviathan', 'driller'].includes(typeStr) ? 'dreadnought_hp' : typeStr + '_hp';
        this.maxHp = getEffectiveStat(baseHp, hpLv, team, metaKey);

        if (typeStr === 'turret') {
            let inGameHpLv = gameData[team] ? gameData[team].inGameTurretHpLv || 0 : 0;
            this.maxHp *= (1 + (inGameHpLv * GAME_CONFIG.scaling.turretHpUpgradeStep));
        }
        this.hp = this.maxHp;
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0 && !this.markedForDeletion) {
            this.markedForDeletion = true;
            if (this.entityType === 'hq' && this.team !== 'player') unlockGeneral(this.team);
        }
    }

    drawBarStats(ctx, yOffset, width, currentMp = 0, maxMp = 0) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
        ctx.fillRect(this.x - width / 2, this.y - yOffset, width, 3);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - width / 2, this.y - yOffset, width * (Math.max(0, this.hp) / this.maxHp), 3);
        if (maxMp > 0) {
            ctx.fillStyle = "rgba(0, 0, 100, 0.5)";
            ctx.fillRect(this.x - width / 2, this.y - yOffset + 4, width, 2);
            ctx.fillStyle = "#0088ff";
            ctx.fillRect(this.x - width / 2, this.y - yOffset + 4, width * (Math.max(0, currentMp) / maxMp), 2);
        }
    }
}

// --- CLASS GOLD MINE ---
class GoldMine {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 18;
        this.capacity = 400;
        this.markedForDeletion = false;
    }

    extract() {
        if (this.capacity > 0) {
            this.capacity--;
            if (this.capacity <= 0) this.markedForDeletion = true;
            return 1;
        }
        return 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 215, 0, 0.1)";
        ctx.fill();
        ctx.strokeStyle = "#ffee55";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * (this.capacity / 400), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.capacity, this.x, this.y + 28);
    }
}

// --- CLASS BUILDING ---
class Building extends Entity {
    constructor(x, y, team, type) {
        let tStr = type === 'Base' ? 'hq' : 'barracks';
        super(x, y, team, tStr, type === 'Base' ? GAME_CONFIG.buildings.hq.hp : GAME_CONFIG.buildings.barracks.hp);
        this.type = type;
        this.radius = type === 'Base' ? 70 : GAME_CONFIG.buildings.barracks.radius;
        this.range = GAME_CONFIG.buildings.hq.range;
        this.attackCooldown = 0;
        this.laserDrawFrames = 0;
        this.laserTarget = null;
        this.queue = [];
        this.buildTimer = 0;
    }

    update(entities) {
        if (this.type === 'Base') {
            if (this.attackCooldown > 0) this.attackCooldown--;
            if (this.laserDrawFrames > 0) this.laserDrawFrames--;
            let dmg = GAME_CONFIG.buildings.hq.atk;
            let target = null;
            let minDist = Infinity;
            for (let ent of entities) {
                if (ent.team !== this.team && !ent.markedForDeletion) {
                    let dist = Math.hypot(ent.x - this.x, ent.y - this.y);
                    if (dist < minDist) { minDist = dist;
                        target = ent; }
                }
            }
            if (target && minDist <= this.range && this.attackCooldown <= 0) {
                target.takeDamage(dmg);
                this.attackCooldown = GAME_CONFIG.buildings.hq.cd;
                this.laserTarget = target;
                this.laserDrawFrames = 5;
            }
        }

        if (this.queue.length > 0) {
            this.buildTimer++;
            let currentJob = this.queue[0];
            if (this.buildTimer >= currentJob.buildTime) {
                this.buildTimer = 0;
                this.queue.shift();
                if (currentJob.unitType === 'miner') {
                    miners.push(new Miner(this.x + 80, this.y + 80, this.team));
                } else {
                    units.push(new CombatUnit(this.x + 80, this.y + 80, this.team, currentJob.unitType));
                }
            }
        }
    }

    draw(ctx) {
        let bldType = this.type === 'Base' ? 'hq' : 'barracks';
        let imgKey = gameData[this.team] ? gameData[this.team].theme + '_' + bldType : 'std_' + bldType;
        let img = assets[imgKey];
        let drawSize = this.radius * 2.2;

        if (img && img.complete && img.naturalWidth > 0) {
            let aspect = img.naturalHeight / img.naturalWidth;
            let w = drawSize;
            let h = drawSize;
            if (aspect > 1) { w = drawSize / aspect; } else if (aspect < 1) { h = drawSize * aspect; }
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.drawImage(img, -w / 2, -h / 2, w, h);
            ctx.restore();
        } else {
            drawFactionShape(ctx, this.x, this.y, this.radius, this.sides, this.color, true);
            ctx.fillStyle = "#fff";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.fillText(this.type === 'Base' ? "HQ" : "FAC", this.x, this.y + 4);
        }

        if (this.type === 'Barracks') {
            let lv = gameData[this.team] ? gameData[this.team].barracksLevel : 0;
            ctx.fillStyle = "#fff";
            ctx.font = "bold 12px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Lv." + lv, this.x, this.y - this.radius - 10);
        }

        if (this.laserDrawFrames > 0 && this.laserTarget && !this.laserTarget.markedForDeletion) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.laserTarget.x, this.laserTarget.y);
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        this.drawBarStats(ctx, this.radius + 15 + (this.type === 'Barracks' ? 10 : 0), this.radius * 1.5);

        if (this.queue.length > 0) {
            let progress = this.buildTimer / this.queue[0].buildTime;
            let barWidth = this.radius * 2;
            let barY = this.y - this.radius - (this.type === 'Barracks' ? 35 : 25);
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(this.x - barWidth / 2, barY, barWidth, 4);
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(this.x - barWidth / 2, barY, barWidth * progress, 4);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 9px Arial";
            ctx.textAlign = "center";
            ctx.fillText(`Đang tạo (${this.queue.length})`, this.x, barY - 4);
        }
    }
}

// --- CLASS REACTOR ---
class Reactor extends Entity {
    constructor(x, y, team) {
        super(x, y, team, 'reactor', GAME_CONFIG.buildings.reactor.hp);
        this.radius = GAME_CONFIG.buildings.reactor.radius;
        this.tick = 0;
    }

    update() {
        this.tick++;
        if (this.tick >= GAME_CONFIG.economy.reactorTickFrames) {
            if (gameData[this.team]) gameData[this.team].gold += GAME_CONFIG.economy.reactorGoldPerTick;
            this.tick = 0;
        }
    }

    draw(ctx) {
        let imgKey = gameData[this.team] ? gameData[this.team].theme + '_reactor' : 'std_reactor';
        let img = assets[imgKey];
        let drawSize = this.radius * 2.2;
        if (img && img.complete && img.naturalWidth > 0) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.drawImage(img, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
            ctx.restore();
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#002200";
            ctx.fill();
            ctx.strokeStyle = "#00ff00";
            ctx.stroke();
        }
        this.drawBarStats(ctx, this.radius + 12, this.radius * 1.5);
    }
}

// --- CLASS TURRET ---
class Turret extends Entity {
    constructor(x, y, team) {
        super(x, y, team, 'turret', GAME_CONFIG.buildings.turret.hp);
        this.radius = GAME_CONFIG.buildings.turret.radius;
        this.range = GAME_CONFIG.buildings.turret.range;
        this.attackCooldown = 0;
        this.angle = -Math.PI / 2;
        this.laserDrawFrames = 0;
        this.laserTarget = null;
    }

    update(entities) {
        if (this.attackCooldown > 0) this.attackCooldown--;
        if (this.laserDrawFrames > 0) this.laserDrawFrames--;

        let atkLv = gameData[this.team] ? gameData[this.team].upg['turret'].atkLv : 0;
        let inGameLv = gameData[this.team] ? gameData[this.team].inGameTurretLv || 0 : 0;
        let dmg = getEffectiveStat(GAME_CONFIG.buildings.turret.atk, atkLv, this.team, 'turret_atk') +
            (inGameLv * GAME_CONFIG.scaling.turretAtkFlatStep);

        let target = null;
        let minDist = Infinity;
        for (let ent of entities) {
            if (ent.team !== this.team && !ent.markedForDeletion) {
                let dist = Math.hypot(ent.x - this.x, ent.y - this.y);
                if (dist < minDist) { minDist = dist;
                    target = ent; }
            }
        }
        if (target && minDist <= this.range) {
            let dx = target.x - this.x;
            let dy = target.y - this.y;
            this.angle = Math.atan2(dy, dx);
            if (this.attackCooldown === 0) {
                target.takeDamage(dmg);
                this.attackCooldown = GAME_CONFIG.buildings.turret.cd;
                this.laserTarget = target;
                this.laserDrawFrames = 3;
            }
        }
    }

    draw(ctx) {
        let imgKey = gameData[this.team] ? gameData[this.team].theme + '_turret' : 'std_turret';
        let img = assets[imgKey];
        let drawSize = this.radius * 3.5;
        if (img && img.complete && img.naturalWidth > 0) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle + Math.PI / 2);
            ctx.drawImage(img, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
            ctx.restore();
        } else {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle + Math.PI / 2);
            drawFactionShape(ctx, 0, 0, this.radius, this.sides, this.color, true, 0);
            ctx.restore();
        }
        if (this.laserDrawFrames > 0 && this.laserTarget && !this.laserTarget.markedForDeletion) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.laserTarget.x, this.laserTarget.y);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        this.drawBarStats(ctx, this.radius + 15, 25);
    }
}

// --- CLASS MINER (ĐÃ SỬA LỖI DI CHUYỂN) ---
class Miner extends Entity {
    constructor(x, y, team) {
        super(x, y, team, 'miner', GAME_CONFIG.buildings.miner.hp);
        this.radius = 10;
        this.state = 'moving_to_mine';
        this.carryAmount = 0;
        this.maxCarry = 20;
        this.mineTimer = 0;
        this.targetMine = null;
        this.angle = -Math.PI / 2;
        this.separationRadius = 25;
        this.avoidForce = { x: 0, y: 0 };
        this.stuckTimer = 0;
        this.lastPosition = { x: this.x, y: this.y };
        this.wanderAngle = Math.random() * Math.PI * 2;
        this.smoothX = this.x;
        this.smoothY = this.y;
    }

    update(minesArray, basesArray) {
        let spdLv = gameData[this.team] ? gameData[this.team].upg['miner'].spdLv : 0;
        let speed = getEffectiveStat(GAME_CONFIG.buildings.miner.spd, spdLv, this.team, 'miner_spd');
        
        this.avoidForce = { x: 0, y: 0 };
        
        // Áp dụng lực tách biệt với miners khác
        miners.forEach(other => {
            if (other === this || other.markedForDeletion) return;
            if (other.team === this.team) {
                let dx = this.x - other.x;
                let dy = this.y - other.y;
                let dist = Math.hypot(dx, dy);
                if (dist > 0 && dist < this.separationRadius * 2) {
                    let strength = (this.separationRadius * 2 - dist) / (this.separationRadius * 2);
                    this.avoidForce.x += (dx / dist) * strength * 0.6;
                    this.avoidForce.y += (dy / dist) * strength * 0.6;
                }
            }
        });

        // Kiểm tra bị kẹt
        let distMoved = Math.hypot(this.x - this.lastPosition.x, this.y - this.lastPosition.y);
        if (distMoved < 0.3) {
            this.stuckTimer++;
            if (this.stuckTimer > 40) {
                this.wanderAngle += (Math.random() - 0.5) * 2;
                this.x += Math.cos(this.wanderAngle) * 3;
                this.y += Math.sin(this.wanderAngle) * 3;
                this.stuckTimer = 0;
                if (this.state === 'moving_to_mine' || this.state === 'mining') {
                    this.targetMine = null;
                    this.state = 'moving_to_mine';
                }
            }
        } else {
            this.stuckTimer = 0;
        }
        this.lastPosition = { x: this.x, y: this.y };

        if (this.state === 'moving_to_mine' || this.state === 'mining') {
            if (!this.targetMine || this.targetMine.markedForDeletion) {
                let closestMine = null;
                let minDist = Infinity;
                minesArray.forEach(m => {
                    if (!m.markedForDeletion) {
                        let d = Math.hypot(m.x - this.x, m.y - this.y);
                        if (d < minDist) { minDist = d;
                            closestMine = m; }
                    }
                });
                this.targetMine = closestMine;
                if (!this.targetMine) { 
                    this.state = 'returning'; 
                    return; 
                }
            }

            let dx = this.targetMine.x - this.x + this.avoidForce.x * 8;
            let dy = this.targetMine.y - this.y + this.avoidForce.y * 8;
            let dist = Math.hypot(dx, dy);
            
            if (dist > this.radius + this.targetMine.radius + 15) {
                this.state = 'moving_to_mine';
                if (dist > 0) {
                    this.angle = Math.atan2(dy, dx);
                    let moveSpeed = Math.min(speed * 0.8, dist * 0.12);
                    let noise = 1 + (Math.random() - 0.5) * 0.1;
                    this.x += (dx / dist) * moveSpeed * noise;
                    this.y += (dy / dist) * moveSpeed * noise;
                }
            } else {
                this.state = 'mining';
                this.mineTimer++;
                if (this.mineTimer >= 30) {
                    let gathered = this.targetMine.extract();
                    if (gathered > 0) {
                        this.carryAmount += gathered;
                        this.mineTimer = 0;
                        if (this.carryAmount >= this.maxCarry) {
                            this.state = 'returning';
                            this.targetMine = null;
                        }
                    }
                }
            }
        } else if (this.state === 'returning') {
            let myBase = basesArray.find(b => b.team === this.team && b.type === 'Base');
            if (myBase) {
                let dx = myBase.x - this.x + this.avoidForce.x * 8;
                let dy = myBase.y - this.y + this.avoidForce.y * 8;
                let dist = Math.hypot(dx, dy);
                
                if (dist > this.radius + myBase.radius + 20) {
                    this.angle = Math.atan2(dy, dx);
                    let moveSpeed = Math.min(speed * 0.8, dist * 0.12);
                    this.x += (dx / dist) * moveSpeed;
                    this.y += (dy / dist) * moveSpeed;
                } else {
                    if (gameData[this.team]) gameData[this.team].gold += this.carryAmount;
                    this.carryAmount = 0;
                    this.targetMine = null;
                    this.state = 'moving_to_mine';
                }
            }
        }
        
        this.x = Math.max(20, Math.min(MAP_W - 20, this.x));
        this.y = Math.max(20, Math.min(MAP_H - 20, this.y));
    }
}

// --- CLASS COMBAT UNIT (ĐÃ SỬA LỖI DI CHUYỂN) ---
class CombatUnit extends Entity {
    constructor(x, y, team, type) {
        let s = GAME_CONFIG.units[type];
        super(x, y, team, type, s.hp);
        this.unitType = type;
        this.unitState = 'IDLE';
        this.targetTeam = null;
        this.radius = s.radius;
        this.range = s.range;
        this.aggroRange = s.aggro;
        this.attackCooldown = 0;
        this.mp = 0;
        this.maxMp = s.mpCost > 0 ? s.mpCost : 100;
        this.mpCost = s.mpCost;
        this.mpRegen = type === 'railgun' ? GAME_CONFIG.skills.railgun.mpRegen :
            (type === 'carrier' ? GAME_CONFIG.skills.carrier.mpRegen :
                GAME_CONFIG.skills.repairer.mpRegen);
        this.cooldownMax = s.cd;
        this.laserDrawFrames = 0;
        this.laserTarget = null;
        this.angle = -Math.PI / 2;
        this.targetX = null;
        this.targetY = null;
        this.heatLevel = 0;
        this.lastTarget = null;
        this.drones = [];
        this.isDrone = false;
        this.motherShip = null;
        this.hasHoldPosition = false;
        this.id = Math.random().toString(36).substring(2, 10);
        this.customAtk = undefined;
        this.separationRadius = 30;
        this.avoidForce = { x: 0, y: 0 };
        this.stuckTimer = 0;
        this.lastPosition = { x: this.x, y: this.y };
        this.formationOffset = { x: 0, y: 0 };
    }

    applySeparation(entities) {
        let forceX = 0, forceY = 0;
        let neighbors = 0;
        
        entities.forEach(other => {
            if (other === this || other.markedForDeletion) return;
            if (other instanceof CombatUnit && other.team === this.team && !other.isDrone) {
                let dx = this.x - other.x;
                let dy = this.y - other.y;
                let dist = Math.hypot(dx, dy);
                if (dist > 0 && dist < this.separationRadius * 2.5) {
                    let strength = (this.separationRadius * 2.5 - dist) / (this.separationRadius * 2.5);
                    forceX += (dx / dist) * strength * 0.5;
                    forceY += (dy / dist) * strength * 0.5;
                    neighbors++;
                }
            }
        });
        
        if (neighbors > 0) {
            this.avoidForce.x += forceX / neighbors;
            this.avoidForce.y += forceY / neighbors;
        }
    }

    applyWallAvoidance() {
        let wallForce = 80;
        let margin = 50;
        
        if (this.x < margin) {
            this.avoidForce.x += wallForce * (1 - this.x / margin);
        }
        if (this.x > MAP_W - margin) {
            this.avoidForce.x -= wallForce * (1 - (MAP_W - this.x) / margin);
        }
        if (this.y < margin) {
            this.avoidForce.y += wallForce * (1 - this.y / margin);
        }
        if (this.y > MAP_H - margin) {
            this.avoidForce.y -= wallForce * (1 - (MAP_H - this.y) / margin);
        }
    }

    smartMove(targetX, targetY, speed) {
        let dx = targetX - this.x + this.avoidForce.x * 4;
        let dy = targetY - this.y + this.avoidForce.y * 4;
        let dist = Math.hypot(dx, dy);
        
        if (dist > 0) {
            let moveSpeed = Math.min(speed * 0.9, dist * 0.12);
            
            if (dist < 30) {
                moveSpeed = speed * (dist / 30);
            }
            
            if (dist < 5 && this.stuckTimer > 30) {
                let angle = Math.random() * Math.PI * 2;
                this.x += Math.cos(angle) * 3;
                this.y += Math.sin(angle) * 3;
                this.stuckTimer = 0;
            }
            
            this.angle = Math.atan2(dy, dx);
            this.x += (dx / dist) * Math.min(moveSpeed, dist * 0.2);
            this.y += (dy / dist) * Math.min(moveSpeed, dist * 0.2);
        }
        
        let distMoved = Math.hypot(this.x - this.lastPosition.x, this.y - this.lastPosition.y);
        if (distMoved < 0.2) {
            this.stuckTimer++;
        } else {
            this.stuckTimer = 0;
        }
        this.lastPosition = { x: this.x, y: this.y };
        
        this.x = Math.max(20, Math.min(MAP_W - 20, this.x));
        this.y = Math.max(20, Math.min(MAP_H - 20, this.y));
    }

    update(entities, basesArray) {
        this.avoidForce = { x: 0, y: 0 };
        
        if (this.unitType === 'carrier') {
            this.drones = this.drones.filter(d => !d.markedForDeletion);
            if (this.drones.length < GAME_CONFIG.skills.carrier.maxDrones) {
                if (this.mp < this.maxMp) this.mp += this.mpRegen;
                if (this.mp >= this.maxMp) {
                    this.mp = 0;
                    let drone = new CombatUnit(this.x, this.y, this.team, 'interceptor');
                    drone.maxHp *= GAME_CONFIG.skills.carrier.droneHpMult;
                    drone.hp = drone.maxHp;
                    drone.customAtk = getEffectiveStat(GAME_CONFIG.units['interceptor'].atk,
                        (gameData[this.team] ? gameData[this.team].upg['interceptor'].atkLv : 0),
                        this.team, 'interceptor_atk') * GAME_CONFIG.skills.carrier.droneAtkMult;
                    drone.radius *= 0.5;
                    drone.isDrone = true;
                    drone.motherShip = this;
                    this.drones.push(drone);
                    units.push(drone);
                }
            } else {
                this.mp = this.maxMp;
            }
        } else if (this.mpCost > 0 && this.mp < this.maxMp) {
            this.mp += this.mpRegen;
        }

        if (this.attackCooldown > 0) this.attackCooldown--;
        if (this.laserDrawFrames > 0) this.laserDrawFrames--;

        let upgKey = ['carrier', 'leviathan', 'driller'].includes(this.unitType) ? 'spc' : this.unitType;
        let upg = (gameData[this.team] && gameData[this.team].upg[upgKey]) ?
            gameData[this.team].upg[upgKey] : { atkLv: 0, spdLv: 0 };
        let baseS = GAME_CONFIG.units[this.unitType];

        let metaAtkKey = ['carrier', 'leviathan', 'driller'].includes(this.unitType) ?
            'dreadnought_atk' : this.unitType + '_atk';
        let metaSpdKey = ['carrier', 'leviathan', 'driller'].includes(this.unitType) ?
            'dreadnought_spd' : this.unitType + '_spd';

        let damage = this.customAtk !== undefined ? this.customAtk :
            getEffectiveStat(baseS.atk, upg.atkLv, this.team, metaAtkKey);
        let speed = getEffectiveStat(baseS.spd, upg.spdLv, this.team, metaSpdKey);
        let isEngaging = false;

        if (this.unitType === 'base_repairer') {
            let myBase = basesArray.find(b => b.team === this.team && b.type === 'Base');
            let targetToFix = null;
            let minDist = Infinity;
            if (myBase) {
                let candidates = entities.filter(ent => ent.team === this.team && !ent.markedForDeletion &&
                    ent.hp < ent.maxHp);
                for (let ent of candidates) {
                    let distToHQ = Math.hypot(ent.x - myBase.x, ent.y - myBase.y);
                    if (distToHQ <= GAME_CONFIG.skills.baseRepairer.guardRadius) {
                        let distToMe = Math.hypot(ent.x - this.x, ent.y - this.y);
                        if (distToMe < minDist) { minDist = distToMe;
                            targetToFix = ent; }
                    }
                }
            }
            if (targetToFix) {
                let dx = targetToFix.x - this.x;
                let dy = targetToFix.y - this.y;
                this.angle = Math.atan2(dy, dx);
                let dist = Math.hypot(dx, dy);
                if (dist > this.range) {
                    this.smartMove(targetToFix.x, targetToFix.y, speed);
                } else if (this.attackCooldown <= 0) {
                    targetToFix.hp = Math.min(targetToFix.maxHp, targetToFix.hp + GAME_CONFIG.skills.baseRepairer.healAmount);
                    this.laserTarget = targetToFix;
                    this.laserDrawFrames = 4;
                    this.attackCooldown = GAME_CONFIG.skills.baseRepairer.healCooldown;
                }
            } else if (myBase) {
                let dx = myBase.x - this.x;
                let dy = myBase.y - this.y;
                let dist = Math.hypot(dx, dy);
                if (dist > 120) {
                    this.smartMove(myBase.x, myBase.y, speed);
                }
            }
            this.applySeparation(entities);
            this.applyWallAvoidance();
            return;
        }

        if (this.unitType === 'repairer') {
            let damagedAlly = null;
            let minDistToDamaged = Infinity;
            let closestCombatAlly = null;
            let minDistToCombat = Infinity;
            for (let ent of entities) {
                if (ent.team === this.team && !ent.markedForDeletion && ent instanceof CombatUnit &&
                    ent.unitType !== 'base_repairer' && ent !== this) {
                    let dist = Math.hypot(ent.x - this.x, ent.y - this.y);
                    if (ent.unitType !== 'repairer' && dist < minDistToCombat) {
                        minDistToCombat = dist;
                        closestCombatAlly = ent;
                    }
                    if (ent.hp < ent.maxHp && dist < minDistToDamaged) {
                        minDistToDamaged = dist;
                        damagedAlly = ent;
                    }
                }
            }
            if (damagedAlly) {
                let dx = damagedAlly.x - this.x;
                let dy = damagedAlly.y - this.y;
                if (minDistToDamaged > this.range) {
                    this.smartMove(damagedAlly.x, damagedAlly.y, speed);
                } else if (this.attackCooldown <= 0 && this.mp >= this.mpCost) {
                    this.angle = Math.atan2(dy, dx);
                    this.mp -= this.mpCost;
                    damagedAlly.hp = Math.min(damagedAlly.maxHp, damagedAlly.hp + damage);
                    this.attackCooldown = this.cooldownMax;
                    this.laserTarget = damagedAlly;
                    this.laserDrawFrames = 8;
                }
            } else if (closestCombatAlly) {
                if (minDistToCombat > 100) {
                    this.smartMove(closestCombatAlly.x, closestCombatAlly.y, speed);
                }
            } else {
                let myBase = basesArray.find(b => b.team === this.team && b.type === 'Base');
                if (myBase && !this.hasHoldPosition) {
                    let dx = myBase.x - this.x;
                    let dy = myBase.y - this.y;
                    let dist = Math.hypot(dx, dy);
                    if (dist > 260) {
                        this.smartMove(myBase.x, myBase.y, speed);
                    }
                }
            }
            this.applySeparation(entities);
            this.applyWallAvoidance();
            return;
        }

if (this.unitState !== 'MOVE_TO_POINT' && this.unitType !== 'carrier') {
    let enemyToAttack = null;
    let minDistToEnemy = Infinity;
    
    for (let ent of entities) {
        // === SỬA LOGIC KIỂM TRA KẺ THÙ ===
        if (isEnemy(this.team, ent.team) && !ent.markedForDeletion) {
            let dist = Math.hypot(ent.x - this.x, ent.y - this.y);
            if (dist < minDistToEnemy) { 
                minDistToEnemy = dist;
                enemyToAttack = ent; 
            }
        }
    }
    
    if (enemyToAttack && minDistToEnemy <= this.aggroRange) {
        isEngaging = true;
                let dx = enemyToAttack.x - this.x;
                let dy = enemyToAttack.y - this.y;
                this.angle = Math.atan2(dy, dx);
                let dist = Math.hypot(dx, dy);
                if (dist > this.range) {
                    this.smartMove(enemyToAttack.x, enemyToAttack.y, speed);
                    if (this.unitType === 'driller') this.heatLevel = 0;
                } else if (this.attackCooldown <= 0 && (this.mpCost === 0 || this.mp >= this.mpCost)) {
                    if (this.mpCost > 0) this.mp -= this.mpCost;
                    let finalDamage = damage;

                    if (this.unitType === 'driller') {
                        if (this.lastTarget === enemyToAttack) this.heatLevel =
                            Math.min(GAME_CONFIG.skills.driller.heatMax, this.heatLevel + 1);
                        else { this.heatLevel = 0;
                            this.lastTarget = enemyToAttack; }
                        finalDamage = damage * (1 + this.heatLevel * GAME_CONFIG.skills.driller.heatDamageStep);
                    }

                    enemyToAttack.takeDamage(finalDamage);

                    if (this.unitType === 'leviathan') {
                        explosions.push({ x: enemyToAttack.x, y: enemyToAttack.y, timer: GAME_CONFIG.skills.leviathan.explosionFrames });
                        for (let ent of entities) {
                            if (ent.team !== this.team && ent !== enemyToAttack && !ent.markedForDeletion) {
                                if (Math.hypot(ent.x - enemyToAttack.x, ent.y - enemyToAttack.y) <
                                    GAME_CONFIG.skills.leviathan.splashRadius) {
                                    ent.takeDamage(finalDamage * GAME_CONFIG.skills.leviathan.splashDamageMult);
                                }
                            }
                        }
                    }

                    this.attackCooldown = this.cooldownMax;
                    this.laserTarget = enemyToAttack;
                    this.laserDrawFrames = (this.unitType === 'driller') ? 8 : 6;
                }
            } else {
                if (this.unitType === 'driller') this.heatLevel = 0;
            }
        }

        if (!isEngaging) {
            let moveTarget = null;
            let directCoord = null;

            if (this.unitState === 'IDLE') {
                if (this.isDrone && this.motherShip && !this.motherShip.markedForDeletion) {
                    if (Math.hypot(this.motherShip.x - this.x, this.motherShip.y - this.y) > 80) moveTarget = this.motherShip;
                } else {
                    let myBase = basesArray.find(b => b.team === this.team && b.type === 'Base');
                    if (myBase && Math.hypot(myBase.x - this.x, myBase.y - this.y) > 260 && !this.hasHoldPosition)
                        moveTarget = myBase;
                }
            } else if (this.unitState === 'ATTACKING' && this.targetTeam) {
                let enemyBase = basesArray.find(b => b.team === this.targetTeam && b.type === 'Base');
                if (enemyBase) moveTarget = enemyBase;
                else {
                    this.unitState = 'IDLE';
                    this.hasHoldPosition = false;
                }
            } else if (this.unitState === 'MOVE_TO_POINT') {
                let distToDest = Math.hypot(this.targetX - this.x, this.targetY - this.y);
                if (distToDest > 40) directCoord = { x: this.targetX, y: this.targetY };
                else {
                    this.unitState = 'IDLE';
                    this.hasHoldPosition = true;
                }
            }

            if (moveTarget) {
                this.smartMove(moveTarget.x, moveTarget.y, speed);
            } else if (directCoord) {
                this.smartMove(directCoord.x, directCoord.y, speed);
            }
        }

        this.applySeparation(entities);
        this.applyWallAvoidance();
    }

    draw(ctx) {
        let visualType = this.unitType === 'base_repairer' ? 'repairer' : this.unitType;
        let imgKey = gameData[this.team] ? gameData[this.team].theme + '_' + visualType : 'std_' + visualType;
        let img = assets[imgKey];

        let drawSize;
        if (this.unitType === 'base_repairer') drawSize = 10;
        else if (['carrier', 'leviathan', 'driller'].includes(this.unitType)) drawSize = 154;
        else drawSize = this.radius * 3.5;

        if (img && img.complete && img.naturalWidth > 0) {
            let aspect = img.naturalHeight / img.naturalWidth;
            let w = drawSize;
            let h = drawSize;
            if (aspect > 1) { w = drawSize / aspect; } else if (aspect < 1) { h = drawSize * aspect; }

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle + Math.PI / 2);
            ctx.drawImage(img, -w / 2, -h / 2, w, h);
            ctx.restore();
        } else {
            drawFactionShape(ctx, this.x, this.y, this.radius, this.sides, this.color, true);
        }

        if (this.laserDrawFrames > 0 && this.laserTarget && !this.laserTarget.markedForDeletion) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.laserTarget.x, this.laserTarget.y);
            if (this.unitType === 'repairer' || this.unitType === 'base_repairer') {
                ctx.strokeStyle = "#00ff00";
                ctx.lineWidth = 1.5;
            } else if (this.unitType === 'driller') {
                ctx.strokeStyle = `rgb(255, ${Math.max(0, 255 - this.heatLevel * 15)}, 0)`;
                ctx.lineWidth = 2 + this.heatLevel * 0.3;
            } else {
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1.5;
            }
            ctx.stroke();
        }

        if (!this.isDrone) this.drawBarStats(ctx, this.radius + 15, this.radius * 3, this.mp, this.maxMp);
        else this.drawBarStats(ctx, this.radius + 8, this.radius * 3);
    }
}

// --- HÀM VẼ PHỤ TRỢ ---
function drawFactionShape(ctx, x, y, radius, sides, color, isFill, angleOffset = -Math.PI / 2) {
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
        let angle = angleOffset + (i * (Math.PI * 2 / sides));
        let px = x + Math.cos(angle) * radius;
        let py = y + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    if (isFill) { ctx.fillStyle = "#111";
        ctx.fill(); }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawExplosion(ctx, ex) {
    if (ex.type === 'ping') {
        let progress = 1 - (ex.timer / 10);
        let currentRadius = 25 * progress;
        ctx.save();
        ctx.globalAlpha = 1 - progress;
        ctx.beginPath();
        ctx.arc(ex.x, ex.y, currentRadius, 0, Math.PI * 2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#00ffff";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(ex.x, ex.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#00ffff";
        ctx.fill();
        ctx.restore();
        return;
    }

    let maxTimer = GAME_CONFIG.skills.leviathan.explosionFrames || 60;
    let progress = 1 - (ex.timer / maxTimer);
    let maxRadius = GAME_CONFIG.skills.leviathan.splashRadius || 150;
    let currentRadius = maxRadius * (1 - Math.pow(1 - progress, 3));

    ctx.save();
    ctx.globalAlpha = 1 - Math.pow(progress, 2);

    if (progress < 0.2) {
        ctx.beginPath();
        ctx.arc(ex.x, ex.y, maxRadius * (0.2 - progress), 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(ex.x, ex.y, currentRadius, 0, Math.PI * 2);
    ctx.lineWidth = 2 + (1 - progress) * 6;
    ctx.strokeStyle = "#00ffff";
    ctx.stroke();
    ctx.restore();
}

function drawSelectedUnits(ctx) {
    if (selectedUnitIds.length > 0) {
        units.forEach(u => {
            if (selectedUnitIds.includes(u.id)) {
                ctx.beginPath();
                ctx.arc(u.x, u.y, u.radius + 8, 0, Math.PI * 2);
                ctx.strokeStyle = "#00ffff";
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        });
    }
}

function drawSelectionBox(ctx) {
    let wStart = { x: selectStart.x / zoom + cam.x, y: selectStart.y / zoom + cam.y };
    let wEnd = { x: selectEnd.x / zoom + cam.x, y: selectEnd.y / zoom + cam.y };
    ctx.fillStyle = "rgba(0, 255, 255, 0.15)";
    ctx.strokeStyle = "#00ffff";
    ctx.lineWidth = 1;
    ctx.fillRect(wStart.x, wStart.y, wEnd.x - wStart.x, wEnd.y - wStart.y);
    ctx.strokeRect(wStart.x, wStart.y, wEnd.x - wStart.x, wEnd.y - wStart.y);
}

function drawTurretPlacementRange(ctx) {
    let pBase = getBase(myTeamId);
    if (pBase) {
        ctx.beginPath();
        ctx.arc(pBase.x, pBase.y, 450, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 255, 0.03)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 255, 255, 0.4)";
        ctx.setLineDash([10, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

// --- GAME LOGIC ---
function runHostLogic() {
    frameCount++;
    if (frameCount % GAME_CONFIG.ai.tickFrames === 0) updateAllAI();

    let attackableEntities = buildings.concat(units).concat(miners).concat(turrets).concat(reactors);
    resolveCollisions(attackableEntities.concat(mines));

    mines = mines.filter(m => !m.markedForDeletion);
    if (mines.length < MAX_MINES && Math.random() < GAME_CONFIG.map.mineSpawnChance) {
        let pos = getSafePos(3000, 3000, 0, 2700, buildings.concat(mines), 100);
        if (pos) mines.push(new GoldMine(pos.x, pos.y));
    }

    reactors.forEach(r => r.update());
    miners.forEach(miner => miner.update(mines, buildings));
    turrets.forEach(turret => turret.update(attackableEntities));
    units.forEach(unit => unit.update(attackableEntities, buildings));
    buildings.forEach(building => building.update(attackableEntities));

    explosions = explosions.filter(ex => ex.timer > 0);
    explosions.forEach(ex => ex.timer--);

    buildings = buildings.filter(b => !b.markedForDeletion);
    units = units.filter(u => !u.markedForDeletion);
    miners = miners.filter(m => !m.markedForDeletion);
    turrets = turrets.filter(t => !t.markedForDeletion);
    reactors = reactors.filter(r => !r.markedForDeletion);
    ALL_TEAMS.forEach(team => {
        let hasB = buildings.some(b => b.team === team && b.type === 'Barracks');
        if (!hasB && gameData[team]) gameData[team].barracksLevel = 0;
    });

    if (isOnline && frameCount % 2 === 0) sendSyncData();
}

function resolveCollisions(entities) {
    let len = entities.length;
    let processed = new Set();
    
    for (let i = 0; i < len; i++) {
        let e1 = entities[i];
        if (e1.markedForDeletion || e1.isDrone) continue;
        if (processed.has(e1)) continue;
        
        for (let j = i + 1; j < len; j++) {
            let e2 = entities[j];
            if (e2.markedForDeletion || e2.isDrone) continue;
            
            let minDist = e1.radius + e2.radius + 10;
            
            if (e1 instanceof Miner && e2 instanceof Miner) {
                minDist = e1.radius + e2.radius + 25;
            }
            if (e1 instanceof CombatUnit && e2 instanceof CombatUnit && !e1.isDrone && !e2.isDrone) {
                minDist = e1.radius + e2.radius + 20;
            }
            
            let dx = e2.x - e1.x;
            if (dx > minDist || dx < -minDist) continue;
            let dy = e2.y - e1.y;
            if (dy > minDist || dy < -minDist) continue;

            let dist = Math.hypot(dx, dy);
            if (dist < minDist && dist > 0) {
                let overlap = minDist - dist;
                let nx = dx / dist;
                let ny = dy / dist;
                
                let m1 = 1, m2 = 1;
                if (e1 instanceof Building || e1 instanceof GoldMine || e1 instanceof Turret || e1 instanceof Reactor) m1 = 0;
                if (e2 instanceof Building || e2 instanceof GoldMine || e2 instanceof Turret || e2 instanceof Reactor) m2 = 0;
                
                if (m1 > 0 && m2 > 0) {
                    let pushFactor = 0.5;
                    e1.x -= nx * overlap * pushFactor;
                    e1.y -= ny * overlap * pushFactor;
                    e2.x += nx * overlap * pushFactor;
                    e2.y += ny * overlap * pushFactor;
                } else if (m1 === 0) {
                    e2.x += nx * overlap * 1.2;
                    e2.y += ny * overlap * 1.2;
                } else if (m2 === 0) {
                    e1.x -= nx * overlap * 1.2;
                    e1.y -= ny * overlap * 1.2;
                }
            }
        }
        processed.add(e1);
    }
    
    entities.forEach(e => {
        if (e instanceof CombatUnit || e instanceof Miner) {
            e.x = Math.max(20, Math.min(MAP_W - 20, e.x));
            e.y = Math.max(20, Math.min(MAP_H - 20, e.y));
        }
    });
}

function moveInFormation(units, targetX, targetY) {
    let count = units.length;
    if (count === 0) return;
    
    units.sort((a, b) => {
        let distA = Math.hypot(a.x - targetX, a.y - targetY);
        let distB = Math.hypot(b.x - targetX, b.y - targetY);
        return distA - distB;
    });
    
    let radius = 30;
    let angleStep = (Math.PI * 2) / count;
    let currentAngle = -Math.PI / 2;
    
    units.forEach((u, index) => {
        if (index === 0) {
            u.unitState = 'MOVE_TO_POINT';
            u.targetX = targetX;
            u.targetY = targetY;
            u.hasHoldPosition = false;
        } else {
            let offset = Math.floor(index / 8) + 1;
            let angle = currentAngle + (index * 0.8);
            let r = radius * offset;
            u.unitState = 'MOVE_TO_POINT';
            u.targetX = targetX + Math.cos(angle) * r;
            u.targetY = targetY + Math.sin(angle) * r;
            u.hasHoldPosition = false;
        }
    });
}

function sendSyncData() {
    let state = {
        units: units.map(u => ({
            id: u.id,
            x: Math.round(u.x),
            y: Math.round(u.y),
            hp: Math.round(u.hp),
            maxHp: u.maxHp,
            team: u.team,
            unitType: u.unitType,
            angle: u.angle,
            isDrone: u.isDrone,
            laserDrawFrames: u.laserDrawFrames,
            laserTarget: u.laserTarget ? { x: u.laserTarget.x, y: u.laserTarget.y } : null
        })),
        buildings: buildings.map(b => ({
            x: Math.round(b.x),
            y: Math.round(b.y),
            hp: Math.round(b.hp),
            maxHp: b.maxHp,
            team: b.team,
            type: b.type,
            queue: b.queue,
            buildTimer: b.buildTimer,
            laserDrawFrames: b.laserDrawFrames,
            laserTarget: b.laserTarget ? { x: b.laserTarget.x, y: b.laserTarget.y } : null
        })),
        miners: miners.map(m => ({
            x: Math.round(m.x),
            y: Math.round(m.y),
            hp: Math.round(m.hp),
            maxHp: m.maxHp,
            team: m.team,
            angle: m.angle,
            carryAmount: m.carryAmount
        })),
        turrets: turrets.map(t => ({
            x: Math.round(t.x),
            y: Math.round(t.y),
            hp: Math.round(t.hp),
            maxHp: t.maxHp,
            team: t.team,
            angle: t.angle,
            laserDrawFrames: t.laserDrawFrames,
            laserTarget: t.laserTarget ? { x: t.laserTarget.x, y: t.laserTarget.y } : null
        })),
        reactors: reactors.map(r => ({
            x: Math.round(r.x),
            y: Math.round(r.y),
            hp: Math.round(r.hp),
            maxHp: r.maxHp,
            team: r.team
        })),
        mines: mines.map(m => ({
            x: Math.round(m.x),
            y: Math.round(m.y),
            capacity: m.capacity,
            radius: m.radius
        })),
        explosions: explosions.map(e => ({
            x: Math.round(e.x),
            y: Math.round(e.y),
            timer: e.timer
        })),
        goldSync: {}
    };
    ALL_TEAMS.forEach(team => {
        if (gameData[team]) {
            state.goldSync[team] = {
                gold: gameData[team].gold,
                barracksLevel: gameData[team].barracksLevel,
                theme: gameData[team].theme,
                inGameTurretLv: gameData[team].inGameTurretLv || 0,
                inGameTurretHpLv: gameData[team].inGameTurretHpLv || 0,
                upg: gameData[team].upg
            };
        }
    });
    socket.emit('syncGameState', { roomCode: myRoomCode, state: state });
}

function checkGameOverStatus(m, s) {
    if (gameMode === 'team') {
        // TEAM mode: Kiểm tra player team vs bot team
        let playerBase = getBase('player');
        let botBases = TEAM_BOT.filter(t => getBase(t)).length;
        
        if (!playerBase && !gameOver) {
            gameOver = true;
            document.getElementById('game-over').style.display = 'flex';
            let text = document.getElementById('result-text');
            text.innerHTML = `💀 ĐỒNG ĐỘI BỊ TIÊU DIỆT!<br><span style="font-size:12px; color:#aaa;">(Thời gian: ${m}:${s})</span>`;
            text.style.color = "#ff4444";
            return;
        }
        
        if (botBases === 0 && !gameOver && frameCount > 30) {
            gameOver = true;
            document.getElementById('game-over').style.display = 'flex';
            profile.darkMatter += 1050;
            let text = document.getElementById('result-text');
            text.innerHTML = `🎉 CHIẾN THẮNG ĐỒNG ĐỘI!<br><span style="font-size:12px; color:#aaa;">Đã tiêu diệt toàn bộ Bot!<br>Thời gian: ${m}:${s}<br>+1050 LÕI HẮC THẠCH</span>`;
            text.style.color = "#00ffff";
            profile.sector += 1;
            saveProfile();
        }
        return;
    }
    
    // FFA mode (giữ nguyên)
    let pBase = getBase('player');
    let botBases = buildings.filter(b => b.team !== 'player' && b.type === 'Base').length;
    if (!pBase && !gameOver) {
        gameOver = true;
        document.getElementById('game-over').style.display = 'flex';
        let destroyedBases = 7 - botBases;
        let reward = destroyedBases * 100;
        profile.darkMatter += reward;
        let text = document.getElementById('result-text');
        let rewardMsg = reward > 0 ? `<br>Tiêu diệt ${destroyedBases} Thế lực: +${reward} LÕI` : "";
        text.innerHTML = `HẠM ĐỘI BỊ TIÊU DIỆT!${rewardMsg}<br><span style="font-size:12px; color:#aaa;">(Thời gian: ${m}:${s} - Số dư: ${profile.darkMatter} Lõi)</span>`;
        text.style.color = "#ff4444";
        saveProfile();
    } else if (botBases === 0 && !gameOver && frameCount > 30) {
        gameOver = true;
        document.getElementById('game-over').style.display = 'flex';
        profile.darkMatter += 1050;
        let text = document.getElementById('result-text');
        text.innerHTML = `BÁ CHỦ TINH HỆ TẦNG ${profile.sector}!<br><span style="font-size:12px; color:#aaa;">TERRAN đã quét sạch các thế lực thù địch.<br>Thời gian: ${m}:${s}<br>+1050 LÕI HẮC THẠCH</span>`;
        text.style.color = "#00ffff";
        profile.sector += 1;
        saveProfile();
    }
}

function updateGuestState(state) {
    units = state.units.map(u => {
        let unit = new CombatUnit(u.x, u.y, u.team, u.unitType);
        Object.assign(unit, u);
        return unit;
    });

    buildings = state.buildings.map(b => {
        let building = new Building(b.x, b.y, b.team, b.type);
        Object.assign(building, b);
        return building;
    });

    miners = state.miners.map(m => {
        let miner = new Miner(m.x, m.y, m.team);
        Object.assign(miner, m);
        return miner;
    });

    turrets = state.turrets.map(t => {
        let turret = new Turret(t.x, t.y, t.team);
        Object.assign(turret, t);
        return turret;
    });

    reactors = state.reactors.map(r => {
        let reactor = new Reactor(r.x, r.y, r.team);
        Object.assign(reactor, r);
        return reactor;
    });

    mines = state.mines.map(m => {
        let mine = new GoldMine(m.x, m.y);
        mine.capacity = m.capacity;
        mine.radius = m.radius;
        return mine;
    });

    explosions = state.explosions || [];

    ALL_TEAMS.forEach(team => {
        if (gameData[team] && state.goldSync[team]) {
            let sy = state.goldSync[team];
            gameData[team].gold = sy.gold;
            gameData[team].barracksLevel = sy.barracksLevel;
            gameData[team].theme = sy.theme;
            gameData[team].inGameTurretLv = sy.inGameTurretLv || 0;
            gameData[team].inGameTurretHpLv = sy.inGameTurretHpLv || 0;
            if (sy.upg) gameData[team].upg = sy.upg;
        }
    });
}

// --- AI LOGIC ---
function getTeamCombatUnits(team) {
    return units.filter(u => u.team === team && u.unitType !== 'base_repairer' && !u.isDrone);
}

function getArmyPower(unitList, queued = []) {
    let evalCfg = GAME_CONFIG.ai.evaluation;
    let power = 0;
    unitList.forEach(u => {
        let s = GAME_CONFIG.units[u.unitType] || GAME_CONFIG.units.interceptor;
        power += (Math.max(0, u.hp) / evalCfg.armyHpDivisor) + (s.atk * evalCfg.armyAtkWeight) +
            (s.range / evalCfg.armyRangeDivisor);
    });
    queued.forEach(q => {
        let s = GAME_CONFIG.units[q.unitType] || GAME_CONFIG.units.interceptor;
        power += ((s.hp / evalCfg.armyHpDivisor) + (s.atk * evalCfg.armyAtkWeight) +
            (s.range / evalCfg.armyRangeDivisor)) * evalCfg.queuedPowerMult;
    });
    return power;
}

function getThreatNearBase(team, radius = GAME_CONFIG.ai.evaluation.ownBaseThreatRadius) {
    let base = getBase(team);
    if (!base) return 0;
    return units.filter(u => u.team !== team && !u.isDrone && !u.markedForDeletion &&
        Math.hypot(u.x - base.x, u.y - base.y) <= radius).length;
}

function chooseAITarget(team, bData, base, style) {
    let evalCfg = GAME_CONFIG.ai.evaluation;
    
    // Nếu đã có mục tiêu và vẫn còn sống, giữ nguyên
    if (bData.targetTeam && getBase(bData.targetTeam)) {
        // Kiểm tra mục tiêu có còn là kẻ thù không
        if (isEnemy(team, bData.targetTeam)) {
            if (Math.random() > GAME_CONFIG.ai.targetSwitchChance) {
                return bData.targetTeam;
            }
        }
    }
    
    // Lấy danh sách kẻ thù dựa trên game mode
    let candidates = getEnemyTeams(team).filter(t => getBase(t));
    
    // Nếu không có kẻ thù, trả về null
    if (candidates.length === 0) {
        // Trong TEAM mode, nếu không còn kẻ thù nào, bot sẽ đứng yên
        if (gameMode === 'team') {
            return null;
        }
        // FFA: nếu không có kẻ thù, lấy tất cả các team khác
        candidates = ALL_TEAMS.filter(t => t !== team && getBase(t));
        if (candidates.length === 0) return null;
    }
    
    let bestTeam = candidates[0];
    let bestScore = -Infinity;
    
    candidates.forEach(enemyTeam => {
        let enemyBase = getBase(enemyTeam);
        if (!enemyBase) return;
        
        let distance = Math.hypot(enemyBase.x - base.x, enemyBase.y - base.y);
        let enemyTurrets = turrets.filter(t => t.team === enemyTeam).length;
        let enemyArmy = getTeamCombatUnits(enemyTeam).length;
        let hpRatio = enemyBase.hp / enemyBase.maxHp;
        let pressureOnUs = units.filter(u => 
            isEnemy(u.team, team) && 
            Math.hypot(u.x - base.x, u.y - base.y) < evalCfg.pressureRadius
        ).length;
        
        let score = 0;
        score += (1 - hpRatio) * evalCfg.weakBaseWeight;
        score += Math.max(0, evalCfg.closeTargetRange - distance) / evalCfg.closeTargetDivisor;
        score -= enemyTurrets * (style === GAME_CONFIG.ai.styles.RUSH ? evalCfg.turretPenaltyRush : evalCfg.turretPenaltyDefault);
        score -= enemyArmy * evalCfg.enemyArmyPenalty;
        score += pressureOnUs * evalCfg.pressureWeight;
        
        if (enemyTeam === 'player') score += evalCfg.playerBias;
        
        if (score > bestScore) { 
            bestScore = score; 
            bestTeam = enemyTeam; 
        }
    });
    
    return bestTeam;
}

function getRallyPoint(base, targetBase) {
    if (!targetBase) return { x: base.x, y: base.y };
    let dx = targetBase.x - base.x;
    let dy = targetBase.y - base.y;
    let dist = Math.hypot(dx, dy) || 1;
    return {
        x: base.x + (dx / dist) * GAME_CONFIG.ai.rallyDistanceFromBase,
        y: base.y + (dy / dist) * GAME_CONFIG.ai.rallyDistanceFromBase
    };
}

function rallyArmy(team, point, combatUnits) {
    combatUnits.forEach((u, idx) => {
        if (u.unitState === 'ATTACKING') return;
        let spread = (idx % 6) * 22;
        let angle = (idx * 2.4) % (Math.PI * 2);
        u.unitState = 'MOVE_TO_POINT';
        u.targetX = point.x + Math.cos(angle) * spread;
        u.targetY = point.y + Math.sin(angle) * spread;
        u.hasHoldPosition = false;
    });
}

function orderArmyAttack(team, targetTeam, combatUnits) {
    // Kiểm tra targetTeam có phải là kẻ thù không
    if (!isEnemy(team, targetTeam)) {
        // Nếu không phải kẻ thù, không tấn công
        return;
    }
    
    combatUnits.forEach(u => {
        u.unitState = 'ATTACKING';
        u.targetTeam = targetTeam;
        u.hasHoldPosition = false;
    });
}
    // ============================
    
    combatUnits.forEach(u => {
        u.unitState = 'ATTACKING';
        u.targetTeam = targetTeam;
        u.hasHoldPosition = false;
    });
}

function isBuildSpotClear(x, y, obstacles, clearDist) {
    if (x < GAME_CONFIG.map.edgePadding || y < GAME_CONFIG.map.edgePadding ||
        x > MAP_W - GAME_CONFIG.map.edgePadding || y > MAP_H - GAME_CONFIG.map.edgePadding) return false;
    return !obstacles.some(o => Math.hypot(o.x - x, o.y - y) < clearDist);
}

function findSmartTurretPos(team, targetTeam) {
    let base = getBase(team);
    let targetBase = targetTeam ? getBase(targetTeam) : null;
    if (!base) return null;
    let obstacles = buildings.concat(reactors).concat(turrets);
    let placement = GAME_CONFIG.ai.turretPlacement;
    let baseAngle = targetBase ? Math.atan2(targetBase.y - base.y, targetBase.x - base.x) :
        Math.random() * Math.PI * 2;
    let best = null;
    let bestScore = -Infinity;
    for (let i = 0; i < placement.attempts; i++) {
        let angle = baseAngle + (Math.random() - 0.5) * Math.PI * placement.enemyBias;
        let radius = placement.minR + Math.random() * (placement.maxR - placement.minR);
        let x = base.x + Math.cos(angle) * radius;
        let y = base.y + Math.sin(angle) * radius;
        if (!isBuildSpotClear(x, y, obstacles, 55)) continue;
        let score = 100 - Math.abs(radius - 230) * 0.25;
        if (targetBase) score += Math.max(0, 1800 - Math.hypot(targetBase.x - x, targetBase.y - y)) / 28;
        score -= turrets.filter(t => t.team === team).reduce((sum, t) =>
            sum + Math.max(0, 150 - Math.hypot(t.x - x, t.y - y)) / 4, 0);
        if (score > bestScore) { bestScore = score;
            best = { x, y }; }
    }
    return best || getSafePos(base.x, base.y, placement.minR, placement.maxR, obstacles, 55);
}

function findSmartReactorPos(team) {
    let base = getBase(team);
    if (!base) return null;
    let cfg = GAME_CONFIG.ai.reactorPlacement;
    return getSafePos(base.x, base.y, cfg.minR, cfg.maxR, buildings.concat(reactors).concat(turrets), 60);
}

function getAIUnitChoices(bData, styleCfg, aiCombatUnits) {
    let choices = [];
    styleCfg.unitMix.forEach(type => {
        if ((type === 'repairer' || type === 'railgun') && bData.barracksLevel < 2) return;
        choices.push(type);
    });
    if (bData.barracksLevel >= 1 && choices.length === 0) choices.push('interceptor', 'corvette');
    if (bData.barracksLevel >= 2 && !aiCombatUnits.some(u => u.unitType === 'repairer')) choices.push('repairer');
    if (bData.barracksLevel >= 3) choices.push(getSpecialShipHelper(bData.theme).type);
    return choices;
}

function updateAllAI() {
    ALL_TEAMS.forEach(team => {
        if (team === 'player') return;
        if (isOnline && humanTeams.includes(team)) return;

        let base = getBase(team);
        if (!base) return;
        let bData = gameData[team];
        if (!bData) return;

        // === KIỂM TRA TEAM MODE ===
        // Nếu không còn kẻ thù nào, dừng AI
        let enemies = getEnemyTeams(team).filter(t => getBase(t));
        if (enemies.length === 0 && gameMode === 'team') {
            // Trong TEAM mode, nếu không còn kẻ thù, bot dừng tấn công
            bData.aiState = 'GATHER';
            bData.targetTeam = null;
            // Cho quân về nhà
            let aiCombatUnits = getTeamCombatUnits(team);
            aiCombatUnits.forEach(u => {
                u.unitState = 'IDLE';
                u.targetTeam = null;
                u.hasHoldPosition = false;
            });
            return;
        }
        // ===============================

        let barrack = buildings.find(b => b.team === team && b.type === 'Barracks');
        let aiMiners = miners.filter(m => m.team === team).length +
            (base.queue ? base.queue.filter(q => q.unitType === 'miner').length : 0);
        let aiTurrets = turrets.filter(t => t.team === team).length;
        let aiReactors = reactors.filter(t => t.team === team).length;

        let aiCombatUnits = getTeamCombatUnits(team);
        let aiCombatUnitsCount = aiCombatUnits.length +
            (barrack ? barrack.queue.filter(q => q.unitType !== 'base_repairer').length : 0);
        let queuedCombat = barrack ? barrack.queue.filter(q => q.unitType !== 'base_repairer') : [];
        let armyPower = getArmyPower(aiCombatUnits, queuedCombat);

        let aiDrones = units.filter(u => u.team === team && u.unitType === 'base_repairer').length +
            (barrack ? barrack.queue.filter(q => q.unitType === 'base_repairer').length : 0);

        let strat = bData.aiStrategy;
        let styleCfg = GAME_CONFIG.ai.styles[strat] || GAME_CONFIG.ai.styles.FLEX;
        bData.targetTeam = chooseAITarget(team, bData, base, styleCfg);
        let targetBase = bData.targetTeam ? getBase(bData.targetTeam) : null;

        if (bData.aiState === 'GATHER') {
            if (targetBase) {
                bData.rallyPoint = getRallyPoint(base, targetBase);
                rallyArmy(team, bData.rallyPoint, aiCombatUnits);
            }
            if (targetBase && (aiCombatUnitsCount >= styleCfg.attackThreshold ||
                    armyPower >= styleCfg.minAttackPower || getThreatNearBase(team) >= 3)) {
                bData.aiState = 'ATTACK';
                // CHỈ TẤN CÔNG NẾU LÀ KẺ THÙ
                if (isEnemy(team, bData.targetTeam)) {
                    orderArmyAttack(team, bData.targetTeam, aiCombatUnits);
                }
            }
        } else if (bData.aiState === 'ATTACK') {
            if (aiCombatUnitsCount <= styleCfg.retreatAt || !targetBase) {
                bData.aiState = 'GATHER';
            } else {
                // CHỈ TẤN CÔNG NẾU LÀ KẺ THÙ
                if (isEnemy(team, bData.targetTeam)) {
                    orderArmyAttack(team, bData.targetTeam, aiCombatUnits);
                } else {
                    bData.aiState = 'GATHER';
                }
            }
        }

        // Phần còn lại giữ nguyên...
        if (bData.gold > GAME_CONFIG.economy.techUpgradeCost + 50 && Math.random() < GAME_CONFIG.ai.upgradeChance) {
            bData.gold -= GAME_CONFIG.economy.techUpgradeCost;
            let targets = ['interceptor', 'corvette', 'repairer', 'railgun', 'spc'];
            let t = targets[Math.floor(Math.random() * targets.length)];
            let st = ['hpLv', 'atkLv', 'spdLv'][Math.floor(Math.random() * 3)];
            bData.upg[t][st]++;
            if (st === 'hpLv') applyHpUpgrade(team, t);
        }

        if (aiMiners < styleCfg.miners && bData.gold >= GAME_CONFIG.economy.minerCost &&
            base.queue.length < 2) {
            bData.gold -= GAME_CONFIG.economy.minerCost;
            base.queue.push({ unitType: 'miner', buildTime: GAME_CONFIG.buildings.miner.buildTime });
            return;
        } else if (bData.barracksLevel === 0 && bData.gold >= GAME_CONFIG.economy.barracksCost) {
            bData.gold -= GAME_CONFIG.economy.barracksCost;
            bData.barracksLevel = 1;
            let bPos = getSafePos(base.x, base.y, 180, 260, buildings.concat(reactors).concat(turrets), 70) ||
                { x: base.x + GAME_CONFIG.ai.barracksOffset.x, y: base.y + GAME_CONFIG.ai.barracksOffset.y };
            buildings.push(new Building(bPos.x, bPos.y, team, 'Barracks'));
            return;
        } else if (bData.barracksLevel > 0) {
            let canUpgrade = (bData.barracksLevel < 3);
            let isSavingForUpgrade = false;
            if (canUpgrade) {
                let nextCost = GAME_CONFIG.economy.barracksUpgradeCosts[bData.barracksLevel];
                let requiredArmy = bData.barracksLevel === 1 ? 3 : 5;

                if (aiCombatUnitsCount >= requiredArmy) {
                    if (bData.gold >= nextCost) {
                        bData.gold -= nextCost;
                        bData.barracksLevel++;
                        return;
                    } else {
                        isSavingForUpgrade = true;
                    }
                }
            }

            if (aiDrones < GAME_CONFIG.economy.droneLimit && bData.gold >= GAME_CONFIG.units.base_repairer.cost &&
                (aiTurrets > 0 || base.hp < base.maxHp * 0.8 || getThreatNearBase(team) > 0) &&
                (!barrack || barrack.queue.length < styleCfg.maxQueue) &&
                Math.random() < GAME_CONFIG.ai.droneChance) {
                bData.gold -= GAME_CONFIG.units.base_repairer.cost;
                if (barrack) barrack.queue.push({ unitType: 'base_repairer', buildTime: GAME_CONFIG.units.base_repairer.buildTime });
                return;
            }

            if (aiReactors < styleCfg.reactors && bData.gold >= GAME_CONFIG.economy.reactorCost &&
                Math.random() < GAME_CONFIG.ai.reactorChance) {
                let pos = findSmartReactorPos(team);
                if (pos) { bData.gold -= GAME_CONFIG.economy.reactorCost;
                    reactors.push(new Reactor(pos.x, pos.y, team)); return; }
            }
            if (aiTurrets < styleCfg.turrets && bData.gold >= GAME_CONFIG.economy.turretCost &&
                (Math.random() < GAME_CONFIG.ai.turretChance || getThreatNearBase(team) > 0)) {
                let pos = findSmartTurretPos(team, bData.targetTeam);
                if (pos) { bData.gold -= GAME_CONFIG.economy.turretCost;
                    turrets.push(new Turret(pos.x, pos.y, team)); return; }
            }

            if (isSavingForUpgrade || !barrack || barrack.queue.length >= styleCfg.maxQueue) return;

            if (bData.barracksLevel >= 3) {
                let spcType = getSpecialShipHelper(bData.theme).type;
                let currentSpcCount = aiCombatUnits.filter(u => u.unitType === spcType).length +
                    barrack.queue.filter(q => q.unitType === spcType).length;

                if (currentSpcCount < 2) {
                    let spcCost = GAME_CONFIG.units[spcType].cost;
                    if (bData.gold >= spcCost) {
                        bData.gold -= spcCost;
                        barrack.queue.push({ unitType: spcType, buildTime: GAME_CONFIG.units[spcType].buildTime });
                    }
                    return;
                }

                let currentRepCount = aiCombatUnits.filter(u => u.unitType === 'repairer').length +
                    barrack.queue.filter(q => q.unitType === 'repairer').length;

                if (currentRepCount < 3) {
                    let repCost = GAME_CONFIG.units['repairer'].cost;
                    if (bData.gold >= repCost) {
                        bData.gold -= repCost;
                        barrack.queue.push({ unitType: 'repairer', buildTime: GAME_CONFIG.units['repairer'].buildTime });
                    }
                    return;
                }
            }

            if (strat === 'RUSH' && aiCombatUnitsCount < styleCfg.attackThreshold &&
                bData.gold >= GAME_CONFIG.units.corvette.cost) {
                let choice = Math.random() > 0.5 ? 'interceptor' : 'corvette';
                if (bData.gold >= GAME_CONFIG.units[choice].cost) {
                    bData.gold -= GAME_CONFIG.units[choice].cost;
                    barrack.queue.push({ unitType: choice, buildTime: GAME_CONFIG.units[choice].buildTime });
                    return;
                }
            }

            let choices = getAIUnitChoices(bData, styleCfg, aiCombatUnits);
            let affordable = choices.filter(c => bData.gold >= GAME_CONFIG.units[c].cost);
            if (affordable.length > 0 && Math.random() < GAME_CONFIG.ai.trainChance) {
                let choice = affordable[Math.floor(Math.random() * affordable.length)];
                bData.gold -= GAME_CONFIG.units[choice].cost;
                barrack.queue.push({ unitType: choice, buildTime: GAME_CONFIG.units[choice].buildTime });
            }
        }
    });
}

function applyHpUpgrade(team, upgKey) {
    let ents = upgKey === 'hq' ?
        buildings.filter(b => b.team === team && b.type === 'Base') :
        units.filter(u => {
            let uKey = ['carrier', 'leviathan', 'driller'].includes(u.unitType) ? 'spc' : u.unitType;
            return u.team === team && uKey === upgKey;
        });
    ents.forEach(e => {
        let baseHp = upgKey === 'hq' ? GAME_CONFIG.buildings.hq.hp : GAME_CONFIG.units[e.unitType].hp;
        let metaHpKey = upgKey === 'spc' ? 'dreadnought_hp' : upgKey + '_hp';
        let newMax = getEffectiveStat(baseHp, gameData[team].upg[upgKey].hpLv, team, metaHpKey);
        let diff = newMax - e.maxHp;
        e.maxHp = newMax;
        e.hp += diff;
    });
}

// --- INIT GAME ---
function initGame() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    // Lưu gameMode từ server nếu có
    if (isOnline && typeof serverGameMode !== 'undefined') {
        gameMode = serverGameMode;
    }

    let strats = ['RUSH', 'LATE', 'FLEX'];
    let tList = ['std', 'sea', 'under'];

    ALL_TEAMS.forEach(team => {
        gameData[team] = {
            gold: GAME_CONFIG.economy.startGold,
            barracksLevel: 0,
            inGameTurretLv: 0,
            inGameTurretHpLv: 0,
            color: team === 'player' ? '#00ffff' :
                team === 'bot1' ? '#ff3333' :
                team === 'bot2' ? '#33ff33' :
                team === 'bot3' ? '#cc33ff' :
                team === 'bot4' ? '#ffcc00' :
                team === 'bot5' ? '#ff6600' :
                team === 'bot6' ? '#ff00ff' : '#ffffff',
            sides: team === 'player' ? 3 :
                team === 'bot1' ? 4 :
                team === 'bot2' ? 5 :
                team === 'bot3' ? 6 :
                team === 'bot4' ? 7 :
                team === 'bot5' ? 8 :
                team === 'bot6' ? 9 : 10,
            theme: 'std',
            upg: createInitialUpgrades(),
            aiState: 'GATHER',
            aiStrategy: strats[Math.floor(Math.random() * 3)],
            targetTeam: null,
            rallyPoint: null,
            // Thêm flag cho TEAM mode
            isAlly: false
        };
    });

    buildings = [];
    units = [];
    miners = [];
    turrets = [];
    reactors = [];
    mines = [];
    explosions = [];
    gameOver = false;
    frameCount = 0;
    let spawnPositions = [];

    if (!isOnline || myRole === 'host') {
        ALL_TEAMS.forEach(team => {
            gameData[team].theme = tList[Math.floor(Math.random() * tList.length)];
        });

        ALL_TEAMS.forEach(team => {
            let pos = getValidSpawnPos(spawnPositions);
            spawnPositions.push(pos);
            buildings.push(new Building(pos.x, pos.y, team, 'Base'));
            mines.push(new GoldMine(pos.x + 400, pos.y - 400));
            miners.push(new Miner(pos.x + 100, pos.y - 100, team));

            if (team === myTeamId) {
                cam.x = pos.x - (window.innerWidth / zoom) / 2;
                cam.y = pos.y - (window.innerHeight / zoom) / 2;
                clampCamera();
            }
        });

        for (let i = 0; i < MAX_MINES - 8; i++) {
            let pos = getSafePos(3000, 3000, 0, 2700, buildings.concat(mines), 100);
            if (pos) mines.push(new GoldMine(pos.x, pos.y));
        }
    } else {
        cam.x = (MAP_W - window.innerWidth / zoom) / 2;
        cam.y = (MAP_H - window.innerHeight / zoom) / 2;
        guestCameraSet = false;
    }
}

// --- UI UPDATE ---
function updateUI() {
    function calculatePower(team) {
        let power = 0;
        buildings.forEach(b => { if (b.team === team) power += (b.hp + (b.type === 'Base' ? 40 : 0) * 10); });
        turrets.forEach(t => { if (t.team === team) power += (t.hp + 4 * 10); });
        reactors.forEach(r => { if (r.team === team) power += r.hp; });
        units.forEach(u => {
            if (u.team === team) {
                let uAtk = u.customAtk !== undefined ? u.customAtk :
                    getEffectiveStat(GAME_CONFIG.units[u.unitType].atk,
                        (gameData[team] ? gameData[team].upg[u.unitType]?.atkLv || 0 : 0),
                        team, u.unitType + '_atk');
                power += (u.hp + (uAtk || 0) * 10);
            }
        });
        return Math.floor(power);
    }

    let myData = gameData[myTeamId];
    let myBase = getBase(myTeamId);

    ALL_TEAMS.forEach(team => {
        let element = document.getElementById(`gold-${team}`);
        if (!element) return;

        let isMe = (team === myTeamId);
        let hasBase = getBase(team);
        let text = "OUT";

        if (hasBase) {
            let power = calculatePower(team);
            text = isMe ? `${Math.floor(gameData[team]?.gold || 0)}v | ⚔️${power}` : `⚔️${power}`;
        }

        element.innerText = text;

        let parentDiv = element.parentNode;
        if (parentDiv && parentDiv.childNodes[0]) {
            let factionNames = {
                'player': 'TERRAN',
                'bot1': 'TITAN',
                'bot2': 'SWIFT',
                'bot3': 'PSIONIC',
                'bot4': 'NOVA',
                'bot5': 'ABYSS',
                'bot6': 'GALAXY',
                'bot7': 'NEBULA'
            };
            let fName = factionNames[team] || 'UNKNOWN';

            let playerMatch = lobbyPlayers ? lobbyPlayers.find(p => p.team === team) : null;
            let displayName = playerMatch ? playerMatch.name.toUpperCase() : fName;

            if (isMe) {
                parentDiv.childNodes[0].nodeValue = displayName + " (BẠN): ";
            } else {
                parentDiv.childNodes[0].nodeValue = displayName + ": ";
            }
        }
    });

    if (!myData) return;

    document.getElementById('reactor-count').innerText =
        `${reactors.filter(t => t.team === myTeamId).length}/${GAME_CONFIG.economy.playerReactorLimit} | +${GAME_CONFIG.economy.reactorGoldPerTick}v/s`;

    let btnTurret = document.getElementById('btn-turret');
    let btnMove = document.getElementById('btn-move-cmd');
    let btnUpgTurret = document.getElementById('btn-upg-turret');
    let btnUpgTurretHp = document.getElementById('btn-upg-turret-hp');

    let tLv = myData.inGameTurretLv || 0;
    let tHpLv = myData.inGameTurretHpLv || 0;
    let metaHpLv = myData.upg['turret'] ? myData.upg['turret'].hpLv : 0;
    let currentHp = Math.floor(getEffectiveStat(GAME_CONFIG.buildings.turret.hp, metaHpLv, myTeamId, 'turret_hp') *
        (1 + (tHpLv * GAME_CONFIG.scaling.turretHpUpgradeStep)));

    if (tLv >= 5) {
        btnUpgTurret.innerHTML = `Công Trụ<br><span class="stat-text" style="color:#ffd700">MAX Lv.5</span>`;
        btnUpgTurret.disabled = true;
    } else {
        btnUpgTurret.innerHTML =
            `Công Trụ (${GAME_CONFIG.economy.turretCost}v)<br><span class="stat-text">Lv:${tLv}/5 | +${GAME_CONFIG.scaling.turretAtkFlatStep}ATK</span>`;
        btnUpgTurret.disabled = (!myBase || myData.gold < GAME_CONFIG.economy.turretCost);
    }

    if (tHpLv >= 5) {
        btnUpgTurretHp.innerHTML = `Máu Trụ<br><span class="stat-text" style="color:#ffd700">MAX Lv.5</span>`;
        btnUpgTurretHp.disabled = true;
    } else {
        btnUpgTurretHp.innerHTML =
            `Máu Trụ (${GAME_CONFIG.economy.turretCost}v)<br><span class="stat-text">Lv:${tHpLv}/5 | +${Math.round(GAME_CONFIG.scaling.turretHpUpgradeStep * 100)}%HP</span>`;
        btnUpgTurretHp.disabled = (!myBase || myData.gold < GAME_CONFIG.economy.turretCost);
    }

    if (placementMode === 'turret') {
        btnTurret.innerHTML = `HỦY TRỤ`;
        btnTurret.style.background = "rgba(255, 0, 0, 0.2)";
        btnTurret.style.borderColor = "#ff4444";
    } else {
        btnTurret.innerHTML =
            `Tháp Pháo (${GAME_CONFIG.economy.turretCost}v)<br><span class="stat-text">${turrets.filter(t => t.team === myTeamId).length}/${GAME_CONFIG.economy.playerTurretLimit} | HP:${currentHp}</span>`;
        btnTurret.style.background = "";
        btnTurret.style.borderColor = "";
    }

    if (placementMode === 'move_units') {
        btnMove.style.background = "rgba(255, 165, 0, 0.3)";
        btnMove.style.borderColor = "#ffa500";
    } else {
        btnMove.style.background = "rgba(0,255,255,0.05)";
        btnMove.style.borderColor = "#00ffff";
    }

    let btnSelect = document.getElementById('btn-select-cmd');
    if (btnSelect) {
        if (placementMode === 'select') {
            btnSelect.style.background = "rgba(0, 255, 255, 0.3)";
            btnSelect.style.borderColor = "#00ffff";
            btnSelect.style.color = "#00ffff";
        } else {
            btnSelect.style.background = "rgba(255,255,255,0.05)";
            btnSelect.style.borderColor = "#555";
            btnSelect.style.color = "#aaa";
        }
    }

    document.getElementById('btn-miner').disabled = (!myBase || myData.gold < GAME_CONFIG.economy.minerCost);

    let lv = myData.barracksLevel;
    let btnBuild = document.getElementById('btn-build');
    if (lv === 0) {
        btnBuild.innerHTML =
            `Hạm Đội (${GAME_CONFIG.economy.barracksCost}v)<br><span class="stat-text">Mở C1</span>`;
        btnBuild.disabled = (!myBase || myData.gold < GAME_CONFIG.economy.barracksCost);
    } else if (lv === 1) {
        btnBuild.innerHTML =
            `Nâng Trạm (${GAME_CONFIG.economy.barracksUpgradeCosts[1]}v)<br><span class="stat-text">Mở C2</span>`;
        btnBuild.disabled = (!myBase || myData.gold < GAME_CONFIG.economy.barracksUpgradeCosts[1]);
    } else if (lv === 2) {
        btnBuild.innerHTML =
            `Nâng Trạm (${GAME_CONFIG.economy.barracksUpgradeCosts[2]}v)<br><span class="stat-text">Mở C3</span>`;
        btnBuild.disabled = (!myBase || myData.gold < GAME_CONFIG.economy.barracksUpgradeCosts[2]);
    } else {
        btnBuild.innerHTML = `Hạm Đội<br><span class="stat-text" style="color:#ffd700">MAX</span>`;
        btnBuild.disabled = true;
    }

    if (placementMode !== 'turret') {
        document.getElementById('btn-turret').disabled = (!myBase || myData.gold < GAME_CONFIG.economy.turretCost ||
            turrets.filter(t => t.team === myTeamId).length >= GAME_CONFIG.economy.playerTurretLimit);
    }
    document.getElementById('btn-reactor').disabled = (!myBase || myData.gold < GAME_CONFIG.economy.reactorCost ||
        reactors.filter(t => t.team === myTeamId).length >= GAME_CONFIG.economy.playerReactorLimit);

    let spcShip = getSpecialShipHelper(myData.theme);
    document.getElementById('name-int').innerHTML = lv >= 1 ? "Tiêm Kích (20v)" : "🔒 C1";
    document.getElementById('name-cor').innerHTML = lv >= 1 ? "Tuần Tra (40v)" : "🔒 C1";
    document.getElementById('name-rep').innerHTML = lv >= 2 ? "Hỗ Trợ (60v)" : "🔒 C2";
    document.getElementById('name-rai').innerHTML = lv >= 2 ? "Pháo Kích (80v)" : "🔒 C2";
    document.getElementById('name-spc').innerHTML = lv >= 3 ? `${spcShip.name} (250v)` : "🔒 C3";

    document.getElementById('btn-tr-int').disabled = (lv < 1 || myData.gold < GAME_CONFIG.units.interceptor.cost);
    document.getElementById('btn-tr-cor').disabled = (lv < 1 || myData.gold < GAME_CONFIG.units.corvette.cost);
    document.getElementById('btn-tr-rep').disabled = (lv < 2 || myData.gold < GAME_CONFIG.units.repairer.cost);
    document.getElementById('btn-tr-rai').disabled = (lv < 2 || myData.gold < GAME_CONFIG.units.railgun.cost);
    document.getElementById('btn-tr-spc').disabled = (lv < 3 || myData.gold < GAME_CONFIG.units[spcShip.type].cost);
    document.getElementById('lbl-spc').innerHTML = lv >= 3 ? `⏱ 60s` : `Cần Nhà Lính Cấp 3`;

    let b = buildings.find(b => b.team === myTeamId && b.type === 'Barracks');
    let dCount = units.filter(u => u.team === myTeamId && u.unitType === 'base_repairer').length +
        (b ? b.queue.filter(q => q.unitType === 'base_repairer').length : 0);
    let btnDrone = document.getElementById('btn-tr-bre');
    if (dCount >= GAME_CONFIG.economy.droneLimit) {
        btnDrone.innerHTML = `Drone Bảo Trì<br><span class="stat-text" style="color:#ffd700">MAX 5/5</span>`;
        btnDrone.disabled = true;
    } else {
        btnDrone.innerHTML =
            `<span id="name-bre">Drone Bảo Trì (50v)</span><br><span class="stat-text">Sửa: 2HP/0.2s | ${dCount}/5<br>⏱ 8s</span>`;
        btnDrone.disabled = (!myBase || myData.gold < 50);
    }

    if (document.getElementById('upgrade-modal').style.display === 'flex') renderTechStats();
//-------
    // Thêm hiển thị chế độ game
    let modeElement = document.getElementById('game-mode-display');
    if (!modeElement) {
        // Tạo element nếu chưa có
        let scoreboard = document.getElementById('scoreboard');
        if (scoreboard) {
            modeElement = document.createElement('div');
            modeElement.id = 'game-mode-display';
            modeElement.style.cssText = 'position: absolute; top: 30px; right: 10px; color: #ffcc00; font-size: 10px; font-weight: bold; background: rgba(0,0,0,0.7); padding: 3px 8px; border-radius: 4px; border: 1px solid #ffcc00; z-index: 15;';
            scoreboard.appendChild(modeElement);
        }
    }
    
    if (modeElement) {
        if (gameMode === 'team') {
            modeElement.textContent = '🤝 TEAM MODE: Player vs Bot';
            modeElement.style.borderColor = '#ffcc00';
            modeElement.style.color = '#ffcc00';
        } else {
            modeElement.textContent = '🔥 FFA MODE: Tất cả vs Tất cả';
            modeElement.style.borderColor = '#ff4444';
            modeElement.style.color = '#ff4444';
        }
    }
//-------
}

// --- GAME LOOP ---
function gameLoop() {
    if (gameOver || !gameStarted) return;

    let elapsed = Math.floor((Date.now() - matchStartTime) / 1000);
    let m = Math.floor(elapsed / 60).toString().padStart(2, '0');
    let s = (elapsed % 60).toString().padStart(2, '0');
    document.getElementById('match-timer').innerText = `${m}:${s}`;

    ctx.fillStyle = "#030308";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr * zoom, dpr * zoom);
    ctx.translate(-cam.x, -cam.y);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (!isOnline || myRole === 'host') {
        runHostLogic();
        checkGameOverStatus(m, s);
    } else {
        if (serverGameState) {
            updateGuestState(serverGameState);
            if (!guestCameraSet) {
                let myBase = buildings.find(b => b.team === myTeamId && b.type === 'Base');
                if (myBase) {
                    cam.x = myBase.x - (window.innerWidth / zoom) / 2;
                    cam.y = myBase.y - (window.innerHeight / zoom) / 2;
                    clampCamera();
                    guestCameraSet = true;
                }
            }
        }
    }

    mines.forEach(mine => mine.draw(ctx));
    reactors.forEach(r => r.draw(ctx));
    miners.forEach(miner => miner.draw(ctx));
    turrets.forEach(turret => turret.draw(ctx));
    units.forEach(unit => unit.draw(ctx));
    buildings.forEach(building => building.draw(ctx));
    explosions.forEach(ex => drawExplosion(ctx, ex));
    drawSelectedUnits(ctx);

    if (isDragging && placementMode === 'select') {
        drawSelectionBox(ctx);
    }

    if (placementMode === 'turret') {
        drawTurretPlacementRange(ctx);
    }

    ctx.restore();
    animationId = requestAnimationFrame(gameLoop);
}

// --- HANDLE MAP CLICK ---
function handleMapClick(cx, cy) {
    let wx = cx / zoom + cam.x;
    let wy = cy / zoom + cam.y;
    let base = getBase(myTeamId);
    if (!base) return;

    if (placementMode === 'turret') {
        if (wx < GAME_CONFIG.map.edgePadding || wy < GAME_CONFIG.map.edgePadding ||
            wx > MAP_W - GAME_CONFIG.map.edgePadding || wy > MAP_H - GAME_CONFIG.map.edgePadding) {
            showToast("Không thể xây sát rìa bản đồ!", "#ff4444");
            return;
        }
        let dist = Math.hypot(wx - base.x, wy - base.y);
        if (dist > 450) { showToast("Khoảng cách quá xa!", "#ff4444");
            return; }
        let overlap = false;
        let allStructures = buildings.concat(reactors).concat(turrets);
        for (let o of allStructures) {
            if (Math.hypot(o.x - wx, o.y - wy) < 50) { overlap = true; break; }
        }
        if (overlap) { showToast("Vị trí này quá chật!", "#ff4444");
            return; }
        executeAction('place_turret', { x: wx, y: wy });
        placementMode = null;
        updateUI();
    } else if (selectedUnitIds.length > 0) {
        executeAction('move_group', { unitIds: selectedUnitIds, x: wx, y: wy });
        showToast("ĐANG DI CHUYỂN!", "#00ffff");
        explosions.push({ x: wx, y: wy, timer: 10, type: 'ping' });
    }
}

// --- CAMERA ---
function clampCamera() {
    let maxCamX = MAP_W - window.innerWidth / zoom;
    let maxCamY = MAP_H - window.innerHeight / zoom;
    if (cam.x < 0) cam.x = 0;
    if (cam.y < 0) cam.y = 0;
    if (maxCamX > 0 && cam.x > maxCamX) cam.x = maxCamX;
    if (maxCamY > 0 && cam.y > maxCamY) cam.y = maxCamY;
}

function updateZoom() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    if (!gameStarted) zoom = window.innerWidth < 768 ? 0.3 : 0.5;
}

function changeZoom(delta) {
    zoom += delta;
    if (zoom < 0.15) zoom = 0.15;
    if (zoom > 2.0) zoom = 2.0;
    clampCamera();
}

// --- ACTION DELEGATE ---
function executeAction(action, payload = {}) {
    if (isOnline && myRole === 'guest') {
        socket.emit('playerAction', {
            roomCode: myRoomCode,
            team: myTeamId,
            action: action,
            payload: payload
        });
    } else {
        processAction(myTeamId, action, payload);
    }
    if (!isOnline || myRole === 'host') updateUI();
}

function processAction(team, action, p = {}) {
    let tData = gameData[team];
    let base = getBase(team);
    if (!tData) return;

    if (action === 'train_miner' && base && tData.gold >= GAME_CONFIG.economy.minerCost) {
        tData.gold -= GAME_CONFIG.economy.minerCost;
        base.queue.push({ unitType: 'miner', buildTime: GAME_CONFIG.buildings.miner.buildTime });
    } else if (action === 'build_barracks' && base) {
        let lv = tData.barracksLevel || 0;
        if (lv === 0 && tData.gold >= GAME_CONFIG.economy.barracksCost) {
            tData.gold -= GAME_CONFIG.economy.barracksCost;
            tData.barracksLevel = 1;
            let bPos = getSafePos(base.x, base.y, 180, 260, buildings.concat(reactors).concat(turrets), 70) ||
                { x: base.x + GAME_CONFIG.ai.barracksOffset.x, y: base.y + GAME_CONFIG.ai.barracksOffset.y };
            buildings.push(new Building(bPos.x, bPos.y, team, 'Barracks'));
        } else if (lv === 1 && tData.gold >= GAME_CONFIG.economy.barracksUpgradeCosts[1]) {
            tData.gold -= GAME_CONFIG.economy.barracksUpgradeCosts[1];
            tData.barracksLevel = 2;
        } else if (lv === 2 && tData.gold >= GAME_CONFIG.economy.barracksUpgradeCosts[2]) {
            tData.gold -= GAME_CONFIG.economy.barracksUpgradeCosts[2];
            tData.barracksLevel = 3;
        }
    } else if (action === 'build_reactor' && base) {
        if (tData.gold >= GAME_CONFIG.economy.reactorCost &&
            reactors.filter(r => r.team === team).length < GAME_CONFIG.economy.playerReactorLimit) {
            let pos = getSafePos(base.x, base.y, 100, 200, buildings.concat(reactors).concat(turrets), 60);
            if (pos) { tData.gold -= GAME_CONFIG.economy.reactorCost;
                reactors.push(new Reactor(pos.x, pos.y, team)); }
        }
    } else if (action === 'train_unit' && base) {
        let b = buildings.find(b => b.team === team && b.type === 'Barracks');
        if (b && tData.gold >= GAME_CONFIG.units[p.type].cost) {
            tData.gold -= GAME_CONFIG.units[p.type].cost;
            b.queue.push({ unitType: p.type, buildTime: GAME_CONFIG.units[p.type].buildTime });
        }
    } else if (action === 'cmd_attack') {
        units.filter(u => u.team === team && !u.isDrone && p.unitIds && p.unitIds.includes(u.id)).forEach(u => {
            u.unitState = p.target === 'IDLE' ? 'IDLE' : 'ATTACKING';
            u.targetTeam = p.target;
            u.hasHoldPosition = false;
        });
    } else if (action === 'place_turret' && base) {
        if (tData.gold >= GAME_CONFIG.economy.turretCost &&
            turrets.filter(t => t.team === team).length < GAME_CONFIG.economy.playerTurretLimit) {
            tData.gold -= GAME_CONFIG.economy.turretCost;
            turrets.push(new Turret(p.x, p.y, team));
        }
    } else if (action === 'move_units') {
        units.filter(u => u.team === team && !u.isDrone).forEach(u => {
            u.unitState = 'MOVE_TO_POINT';
            u.targetX = p.x;
            u.targetY = p.y;
            u.hasHoldPosition = false;
        });
    } else if (action === 'move_group') {
        let selectedUnits = units.filter(u => 
            u.team === team && 
            !u.isDrone && 
            p.unitIds && 
            p.unitIds.includes(u.id)
        );
        
        if (selectedUnits.length > 1) {
            moveInFormation(selectedUnits, p.x, p.y);
        } else if (selectedUnits.length === 1) {
            let u = selectedUnits[0];
            u.unitState = 'MOVE_TO_POINT';
            u.targetX = p.x;
            u.targetY = p.y;
            u.hasHoldPosition = false;
        }
    } else if (action === 'upg_turret') {
        let cLv = tData.inGameTurretLv || 0;
        if (tData.gold >= GAME_CONFIG.economy.turretCost && cLv < 5) {
            tData.gold -= GAME_CONFIG.economy.turretCost;
            tData.inGameTurretLv = cLv + 1;
        }
    } else if (action === 'upg_turret_hp') {
        let cLv = tData.inGameTurretHpLv || 0;
        if (tData.gold >= GAME_CONFIG.economy.turretCost && cLv < 5) {
            tData.gold -= GAME_CONFIG.economy.turretCost;
            tData.inGameTurretHpLv = cLv + 1;
            turrets.filter(t => t.team === team).forEach(t => {
                let pMax = t.maxHp;
                t.maxHp = getEffectiveStat(GAME_CONFIG.buildings.turret.hp,
                    tData.upg['turret'].hpLv, team, 'turret_hp') *
                    (1 + (tData.inGameTurretHpLv * GAME_CONFIG.scaling.turretHpUpgradeStep));
                t.hp += (t.maxHp - pMax);
            });
        }
    } else if (action === 'tech_upg') {
        if (tData.gold >= GAME_CONFIG.economy.techUpgradeCost) {
            tData.gold -= GAME_CONFIG.economy.techUpgradeCost;
            if (p.stat === 'hp') { tData.upg[p.target].hpLv++;
                applyHpUpgrade(team, p.target); }
            if (p.stat === 'atk') tData.upg[p.target].atkLv++;
            if (p.stat === 'spd') tData.upg[p.target].spdLv++;
        }
    }
}

// --- PLAYER COMMANDS ---
function playerTrainMiner() { executeAction('train_miner'); }

function playerBuildOrUpgBarracks() { executeAction('build_barracks'); }

function playerBuildReactor() { executeAction('build_reactor'); }

function playerTrainUnit(type) { executeAction('train_unit', { type: type }); }

function playerTrainSpecial() {
    let spc = getSpecialShipHelper(gameData[myTeamId].theme);
    executeAction('train_unit', { type: spc.type });
}

function playerCommandAttack(targetTeam) {
    if (selectedUnitIds.length === 0) {
        showToast("⚠️ Vui lòng CHỌN QUÂN trước khi ra lệnh!", "#ff4444");
        return;
    }
    executeAction('cmd_attack', { target: targetTeam, unitIds: selectedUnitIds });
}

function playerUpgTurretInGame() { executeAction('upg_turret'); }

function playerUpgTurretHpInGame() { executeAction('upg_turret_hp'); }

function playerToggleMovePlacement() {
    placementMode = placementMode === 'move_units' ? null : 'move_units';
    updateUI();
}

function playerToggleSelectMode() {
    placementMode = placementMode === 'select' ? null : 'select';
    updateUI();
}

function playerSelectAll() {
    selectedUnitIds = [];
    units.forEach(u => {
        if (u.team === myTeamId && !u.isDrone) selectedUnitIds.push(u.id);
    });
    if (selectedUnitIds.length > 0) {
        placementMode = 'select';
        showToast(`Đã gọi toàn bộ ${selectedUnitIds.length} chiến hạm!`, "#00ffff");
        updateUI();
    } else {
        showToast("Chưa có hạm đội nào trên bản đồ!", "#ff4444");
    }
}

function playerDeselectAll() {
    selectedUnitIds = [];
    placementMode = null;
    showToast("Đã hủy chọn quân.", "#aaa");
    updateUI();
}

function playerToggleTurretPlacement() {
    let myData = gameData[myTeamId];
    let base = getBase(myTeamId);
    let tCount = turrets.filter(t => t.team === myTeamId).length;
    if (base && myData.gold >= GAME_CONFIG.economy.turretCost &&
        tCount < GAME_CONFIG.economy.playerTurretLimit) {
        placementMode = placementMode === 'turret' ? null : 'turret';
        updateUI();
    }
}

// --- TECH UPGRADE MODAL ---
function openUpgradeModal() {
    document.getElementById('upgrade-modal').style.display = 'flex';
    renderTechStats();
}

function closeUpgradeModal() {
    document.getElementById('upgrade-modal').style.display = 'none';
}

function renderTechStats() {
    currentUpgTarget = document.getElementById('upg-target').value;
    let uData = gameData[myTeamId].upg[currentUpgTarget];
    let actualTarget = currentUpgTarget === 'spc' ? getSpecialShipHelper(gameData[myTeamId].theme).type : currentUpgTarget;
    
    let baseHp = 0, baseAtk = 0, baseSpd = 0;
    if(currentUpgTarget === 'hq') baseHp = GAME_CONFIG.buildings.hq.hp;
    else { baseHp = GAME_CONFIG.units[actualTarget].hp; baseAtk = GAME_CONFIG.units[actualTarget].atk; baseSpd = GAME_CONFIG.units[actualTarget].spd; }
    
    let metaHpKey = currentUpgTarget === 'spc' ? 'dreadnought_hp' : actualTarget+'_hp';
    let metaAtkKey = currentUpgTarget === 'spc' ? 'dreadnought_atk' : actualTarget+'_atk';
    let metaSpdKey = currentUpgTarget === 'spc' ? 'dreadnought_spd' : actualTarget+'_spd';

    document.getElementById('row-atk').style.display = currentUpgTarget === 'hq' ? 'none' : 'flex';
    document.getElementById('row-spd').style.display = currentUpgTarget === 'hq' ? 'none' : 'flex';
    document.getElementById('btn-up-atk').style.display = currentUpgTarget === 'hq' ? 'none' : 'block';
    document.getElementById('btn-up-spd').style.display = currentUpgTarget === 'hq' ? 'none' : 'block';
    
    document.getElementById('stat-hp').innerText = `${baseHp} -> ${Math.floor(getEffectiveStat(baseHp, uData.hpLv, myTeamId, metaHpKey))} (Lv${uData.hpLv})`;
    if(currentUpgTarget !== 'hq') {
        document.getElementById('stat-atk').innerText = `${baseAtk} -> ${Math.floor(getEffectiveStat(baseAtk, uData.atkLv, myTeamId, metaAtkKey))} (Lv${uData.atkLv})`;
        document.getElementById('stat-spd').innerText = `${baseSpd.toFixed(1)} -> ${getEffectiveStat(baseSpd, uData.spdLv, myTeamId, metaSpdKey).toFixed(2)} (Lv${uData.spdLv})`;
    }
    let btnDisabled = gameData[myTeamId].gold < GAME_CONFIG.economy.techUpgradeCost;
    document.getElementById('btn-up-atk').disabled = btnDisabled;
    document.getElementById('btn-up-hp').disabled = btnDisabled;
    document.getElementById('btn-up-spd').disabled = btnDisabled;
}

function buyUpgrade(statType) {
    executeAction('tech_upg', {target: currentUpgTarget, stat: statType});
    closeUpgradeModal();
}

function updateLiveButtonStats() {
    let pUpg = gameData[myTeamId].upg;
    let u;
    u = 'interceptor';
    document.getElementById('lbl-int').innerHTML = `HP:${Math.floor(getEffectiveStat(GAME_CONFIG.units[u].hp, pUpg[u].hpLv, myTeamId, u+'_hp'))} | ATK:${Math.floor(getEffectiveStat(GAME_CONFIG.units[u].atk, pUpg[u].atkLv, myTeamId, u+'_atk'))}<br>⏱ 10s`;
    u = 'corvette';
    document.getElementById('lbl-cor').innerHTML = `HP:${Math.floor(getEffectiveStat(GAME_CONFIG.units[u].hp, pUpg[u].hpLv, myTeamId, u+'_hp'))} | ATK:${Math.floor(getEffectiveStat(GAME_CONFIG.units[u].atk, pUpg[u].atkLv, myTeamId, u+'_atk'))}<br>⏱ 15s`;
    u = 'repairer';
    document.getElementById('lbl-rep').innerHTML = `HP:${Math.floor(getEffectiveStat(GAME_CONFIG.units[u].hp, pUpg[u].hpLv, myTeamId, u+'_hp'))} | HỒI:${Math.floor(getEffectiveStat(GAME_CONFIG.units[u].atk, pUpg[u].atkLv, myTeamId, u+'_atk'))}<br>⏱ 20s`;
    u = 'railgun';
    document.getElementById('lbl-rai').innerHTML = `HP:${Math.floor(getEffectiveStat(GAME_CONFIG.units[u].hp, pUpg[u].hpLv, myTeamId, u+'_hp'))} | ATK:${Math.floor(getEffectiveStat(GAME_CONFIG.units[u].atk, pUpg[u].atkLv, myTeamId, u+'_atk'))}<br>⏱ 25s`;
    
    let spc = getSpecialShipHelper(gameData[myTeamId].theme).type;
    document.getElementById('lbl-spc').innerHTML = `HP:${Math.floor(getEffectiveStat(GAME_CONFIG.units[spc].hp, pUpg['spc'].hpLv, myTeamId, 'dreadnought_hp'))} | ATK:${Math.floor(getEffectiveStat(GAME_CONFIG.units[spc].atk, pUpg['spc'].atkLv, myTeamId, 'dreadnought_atk'))}<br>⏱ 60s`;
}

// --- COMMAND ROOM UI ---
function switchCRTab(tabId, btn) {
    document.querySelectorAll('#command-room .cr-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#command-room .cr-tabs button').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

function buyMetaUpgrade(key, cost) {
    if(profile.darkMatter >= cost) {
        profile.darkMatter -= cost;
        profile.upgrades[key] = (profile.upgrades[key] || 0) + 1;
        saveProfile();
        renderCommandRoom();
    }
}

function renderCommandRoom() {
    document.getElementById('cr-sector').innerText = profile.sector;
    document.getElementById('cr-dm').innerText = profile.darkMatter;
    let html = '';
    GAME_CONFIG.permanentUpgrades.forEach(u => {
        let currentLv = profile.upgrades[u.key] || 0;
        let cost = u.baseCost * (currentLv + 1);
        let btnState = profile.darkMatter < cost ? 'disabled style="background:transparent; color:#555; border-color:#333;"' : 'style="border-color:#cc33ff; color:#cc33ff;"';
        html += `<div class="cr-upg-item"><div><b>${u.name}</b><span>Cấp: ${currentLv} (+${currentLv*5}%)</span></div><button class="btn" onclick="buyMetaUpgrade('${u.key}', ${cost})" ${btnState}>${cost} Lõi</button></div>`;
    });
    document.getElementById('cr-upgrades').innerHTML = html;
    renderGallery();
}

function renderGallery() {
    let html = '<div class="gallery-grid">';
    const generalProfiles = {
        bot1: { name: 'TITAN', desc: 'Thiên về đội hình trâu máu và ép giao tranh trực diện.' },
        bot2: { name: 'SWIFT', desc: 'Ưa tốc độ, mở rộng nhanh và đánh sớm.' },
        bot3: { name: 'PSIONIC', desc: 'Tận dụng nâng cấp để kéo dài giao tranh.' },
        bot4: { name: 'NOVA', desc: 'Dồn tài nguyên cho đợt công kích lớn.' },
        bot5: { name: 'ABYSS', desc: 'Phòng thủ sâu, phản công khi đủ hạm đội.' },
        bot6: { name: 'GALAXY', desc: 'Chiến thuật linh hoạt, đổi mục tiêu liên tục.' },
        bot7: { name: 'NEBULA', desc: 'Thích kéo trận về cuối và dùng tàu cấp cao.' }
    };
    Object.entries(generalProfiles).forEach(([team, data]) => {
        let unlocked = profile.capturedGenerals.includes(team);
        html += `<div class="gallery-item ${unlocked ? 'unlocked' : ''}"><b>${unlocked ? data.name : '???'}</b><span>${unlocked ? data.desc : 'Phá hủy HQ thế lực này để mở khóa hồ sơ.'}</span></div>`;
    });
    html += '</div>';
    document.getElementById('cr-gallery').innerHTML = html;
}

function resetProfile() {
    if(confirm("Xóa toàn bộ dữ liệu Tinh Hệ và Nâng Cấp Vĩnh Viễn?")) {
        localStorage.removeItem('galacticRTS_profile');
        location.reload();
    }
}

// --- SWITCH TAB ---
function switchTab(tabId, btnElement) {
    document.querySelectorAll('#ui-container .tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#ui-container .tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btnElement.classList.add('active');
    placementMode = null;
    if(gameStarted) updateUI();
}

// --- START GAME ---
function startGame() {
    if (gameStarted) return;
    document.getElementById('command-room').style.display = 'none';
    initGame();
    updateLiveButtonStats();
    gameStarted = true;
    gameLoop();
}

// --- ASSETS ---
const baseUrl = 'https://raw.githubusercontent.com/fitary/card-battle/refs/heads/main/';
const assets = {};
const assetLoadState = { total: 0, loaded: 0, failed: 0, warned: false };

function markAssetLoaded(ok) {
    if (ok) assetLoadState.loaded++;
    else assetLoadState.failed++;
}

const themes = {
    'std': { hq: 'HQ.png', barracks: 'ARMY_BUILDING.png', reactor: 'POWER_PLANT.png', turret: 'turret.png', miner: 'mining_aircraft.png', interceptor: 'PLANE_1.png', corvette: 'PLANE_2.png', repairer: 'PLANE_3.png', railgun: 'PLANE_4.png', carrier: 'standard_carrier.png' },
    'sea': { hq: 'SEA_HQ.png', barracks: 'SEA_ARMYBUILDING.png', reactor: 'SEA_POWERPLANT.png', turret: 'SEA_TURRET.png', miner: 'SEA_MINING_AIRCRAFT.png', interceptor: 'SEA_PLANE1.png', corvette: 'SEA_PLANE2.png', repairer: 'SEA_PLANE3.png', railgun: 'SEA_PLANE4.png', leviathan: 'sea_Leviathan.png' },
    'under': { hq: 'UNDER_HQ.png', barracks: 'UNDER_ARMYBUILDING.png', reactor: 'UNDER_POWERPLANT.png', turret: 'UNDER_TURRET.png', miner: 'UNDER_MINING_AIRCRAFT.png', interceptor: 'UNDER_PLANE1.png', corvette: 'UNDER_PLANE2.png', repairer: 'UNDER_PLANE3.png', railgun: 'UNDER_PLANE4.png', driller: 'under_driller.png' }
};

for (let t in themes) {
    for (let k in themes[t]) {
        let key = t + '_' + k;
        assets[key] = new Image();
        assets[key].crossOrigin = "anonymous";
        assetLoadState.total++;
        assets[key].onload = () => markAssetLoaded(true);
        assets[key].onerror = () => markAssetLoaded(false);
        assets[key].src = baseUrl + themes[t][k];
    }
}

const imgBoom = new Image();
imgBoom.crossOrigin = "anonymous";
assetLoadState.total++;
imgBoom.onload = () => markAssetLoaded(true);
imgBoom.onerror = () => markAssetLoaded(false);
imgBoom.src = baseUrl + 'boom.png';

// --- CANVAS SETUP ---
canvas = document.getElementById('gameCanvas');
ctx = canvas.getContext('2d');

canvas.addEventListener('mousedown', e => {
    isDragging = true;
    panStart = {x: e.clientX, y: e.clientY};
    selectStart = {x: e.clientX, y: e.clientY};
    selectEnd = {x: e.clientX, y: e.clientY};
    dragDist = 0;
});

window.addEventListener('mousemove', e => {
    if(!isDragging) return;
    selectEnd = {x: e.clientX, y: e.clientY};
    let dx = e.clientX - panStart.x;
    let dy = e.clientY - panStart.y;
    dragDist += Math.abs(dx) + Math.abs(dy);
    if (placementMode !== 'select') {
        cam.x -= dx / zoom;
        cam.y -= dy / zoom;
        panStart = {x: e.clientX, y: e.clientY};
        clampCamera();
    }
});

window.addEventListener('mouseup', e => {
    if(isDragging) {
        if (placementMode === 'select') {
            if (dragDist > 15) {
                let wStartX = selectStart.x / zoom + cam.x;
                let wStartY = selectStart.y / zoom + cam.y;
                let wEndX = selectEnd.x / zoom + cam.x;
                let wEndY = selectEnd.y / zoom + cam.y;
                let minX = Math.min(wStartX, wEndX);
                let maxX = Math.max(wStartX, wEndX);
                let minY = Math.min(wStartY, wEndY);
                let maxY = Math.max(wStartY, wEndY);
                selectedUnitIds = [];
                units.forEach(u => {
                    if (u.team === myTeamId && !u.isDrone && u.x >= minX && u.x <= maxX && u.y >= minY && u.y <= maxY)
                        selectedUnitIds.push(u.id);
                });
                if(selectedUnitIds.length > 0) showToast(`Đã gom ${selectedUnitIds.length} hạm đội!`, "#00ffff");
            }
            placementMode = null;
            updateUI();
        } else if (dragDist <= 15) {
            handleMapClick(e.clientX, e.clientY);
        }
    }
    isDragging = false;
});

canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    isDragging = true;
    panStart = {x: e.touches[0].clientX, y: e.touches[0].clientY};
    selectStart = {x: e.touches[0].clientX, y: e.touches[0].clientY};
    selectEnd = {x: e.touches[0].clientX, y: e.touches[0].clientY};
    dragDist = 0;
}, { passive: false });

window.addEventListener('touchmove', e => {
    if(!isDragging) return;
    e.preventDefault();
    selectEnd = {x: e.touches[0].clientX, y: e.touches[0].clientY};
    let dx = e.touches[0].clientX - panStart.x;
    let dy = e.touches[0].clientY - panStart.y;
    dragDist += Math.abs(dx) + Math.abs(dy);
    if (placementMode !== 'select') {
        cam.x -= dx / zoom;
        cam.y -= dy / zoom;
        panStart = {x: e.touches[0].clientX, y: e.touches[0].clientY};
        clampCamera();
    }
}, { passive: false });

window.addEventListener('touchend', e => {
    if(isDragging) {
        if (placementMode === 'select') {
            if (dragDist > 15) {
                let wStartX = selectStart.x / zoom + cam.x;
                let wStartY = selectStart.y / zoom + cam.y;
                let wEndX = selectEnd.x / zoom + cam.x;
                let wEndY = selectEnd.y / zoom + cam.y;
                let minX = Math.min(wStartX, wEndX);
                let maxX = Math.max(wStartX, wEndX);
                let minY = Math.min(wStartY, wEndY);
                let maxY = Math.max(wStartY, wEndY);
                selectedUnitIds = [];
                units.forEach(u => {
                    if (u.team === myTeamId && !u.isDrone && u.x >= minX && u.x <= maxX && u.y >= minY && u.y <= maxY)
                        selectedUnitIds.push(u.id);
                });
                if(selectedUnitIds.length > 0) showToast(`Đã gom ${selectedUnitIds.length} hạm đội!`, "#00ffff");
            }
            placementMode = null;
            updateUI();
        } else if (dragDist <= 15 && e.changedTouches.length > 0) {
            handleMapClick(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }
    }
    isDragging = false;
}, { passive: false });

window.addEventListener('resize', () => { updateZoom(); clampCamera(); });
updateZoom();

// --- KHỞI TẠO COMMAND ROOM ---
renderCommandRoom();

// --- EXPORT ---
window.startGame = startGame;
window.hostRoom = hostRoom;
window.joinRoom = joinRoom;
window.playOffline = playOffline;
window.startMultiplayer = startMultiplayer;
window.copyInviteLink = copyInviteLink;
window.changeZoom = changeZoom;
window.switchTab = switchTab;
window.playerTrainMiner = playerTrainMiner;
window.playerBuildOrUpgBarracks = playerBuildOrUpgBarracks;
window.playerBuildReactor = playerBuildReactor;
window.playerTrainUnit = playerTrainUnit;
window.playerTrainSpecial = playerTrainSpecial;
window.playerCommandAttack = playerCommandAttack;
window.playerUpgTurretInGame = playerUpgTurretInGame;
window.playerUpgTurretHpInGame = playerUpgTurretHpInGame;
window.playerToggleMovePlacement = playerToggleMovePlacement;
window.playerToggleSelectMode = playerToggleSelectMode;
window.playerSelectAll = playerSelectAll;
window.playerDeselectAll = playerDeselectAll;
window.playerToggleTurretPlacement = playerToggleTurretPlacement;
window.openUpgradeModal = openUpgradeModal;
window.closeUpgradeModal = closeUpgradeModal;
window.buyUpgrade = buyUpgrade;
window.renderTechStats = renderTechStats;
window.switchCRTab = switchCRTab;
window.buyMetaUpgrade = buyMetaUpgrade;
window.resetProfile = resetProfile;