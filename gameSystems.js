(function () {
  const RES = ['metal', 'crystal', 'hydrogen', 'plasma', 'solar', 'fission', 'fusion'];
  const RES_KR = { metal: '메탈', crystal: '크리스탈', hydrogen: '수소', plasma: '플라즈마', solar: '태양열', fission: '핵분열', fusion: '핵융합' };
  const RES_ICO = { metal: '⛏️', crystal: '💎', hydrogen: '⚡', plasma: '🔵', solar: '☀️', fission: '⚛️', fusion: '🔥' };
  const FAME_MILESTONES = [
  { id: 'fm1', name: '우주 신인', need: 100, desc: '크리스탈 합성소 개방', unlocks: 'crystal_fac' },
  { id: 'fm2', name: '우주 개척자', need: 300, desc: '드론 허브 개방', unlocks: 'drone_hub' },
  { id: 'fm3', name: '행성 정착민', need: 500, desc: '수소 정제소 개방 + 모든 수입 +10%', unlocks: 'refinery', bonusIncome: 0.1 },
  { id: 'fm4', name: '은하계 상인', need: 700, desc: '자원 재활용소 개방', unlocks: 'recycler' },
  { id: 'fm5', name: '태양력 개척자', need: 1000, desc: '태양열 발전소 개방', unlocks: 'solar_plant' },
  { id: 'fm6', name: '플라즈마 개척자', need: 1500, desc: '플라즈마 코일 개방', unlocks: 'plasma_coil' },
  { id: 'fm7', name: '핵분열 개척자', need: 2200, desc: '핵분열로 개방', unlocks: 'fission_reactor' },
  { id: 'fm8', name: '핵융합 개척자', need: 3200, desc: '핵융합로 개방', unlocks: 'fusion_reactor' },
  { id: 'fm9', name: '항성 정복자', need: 5000, desc: '전초기지 개방 + 모든 수입 +25%', unlocks: 'outpost', bonusIncome: 0.25 },
  { id: 'fm10', name: '은하계 영웅', need: 8000, desc: '모든 수입 +50%', bonusIncome: 0.5 },
  { id: 'fm11', name: '우주 전설', need: 15000, desc: '모든 수입 +100%', bonusIncome: 1.0 },
  { id: 'fm12', name: '차원 초월자', need: 30000, desc: '모든 수입 +200%', bonusIncome: 2.0 }
];

const RES_COLOR = { metal: '#34d399', crystal: '#a78bfa', hydrogen: '#38bdf8', plasma: '#f472b6', solar: '#fbbf24', fission: '#fb7185', fusion: '#e879f9' };

const BUILDING_TEMPLATES = [
    { id: 'mine', name: '지표 광산', icon: '⛏️', img: 'img/bld-mine.jpg', desc: '소행성 표면에서 금속 광물 채굴',
      basePrice: 8000, income: 30, awarenessNeeded: 0, awarenessGiven: 8, tier: 1, res: 'metal', output: 2.0 },
    { id: 'crystal_fac', name: '크리스탈 합성소', icon: '💎', img: 'img/bld-crystal.jpg', desc: '고밀도 에너지 결정 합성',
      basePrice: 25000, income: 40, awarenessNeeded: 100, awarenessGiven: 10, tier: 1, res: 'crystal', output: 0.8 },
    { id: 'drone_hub', name: '드론 허브', icon: '🛸', img: 'img/bld-drone.jpg', desc: '자동 드론으로 자원 수집',
      basePrice: 35000, income: 60, awarenessNeeded: 300, awarenessGiven: 12, tier: 1, res: 'metal', output: 1.0 },
    { id: 'refinery', name: '수소 정제소', icon: '⚡', img: 'img/bld-refinery.jpg', desc: '듀테륨 정제로 수소 생산',
      basePrice: 80000, income: 90, awarenessNeeded: 500, awarenessGiven: 15, tier: 2, res: 'hydrogen', output: 0.5 },
    { id: 'recycler', name: '자원 재활용소', icon: '♻️', img: 'img/bld-recycler.jpg', desc: '폐자원 재활용',
      basePrice: 120000, income: 120, awarenessNeeded: 700, awarenessGiven: 18, tier: 2, res: 'metal', output: 0.6 },
    { id: 'solar_plant', name: '태양열 발전소', icon: '☀️', img: 'img/bld-solar.jpg', desc: '항성 에너지 수집',
      basePrice: 200000, income: 160, awarenessNeeded: 1000, awarenessGiven: 22, tier: 2, res: 'solar', output: 0.6 },
    { id: 'plasma_coil', name: '플라즈마 코일', icon: '🔵', img: 'img/bld-plasma.jpg', desc: '고에너지 플라즈마 안정화',
      basePrice: 280000, income: 220, awarenessNeeded: 1500, awarenessGiven: 26, tier: 3, res: 'plasma', output: 0.4 },
    { id: 'fission_reactor', name: '핵분열로', icon: '⚛️', img: 'img/bld-fission.jpg', desc: '원자핵 분열 에너지',
      basePrice: 450000, income: 350, awarenessNeeded: 2200, awarenessGiven: 32, tier: 3, res: 'fission', output: 0.3 },
    { id: 'fusion_reactor', name: '핵융합로', icon: '🔥', img: 'img/bld-fusion.jpg', desc: '핵융합 반응 에너지',
      basePrice: 800000, income: 550, awarenessNeeded: 3200, awarenessGiven: 40, tier: 3, res: 'fusion', output: 0.2 },
    { id: 'outpost', name: '전초기지', icon: '🚀', img: 'img/bld-outpost.jpg', desc: '새 행성 자원 탐색',
      basePrice: 1500000, income: 900, awarenessNeeded: 5000, awarenessGiven: 55, tier: 4, res: 'crystal', output: 0.5 }
  ];

  const RESEARCH_LIST = [
    { id: 'r1', name: '광산 효율 I', desc: '메탈 생산 +30%', icon: '⛏️', cost: { metal: 8000 }, time: 30, effect: g => { g.resMultipliers.metal *= 1.3; } },
    { id: 'r2', name: '합성 기술 I', desc: '크리스탈 생산 +30%', icon: '💎', cost: { metal: 20000 }, time: 45, effect: g => { g.resMultipliers.crystal *= 1.3; } },
    { id: 'r3', name: '정제 기술 I', desc: '수소 생산 +30%', icon: '⚡', cost: { metal: 50000, crystal: 10000 }, time: 60, effect: g => { g.resMultipliers.hydrogen *= 1.3; } },
    { id: 'r4', name: '에너지 저장 I', desc: '모든 저장고 +50%', icon: '📦', cost: { metal: 30000 }, time: 40, effect: g => { g.storageMult *= 1.5; } },
    { id: 'r5', name: '건물 관리 I', desc: '모든 건물 월세 +25%', icon: '🏗️', cost: { metal: 50000, crystal: 15000 }, time: 50, effect: g => { g.incomeMult += 0.25; } },
    { id: 'r6', name: '인지도 확산', desc: '인지도 획득량 +50%', icon: '📡', cost: { metal: 100000, crystal: 25000 }, time: 70, effect: g => { g.awarenessMult *= 1.5; } },
    { id: 'r7', name: '광산 효율 II', desc: '메탈 생산 +60%', icon: '⛏️', cost: { metal: 120000, crystal: 30000 }, time: 90, effect: g => { g.resMultipliers.metal *= 1.6; }, requires: 'r1' },
    { id: 'r8', name: '건물 관리 II', desc: '모든 건물 월세 +50%', icon: '🏗️', cost: { metal: 250000, crystal: 60000, hydrogen: 10000 }, time: 120, effect: g => { g.incomeMult += 0.5; }, requires: 'r5' },
    { id: 'r9', name: '핵융합 안정화', desc: '핵융합 생산 +100%', icon: '🔥', cost: { metal: 500000, crystal: 100000, hydrogen: 50000 }, time: 300, effect: g => { g.resMultipliers.fusion *= 2.0; }, requires: 'r3' },
    { id: 'r10', name: '우주 무역', desc: '소득 +40%', icon: '📈', cost: { metal: 800000, crystal: 200000, plasma: 50000 }, time: 400, effect: g => { g.incomeMult += 0.4; }, requires: 'r6' },
    { id: 'r11', name: '함선 생산 I', desc: '함선 건조 시간 -20%', icon: '🚀', cost: { metal: 300000, crystal: 80000 }, time: 150, effect: g => { g.shipBuildSpeedMult *= 0.8; }, requires: 'r4' },
    { id: 'r12', name: '전투 교리', desc: '함대 전투력 +30%', icon: '⚔️', cost: { metal: 600000, crystal: 150000, solar: 30000 }, time: 200, effect: g => { g.fleetPowerMult *= 1.3; }, requires: 'r5' },
    { id: 'r13', name: '식민지 자동 운송', desc: '식민지 자원 자동 수송', icon: '📦', cost: { metal: 400000, crystal: 100000, hydrogen: 20000 }, time: 180, effect: g => { g.colonyAutoTransport = true; }, requires: 'r6' },
    { id: 'r14', name: '식민지 자동화', desc: '식민지 공장 자동 업그레이드', icon: '🏭', cost: { metal: 800000, crystal: 250000, hydrogen: 80000, plasma: 15000 }, time: 350, effect: g => { g.colonyAutoUpgrade = true; }, requires: 'r13' },
    { id: 'r15', name: '자동 채굴 드론', desc: '5초마다 자동 클릭', icon: '🤖', cost: { metal: 1500000, crystal: 500000, hydrogen: 100000, solar: 50000 }, time: 450, effect: g => { g.autoClicker = true; }, requires: 'r11' },
    { id: 'r16', name: '건물 관리 AI', desc: '가장 저렴한 건물 자동 구매', icon: '🧠', cost: { metal: 3000000, crystal: 1000000, hydrogen: 300000, plasma: 100000 }, time: 600, effect: g => { g.autoBuilder = true; }, requires: 'r15' },
    { id: 'r17', name: '우주 무역 II', desc: '소득 +60%', icon: '📈', cost: { metal: 5000000, crystal: 2000000, hydrogen: 500000, plasma: 200000 }, time: 900, effect: g => { g.incomeMult += 0.6; }, requires: 'r10' },
    { id: 'r18', name: '함선 생산 II', desc: '함선 건조 시간 -30%', icon: '🚀', cost: { metal: 4000000, crystal: 1500000, solar: 200000 }, time: 600, effect: g => { g.shipBuildSpeedMult *= 0.7; }, requires: 'r11' },
    { id: 'r19', name: '전투 교리 II', desc: '함대 전투력 +50%', icon: '⚔️', cost: { metal: 8000000, crystal: 3000000, hydrogen: 800000, solar: 300000 }, time: 800, effect: g => { g.fleetPowerMult *= 1.5; }, requires: 'r12' },
    { id: 'r20', name: '에너지 저장 II', desc: '모든 저장고 +100%', icon: '📦', cost: { metal: 6000000, crystal: 2500000, plasma: 500000 }, time: 700, effect: g => { g.storageMult *= 2.0; }, requires: 'r4' }
  ];

  const SHIP_TEMPLATES = [
    { type: 'scout', name: '정찰기', icon: '🛰️', power: 2, cost: { metal: 150 }, time: 5, strongAgainst: 'raider', awarenessNeeded: 0, img: 'img/ship-scout.jpg', maxLevel: 15, upgradeTime: 15, special: '정찰' },
    { type: 'corvette', name: '초계함', icon: '🚀', power: 6, cost: { metal: 600 }, time: 25, strongAgainst: 'pirate_fleet', awarenessNeeded: 15, img: 'img/ship-cruiser.jpg', maxLevel: 12, upgradeTime: 30 },
      { type: 'frigate', name: '호위함', icon: '🛡️', power: 14, cost: { metal: 1500, crystal: 400 }, time: 70, strongAgainst: 'marauder', awarenessNeeded: 50, img: 'img/ship-corvette.jpg', maxLevel: 10, upgradeTime: 50 },
      { type: 'torpedo', name: '어뢰정', icon: '🎯', power: 8, cost: { metal: 800, crystal: 200 }, time: 40, strongAgainst: 'pirate_fleet', awarenessNeeded: 80, img: 'img/ship-torpedo.jpg', maxLevel: 10, upgradeTime: 35 },
      { type: 'destroyer', name: '구축함', icon: '⚔️', power: 28, cost: { metal: 3200, crystal: 1200 }, time: 150, strongAgainst: 'juggernaut', awarenessNeeded: 120, img: 'img/ship-battleship.jpg', maxLevel: 8, upgradeTime: 90 },
      { type: 'cruiser', name: '순양함', icon: '🔱', power: 50, cost: { metal: 7000, crystal: 3500, hydrogen: 1000 }, time: 350, strongAgainst: 'raider', awarenessNeeded: 250, img: 'img/ship-frigate.jpg', maxLevel: 7, upgradeTime: 180 },
      { type: 'repair', name: '수리함', icon: '🔧', power: 5, cost: { metal: 10000, crystal: 4000, hydrogen: 1500 }, time: 500, strongAgainst: null, awarenessNeeded: 350, img: 'img/ship-repair.jpg', maxLevel: 5, upgradeTime: 200, special: '피해 -50%' },
      { type: 'battleship', name: '전함', icon: '🚢', power: 90, cost: { metal: 18000, crystal: 9000, hydrogen: 3000 }, time: 700, strongAgainst: 'pirate_fleet', awarenessNeeded: 450, img: 'img/ship-destroyer.jpg', maxLevel: 6, upgradeTime: 350 },
      { type: 'carrier', name: '항공모함', icon: '✈️', power: 170, cost: { metal: 45000, crystal: 22000, hydrogen: 8000, plasma: 2000 }, time: 1600, strongAgainst: 'marauder', awarenessNeeded: 700, img: 'img/ship-carrier.jpg', maxLevel: 5, upgradeTime: 600 },
      { type: 'mothership', name: '모선', icon: '🌌', power: 500, cost: { metal: 200000, crystal: 80000, hydrogen: 30000, plasma: 15000 }, time: 5000, strongAgainst: 'juggernaut', awarenessNeeded: 900, img: 'img/ship-mothership.jpg', maxLevel: 3, upgradeTime: 1500 },
      { type: 'dreadnought', name: '드레드노트', icon: '💀', power: 320, cost: { metal: 110000, crystal: 55000, hydrogen: 20000, plasma: 8000 }, time: 3000, strongAgainst: 'juggernaut', awarenessNeeded: 1100, img: 'img/ship-dreadnought.jpg', maxLevel: 4, upgradeTime: 1000 }
  ];

  const PIRATE_TYPES = [
    { type: 'raider', name: '약탈자', icon: '🦹', weakTo: 'scout', powerBase: 10 },
    { type: 'pirate_fleet', name: '해적단', icon: '🏴‍☠️', weakTo: 'corvette', powerBase: 18 },
    { type: 'marauder', name: '침투선', icon: '🪓', weakTo: 'frigate', powerBase: 14 },
    { type: 'juggernaut', name: '거함', icon: '👹', weakTo: 'destroyer', powerBase: 32 }
  ];

  const COLONY_TEMPLATES = [
  { planetId: 'earth', name: '지구 개척지', factorySlots: 6, prodSpeed: 1.0 },
  { planetId: 'venus', name: '금성 개척지', factorySlots: 6, prodSpeed: 1.1 },
  { planetId: 'europa', name: '유로파 개척지', factorySlots: 6, prodSpeed: 1.2 },
  { planetId: 'io', name: '이오 개척지', factorySlots: 6, prodSpeed: 1.0 },
  { planetId: 'titan', name: '타이탄 개척지', factorySlots: 6, prodSpeed: 1.1 },
  { planetId: 'kepler', name: '케플러-22b 개척지', factorySlots: 6, prodSpeed: 1.3 },
  { planetId: 'andromeda', name: '안드로메다 전초기지', factorySlots: 6, prodSpeed: 1.5 }
];

const COLONY_FACTORY_TYPES = [
  { icon: '⛏️', name: '메탈 채굴기', res: 'metal', baseOutput: 0.3 },
  { icon: '💎', name: '크리스탈 증폭기', res: 'crystal', baseOutput: 0.2 },
  { icon: '⚡', name: '수소 추출기', res: 'hydrogen', baseOutput: 0.15 },
  { icon: '🔵', name: '플라즈마 수집기', res: 'plasma', baseOutput: 0.1 },
  { icon: '☀️', name: '태양열 패널', res: 'solar', baseOutput: 0.12 },
  { icon: '⚛️', name: '핵분열 발전기', res: 'fission', baseOutput: 0.08 }
];
  const PLANETS = [
    { id: 'earth', name: '지구', icon: '🌍', img: 'img/planet-terran.jpg', difficulty: 20, fameNeeded: 0,
      bonusDesc: '메탈 생산 +2% (최대 +40%)', bonusType: 'res', bonusRes: 'metal', bonusPerLevel: 0.02, maxLevel: 20,
      specialty: '메탈 풍부', penalty: '없음' },
    { id: 'venus', name: '금성', icon: '🟡', img: 'img/planet-desert.jpg', difficulty: 50, fameNeeded: 45,
      bonusDesc: '크리스탈 생산 +2% (최대 +40%)', bonusType: 'res', bonusRes: 'crystal', bonusPerLevel: 0.02, maxLevel: 20,
      specialty: '크리스탈 풍부, 메탈 -20%', penalty: 'metal' },
    { id: 'europa', name: '유로파', icon: '🔵', img: 'img/planet-ice.jpg', difficulty: 100, fameNeeded: 100,
      bonusDesc: '수소 생산 +2% (최대 +40%)', bonusType: 'res', bonusRes: 'hydrogen', bonusPerLevel: 0.02, maxLevel: 20,
      specialty: '수소 풍부, 크리스탈 -20%', penalty: 'crystal' },
    { id: 'io', name: '이오', icon: '🟠', img: 'img/planet-lava.jpg', difficulty: 200, fameNeeded: 190,
      bonusDesc: '플라즈마 생산 +3% (최대 +45%)', bonusType: 'res', bonusRes: 'plasma', bonusPerLevel: 0.03, maxLevel: 15,
      specialty: '플라즈마 풍부, 메탈 -30%', penalty: 'metal' },
    { id: 'titan', name: '타이탄', icon: '🟤', img: 'img/planet-gas.jpg', difficulty: 350, fameNeeded: 350,
      bonusDesc: '태양열 생산 +3% (최대 +45%)', bonusType: 'res', bonusRes: 'solar', bonusPerLevel: 0.03, maxLevel: 15,
      specialty: '태양열 풍부, 수소 -30%', penalty: 'hydrogen' },
    { id: 'kepler', name: '케플러-22b', icon: '🟣', img: 'img/planet-alien.jpg', difficulty: 700, fameNeeded: 500,
      bonusDesc: '모든 자원 +4% (최대 +60%)', bonusType: 'allRes', bonusPerLevel: 0.04, maxLevel: 15,
      specialty: '모든 자원 균형, 생산 느림', penalty: null },
    { id: 'andromeda', name: '안드로메다 개척지', icon: '🌌', img: 'img/expedition.jpg', difficulty: 1500, fameNeeded: 800,
      bonusDesc: '모든 수입 +5% (최대 +75%)', bonusType: 'income', bonusPerLevel: 0.05, maxLevel: 15,
      specialty: '무역 중심지, 방어 어려움', penalty: null }
  ];

  window.RES_KR = RES_KR;
  window.RES_COLOR = RES_COLOR;
  window.RES_ICO = RES_ICO;
  if (typeof Vue !== 'undefined') {
    Vue.prototype.$RES_KR = RES_KR;
    Vue.prototype.$RES_COLOR = RES_COLOR;
    Vue.prototype.$RES_ICO = RES_ICO;
  }
  window.GameSystemsMixin = {
    data() {
      return {
        money: new Decimal(2000),
        clickPower: 200,

        resources: {
          metal: new Decimal(100), metalMax: new Decimal(500),
          crystal: new Decimal(10), crystalMax: new Decimal(300),
          hydrogen: new Decimal(0), hydrogenMax: new Decimal(200),
          plasma: new Decimal(0), plasmaMax: new Decimal(200),
          solar: new Decimal(0), solarMax: new Decimal(200),
          fission: new Decimal(0), fissionMax: new Decimal(200),
          fusion: new Decimal(0), fusionMax: new Decimal(200)
        },
        resUnlocked: { metal: true, crystal: false, hydrogen: false, plasma: false, solar: false, fission: false, fusion: false },
        resMultipliers: { metal: 1, crystal: 1, hydrogen: 1, plasma: 1, solar: 1, fission: 1, fusion: 1 },
        storageMult: 1, incomeMult: 1, fameIncomeBonus: 0, awarenessMult: 1, shipBuildSpeedMult: 1, fleetPowerMult: 1,

        buildings: BUILDING_TEMPLATES.map(b => ({
          ...b, currentPrice: b.basePrice, priceTier: 2, cooldown: 0,
          priceTimer: Math.random() * 120, owned: 0,
          level: 0, maxLevel: 20
        })),

        awareness: 0,
        fameMilestones: FAME_MILESTONES.map(m => ({ ...m, reached: false })),
        research: RESEARCH_LIST.map(r => ({ ...r, completed: false, inProgress: false, remaining: 0 })),

        ships: Object.fromEntries(SHIP_TEMPLATES.map(s => [s.type, { count: 0, building: false, buildCount: 0, totalTime: 0, elapsed: 0, level: 1, upgrading: false, upgradeElapsed: 0, upgradeTotalTime: 0 }])),
        shipTypes: SHIP_TEMPLATES,
        shipBuildQty: {},

        colonizer: { count: 0, building: false, buildCount: 0, totalTime: 0, elapsed: 0, level: 1 },

        planets: PLANETS.map(p => ({ ...p, explorationLevel: 0 })),
        exploring: false, explorePlanet: null, exploreChance: 0, exploreTimer: 0,
        exploreFlavor: '', exploreFlavorTimer: 0,

        pirateTypes: PIRATE_TYPES,
        pirateAttackTimer: 300,
        pirateWave: 1, pirateLog: [], combatCooldown: 0,
        raidAlert: '', raidAlertTimer: 0,

        achievements: [
          { id: 'first_buy', name: '첫 구매', desc: '건물 첫 구매', bonus: 0.05, cond: g => g.totalBuys >= 1 },
          { id: 'trader', name: '노련한 상인', desc: '건물 10회 거래', bonus: 0.10, cond: g => g.totalTrades >= 10 },
          { id: 'mogul', name: '우주 재벌', desc: '총 자산 1M', bonus: 0.15, cond: g => g.totalWealth.gte(1e6) },
          { id: 'aware100', name: '인지도 상승', desc: '인지도 100', bonus: 0.10, cond: g => g.awareness >= 100 },
          { id: 'collector', name: '건물 수집가', desc: '모든 건물 종류 보유', bonus: 0.20, cond: g => g.buildings.filter(b => b.level > 0).length >= g.buildings.length },
          { id: 'researcher', name: '연구자', desc: '연구 5개 완료', bonus: 0.15, cond: g => g.research.filter(r => r.completed).length >= 5 },
          { id: 'fleet5', name: '소함대', desc: '함선 5척', bonus: 0.10, cond: g => g.totalShips >= 5 },
          { id: 'fleet20', name: '대함대', desc: '함선 20척', bonus: 0.20, cond: g => g.totalShips >= 20 },
          { id: 'wave5', name: '해적 사냥', desc: '5웨이브 도달', bonus: 0.10, cond: g => g.pirateWave > 5 },
          { id: 'explorer', name: '탐험가', desc: '첫 행성 개척', bonus: 0.15, cond: g => g.planets.some(p => p.explorationLevel > 0) },
          { id: 'conqueror', name: '정복자', desc: '3개 행성 개척', bonus: 0.25, cond: g => g.planets.filter(p => p.explorationLevel > 0).length >= 3 },
          { id: 'billion', name: '우주 억만장자', desc: '자산 1B', bonus: 0.50, cond: g => g.totalWealth.gte(1e9) }
        ],
        missions: [
          { id: 'm1', name: '첫 발자국', desc: '건물 1회 구매', type: 'buys', goal: 1, progress: 0, reward: { money: 5000 }, completed: false },
          { id: 'm2', name: '자원 수집가', desc: '메탈 500 보유', type: 'res_metal', goal: 500, progress: 0, reward: { crystal: 50 }, completed: false },
          { id: 'm3', name: '해적 사냥꾼', desc: '해적 3웨이브 처치', type: 'pirate_wave', goal: 3, progress: 0, reward: { item: 'timewarp', count: 1 }, completed: false },
          { id: 'm4', name: '건물주', desc: '건물 5개 보유', type: 'owned_total', goal: 5, progress: 0, reward: { money: 50000 }, completed: false },
          { id: 'm5', name: '신흥 자산가', desc: '총 자산 100k', type: 'wealth', goal: 100000, progress: 0, reward: { permMult: 0.1 }, completed: false }
        ],
        mainGoal: 1e9,
        achieved: {}, achievementToast: '',
        totalBuys: 0, totalTrades: 0, totalWealth: new Decimal(0), bestProfit: 0,

        items: { timewarp: 1, surge: 1 },
        itemDefs: [
          { id: 'timewarp', name: '시간 가속', icon: '⏩', desc: '2시간치 소득 즉시', effect: g => { g.addOfflineIncome(7200); g.toast('2시간치 수입 획득!'); } },
          { id: 'surge', name: '생산 과부하', icon: '⚡', desc: '30초간 소득 ×5', effect: g => { g.boostTimer = 30; g.boostMultItem = 5; g.toast('30초간 ×5!'); } }
        ],
        boostTimer: 0, boostMultItem: 1, freeDispenserCD: 0,

        auctionActive: false, auctionBuilding: null, auctionPrice: 0, auctionDiscount: 0, auctionTimer: 0, auctionChance: 0,
        eventMessage: '', eventTimer: 0,

        activeTab: 'buildings',
        _saveTick: 0, _toastT: null,
        lastSeen: 0, offlineReport: null,

        colonies: [],
        colonyFactoryTypes: COLONY_FACTORY_TYPES,
        colonyDetailPlanet: null,

        cheatOpen: false,
        guideOpen: { buildings: true, fleet: true, colony: true, research: true },
        speedMult: 1,
        prestigePoints: 0,
        prestigeBonus: 0,
        buildingAwakened: {},
        buildingAwakeningEffects: {
          mine: { name: '대형 채굴', desc: '클릭력 +50%', clickMult: 0.5 },
          crystal_fac: { name: '결정 가속', desc: '크리스탈 생산 +40%', resBonus: { crystal: 0.4 } },
          drone_hub: { name: '드론 함대', desc: '모든 건물 월세 +20%', incomeMult: 0.2 },
          refinery: { name: '고효율 정제', desc: '수소 생산 +50%', resBonus: { hydrogen: 0.5 } },
          recycler: { name: '순환 경제', desc: '자원 저장고 +80%', storageMult: 0.8 },
          solar_plant: { name: '다이슨 패널', desc: '태양열 생산 +50%', resBonus: { solar: 0.5 } },
          plasma_coil: { name: '안정 플라즈마', desc: '플라즈마 생산 +50%', resBonus: { plasma: 0.5 } },
          fission_reactor: { name: '고밀도 분열', desc: '핵분열 생산 +50%', resBonus: { fission: 0.5 } },
          fusion_reactor: { name: '제로포인트 에너지', desc: '핵융합 +80%, 에너지 자원 +30%', resBonus: { fusion: 0.8, solar: 0.3, fission: 0.3 } },
          outpost: { name: '심우주 기지', desc: '함대 전투력 +30%', fleetMult: 0.3 }
        },
        fleetActiveTab: 'fleet_build',
        previewImage: null,
        exploreTravelOverlay: false,
        exploreTravelTimer: 0,
        exploreSelectMode: false,
        autoTransportUnlocked: false,
        colonyAutoTransport: false,
        colonyAutoUpgrade: false,
        exchangeSellRate: { metal: 8, crystal: 20, hydrogen: 35, plasma: 70, solar: 50, fission: 80, fusion: 120 },
        exchangeBuyRate: 1.5,
        autoClicker: false,
        autoBuilder: false,
        autoClickerTimer: 0,
        challengeActive: null,
        challengesCompleted: {},
        awakeningStones: 0,
        transcendLevel: 0,
        transcendBonus: 0,
        transcendBuildSpeed: 1,
        transcendFleetBonus: 0,
        transcendResearchSpeed: 1,
        transcendAwareness: 1,
        shipAwakened: {},
        stats: {
          totalClicks: 0,
          totalMoneyEarned: 0,
          totalShipsBuilt: 0,
          totalBattlesWon: 0,
          totalBuildingsBuilt: 0,
          totalResearchDone: 0,
          timePlayed: 0,
          maxWave: 1,
          totalBattleLoot: 0
        },
        challengeModifiers: {},
        challengeDefs: [
          { id: 'ch1', name: '광물 부족', icon: '⛏️', desc: '메탈 생산 -80%', reward: 2 },
          { id: 'ch2', name: '무역 금지', icon: '💰', desc: '건물 월세 -60%', reward: 2 },
          { id: 'ch3', name: '해적의 시대', icon: '☠️', desc: '해적 전투력 ×3', reward: 3 },
          { id: 'ch4', name: '느린 진보', icon: '⏳', desc: '연구 시간 ×3, 함선 건조 ×2', reward: 3 },
          { id: 'ch5', name: '고립 우주', icon: '🪐', desc: '식민지/행성 탐험 불가', reward: 5 }
        ],
        alienRep: { merchanter: 0, warlord: 0, architech: 0 },
        alienTier: { merchanter: 0, warlord: 0, architech: 0 },
        alienFactions: [
          { id: 'merchanter', name: '교역 연맹', icon: '🤝', desc: '상업적 외계 종족', thresholds: [30, 100, 300],
            bonuses: ['거래소 매수 수수료 제거', '모든 수입 +20%', '건물 구매 비용 -30%'] },
          { id: 'warlord', name: '전투 종족', icon: '⚔️', desc: '호전적 외계 종족', thresholds: [40, 120, 350],
            bonuses: ['함대 전투력 +25%', '함선 건조 시간 -40%', '전투 승리 시 각성석 확률 5%'] },
          { id: 'architech', name: '기술 위원회', icon: '🔮', desc: '과학자 외계 종족', thresholds: [50, 150, 400],
            bonuses: ['연구 시간 -40%', '모든 저장고 +100%', '인지도 획득량 +100%'] }
        ]
      };
    },
    computed: {
      totalShips() { let n = 0; for (const t in this.ships) n += this.ships[t].count || 0; return n; },
      effectiveClickPower() {
        let cp = this.clickPower;
        if (this.buildingAwakened.mine) cp *= 1.5;
        return cp;
      },
      totalWealthCalc() {
        let sum = this.money;
        for (const b of this.buildings) if (b.level > 0) sum = sum.add(b.basePrice * (0.5 + b.level * 0.5));
        return sum;
      },
      passiveIncome() {
        let sum = 0;
        for (const b of this.buildings) if (b.level > 0) sum += b.income * b.level * this.effectiveIncomeMult * (1 + 0.12 * (b.level - 1));
        return sum;
      },
      resourceIncome() {
        const rates = {};
        for (const k of RES) rates[k] = 0;
        for (const b of this.buildings)
          if (b.level > 0 && b.res) rates[b.res] = (rates[b.res] || 0) + b.output * b.level * (1 + 0.15 * (b.level - 1));
        if (this.challengeModifiers.metalProd) rates.metal = (rates.metal || 0) * this.challengeModifiers.metalProd;
        for (const p of this.planets) {
          if (p.explorationLevel <= 0) continue;
          const bonus = 1 + (p.bonusPerLevel || 0) * p.explorationLevel;
          if (p.bonusType === 'res' && rates[p.bonusRes])
            rates[p.bonusRes] *= bonus;
          else if (p.bonusType === 'allRes')
            for (const k of RES) if (rates[k]) rates[k] *= bonus;
          if (p.penalty && rates[p.penalty])
            rates[p.penalty] *= Math.max(0.5, 1 - 0.2 * p.explorationLevel);
        }
        for (const bid in this.buildingAwakened) {
          if (this.buildingAwakened[bid]) {
            const eff = this.buildingAwakeningEffects[bid];
            if (eff.resBonus) for (const k in eff.resBonus) if (rates[k]) rates[k] *= 1 + eff.resBonus[k];
          }
        }
        return rates;
      },
      effectiveIncomeMult() {
        let m = this.incomeMult * (1 + this.fameIncomeBonus) * (1 + this.prestigeBonus);
        if (this.challengeModifiers.incomeMult) m *= this.challengeModifiers.incomeMult;
        if (this.alienTier.merchanter >= 2) m *= 1.2;
        if (this.transcendBonus > 0) m *= 1 + this.transcendBonus;
        for (const p of this.planets)
          if (p.explorationLevel > 0 && p.bonusType === 'income') m *= 1 + (p.bonusPerLevel || 0) * p.explorationLevel;
        for (const bid in this.buildingAwakened) {
          if (this.buildingAwakened[bid]) {
            const eff = this.buildingAwakeningEffects[bid];
            if (eff.incomeMult) m *= 1 + eff.incomeMult;
          }
        }
        return m;
      },
      visibleBuildings() { return this.buildings.filter(b => b.awarenessNeeded <= this.awareness); },
      visibleShips() { return this.shipTypes.filter(s => s.awarenessNeeded <= this.awareness); },
      visiblePlanets() { return this.planets.filter(p => p.fameNeeded <= this.awareness); },
      visibleResources() {
        const vis = { metal: true };
        for (const b of this.buildings) if (b.level > 0 && b.res) vis[b.res] = true;
        return vis;
      },
      nextUnlock() {
        const next = this.buildings.find(b => b.awarenessNeeded > this.awareness);
        return next ? { name: next.name, need: next.awarenessNeeded, progress: Math.min(100, Math.round(this.awareness / next.awarenessNeeded * 100)) } : null;
      },
      nextShipUnlock() {
        const next = this.shipTypes.find(s => s.awarenessNeeded > this.awareness);
        return next ? { name: next.name, need: next.awarenessNeeded, progress: Math.min(100, Math.round(this.awareness / next.awarenessNeeded * 100)) } : null;
      },
      fleetPower() {
        let p = 0;
        for (const s of this.shipTypes) {
          const cnt = this.ships[s.type]?.count || 0;
          p += cnt * this.shipPower(s);
        }
        let mult = this.fleetPowerMult;
        if (this.buildingAwakened.outpost) mult *= 1.3;
        if (this.alienTier.warlord >= 1) mult *= 1.25;
        return p * mult;
      },
      currentPirate() {
        const pt = this.pirateTypes[(this.pirateWave - 1) % this.pirateTypes.length];
        const scale = Math.pow(1.30, this.pirateWave - 1);
        return { type: pt.type, name: pt.name, icon: pt.icon, weakTo: pt.weakTo, power: Math.floor(pt.powerBase * scale) };
      },
      piratePower() {
        let p = this.currentPirate ? this.currentPirate.power : 0;
        if (this.challengeModifiers.piratePow) p *= this.challengeModifiers.piratePow;
        return p;
      },
      weakShipCount() {
        if (!this.currentPirate) return 0;
        const t = this.currentPirate.weakTo;
        return (this.ships[t] && this.ships[t].count) ? this.ships[t].count : 0;
      },
      buyableCount() { return this.visibleBuildings.filter(b => this.canBuyBuilding(b)).length; },
      ownedBuildingTypes() { return this.buildings.filter(b => b.level > 0).length; },
      unlockedResourceCount() { return Object.values(this.visibleResources).filter(v => v).length; },
      totalColonizers() { return this.colonizer.count; },
      colonizerPower() { return this.totalColonizers * (this.colonizer.level || 1); },
      nextFameMilestone() {
        const next = this.fameMilestones.find(m => !m.reached);
        return next ? next : null;
      },
      fameMilestoneProgress() {
        const next = this.nextFameMilestone;
        if (!next) return 100;
        return Math.min(100, Math.round(this.awareness / next.need * 100));
      },
      fameBonusDisplay() {
        if (this.fameIncomeBonus > 0) return '+' + Math.round(this.fameIncomeBonus * 100) + '%';
        return '';
      },
      colonyCount() { return this.colonies.length; },
      visibleColonies() {
        return this.colonies.filter(c => {
          const p = this.planets.find(x => x.id === c.planetId);
          return p && p.explorationLevel > 0;
        });
      },
      colonyAwarenessPerSec() {
        let total = 0;
        for (const c of this.colonies) total += this.colonyTotalFactoryLevel(c);
        return parseFloat((total * 0.01).toFixed(2));
      },
      colonyIncomePerSec() {
        let total = 0;
        for (const c of this.colonies) total += this.colonyTotalFactoryLevel(c);
        return parseFloat((total * 1.5).toFixed(2));
      },
      effectiveAwarenessMult() {
        let m = this.awarenessMult;
        if (this.alienTier.architech >= 3) m *= 2;
        m *= (this.transcendAwareness || 1);
        return m;
      },
      effectiveExchangeBuyRate() {
        return this.alienTier.merchanter >= 1 ? 1.0 : this.exchangeBuyRate;
      },
    },

    methods: {
      colonyBuildings(c) {
        if (!c || !c.factories) return [];
        return c.factories.map((f, i) => ({
          ...f,
          template: this.colonyFactoryTypes[i] || this.colonyFactoryTypes[0]
        }));
      },
      colonyResourceRate(c) {
        if (!c || !c.factories) return {};
        const rates = {};
        for (const f of c.factories) {
          if (f.level <= 0) continue;
          const t = this.colonyFactoryTypes[f.id] || this.colonyFactoryTypes[0];
          if (!rates[t.res]) rates[t.res] = 0;
          rates[t.res] += t.baseOutput * f.level * (1 + 0.15 * (f.level - 1)) * (c.prodSpeed || 1);
        }
        return rates;
      },
      planetImageForColony(pid) {
        const p = this.planets.find(x => x.id === pid);
        return p ? p.img : null;
      },
      colonyTotalFactoryLevel(c) {
        return c.factories.reduce((s, f) => s + f.level, 0);
      },
      colonyAwarenessRate(c) {
        return parseFloat((this.colonyTotalFactoryLevel(c) * 0.01).toFixed(2));
      },
      colonyFactoryRate(c, f) {
        if (f.level <= 0) return 0;
        const t = this.colonyFactoryTypes[f.id];
        return parseFloat((t.baseOutput * f.level * (1 + 0.15 * (f.level - 1)) * (c.prodSpeed || 1)).toFixed(2));
      },
      bonusDescForPlanet(p) {
        if (!p || p.explorationLevel <= 0) return '';
        const bonus = Math.round((p.bonusPerLevel || 0) * p.explorationLevel * 100);
        return `${p.bonusDesc.replace(/\(.*?\)/, `(+${bonus}%)`)}`;
      },
      fmt(n) {
        try { const d = new Decimal(n); if (!d.isFinite()) return '0'; const abs = d.abs();
          if (abs.gte('1e30')) return d.toExponential(2).replace('e+', 'e');
          const suf = [{ v: 1e27, s: 'Oc' }, { v: 1e24, s: 'Sp' }, { v: 1e21, s: 'Sx' }, { v: 1e18, s: 'Qi' }, { v: 1e15, s: 'Qa' }, { v: 1e12, s: 'T' }, { v: 1e9, s: 'B' }, { v: 1e6, s: 'M' }, { v: 1e3, s: 'k' }];
          for (const p of suf) { if (abs.gte(p.v)) { const v2 = d.div(p.v); let s = v2.lt(10) ? v2.toFixed(2) : v2.lt(100) ? v2.toFixed(1) : v2.toFixed(0); return s.replace(/\.0+$|(?<=\.[0-9]*?)0+$/, '') + p.s; } }
          if (d.gte(100)) return d.toFixed(0); if (d.gte(10)) return d.toFixed(1); if (d.gte(1)) return d.toFixed(2).replace(/\.0+$|(?<=\.[0-9]*?)0+$/, '');
          return d.toFixed(3).replace(/\.0+$|(?<=\.[0-9]*?)0+$/, '');
        } catch (e) { return String(n); }
      },
      fmtTime(s) {
        s = Math.max(0, Math.ceil(Number(s) || 0));
        const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
        return h > 0 ? h + ':' + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0') : String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
      },

      getPriceTier(tier) { return [0.5, 0.75, 1.0, 1.4, 2.0][tier] || 1.0; },
      tierLabel(tier) { return ['⬇️⬇️ 초급매', '⬇️ 할인', '― 보통', '⬆️ 프리미엄', '⬆️⬆️ 초고가'][tier] || '보통'; },

      canBuyBuilding(b) { return b.cooldown <= 0 && b.level === 0 && this.money.gte(b.currentPrice); },
      buyBuilding(b, e) {
        if (!this.canBuyBuilding(b)) return;
        this.money = this.money.sub(b.currentPrice);
        b.owned = 1; b.level = 1; b.cooldown = 10;
        this.totalBuys++; this.totalTrades++;
          this.awareness += b.awarenessGiven * this.effectiveAwarenessMult;
        this.stats.totalBuildingsBuilt++;
        this.checkAchievements(); this.recalcMaxes(); this.checkMissions(); this.checkFameMilestones();
        this.toast(`✅ ${b.name} 건설`);
        if (e) this.spawnFloatText('✅ ' + b.icon, '#34d399', e.clientX, e.clientY - 8);
        this.boostResourceBump(b.res);
      },

      upgradeCost(b) { return Math.floor(b.basePrice * Math.pow((b.level || 0) + 1, 1.3)); },
      upgradePreview(b) {
        const nextLv = (b.level || 0) + 1;
        const inc = this.effectiveIncomeMult;
        const incomeNow = b.income * (b.level || 0) * inc * (1 + 0.12 * Math.max(0, (b.level || 0) - 1));
        const incomeNext = b.income * nextLv * inc * (1 + 0.25 * (nextLv - 1));
        return { cost: this.upgradeCost(b), dIncome: incomeNext - incomeNow };
      },
      canUpgradeBuilding(b) { return b.level > 0 && (b.level || 0) < (b.maxLevel || 20) && this.money.gte(this.upgradeCost(b)); },
      upgradeBuilding(b, e) {
        if (!this.canUpgradeBuilding(b)) return;
        const cost = this.upgradeCost(b);
        this.money = this.money.sub(cost);
        b.level++;
        this.awareness += b.awarenessGiven * b.level * this.effectiveAwarenessMult;
        this.toast(`⬆️ ${b.name} LV ${b.level}`);
        if (e) this.spawnFloatText('⬆️ LV' + b.level, '#a78bfa', e.clientX, e.clientY - 8);
        this.boostResourceBump(b.res);
      },

      canAwakenBuilding(b) {
        if (b.level < b.maxLevel) return false;
        if (this.buildingAwakened[b.id]) return false;
        const needTranscend = Math.max(0, (b.tier || 1) - 1);
        if (this.transcendLevel < needTranscend) return false;
        return true;
      },
      awakenBuilding(b) {
        if (!this.canAwakenBuilding(b)) return;
        this.$set(this.buildingAwakened, b.id, true);
        const eff = this.buildingAwakeningEffects[b.id];
        this.toast(`✨ ${b.name} 각성! ${eff.desc}`);
        if (b.res) this.boostResourceBump(b.res);
      },

      canTranscend() {
        const allAwakened = this.buildings.every(b => this.buildingAwakened[b.id]);
        return allAwakened && this.awakeningStones >= 5 + this.transcendLevel * 5;
      },
      transcend() {
        if (!this.canTranscend()) return;
        if (!confirm(`초월하시겠습니까?\n• 모든 건물 각성이 초기화됩니다\n• 각성석 ${5 + this.transcendLevel * 5}개 소모\n• 영구 수입 +200%\n• 함선 건조 시간 ×0.9\n• 함대 전투력 +15%\n• 연구 속도 +15%\n• 인지도 +20%\n계속하시겠습니까?`)) return;
        this.awakeningStones -= 5 + this.transcendLevel * 5;
        this.transcendLevel++;
        this.transcendBonus += 2.0;
        this.transcendBuildSpeed *= 0.9;
        this.transcendFleetBonus += 0.15;
        this.transcendResearchSpeed *= 1.15;
        this.transcendAwareness *= 1.2;
        this.buildingAwakened = {};
        for (const r of this.research) {
          r.completed = false;
          r.inProgress = false;
          r.remaining = 0;
        }
        this.toast(`🌌 초월 LV ${this.transcendLevel}! 수입 +${Math.round(this.transcendBonus * 100)}%`);
        this.spawnFloatText('🌌 초월!', '#fbbf24', window.innerWidth / 2, window.innerHeight / 3);
      },

      tickPrices(dt) {
        for (const b of this.buildings) {
          if (!b.unlocked && b.awarenessNeeded <= this.awareness) b.unlocked = true;
          b.priceTimer -= dt;
          if (b.priceTimer <= 0) { b.priceTimer = 60 + Math.random() * 120; this.fluctuatePrice(b); }
          b.cooldown = Math.max(0, b.cooldown - dt);
        }
      },
      fluctuatePrice(b) {
        const delta = Math.random() < 0.3 ? 2 : 1;
        const dir = Math.random() < 0.5 ? 1 : -1;
        let newTier = Math.max(0, Math.min(4, b.priceTier + dir * delta));
        if (Math.random() < 0.05) newTier = dir > 0 ? 4 : 0;
        b.priceTier = newTier;
        b.currentPrice = Math.floor(b.basePrice * this.getPriceTier(newTier));
      },

      triggerAuction() {
        const avail = this.buildings.filter(b => b.level === 0 && b.awarenessNeeded <= this.awareness);
        if (!avail.length) return;
        const b = avail[Math.floor(Math.random() * avail.length)];
        const disc = [0.9, 0.7, 0.5][Math.floor(Math.random() * 3)];
        this.auctionActive = true; this.auctionBuilding = b; this.auctionDiscount = disc;
        this.auctionPrice = Math.floor(b.currentPrice * disc);
        this.auctionChance = disc;
        this.auctionTimer = 15;
        this.toast(`🔔 경매 ${b.name} ${Math.round((1-disc)*100)}% (${Math.round(this.auctionChance*100)}%)`);
      },
      tryAuction() {
        if (!this.auctionActive) return;
        const b = this.auctionBuilding;
        if (Math.random() < this.auctionChance && this.money.gte(this.auctionPrice) && b.level === 0) {
          this.money = this.money.sub(this.auctionPrice); b.owned = 1; b.level = 1; this.totalBuys++;
        this.awareness += b.awarenessGiven * this.effectiveAwarenessMult;
          this.toast(`🎉 낙찰! ${b.name}`);
        } else { this.toast('😔 실패...'); }
        this.auctionActive = false; this.auctionBuilding = null;
      },

      canResearch(r) {
        if (r.completed || r.inProgress) return false;
        if (r.requires) { const pre = this.research.find(x => x.id === r.requires); if (!pre || !pre.completed) return false; }
        for (const k in r.cost) { if (!this.resources[k] || this.resources[k].lt(r.cost[k])) return false; }
        return true;
      },
      researchStatus(r) {
        if (r.completed) return '완료';
        if (r.inProgress) return '진행중';
        if (r.requires) { const pre = this.research.find(x => x.id === r.requires); if (!pre || !pre.completed) return `🔒 ${pre.name} 필요`; }
        for (const k in r.cost) { if (!this.resources[k] || this.resources[k].lt(r.cost[k])) return '💰 자원 부족'; }
        return '연구 가능';
      },
      startResearch(r) {
        if (!this.canResearch(r)) return;
        for (const k in r.cost) this.resources[k] = this.resources[k].sub(r.cost[k]);
        r.inProgress = true; r.remaining = r.time;
      },
      tickResearch(dt) {
        let rdt = dt / (this.challengeModifiers.researchTime || 1);
        if (this.alienTier.architech >= 1) rdt /= 0.6;
        rdt *= (this.transcendResearchSpeed || 1);
        for (const r of this.research) {
          if (r.inProgress) {
            r.remaining = Math.max(0, r.remaining - rdt);
            if (r.remaining <= 0) { r.inProgress = false; r.completed = true; this.stats.totalResearchDone++; r.effect(this); this.toast(`🔬 ${r.name}`); this.checkAchievements(); this.recalcMaxes(); }
          }
        }
      },

      maxAffordable(st) {
        let max = 999;
        if (st.cost.metal) max = Math.min(max, Math.floor((this.resources.metal || new Decimal(0)).toNumber() / st.cost.metal));
        if (st.cost.crystal) max = Math.min(max, Math.floor((this.resources.crystal || new Decimal(0)).toNumber() / st.cost.crystal));
        if (st.cost.hydrogen) max = Math.min(max, Math.floor((this.resources.hydrogen || new Decimal(0)).toNumber() / st.cost.hydrogen));
        if (st.cost.plasma) max = Math.min(max, Math.floor((this.resources.plasma || new Decimal(0)).toNumber() / st.cost.plasma));
        return Math.max(0, max);
      },
      getShipQty(type) { return this.shipBuildQty[type] || 1; },
      setShipQty(type, val) { this.$set(this.shipBuildQty, type, Math.max(1, parseInt(val) || 1)); },
      canBuildShips(st) {
        const count = Math.max(1, parseInt(this.shipBuildQty[st.type]) || 1);
        if ((this.resources.metal || new Decimal(0)).lt((st.cost.metal || 0) * count)) return false;
        if ((this.resources.crystal || new Decimal(0)).lt((st.cost.crystal || 0) * count)) return false;
        if (st.cost.hydrogen && (this.resources.hydrogen || new Decimal(0)).lt((st.cost.hydrogen || 0) * count)) return false;
        if (st.cost.plasma && (this.resources.plasma || new Decimal(0)).lt((st.cost.plasma || 0) * count)) return false;
        return !this.ships[st.type].building;
      },
      buildShips(st) {
        if (!this.canBuildShips(st)) return;
        const count = Math.max(1, parseInt(this.shipBuildQty[st.type]) || 1);
        this.resources.metal = this.resources.metal.sub((st.cost.metal || 0) * count);
        this.resources.crystal = this.resources.crystal.sub((st.cost.crystal || 0) * count);
        if (st.cost.hydrogen) this.resources.hydrogen = this.resources.hydrogen.sub((st.cost.hydrogen || 0) * count);
        if (st.cost.plasma) this.resources.plasma = this.resources.plasma.sub((st.cost.plasma || 0) * count);
        const s = this.ships[st.type];
        s.building = true; s.buildCount = count; s.totalTime = st.time * count * this.shipBuildSpeedMult * (this.transcendBuildSpeed || 1); s.elapsed = 0;
        s.buildCost = { metal: (st.cost.metal || 0) * count, crystal: (st.cost.crystal || 0) * count, hydrogen: (st.cost.hydrogen || 0) * count, plasma: (st.cost.plasma || 0) * count };
        this.awareness += Math.max(1, Math.floor(st.power / 10)) * this.effectiveAwarenessMult;
        this.toast(`🚀 ${st.name} ${count}척 건조 시작 (${this.fmtTime(s.totalTime)})`);
      },
      cancelBuild(type) {
        const s = this.ships[type];
        if (!s || !s.building) return;
        const st = this.shipTypes.find(x => x.type === type);
        if (!st) return;
        const cost = s.buildCost || {};
        if (cost.metal) this.resources.metal = this.resources.metal.add(cost.metal);
        if (cost.crystal) this.resources.crystal = this.resources.crystal.add(cost.crystal);
        if (cost.hydrogen) this.resources.hydrogen = this.resources.hydrogen.add(cost.hydrogen);
        if (cost.plasma) this.resources.plasma = this.resources.plasma.add(cost.plasma);
        s.building = false; s.buildCount = 0; s.totalTime = 0; s.elapsed = 0; s.buildCost = null;
        this.toast(`↩️ ${st.name} 건조 취소 (자원 반환)`);
      },
      tickShips(dt) {
        const sdt = dt / (this.challengeModifiers.shipTime || 1);
        for (const t in this.ships) {
          const s = this.ships[t];
          if (s.building) {
            s.elapsed += sdt;
            if (s.elapsed >= s.totalTime) {
              s.building = false; s.count += s.buildCount; this.stats.totalShipsBuilt += s.buildCount; s.buildCount = 0; s.totalTime = 0; s.elapsed = 0;
            }
          }
          if (s.upgrading) {
            s.upgradeElapsed += sdt;
            if (s.upgradeElapsed >= s.upgradeTotalTime) {
              s.upgrading = false; s.level++; s.upgradeElapsed = 0; s.upgradeTotalTime = 0;
              const st = this.shipTypes.find(x => x.type === t);
              if (st) this.toast(`⬆️ ${st.name} 업그레이드 완료! LV ${s.level}`);
            }
          }
        }
        if (this.colonizer.building) {
          this.colonizer.elapsed += sdt;
          if (this.colonizer.elapsed >= this.colonizer.totalTime) {
            this.colonizer.building = false; this.colonizer.count += this.colonizer.buildCount;
            this.colonizer.buildCount = 0; this.colonizer.totalTime = 0; this.colonizer.elapsed = 0;
          }
        }
      },

      shipPower(st) {
        const lv = (this.ships[st.type]?.level || 1);
        let p = st.power * (1 + (lv - 1) * 0.3);
        if (this.shipAwakened && this.shipAwakened[st.type]) p *= 1.3;
        return p;
      },

      getShipTier(type) {
        const map = { scout: 1, corvette: 1, frigate: 2, torpedo: 2, destroyer: 2, cruiser: 3, repair: 3, battleship: 3, carrier: 4, mothership: 4, dreadnought: 4 };
        return map[type] || 1;
      },
      shipAwakenCost(st) {
        return { 1: 1, 2: 2, 3: 3, 4: 5 }[this.getShipTier(st.type)] || 1;
      },
      canAwakenShip(st) {
        const lv = this.ships[st.type]?.level || 0;
        if (lv < st.maxLevel) return false;
        if (this.shipAwakened && this.shipAwakened[st.type]) return false;
        const needTranscend = Math.max(0, this.getShipTier(st.type) - 1);
        if (this.transcendLevel < needTranscend) return false;
        if ((this.awakeningStones || 0) < this.shipAwakenCost(st)) return false;
        return true;
      },
      awakenShip(st) {
        if (!this.canAwakenShip(st)) return;
        this.awakeningStones -= this.shipAwakenCost(st);
        this.$set(this.shipAwakened, st.type, true);
        this.toast(`✨ ${st.name} 각성! 전투력 +30%, 건조 시간 ×0.9`);
      },

      shipUpgradeCostText(st) {
        const costs = this.shipUpgradeCost(st);
        const parts = [];
        for (const k in costs) parts.push((window.RES_ICO && window.RES_ICO[k] || '') + this.fmt(costs[k]));
        const s = this.ships[st.type];
        if (s && s.upgrading) return '업그레이드중 ' + this.fmtTime(s.upgradeTotalTime - s.upgradeElapsed);
        return parts.join(' ') + ' · ' + this.fmtTime(st.upgradeTime || 60);
      },
      shipUpgradeCost(st) {
        const lv = this.ships[st.type]?.level || 1;
        const scale = Math.pow(lv + 1, 2.2) * 0.35;
        const costs = {};
        for (const k in st.cost) costs[k] = Math.floor((st.cost[k] || 100) * scale);
        return costs;
      },
      canUpgradeShip(st) {
        const lv = this.ships[st.type]?.level || 1;
        const s = this.ships[st.type];
        if (s.upgrading || lv >= (st.maxLevel || 10)) return false;
        const costs = this.shipUpgradeCost(st);
        for (const k in costs) {
          if (!this.resources[k] || this.resources[k].lt(costs[k])) return false;
        }
        return true;
      },
      upgradeShip(st) {
        if (!this.canUpgradeShip(st)) return;
        const costs = this.shipUpgradeCost(st);
        for (const k in costs) this.resources[k] = this.resources[k].sub(costs[k]);
        const s = this.ships[st.type];
        s.upgrading = true;
        s.upgradeElapsed = 0;
        s.upgradeTotalTime = (st.upgradeTime || 60) * this.shipBuildSpeedMult;
        this.toast(`⬆️ ${st.name} LV${s.level} → LV${s.level+1} 업그레이드 시작 (${this.fmtTime(s.upgradeTotalTime)})`);
      },

      buildColonizer() {
        if (this.colonizer.building) return;
        const costMetal = 5000;
        const costCrystal = 2500;
        if (this.resources.metal.lt(costMetal) || this.resources.crystal.lt(costCrystal)) return;
        this.resources.metal = this.resources.metal.sub(costMetal);
        this.resources.crystal = this.resources.crystal.sub(costCrystal);
        this.colonizer.building = true; this.colonizer.buildCount = 1;
        this.colonizer.totalTime = 30 * this.shipBuildSpeedMult; this.colonizer.elapsed = 0;
        this.toast('🚀 식민 함선 건조 시작');
      },
      colonizerUpgradeCost() {
        const lv = this.colonizer.level || 1;
        return { metal: Math.floor(4000 * Math.pow(lv + 1, 1.5)), crystal: Math.floor(2000 * Math.pow(lv + 1, 1.5)) };
      },
      canUpgradeColonizer() {
        const lv = this.colonizer.level || 1;
        if (lv >= 15) return false;
        const costs = this.colonizerUpgradeCost();
        for (const k in costs) {
          if (!this.resources[k] || this.resources[k].lt(costs[k])) return false;
        }
        return true;
      },
      upgradeColonizer() {
        if (!this.canUpgradeColonizer()) return;
        const costs = this.colonizerUpgradeCost();
        for (const k in costs) this.resources[k] = this.resources[k].sub(costs[k]);
        this.colonizer.level++;
        this.toast(`⬆️ 식민 함선 LV ${this.colonizer.level}`);
      },

      canExplore(p) {
        if (this.challengeModifiers.noColony) return false;
        if (p.explorationLevel >= p.maxLevel || this.exploring) return false;
        return this.colonizer.count > 0;
      },
      exploreChanceFor(p) {
        if (p.explorationLevel >= p.maxLevel) return 0;
        const colonizerPower = this.colonizer.count * (this.colonizer.level || 1);
        const fleetBonus = Math.min(2, 1 + this.totalShips * 0.005);
        const power = colonizerPower * fleetBonus;
        const diffMod = p.difficulty * (1 + 0.15 * p.explorationLevel);
        return Math.min(0.70, power / (power + diffMod * 0.8));
      },
      startExplore(p) {
        if (!this.canExplore(p)) return;
        this.exploreTravelOverlay = true;
        this.exploreTravelTimer = 2;
        this.exploreFlavor = '🚀 항성계로 워프 중...';
        this.toast(`🚀 ${p.name} 탐험 시작 (${Math.round(this.exploreChanceFor(p)*100)}%, ${this.fmtTime(Math.max(5, 30 - (this.colonizer.level || 1) * 2))})`);
        setTimeout(() => {
          this.exploreTravelOverlay = false;
          this.exploring = true; this.explorePlanet = p;
          this.exploreChance = this.exploreChanceFor(p);
          this.exploreTimer = Math.max(5, 30 - (this.colonizer.level || 1) * 2);
          this.exploreFlavor = '🚀 항성계로 진입 중...';
          this.exploreFlavorTimer = 3;
        }, 2000);
      },
      completeExplore() {
        const p = this.explorePlanet;
        if (!p) return;
        const roll = Math.random();
        if (roll < this.exploreChance) {
          p.explorationLevel = Math.min(p.maxLevel, p.explorationLevel + 1);
          const bonus = Math.round((p.bonusPerLevel || 0) * 100);
          if (p.explorationLevel === 1) this.initColony(p.id);
          this.toast(`🎉 ${p.name} 개척 성공! LV ${p.explorationLevel}/${p.maxLevel} (+${bonus}%)`);
          this.spawnFloatText('🎉 +Lv!', '#fbbf24', window.innerWidth/2, window.innerHeight/2);
          this.checkAchievements();
          if (!this.challengeModifiers.noColony && Math.random() < 0.25) this.alienEncounter();
        } else {
          const loss = Math.max(1, Math.floor(this.colonizer.count * 0.2));
          this.colonizer.count = Math.max(0, this.colonizer.count - loss);
          this.toast(`💥 ${p.name} 탐험 실패! 식민함선 ${loss}척 손실`);
        }
        this.exploring = false; this.explorePlanet = null;
      },
      tickExploration(dt) {
        if (this.exploring) {
          this.exploreTimer -= dt;
          this.exploreFlavorTimer -= dt;
          if (this.exploreFlavorTimer <= 0) {
            this.exploreFlavorTimer = 2 + Math.random() * 3;
            const FLAVORS = [
              '🌌 미지의 항성계를 통과 중...',
              '📡 이상한 중력장을 탐지했습니다.',
              '💫 우주 잔해 사이를 항해 중...',
              '🔭 미약한 외계 신호를 수신 중...',
              '🌠 항성풍을 뚫고 전진 중입니다.',
              '🪐 미개척 행성계에 진입합니다.',
              '⚡ 이상한 에너지 파동이 감지됩니다.',
              '☄️ 소행성대를 조심스럽게 통과 중...',
              '🗺️ 은하계 지도를 업데이트 중...',
              '📻 고대 문명의 흔적을 찾고 있습니다.',
              '🌀 시공간 왜곡 현상이 관측됩니다.',
              '✨ 항성 플레어를 우회 중...'
            ];
            this.exploreFlavor = FLAVORS[Math.floor(Math.random() * FLAVORS.length)];
          }
          if (this.exploreTimer <= 0) this.completeExplore();
        }
      },

      initColony(planetId) {
        if (this.colonies.some(c => c.planetId === planetId)) return;
        const tmpl = COLONY_TEMPLATES.find(t => t.planetId === planetId);
        if (!tmpl) return;
        const factories = COLONY_FACTORY_TYPES.map((ft, i) => ({ id: i, level: 0 }));
        this.colonies.push({
          planetId, name: tmpl.name, prodSpeed: tmpl.prodSpeed,
          resources: { metal: 0, crystal: 0, hydrogen: 0, plasma: 0, solar: 0, fission: 0, fusion: 0 },
          factories,
          transporting: false, transportProgress: 0, transportTime: 0,
          transportAmounts: {}
        });
        this.toast(`🏙️ ${tmpl.name} 설립!`);
      },
      colonyUpgradeCost(factoryLevel) {
        return Math.floor(2000 * Math.pow(factoryLevel + 1, 1.4));
      },
      canUpgradeColonyFactory(colony, fi) {
        const f = colony.factories[fi];
        if (!f || f.level >= 20) return false;
        const cost = this.colonyUpgradeCost(f.level);
        const t = this.colonyFactoryTypes[fi];
        return colony.resources[t.res] >= cost;
      },
      upgradeColonyFactory(colony, fi) {
        if (!this.canUpgradeColonyFactory(colony, fi)) return;
        const f = colony.factories[fi];
        const cost = this.colonyUpgradeCost(f.level);
        const t = this.colonyFactoryTypes[fi];
        colony.resources[t.res] -= cost;
        f.level++;
        this.toast(`⬆️ ${colony.name} ${t.name} LV ${f.level}`);
      },
      tickColonies(dt) {
        for (const c of this.colonies) {
          for (const f of c.factories) {
            if (f.level <= 0) continue;
            const t = this.colonyFactoryTypes[f.id];
            const rate = t.baseOutput * f.level * (1 + 0.15 * (f.level - 1)) * (c.prodSpeed || 1) * dt;
            const cap = 1000 + f.level * 500;
            c.resources[t.res] = Math.min(cap, (c.resources[t.res] || 0) + rate);
          }
          const totalLv = c.factories.reduce((s, f) => s + f.level, 0);
          if (totalLv > 0) {
            this.awareness += totalLv * 0.01 * dt;
            this.money = this.money.add(totalLv * 1.5 * dt);
          }
          if (c.transporting) {
            c.transportProgress += dt;
            if (c.transportProgress >= c.transportTime) {
              for (const k in c.transportAmounts) {
                if (this.resources[k]) this.resources[k] = Decimal.min(this.resources[k + 'Max'] || new Decimal(999999), this.resources[k].add(c.transportAmounts[k]));
              }
              const totalVal = Object.values(c.transportAmounts).reduce((s, v) => s + v, 0);
              c.transporting = false; c.transportProgress = 0; c.transportTime = 0; c.transportAmounts = {};
            }
          } else if (this.colonyAutoTransport && this.colonizer.count > 0) {
            const totalRes = Object.values(c.resources).reduce((s, v) => (s || 0) + (v || 0), 0);
            const totalCap = c.factories.reduce((s, f) => s + (1000 + f.level * 500), 0);
            if (totalRes > totalCap * 0.7 && this.resources.hydrogen.gte(Math.ceil(totalRes * 0.001))) {
              this.startTransport(c);
            }
          }
          if (this.colonyAutoUpgrade) {
            for (let i = 0; i < c.factories.length; i++) {
              const f = c.factories[i];
              if (f.level >= 20) continue;
              const cost = this.colonyUpgradeCost(f.level);
              const t = this.colonyFactoryTypes[i];
              if (c.resources[t.res] >= cost && Math.random() < 0.02) {
                c.resources[t.res] -= cost;
                f.level++;
              }
            }
          }
        }
      },
      startTransport(colony) {
        if (colony.transporting || this.colonizer.count <= 0) return;
        const amounts = {};
        let total = 0;
        const maxCapacity = this.colonizer.count * this.colonizer.level * 50;
        const allRes = ['metal','crystal','hydrogen','plasma','solar','fission','fusion'];
        for (const k of allRes) {
          const avail = Math.floor(colony.resources[k] || 0);
          if (avail > 0) {
            const take = Math.min(avail, Math.max(0, Math.floor(maxCapacity / allRes.length)));
            if (take > 0) {
              amounts[k] = take;
              colony.resources[k] -= take;
              total += take;
            }
          }
        }
        if (total <= 0) { this.toast('🚫 운송할 자원이 없습니다'); return; }
        const hydroCost = Math.ceil(total * 0.001);
        if (this.resources.hydrogen.lt(hydroCost)) { this.toast(`🚫 수소 부족 (필요: ${hydroCost})`); return; }
        this.resources.hydrogen = this.resources.hydrogen.sub(hydroCost);
        colony.transporting = true;
        colony.transportProgress = 0;
        colony.transportTime = 30 + total * 0.01;
        colony.transportAmounts = amounts;
        this.toast(`📦 자원 ${this.fmt(total)} 운송 시작 (수소 -${hydroCost}, ${this.fmtTime(colony.transportTime)})`);
      },

      effectiveFleetPower(pirateType) {
        let p = 0;
        for (const s of this.shipTypes) {
          const cnt = this.ships[s.type]?.count || 0;
          let mult = 1;
          if (s.strongAgainst === pirateType) mult = 1.6;
          p += cnt * this.shipPower(s) * mult;
        }
        let m = this.fleetPowerMult;
        if (this.buildingAwakened.outpost) m *= 1.3;
        if (this.alienTier.warlord >= 1) m *= 1.25;
        if (this.transcendFleetBonus) m *= 1 + this.transcendFleetBonus;
        return p * m;
      },
      shipTypeName(type) { const s = this.shipTypes.find(x => x.type === type); return s ? s.name : type; },
      pirateTypeName(type) { const p = this.pirateTypes.find(x => x.type === type); return p ? p.name : type; },

      huntPirates(e) {
        if (this.fleetPower <= 0 || this.combatCooldown > 0) return;
        const enemy = this.currentPirate;
        const eff = this.effectiveFleetPower(enemy.type);
        const roll = eff * (0.85 + Math.random() * 0.3);
        this.pushLog(`${enemy.icon} ${enemy.name} (전투력 ${enemy.power}) vs 함대 ${eff} (약점→${this.shipTypeName(enemy.weakTo)} ${this.weakShipCount}척)`, 'log-info');
        if (roll >= enemy.power) {
          const loot = new Decimal(800 * this.pirateWave * (eff >= enemy.power * 1.5 ? 2 : 1));
          this.money = this.money.add(loot);
          const lost = this.applyLosses(0.05);
          const fameGain = Math.max(1, Math.floor(this.pirateWave * 3));
          this.awareness += fameGain;
          this.pushLog(`✅ 승리 +${this.fmt(loot)}${lost ? ` (손실 ${lost}척)` : ''} 📡명성 +${fameGain}`, 'log-win');
          if (e) this.spawnFloatText('+' + this.fmt(loot), '#34d399', e.clientX, e.clientY - 8);
          this.pirateWave++; this.combatCooldown = 10; this.pirateAttackTimer = 300;
          this.stats.totalBattlesWon++;
          this.stats.totalBattleLoot += loot.toNumber();
          this.stats.maxWave = Math.max(this.stats.maxWave, this.pirateWave);
          if (this.alienTier.warlord >= 3 && Math.random() < 0.05) {
            this.awakeningStones++;
            this.toast('💎 전리품: 각성석 +1!');
          }
          this.checkAchievements(); this.checkFameMilestones();
        } else {
          const lost = this.applyLosses(0.25);
          const penalty = new Decimal(200 * this.pirateWave);
          this.money = this.money.sub(penalty);
          this.pushLog(`❌ 패배 ${lost}척 손실 · ${this.fmt(penalty)} 약탈`, 'log-lose');
          if (e) this.spawnFloatText('-' + this.fmt(penalty), '#fb7185', e.clientX, e.clientY - 8);
          this.combatCooldown = 15;
        }
      },

      applyLosses(ratio) {
        let total = 0;
        const effectiveRatio = (this.ships.repair?.count || 0) > 0 ? ratio * 0.5 : ratio;
        for (const s of this.shipTypes) { const cnt = this.ships[s.type]?.count || 0; if (cnt <= 0) continue; const loss = Math.min(cnt, Math.max(1, Math.round(cnt * effectiveRatio))); this.ships[s.type].count -= loss; total += loss; }
        return total;
      },
      pushLog(text, cls) { this.pirateLog.unshift({ text, cls: cls || 'log-info' }); if (this.pirateLog.length > 30) this.pirateLog.pop(); },

      checkFameMilestones() {
        for (const m of this.fameMilestones) {
          if (m.reached) continue;
          if (this.awareness >= m.need) {
            m.reached = true;
            if (m.bonusIncome) this.fameIncomeBonus += m.bonusIncome;
            let msg = `🏆 명성: ${m.name} 달성! ${m.desc}`;
            if (m.bonusIncome) msg += ` (수입 +${Math.round(m.bonusIncome*100)}%)`;
            this.toast(msg);
            this.checkAchievements();
          }
        }
      },

      tickIncome(dt) {
        if (this.boostTimer > 0) this.boostTimer = Math.max(0, this.boostTimer - dt);
        const boost = this.boostTimer > 0 ? this.boostMultItem : 1;
        const inc = this.passiveIncome * dt * boost;
        if (inc > 0) this.money = this.money.add(inc);
        for (const k of RES) {
          const rate = (this.resourceIncome[k] || 0) * (this.resMultipliers[k] || 1) * boost;
          if (rate > 0) this.resources[k] = Decimal.min(this.resources[k + 'Max'] || new Decimal(999999), this.resources[k].add(rate * dt));
        }
        // Scout passive: 정찰기가 자동으로 인지도 획득
        if (this.ships.scout?.count > 0) {
          this.awareness += this.ships.scout.count * 0.3 * dt * this.speedMult;
        }
        this.totalWealth = this.totalWealthCalc;
      },

      tickEvents(dt) {
        this.eventTimer -= dt;
        if (this.eventTimer <= 0) { this.eventTimer = 90 + Math.random() * 180; this.triggerRandomEvent(); }
        if (this.auctionActive) { this.auctionTimer -= dt; if (this.auctionTimer <= 0) this.auctionActive = false; }
        if (this.freeDispenserCD > 0) this.freeDispenserCD = Math.max(0, this.freeDispenserCD - dt);
        if (this.pirateAttackTimer > 0) this.pirateAttackTimer = Math.max(0, this.pirateAttackTimer - dt);
        if (this.pirateAttackTimer <= 0) { this.triggerPirateRaid(); this.pirateAttackTimer = 300 + Math.random() * 100; }
        if (this.raidAlertTimer > 0) { this.raidAlertTimer = Math.max(0, this.raidAlertTimer - dt); if (this.raidAlertTimer <= 0) this.raidAlert = ''; }
      },
      triggerPirateRaid() {
        const enemy = this.currentPirate;
        const eff = this.effectiveFleetPower(enemy.type);
        const autoRoll = eff * 0.9;
        if (autoRoll >= enemy.power) {
          this.pushLog(`🛡️ 자동 방어 성공 (${enemy.icon} ${enemy.name})`, 'log-win');
        } else {
          const stolen = new Decimal(300 * this.pirateWave);
          this.money = this.money.sub(stolen);
          let resLoss = 0;
          for (const k of RES) { if (this.resources[k] && this.resources[k].gt(0)) { const loss = this.resources[k].mul(0.1); this.resources[k] = this.resources[k].sub(loss); resLoss += loss.toNumber(); } }
          this.pushLog(`⚠️ 해적 약탈! ${this.fmt(stolen)} + 자원 10% 손실 (${enemy.icon})`, 'log-lose');
          this.raidAlert = `🚨 ${enemy.icon} ${enemy.name} 침공!\n💰 -${this.fmt(stolen)} 📦 자원 -10%`;
          this.raidAlertTimer = 5;
          this.pirateWave++;
        }
      },
      triggerRandomEvent() {
        const e = ['auction', 'repair', 'windfall', 'crisis', 'asteroid', 'supply_drop'][Math.floor(Math.random() * 6)];
        if (e === 'auction') { this.triggerAuction(); }
        else if (e === 'repair') { const active = this.buildings.filter(b => b.level > 0); if (active.length) { const b = active[Math.floor(Math.random() * active.length)]; const cost = Math.floor(b.currentPrice * 0.1); if (this.money.gte(cost)) { this.money = this.money.sub(cost); this.toast(`🔧 ${b.name} ${this.fmt(cost)}`); } } }
        else if (e === 'windfall') { const bonus = Math.floor(5000 + Math.random() * 50000); this.money = this.money.add(bonus); this.toast(`🎁 +${this.fmt(bonus)}`); }
        else if (e === 'crisis') {
          const up = Math.random() < 0.5;
          for (const b of this.buildings) { if (b.awarenessNeeded <= this.awareness && b.level === 0) { b.priceTier = up ? 4 : 0; b.currentPrice = Math.floor(b.basePrice * this.getPriceTier(b.priceTier)); b.priceTimer = 90; } }
          this.toast(up ? '📈 시장 폭락! 건물 가격 급등' : '📉 시장 폭락! 건물 가격 급락 - 매입 기회');
        }
        else if (e === 'asteroid') {
          const active = this.buildings.filter(b => b.level > 0);
          if (active.length) { const b = active[Math.floor(Math.random() * active.length)]; b.cooldown = 60; this.eventMessage = `🪨 소행성 충돌! ${b.name} 60초 정지`; this.toast(`🪨 ${b.name} 피격`); }
        }
        else if (e === 'supply_drop') {
          let any = false;
          for (const k of RES) { if (this.resources[k] && this.resources[k].gt(0)) { const add = new Decimal(50 + 20 * this.pirateWave); this.resources[k] = Decimal.min(this.resources[k + 'Max'] || new Decimal(999999), this.resources[k].add(add)); any = true; this.boostResourceBump(k); } }
          if (any) this.toast('📦 자원 보급품 투하'); else this.toast('📦 보급품 도착');
        }
      },
      resolveEvent() {
        if (this.eventMessage) { const bonus = Math.floor(2000 + Math.random() * 10000); this.money = this.money.add(bonus); this.toast(`✅ +${this.fmt(bonus)}`); this.eventMessage = ''; }
      },

      doClick(e) {
        const gain = this.effectiveClickPower * (this.boostTimer > 0 ? this.boostMultItem : 1);
        this.money = this.money.add(gain);
        this.stats.totalClicks++;
        if (e) this.spawnFloatText('+' + this.fmt(gain), '#fde68a', e.clientX, e.clientY);
        const btn = this.$refs.clickBtn; if (btn) { btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop'); }
      },

      spawnFloatText(text, color, x, y) {
        const layer = document.getElementById('fxLayer'); if (!layer) return;
        const d = document.createElement('div'); d.className = 'float-text';
        d.style.left = (x || window.innerWidth / 2) + 'px';
        d.style.top = (y || window.innerHeight / 2) + 'px';
        d.style.color = color || '#fde68a';
        d.textContent = text;
        layer.appendChild(d); setTimeout(() => d.remove(), 1000);
      },

      showPreview(src) { this.previewImage = src; },
      closePreview() { this.previewImage = null; },

      triggerPlanetColonization() {
        if (this.challengeModifiers.noColony) { this.toast('🚫 도전: 고립 우주 - 식민지 불가'); return; }
        if (this.colonizer.count <= 0) {
          this.toast('🚫 식민 함선이 필요합니다. 함선 탭에서 건조하세요.');
          this.fleetActiveTab = 'fleet_build';
          return;
        }
        this.exploreTravelOverlay = true;
        this.exploreTravelTimer = 2;
        this.exploreFlavor = '🪐 행성 개척 임무를 시작합니다...';
        setTimeout(() => {
          this.exploreTravelOverlay = false;
          this.toast('🌍 탐험 가능한 행성을 확인하세요');
          this.$nextTick(() => {
            const el = document.querySelector('.planet-list-header');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }, 2000);
      },

      canExploreReason(p) {
        if (p.explorationLevel >= p.maxLevel) return '최대 개척 완료';
        if (this.exploring) return '이미 탐험 중';
        if (this.colonizer.count <= 0) return '식민함선 필요';
        return '';
      },

      alienEncounter() {
        const facs = this.alienFactions;
        const af = facs[Math.floor(Math.random() * facs.length)];
        const repGain = 1 + Math.floor(Math.random() * 4);
        const oldRep = this.alienRep[af.id] || 0;
        const oldTier = this.alienTier[af.id] || 0;
        this.$set(this.alienRep, af.id, oldRep + repGain);
        this.toast(`${af.icon} ${af.name} 조우! 평판 +${repGain} (총 ${oldRep + repGain})`);
        this.checkAlienTier(af.id);
      },
      checkAlienTier(factionId) {
        const af = this.alienFactions.find(f => f.id === factionId);
        if (!af) return;
        const rep = this.alienRep[factionId] || 0;
        let newTier = 0;
        for (let i = af.thresholds.length - 1; i >= 0; i--) {
          if (rep >= af.thresholds[i]) { newTier = i + 1; break; }
        }
        const oldTier = this.alienTier[factionId] || 0;
        if (newTier > oldTier) {
          this.$set(this.alienTier, factionId, newTier);
          this.toast(`🎖️ ${af.name} 티어 ${newTier} 달성! ${af.bonuses[newTier-1]}`);
          this.spawnFloatText('🎖️ 티어' + newTier, '#a78bfa', window.innerWidth/2, window.innerHeight/3);
        }
      },

      addOfflineIncome(seconds) {
        this.money = this.money.add(this.passiveIncome * seconds * this.effectiveIncomeMult);
        for (const k of RES) { const rate = (this.resourceIncome[k] || 0) * (this.resMultipliers[k] || 1); if (rate > 0) this.resources[k] = Decimal.min(this.resources[k + 'Max'] || new Decimal(999999), this.resources[k].add(rate * seconds)); }
      },

      sellResource(resKey, amount) {
        if (!this.resources[resKey] || this.resources[resKey].lt(amount) || amount <= 0) return;
        const rate = this.exchangeSellRate[resKey] || 10;
        this.resources[resKey] = this.resources[resKey].sub(amount);
        this.money = this.money.add(rate * amount);
        this.toast(`🔁 ${(window.RES_ICO&&window.RES_ICO[resKey])||''} ${this.fmt(amount)} → 💰 ${this.fmt(rate * amount)}`);
      },
      buyResource(resKey, amount) {
        if (amount <= 0) return;
        const rate = Math.floor((this.exchangeSellRate[resKey] || 10) * this.effectiveExchangeBuyRate);
        const cost = rate * amount;
        if (this.money.lt(cost)) return;
        const maxCap = this.resources[resKey + 'Max'] || new Decimal(999999);
        const current = this.resources[resKey] || new Decimal(0);
        const canBuy = maxCap.sub(current);
        if (canBuy.lte(0)) { this.toast('🚫 저장고 가득'); return; }
        const actualAmount = Math.min(amount, canBuy.toNumber());
        const actualCost = Math.floor(rate * actualAmount);
        if (this.money.lt(actualCost)) return;
        this.money = this.money.sub(actualCost);
        this.resources[resKey] = current.add(actualAmount);
        this.toast(`🔁 💰 ${this.fmt(actualCost)} → ${(window.RES_ICO&&window.RES_ICO[resKey])||''} ${this.fmt(actualAmount)}`);
      },
      applyOffline() {
        if (!this.lastSeen) return;
        const now = Date.now(); let elapsed = Math.floor((now - this.lastSeen) / 1000);
        if (elapsed < 30) return; elapsed = Math.min(elapsed, 28800);
        const mult = 0.5;
        const inc = this.passiveIncome * elapsed * mult;
        if (inc > 0) this.money = this.money.add(inc);
        for (const k of RES) {
          const rate = (this.resourceIncome[k] || 0) * (this.resMultipliers[k] || 1);
          if (rate > 0) this.resources[k] = Decimal.min(this.resources[k + 'Max'] || new Decimal(999999), this.resources[k].add(rate * elapsed * mult));
        }
        if (inc > 0) this.offlineReport = { seconds: elapsed, gained: inc };
      },
      dismissOffline() { this.offlineReport = null; },

      boostResourceBump(res) {
        if (!res) return;
        const card = document.querySelector(`.res-item[data-key="${res}"]`);
        if (!card) return;
        const val = card.querySelector('.res-val');
        if (val) { val.classList.remove('bump'); void val.offsetWidth; val.classList.add('bump'); setTimeout(() => val.classList.remove('bump'), 350); }
      },

      checkAchievements() {
        for (const a of this.achievements) {
          if (!this.achieved[a.id] && a.cond(this)) {
            this.$set(this.achieved, a.id, true);
            this.toast(`🏆 ${a.name} (+${Math.round(a.bonus * 100)}%)`);
          }
        }
      },

      checkMissions() {
        for (const m of this.missions) {
          if (m.completed) continue;
          let p = 0;
          if (m.type === 'buys') p = this.totalBuys;
          else if (m.type.indexOf('res_') === 0) { const k = m.type.slice(4); p = this.resources[k] ? this.resources[k].toNumber() : 0; }
          else if (m.type === 'pirate_wave') p = Math.max(0, this.pirateWave - 1);
          else if (m.type === 'owned_total') p = this.buildings.reduce((s, b) => s + (b.level > 0 ? 1 : 0), 0);
          else if (m.type === 'wealth') p = this.totalWealth.toNumber();
          m.progress = Math.min(p, m.goal);
          if (m.progress >= m.goal) {
            m.completed = true;
            const r = m.reward;
            if (r.money) this.money = this.money.add(r.money);
            if (r.crystal) this.resources.crystal = this.resources.crystal.add(r.crystal);
            if (r.item) this.$set(this.items, r.item, (this.items[r.item] || 0) + (r.count || 1));
            if (r.permMult) this.incomeMult += r.permMult;
            this.toast(`🎯 미션 클리어! ${m.name}`);
            this.spawnFloatText('🎯 ' + m.name, '#34d399', window.innerWidth / 2, window.innerHeight / 3);
            this.checkAchievements();
          }
        }
      },

      itemCount(id) { return this.items[id] || 0; },
      useItem(id) {
        if ((this.items[id] || 0) <= 0) return;
        const def = this.itemDefs.find(d => d.id === id); if (!def) return;
        this.$set(this.items, id, this.items[id] - 1); def.effect(this);
      },
      claimFree() {
        if (this.freeDispenserCD > 0) return;
        const pick = ['timewarp', 'surge'][Math.floor(Math.random() * 2)];
        this.$set(this.items, pick, (this.items[pick] || 0) + 1);
        const def = this.itemDefs.find(d => d.id === pick);
        this.toast(`🎁 ${def.icon} ${def.name}`); this.freeDispenserCD = 120;
      },

      recalcMaxes() {
        let buildingBonus = 0;
        for (const b of this.buildings) {
          if (b.level > 0) buildingBonus += b.level * 500;
        }
        let exploreBonus = 0;
        for (const p of this.planets) {
          if (p.explorationLevel > 0) exploreBonus += p.explorationLevel * 0.1;
        }
        let colonyBonus = 0;
        for (const c of this.colonies) {
          for (const f of c.factories) {
            if (f.level > 0) colonyBonus += f.level * 0.5;
          }
        }
        const sm = this.storageMult * (1 + buildingBonus / 1000) * (1 + exploreBonus) * (1 + colonyBonus / 100);
        if (this.alienTier.architech >= 2) sm *= 2;
        const bases = { metal: 50000, crystal: 30000, hydrogen: 15000, plasma: 10000, solar: 10000, fission: 8000, fusion: 8000 };
        for (const k of RES) this.resources[k + 'Max'] = new Decimal(Math.floor((bases[k] || 10000) * sm));
      },

      startChallenge(cd) {
        if (!this.canStartChallenge(cd)) return;
        if (!confirm(`도전 '${cd.name}'을(를) 시작합니다. 모든 것이 초기화됩니다.\n${cd.desc}\n보상: 각성석 ${cd.reward}개\n계속하시겠습니까?`)) return;
        this.$set(this.challengeModifiers, 'metalProd', cd.id === 'ch1' ? 0.2 : 1);
        this.$set(this.challengeModifiers, 'incomeMult', cd.id === 'ch2' ? 0.4 : 1);
        this.$set(this.challengeModifiers, 'piratePow', cd.id === 'ch3' ? 3 : 1);
        this.$set(this.challengeModifiers, 'researchTime', cd.id === 'ch4' ? 3 : 1);
        this.$set(this.challengeModifiers, 'shipTime', cd.id === 'ch4' ? 2 : 1);
        this.$set(this.challengeModifiers, 'noColony', cd.id === 'ch5');
        this.challengeActive = cd.id;
        this.cheatReset();
        this.toast(`🏆 도전: ${cd.name} 시작! (보상: 각성석 ${cd.reward}개)`);
      },
      canStartChallenge(cd) {
        if (this.challengeActive === cd.id) return false;
        return this.totalWealthCalc.gte(this.mainGoal) || this.challengesCompleted[cd.id] || Object.keys(this.challengesCompleted).length > 0;
      },
      completeChallenge(cd) {
        this.$set(this.challengesCompleted, cd.id, true);
        this.awakeningStones += cd.reward;
        this.challengeActive = null;
        this.challengeModifiers = {};
        this.toast(`🎉 도전 완료! ${cd.name} +${cd.reward} 각성석 (총 ${this.awakeningStones}개)`);
        this.spawnFloatText('🎉 완료!', '#fbbf24', window.innerWidth / 2, window.innerHeight / 2);
      },

      cheatMoney() { this.money = this.money.mul(100); this.toast('💰 ×100 돈!'); },
      cheatResources() {
        for (const k of RES) {
          if (this.resources[k]) this.resources[k] = this.resources[k].add(new Decimal(10000));
        }
        this.toast('📦 ×10000 자원!');
      },
      cheatSpeed() {
        this.speedMult = this.speedMult >= 100 ? 1 : this.speedMult * 10;
        this.toast(`⚡ 속도 ×${this.speedMult}`);
      },
      toggleCheat() { this.cheatOpen = !this.cheatOpen; },

      exportSave() {
        try {
          this.saveSystems();
          const raw = localStorage.getItem('systemsState');
          if (!raw) return this.toast('🚫 저장 실패');
          navigator.clipboard.writeText(raw).then(() => this.toast('📋 세이브 복사 완료!')).catch(() => this.toast('🚫 클립보드 실패'));
        } catch (e) { this.toast('🚫 오류'); }
      },
      importSave() {
        const text = prompt('불러올 세이브 코드를 붙여넣으세요:');
        if (!text) return;
        try {
          JSON.parse(text);
          localStorage.setItem('systemsState', text);
          this.toast('📋 세이브 불러오기 완료! 새로고침하세요.');
        } catch (e) { this.toast('🚫 잘못된 세이브 코드'); }
      },

      cheatReset() {
        if (!confirm('정말 초기화? (환생 포인트는 유지)')) return;
        const pp = this.prestigePoints;
        const pb = this.prestigeBonus;
        const ba = { ...this.buildingAwakened };
        const cat = this.colonyAutoTransport;
        const cau = this.colonyAutoUpgrade;
        const ac = this.autoClicker;
        const ab = this.autoBuilder;
        const cc = { ...this.challengesCompleted };
        const as = this.awakeningStones;
        const tl = this.transcendLevel;
        const tb = this.transcendBonus;
        const ar = { ...this.alienRep };
        const at = { ...this.alienTier };
        const defaults = {
          money: new Decimal(2000), clickPower: 200,
          resources: { metal: new Decimal(100), metalMax: new Decimal(500), crystal: new Decimal(10), crystalMax: new Decimal(300), hydrogen: new Decimal(0), hydrogenMax: new Decimal(200), plasma: new Decimal(0), plasmaMax: new Decimal(200), solar: new Decimal(0), solarMax: new Decimal(200), fission: new Decimal(0), fissionMax: new Decimal(200), fusion: new Decimal(0), fusionMax: new Decimal(200) },
          resUnlocked: { metal: true, crystal: false, hydrogen: false, plasma: false, solar: false, fission: false, fusion: false },
          resMultipliers: { metal: 1, crystal: 1, hydrogen: 1, plasma: 1, solar: 1, fission: 1, fusion: 1 },
          storageMult: 1, incomeMult: 1, fameIncomeBonus: 0, awarenessMult: 1, shipBuildSpeedMult: 1, fleetPowerMult: 1,
          buildings: BUILDING_TEMPLATES.map(b => ({ ...b, currentPrice: b.basePrice, priceTier: 2, cooldown: 0, priceTimer: Math.random() * 120, owned: 0, level: 0, maxLevel: 20 })),
          awareness: 0, fameMilestones: FAME_MILESTONES.map(m => ({ ...m, reached: false })),
          research: RESEARCH_LIST.map(r => ({ ...r, completed: false, inProgress: false, remaining: 0 })),
          ships: Object.fromEntries(SHIP_TEMPLATES.map(s => [s.type, { count: 0, building: false, buildCount: 0, totalTime: 0, elapsed: 0, level: 1, upgrading: false, upgradeElapsed: 0, upgradeTotalTime: 0 }])),
          colonizer: { count: 0, building: false, buildCount: 0, totalTime: 0, elapsed: 0, level: 1 },
          planets: PLANETS.map(p => ({ ...p, explorationLevel: 0 })),
          pirateWave: 1, pirateAttackTimer: 300, pirateLog: [], combatCooldown: 0,
          achievements: this.achievements.map(a => ({ ...a })), achieved: {}, achievementToast: '',
          missions: this.missions.map(m => ({ ...m, progress: 0, completed: false })),
          totalBuys: 0, totalTrades: 0, totalWealth: new Decimal(0), bestProfit: 0,
          items: { timewarp: 1, surge: 1 }, boostTimer: 0, boostMultItem: 1, freeDispenserCD: 0,
          colonies: [], colonyDetailPlanet: null, exploring: false, explorePlanet: null, exploreChance: 0, exploreTimer: 0, exploreFlavor: '', exploreFlavorTimer: 0,
          eventMessage: '', eventTimer: 0, auctionActive: false, auctionBuilding: null, auctionPrice: 0, auctionDiscount: 0, auctionTimer: 0, auctionChance: 0,
          raidAlert: '', raidAlertTimer: 0
        };
        for (const k in defaults) this[k] = defaults[k];
        this.prestigePoints = pp;
        this.prestigeBonus = pb;
        this.buildingAwakened = ba;
        this.colonyAutoTransport = cat;
        this.colonyAutoUpgrade = cau;
        this.autoClicker = ac;
        this.autoBuilder = ab;
        this.challengesCompleted = cc;
        this.awakeningStones = as;
        this.transcendLevel = tl;
        this.transcendBonus = tb;
        this.shipAwakened = {};
        this.transcendBuildSpeed = 1;
        this.transcendFleetBonus = 0;
        this.transcendResearchSpeed = 1;
        this.transcendAwareness = 1;
        this.alienRep = ar;
        this.alienTier = at;
        this.incomeMult = 1 + pb;
        this.recalcMaxes();
        this.toast('🔄 초기화 완료');
      },
      prestige() {
        const wealth = this.totalWealthCalc.toNumber();
        if (wealth < 100000) { this.toast('🚫 환생 조건: 총 자산 100k 이상'); return; }
        let resourceValue = 0;
        for (const k of RES) {
          if (this.resources[k]) resourceValue += this.resources[k].toNumber();
        }
        const totalValue = wealth + resourceValue;
        const gain = Math.max(2, Math.floor(Math.pow(totalValue / 50000, 0.55)));
        this.prestigePoints += gain;
        this.prestigeBonus = this.prestigePoints * 0.1;
        this.toast(`✨ 환생! +${gain} 포인트 (총 ${this.prestigePoints}P) 수입 +${Math.round(this.prestigeBonus*100)}% (자원가치 ${this.fmt(resourceValue)} 포함)`);
        this.cheatReset();
      },

      tickSystems(dt) {
        this.stats.timePlayed += dt;
        const sdt = dt * this.speedMult;
        this.tickPrices(sdt);
        this.tickIncome(sdt);
        this.tickResearch(sdt);
        this.tickShips(sdt);
        if (!this.challengeModifiers.noColony) {
          this.tickExploration(sdt);
          this.tickColonies(sdt);
        }
        this.tickEvents(sdt);
        if (this.combatCooldown > 0) this.combatCooldown = Math.max(0, this.combatCooldown - sdt);
        if (this.autoClicker) {
          this.autoClickerTimer -= sdt;
          if (this.autoClickerTimer <= 0) {
            this.autoClickerTimer = 5;
            this.money = this.money.add(this.effectiveClickPower * (this.boostTimer > 0 ? this.boostMultItem : 1));
          }
        }
        if (this.autoBuilder && (this._autoBuilderCD = (this._autoBuilderCD || 0) - sdt) <= 0) {
          this._autoBuilderCD = 10;
          const avail = this.visibleBuildings.filter(b => this.canBuyBuilding(b));
          if (avail.length) avail.sort((a, b) => a.currentPrice - b.currentPrice)[0] && this.buyBuilding(avail.sort((a, b) => a.currentPrice - b.currentPrice)[0], null);
        }
        if (this.challengeActive && this.totalWealth.gte(this.mainGoal)) {
          const cd = this.challengeDefs.find(c => c.id === this.challengeActive);
          if (cd) this.completeChallenge(cd);
        }
        this.checkAchievements();
        this.checkMissions();
        this.checkFameMilestones();
      },
      toast(text) {
        this.achievementToast = text;
        clearTimeout(this._toastT);
        this._toastT = setTimeout(() => { this.achievementToast = ''; }, 3000);
      },

      saveSystems() {
        try {
          const data = {
            money: this.money.toFixed(3), awareness: this.awareness, clickPower: this.clickPower,
            resources: {}, resUnlocked: this.resUnlocked, resMultipliers: this.resMultipliers,
            storageMult: this.storageMult, incomeMult: this.incomeMult, awarenessMult: this.awarenessMult,
            shipBuildSpeedMult: this.shipBuildSpeedMult, fleetPowerMult: this.fleetPowerMult,
            buildings: this.buildings.map(b => ({ id: b.id, owned: b.owned, priceTier: b.priceTier, currentPrice: b.currentPrice, priceTimer: b.priceTimer, level: b.level })),
            research: this.research.map(r => ({ id: r.id, completed: r.completed, inProgress: r.inProgress, remaining: r.remaining })),
            missions: this.missions.map(m => ({ id: m.id, progress: m.progress, completed: m.completed })),
            ships: Object.fromEntries(Object.entries(this.ships).map(([k, v]) => [k, { count: v.count, building: v.building, buildCount: v.buildCount, totalTime: v.totalTime, elapsed: v.elapsed, level: v.level, upgrading: v.upgrading || false, upgradeElapsed: v.upgradeElapsed || 0, upgradeTotalTime: v.upgradeTotalTime || 0 }])),
            colonizer: { count: this.colonizer.count, building: this.colonizer.building, buildCount: this.colonizer.buildCount, totalTime: this.colonizer.totalTime, elapsed: this.colonizer.elapsed, level: this.colonizer.level },
            planets: this.planets.map(p => ({ id: p.id, explorationLevel: p.explorationLevel })),
            pirateWave: this.pirateWave, pirateAttackTimer: this.pirateAttackTimer,
            achieved: this.achieved, totalBuys: this.totalBuys, totalTrades: this.totalTrades, bestProfit: this.bestProfit,
            items: this.items, boostTimer: this.boostTimer, boostMultItem: this.boostMultItem, lastSeen: Date.now(),
            fameIncomeBonus: this.fameIncomeBonus,
            fameMilestones: this.fameMilestones.map(m => ({ id: m.id, reached: m.reached })),
            prestigePoints: this.prestigePoints,
            prestigeBonus: this.prestigeBonus,
            buildingAwakened: this.buildingAwakened,
            colonyAutoTransport: this.colonyAutoTransport,
            colonyAutoUpgrade: this.colonyAutoUpgrade,
            autoClicker: this.autoClicker,
            autoBuilder: this.autoBuilder,
            autoClickerTimer: this.autoClickerTimer,
            challengeActive: this.challengeActive,
            challengesCompleted: this.challengesCompleted,
            awakeningStones: this.awakeningStones,
            transcendLevel: this.transcendLevel,
            transcendBonus: this.transcendBonus,
            shipAwakened: this.shipAwakened,
            transcendBuildSpeed: this.transcendBuildSpeed,
            transcendFleetBonus: this.transcendFleetBonus,
            transcendResearchSpeed: this.transcendResearchSpeed,
            transcendAwareness: this.transcendAwareness,
            stats: this.stats,
            alienRep: this.alienRep,
            alienTier: this.alienTier,
            exploreFlavor: '', exploreFlavorTimer: 0,
            colonies: this.colonies.map(c => ({
              planetId: c.planetId, name: c.name, prodSpeed: c.prodSpeed,
              resources: { ...c.resources },
              factories: c.factories.map(f => ({ id: f.id, level: f.level })),
              transporting: c.transporting || false,
              transportProgress: c.transportProgress || 0,
              transportTime: c.transportTime || 0,
              transportAmounts: { ...(c.transportAmounts || {}) }
            }))
          };
          for (const k of RES) data.resources[k] = this.resources[k].toFixed(3);
          localStorage.setItem('systemsState', JSON.stringify(data));
        } catch (e) {}
      },
      loadSystems() {
        try {
          const raw = localStorage.getItem('systemsState'); if (!raw) return;
          const o = JSON.parse(raw);
          if (o.money) this.money = new Decimal(o.money);
          if (o.awareness) this.awareness = o.awareness;
          if (o.clickPower) this.clickPower = o.clickPower;
          if (o.resources) for (const k of RES) { if (o.resources[k]) this.resources[k] = new Decimal(o.resources[k]); }
          if (o.resUnlocked) Object.assign(this.resUnlocked, o.resUnlocked);
          if (o.resMultipliers) Object.assign(this.resMultipliers, o.resMultipliers);
          if (o.storageMult) this.storageMult = o.storageMult;
          if (o.incomeMult) this.incomeMult = o.incomeMult;
          if (o.awarenessMult) this.awarenessMult = o.awarenessMult;
          if (o.shipBuildSpeedMult) this.shipBuildSpeedMult = o.shipBuildSpeedMult;
          if (o.fleetPowerMult) this.fleetPowerMult = o.fleetPowerMult;
          if (o.buildings) {
            for (const saved of o.buildings) {
              const b = this.buildings.find(x => x.id === saved.id); if (b) {
                const sLevel = saved.level || 0;
                if (sLevel > 0) { b.level = sLevel; b.owned = 1; }
                else { b.level = 0; b.owned = 0; }
                b.priceTier = saved.priceTier || 2; b.currentPrice = saved.currentPrice || b.basePrice;
                b.priceTimer = saved.priceTimer || Math.random() * 120;
              }
            }
          }
          if (o.research) { for (const saved of o.research) { const r = this.research.find(x => x.id === saved.id); if (r) { r.completed = saved.completed || false; r.inProgress = saved.inProgress || false; r.remaining = saved.remaining || 0; } } }
          if (o.missions) { for (const saved of o.missions) { const m = this.missions.find(x => x.id === saved.id); if (m) { m.progress = saved.progress || 0; m.completed = saved.completed || false; } } }
          if (o.ships) {
            const SHIP_MIGRATION = { interceptor: 'corvette', fighter: 'frigate', bomber: 'destroyer', battleship: 'cruiser', carrier: 'battleship', dreadnought: 'carrier' };
            let needsMigrate = false;
            for (const oldKey in SHIP_MIGRATION) { if (o.ships[oldKey]) { needsMigrate = true; break; } }
            if (needsMigrate) {
              const newShips = {};
              for (const st of SHIP_TEMPLATES) newShips[st.type] = { count: 0, building: false, buildCount: 0, totalTime: 0, elapsed: 0, level: 1, upgrading: false, upgradeElapsed: 0, upgradeTotalTime: 0 };
              if (o.ships.scout) Object.assign(newShips.scout, o.ships.scout);
              for (const oldKey in SHIP_MIGRATION) {
                if (o.ships[oldKey]) { const nk = SHIP_MIGRATION[oldKey]; Object.assign(newShips[nk], o.ships[oldKey]); }
              }
              o.ships = newShips;
            }
            for (const k in o.ships) {
              if (this.ships[k]) {
                this.ships[k].count = o.ships[k].count || 0;
                this.ships[k].building = o.ships[k].building || false;
                this.ships[k].buildCount = o.ships[k].buildCount || 0;
                this.ships[k].totalTime = o.ships[k].totalTime || 0;
                this.ships[k].elapsed = o.ships[k].elapsed || 0;
                if (o.ships[k].level) this.ships[k].level = o.ships[k].level;
                this.ships[k].upgrading = o.ships[k].upgrading || false;
                this.ships[k].upgradeElapsed = o.ships[k].upgradeElapsed || 0;
                this.ships[k].upgradeTotalTime = o.ships[k].upgradeTotalTime || 0;
              }
            }
          }
          if (o.colonizer) { this.colonizer.count = o.colonizer.count || 0; this.colonizer.building = o.colonizer.building || false; this.colonizer.level = o.colonizer.level || 1; }
          if (o.planets) { for (const saved of o.planets) { const p = this.planets.find(x => x.id === saved.id); if (p) p.explorationLevel = saved.explorationLevel || 0; } }
          if (o.pirateWave) this.pirateWave = o.pirateWave;
          if (o.pirateAttackTimer) this.pirateAttackTimer = o.pirateAttackTimer;
          if (o.achieved) this.achieved = o.achieved;
          if (o.totalBuys) this.totalBuys = o.totalBuys;
          if (o.totalTrades) this.totalTrades = o.totalTrades;
          if (o.bestProfit) this.bestProfit = o.bestProfit;
          if (o.items) Object.assign(this.items, o.items);
          if (o.boostTimer) this.boostTimer = o.boostTimer;
          if (o.boostMultItem) this.boostMultItem = o.boostMultItem;
          if (o.lastSeen) this.lastSeen = o.lastSeen;
          if (o.prestigePoints) this.prestigePoints = o.prestigePoints;
          if (o.prestigeBonus) this.prestigeBonus = o.prestigeBonus;
          if (o.buildingAwakened) this.buildingAwakened = o.buildingAwakened;
          if (o.colonyAutoTransport) this.colonyAutoTransport = o.colonyAutoTransport;
          if (o.colonyAutoUpgrade) this.colonyAutoUpgrade = o.colonyAutoUpgrade;
          if (o.autoClicker) this.autoClicker = o.autoClicker;
          if (o.autoBuilder) this.autoBuilder = o.autoBuilder;
          if (o.autoClickerTimer) this.autoClickerTimer = o.autoClickerTimer;
          if (o.challengeActive) this.challengeActive = o.challengeActive;
          if (o.challengesCompleted) this.challengesCompleted = o.challengesCompleted;
          if (o.awakeningStones) this.awakeningStones = o.awakeningStones;
          if (o.transcendLevel) this.transcendLevel = o.transcendLevel;
          if (o.transcendBonus) this.transcendBonus = o.transcendBonus;
          if (o.shipAwakened) this.shipAwakened = o.shipAwakened;
          if (o.transcendBuildSpeed) this.transcendBuildSpeed = o.transcendBuildSpeed;
          if (o.transcendFleetBonus) this.transcendFleetBonus = o.transcendFleetBonus;
          if (o.transcendResearchSpeed) this.transcendResearchSpeed = o.transcendResearchSpeed;
          if (o.transcendAwareness) this.transcendAwareness = o.transcendAwareness;
          if (o.stats) Object.assign(this.stats, o.stats);
          if (o.alienRep) Object.assign(this.alienRep, o.alienRep);
          if (o.alienTier) Object.assign(this.alienTier, o.alienTier);
          if (o.fameIncomeBonus !== undefined) this.fameIncomeBonus = o.fameIncomeBonus;
          if (o.fameMilestones) {
            for (const saved of o.fameMilestones) {
              const m = this.fameMilestones.find(x => x.id === saved.id);
              if (m) m.reached = saved.reached || false;
            }
          }
          if (o.colonies) {
            this.colonies = o.colonies.map(c => ({
              planetId: c.planetId, name: c.name, prodSpeed: c.prodSpeed || 1,
              resources: c.resources || { metal: 0, crystal: 0, hydrogen: 0, plasma: 0, solar: 0, fission: 0, fusion: 0 },
              factories: (c.factories || []).map(f => ({ id: f.id, level: f.level || 0 })),
              transporting: c.transporting || false,
              transportProgress: c.transportProgress || 0,
              transportTime: c.transportTime || 0,
              transportAmounts: c.transportAmounts || {}
            }));
          }
          this.recalcMaxes();
        } catch (e) {}
      }
    }
  };
})();