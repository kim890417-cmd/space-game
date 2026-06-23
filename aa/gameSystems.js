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
    { id: 'mine', name: '지표 광산', icon: '⛏️', img: 'img/1.jpg', desc: '소행성 표면에서 금속 광물 채굴',
      basePrice: 8000, income: 30, awarenessNeeded: 0, awarenessGiven: 8, tier: 1, res: 'metal', output: 2.0 },
    { id: 'crystal_fac', name: '크리스탈 합성소', icon: '💎', img: 'img/2.jpg', desc: '고밀도 에너지 결정 합성',
      basePrice: 25000, income: 40, awarenessNeeded: 100, awarenessGiven: 10, tier: 1, res: 'crystal', output: 0.8 },
    { id: 'drone_hub', name: '드론 허브', icon: '🛸', img: 'img/11.jpg', desc: '자동 드론으로 자원 수집',
      basePrice: 35000, income: 60, awarenessNeeded: 300, awarenessGiven: 12, tier: 1, res: 'metal', output: 1.0 },
    { id: 'refinery', name: '수소 정제소', icon: '⚡', img: 'img/3.jpg', desc: '듀테륨 정제로 수소 생산',
      basePrice: 80000, income: 90, awarenessNeeded: 500, awarenessGiven: 15, tier: 2, res: 'hydrogen', output: 0.5 },
    { id: 'recycler', name: '자원 재활용소', icon: '♻️', img: 'img/10.jpg', desc: '폐자원 재활용',
      basePrice: 120000, income: 120, awarenessNeeded: 700, awarenessGiven: 18, tier: 2, res: 'metal', output: 0.6 },
    { id: 'solar_plant', name: '태양열 발전소', icon: '☀️', img: 'img/4.jpg', desc: '항성 에너지 수집',
      basePrice: 200000, income: 160, awarenessNeeded: 1000, awarenessGiven: 22, tier: 2, res: 'solar', output: 0.6 },
    { id: 'plasma_coil', name: '플라즈마 코일', icon: '🔵', img: 'img/7.jpg', desc: '고에너지 플라즈마 안정화',
      basePrice: 280000, income: 220, awarenessNeeded: 1500, awarenessGiven: 26, tier: 3, res: 'plasma', output: 0.4 },
    { id: 'fission_reactor', name: '핵분열로', icon: '⚛️', img: 'img/5.jpg', desc: '원자핵 분열 에너지',
      basePrice: 450000, income: 350, awarenessNeeded: 2200, awarenessGiven: 32, tier: 3, res: 'fission', output: 0.3 },
    { id: 'fusion_reactor', name: '핵융합로', icon: '🔥', img: 'img/6.jpg', desc: '핵융합 반응 에너지',
      basePrice: 800000, income: 550, awarenessNeeded: 3200, awarenessGiven: 40, tier: 3, res: 'fusion', output: 0.2 },
    { id: 'outpost', name: '전초기지', icon: '🚀', img: 'img/9.jpg', desc: '새 행성 자원 탐색',
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
    { id: 'r13', name: '자동 물류', desc: '식민지 자원 자동 운송 해금', icon: '📦', cost: { metal: 500000, crystal: 200000, hydrogen: 50000 }, time: 300, effect: g => { g.autoTransportUnlocked = true; g.toast('📦 자동 물류 시스템 활성화!'); }, requires: 'r5' }
  ];

  const SHIP_TEMPLATES = [
    { type: 'scout', name: '정찰기', icon: '🛰️', power: 0, cost: { metal: 200, crystal: 100 }, time: 10, strongAgainst: null, awarenessNeeded: 0, img: 'img/ship-scout.jpg', maxLevel: 5, upgradeTime: 20, role: 'explore' },
    { type: 'corvette', name: '초계함', icon: '🛡️', power: 6, cost: { metal: 400 }, time: 30, strongAgainst: 'raider', awarenessNeeded: 0, img: 'img/ship-corvette.jpg', maxLevel: 8, upgradeTime: 40, role: 'combat' },
    { type: 'frigate', name: '호위함', icon: '🚀', power: 14, cost: { metal: 1200, crystal: 500 }, time: 120, strongAgainst: 'pirate_fleet', awarenessNeeded: 40, img: 'img/ship-fighter.jpg', maxLevel: 8, upgradeTime: 80, role: 'combat' },
    { type: 'destroyer', name: '구축함', icon: '💥', power: 50, cost: { metal: 12000, crystal: 6000 }, time: 600, strongAgainst: 'marauder', awarenessNeeded: 120, img: 'img/ship-battleship.jpg', maxLevel: 7, upgradeTime: 300, role: 'combat' },
    { type: 'cruiser', name: '순양함', icon: '⚡', power: 120, cost: { metal: 35000, crystal: 18000, hydrogen: 5000 }, time: 1500, strongAgainst: 'warship', awarenessNeeded: 220, img: 'img/ship-carrier.jpg', maxLevel: 6, upgradeTime: 600, role: 'combat' },
    { type: 'battleship', name: '전함', icon: '🚢', power: 250, cost: { metal: 80000, crystal: 40000, hydrogen: 15000 }, time: 3500, strongAgainst: 'battle_group', awarenessNeeded: 450, img: 'img/ship-cruiser.jpg', maxLevel: 5, upgradeTime: 1000, role: 'combat' },
    { type: 'carrier', name: '항공모함', icon: '✈️', power: 500, cost: { metal: 200000, crystal: 100000, hydrogen: 40000, plasma: 12000 }, time: 6000, strongAgainst: 'armada', awarenessNeeded: 700, img: 'img/ship-destroyer.jpg', maxLevel: 4, upgradeTime: 1600, role: 'combat' },
    { type: 'dreadnought', name: '드레드노트', icon: '💀', power: 1000, cost: { metal: 400000, crystal: 200000, hydrogen: 80000, plasma: 30000 }, time: 10000, strongAgainst: 'dreadnought', awarenessNeeded: 1200, img: 'img/ship-dreadnought.jpg', maxLevel: 3, upgradeTime: 3000, role: 'combat' },
    { type: 'titan', name: '타이탄', icon: '🗿', power: 2500, cost: { metal: 800000, crystal: 400000, hydrogen: 200000, plasma: 100000 }, time: 20000, strongAgainst: 'dreadnought', awarenessNeeded: 2000, img: 'img/ship-colonizer.jpg', maxLevel: 2, upgradeTime: 6000, role: 'combat' }
  ];

  const PIRATE_TYPES = [
    { type: 'raider', name: '약탈자', icon: '🦹', weakTo: 'corvette', powerBase: 10 },
    { type: 'pirate_fleet', name: '해적단', icon: '🏴‍☠️', weakTo: 'frigate', powerBase: 20 },
    { type: 'marauder', name: '약탈대', icon: '🪓', weakTo: 'destroyer', powerBase: 35 },
    { type: 'warship', name: '전투함대', icon: '⚔️', weakTo: 'cruiser', powerBase: 65 },
    { type: 'battle_group', name: '전투집단', icon: '👹', weakTo: 'battleship', powerBase: 120 },
    { type: 'armada', name: '거대함대', icon: '☠️', weakTo: 'carrier', powerBase: 220 },
    { type: 'dreadnought', name: '초거함', icon: '💀', weakTo: 'dreadnought', powerBase: 380 }
  ];

  const EXPLORE_EVENTS = [
    '🌟 신비로운 성운을 통과 중입니다...',
    '👽 약한 외계 신호가 감지되었습니다...',
    '🪨 소행성대를 통과하고 있습니다...',
    '🌀 시공간 왜곡 현상이 관측됩니다...',
    '✨ 우주 먼지 구름 속을 항해 중...',
    '🔭 미지의 항성계를 스캔하는 중...',
    '🌌 은하수 팔을 통과하고 있습니다...',
    '📡 중립적인 전파 신호를 수신...',
    '⚡ 우주 방사선 폭풍 지역 진입...',
    '🛸 정체 불명의 잔해를 발견했습니다...'
  ];

  const COLONY_TEMPLATES = [
  { planetId: 'earth', name: '지구 개척지', factorySlots: 6, prodSpeed: 1.0 },
  { planetId: 'venus', name: '금성 개척지', factorySlots: 6, prodSpeed: 1.1 },
  { planetId: 'europa', name: '유로파 개척지', factorySlots: 6, prodSpeed: 1.2 },
  { planetId: 'io', name: '이오 개척지', factorySlots: 6, prodSpeed: 1.0 },
  { planetId: 'titan', name: '타이탄 개척지', factorySlots: 6, prodSpeed: 1.1 },
  { planetId: 'kepler', name: '케플러-22b 개척지', factorySlots: 6, prodSpeed: 1.3 },
  { planetId: 'andromeda', name: '안드로메다 전초기지', factorySlots: 6, prodSpeed: 1.5 },
  { planetId: 'alpha_centauri', name: 'α 센타우루스 개척지', factorySlots: 6, prodSpeed: 1.0 },
  { planetId: 'sirius', name: '시리우스 개척지', factorySlots: 6, prodSpeed: 1.1 },
  { planetId: 'barnard', name: '버나드 개척지', factorySlots: 6, prodSpeed: 1.2 },
  { planetId: 'polaris', name: '폴라리스 개척지', factorySlots: 6, prodSpeed: 1.0 },
  { planetId: 'betelgeuse', name: '베텔게우스 개척지', factorySlots: 6, prodSpeed: 1.2 },
  { planetId: 'pirate_base', name: '해적 근거지 개척지', factorySlots: 6, prodSpeed: 1.4 },
  { planetId: 'titan_system', name: '타이탄 성계 개척지', factorySlots: 6, prodSpeed: 1.8 }
];

const COLONY_FACTORY_TYPES = [
  { icon: '⛏️', name: '메탈 채굴기', res: 'metal', baseOutput: 0.3 },
  { icon: '💎', name: '크리스탈 증폭기', res: 'crystal', baseOutput: 0.2 },
  { icon: '⚡', name: '수소 추출기', res: 'hydrogen', baseOutput: 0.15 },
  { icon: '🔵', name: '플라즈마 수집기', res: 'plasma', baseOutput: 0.1 },
  { icon: '☀️', name: '태양열 패널', res: 'solar', baseOutput: 0.12 },
  { icon: '⚛️', name: '핵분열 발전기', res: 'fission', baseOutput: 0.08 }
];
const SPECIALIZATIONS = [
  { id: 'resource', name: '자원 전초기지', icon: '⛏️', desc: '모든 자원 +25%, 운송량 +50%', prodBonus: 1.25, transportBonus: 1.5 },
  { id: 'research', name: '연구 거점', icon: '🔬', desc: '인지도 +30%, 연구속도 +20%', awarenessBonus: 1.3, researchSpeed: 0.8 },
  { id: 'military', name: '군사 기지', icon: '⚔️', desc: '함대 전투력 +20%, 약탈피해 -50%', fleetBonus: 1.2, raidProt: 0.5 }
];
const COLONY_EVENTS = [
  { id: 'rich_vein', text: '💎 자원 광맥 발견!', effect: 'prod_boost', dur: 30, mult: 2.5, weight: 20 },
  { id: 'tech_bk', text: '🔬 기술 발전!', effect: 'free_up', dur: 0, weight: 18 },
  { id: 'pirate_raid', text: '☠️ 해적 습격!', effect: 'res_loss', dur: 0, loss: 0.15, weight: 15 },
  { id: 'ancient_art', text: '🌌 고대 유물 발견!', effect: 'aware', dur: 0, weight: 22 },
  { id: 'trade_ship', text: '🛸 무역선 도착!', effect: 'res_gain', dur: 0, weight: 18 },
  { id: 'solar_storm', text: '🌀 태양 폭풍!', effect: 'halt', dur: 15, weight: 7 }
];
const EXPLORE_CHOICES = [
  { id: 'ancient_signal', text: '📡 고대 문명의 신호를 감지했습니다!', optA: { text: '✅ 응답한다', risk: 0.4 }, optB: { text: '❌ 무시한다', risk: 0 } },
  { id: 'asteroid_field', text: '☄️ 소행성대에 진입했습니다!', optA: { text: '🔄 회피 기동', risk: 0.2 }, optB: { text: '🛡️ 방어막 강화', risk: 0.1 } },
  { id: 'alien_structure', text: '👽 외계 구조물을 발견했습니다!', optA: { text: '🔍 조사한다', risk: 0.5 }, optB: { text: '📷 스캔만 한다', risk: 0 } },
  { id: 'space_wreck', text: '💫 거대한 우주 잔해 발견!', optA: { text: '🛠️ 수색한다', risk: 0.3 }, optB: { text: '🚀 진행한다', risk: 0 } },
  { id: 'energy_anomaly', text: '⚡ 에너지 변칙 감지!', optA: { text: '🧪 흡수한다', risk: 0.35 }, optB: { text: '⚠️ 우회한다', risk: 0 } }
];
  const STAR_SYSTEMS = [
    { id: 'sol', name: '태양계', icon: '☀️', img: 'img/system-sol.jpg', parent: null, status: 'owned', awarenessNeeded: 0, scoutTime: 0, colonizeCost: null, colonizeTime: 0, piratePower: null, bonusDesc: '본진 — 모든 것의 시작', planetId: null },
    { id: 'alpha_centauri', name: 'α 센타우루스', icon: '⭐', img: 'img/system-alpha-centauri.jpg', parent: 'sol', status: 'unknown', awarenessNeeded: 50, scoutTime: 30, colonizeCost: { metal: 5000, crystal: 2000 }, colonizeTime: 60, piratePower: null, bonusDesc: '메탈 생산 +15%', planetId: 'alpha_centauri' },
    { id: 'sirius', name: '시리우스', icon: '🔴', img: 'img/system-sirius.jpg', parent: 'sol', status: 'pirate', awarenessNeeded: 120, scoutTime: 30, colonizeCost: { metal: 10000, crystal: 4000, hydrogen: 1000 }, colonizeTime: 90, piratePower: 100, bonusDesc: '크리스탈 생산 +15%', planetId: 'sirius' },
    { id: 'barnard', name: '버나드', icon: '🟤', img: 'img/system-barnard.jpg', parent: 'alpha_centauri', status: 'unknown', awarenessNeeded: 200, scoutTime: 40, colonizeCost: { metal: 15000, crystal: 6000, hydrogen: 2000 }, colonizeTime: 120, piratePower: null, bonusDesc: '수소 생산 +15%', planetId: 'barnard' },
    { id: 'polaris', name: '폴라리스', icon: '💫', img: 'img/system-polaris.jpg', parent: 'sol', status: 'unknown', awarenessNeeded: 250, scoutTime: 45, colonizeCost: { metal: 20000, crystal: 8000, hydrogen: 3000 }, colonizeTime: 150, piratePower: null, bonusDesc: '연구속도 +20%, 인지도 +20%', planetId: 'polaris' },
    { id: 'kepler', name: '케플러-22b', icon: '🟣', img: 'img/system-kepler.jpg', parent: 'sol', status: 'unknown', awarenessNeeded: 350, scoutTime: 50, colonizeCost: { metal: 30000, crystal: 12000, hydrogen: 5000, plasma: 2000 }, colonizeTime: 200, piratePower: null, bonusDesc: '모든 자원 생산 +20%', planetId: 'kepler' },
    { id: 'betelgeuse', name: '베텔게우스', icon: '🔶', img: 'img/system-betelgeuse.jpg', parent: 'sirius', status: 'pirate', awarenessNeeded: 500, scoutTime: 50, colonizeCost: { metal: 50000, crystal: 20000, hydrogen: 8000, plasma: 3000 }, colonizeTime: 300, piratePower: 400, bonusDesc: '플라즈마 생산 +25%', planetId: 'betelgeuse' },
    { id: 'pirate_base', name: '해적 근거지', icon: '☠️', img: 'img/system-pirate-base.jpg', parent: 'betelgeuse', status: 'pirate', awarenessNeeded: 700, scoutTime: 60, colonizeCost: { metal: 100000, crystal: 40000, hydrogen: 20000, plasma: 10000 }, colonizeTime: 500, piratePower: 1000, bonusDesc: '함대 전투력 +30%, 모든 수입 +10%', planetId: 'pirate_base' },
    { id: 'andromeda', name: '안드로메다', icon: '🌌', img: 'img/system-andromeda.jpg', parent: 'kepler', status: 'unknown', awarenessNeeded: 900, scoutTime: 60, colonizeCost: { metal: 200000, crystal: 80000, hydrogen: 30000, plasma: 15000 }, colonizeTime: 600, piratePower: null, bonusDesc: '모든 수입 +40%', planetId: 'andromeda' },
    { id: 'titan_system', name: '타이탄 성계', icon: '🪐', img: 'img/system-titan.jpg', parent: 'polaris', status: 'unknown', awarenessNeeded: 1500, scoutTime: 80, colonizeCost: { metal: 500000, crystal: 200000, hydrogen: 100000, plasma: 50000 }, colonizeTime: 1200, piratePower: null, bonusDesc: '함대 전투력 +50%, 모든 생산 +25%', planetId: 'titan_system' }
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
          metal: new Decimal(20), metalMax: new Decimal(500),
          crystal: new Decimal(0), crystalMax: new Decimal(300),
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
        exploreEvent: null, exploreEventTimer: 0,
        exploreChoice: null, exploreChoiceCooldown: 0,
        colonySpecializing: null,
        autoTransportUnlocked: false,

        pirateTypes: PIRATE_TYPES,
        pirateAttackTimer: 300,
        pirateWave: 1, pirateLog: [], combatCooldown: 0,
        pirateRaidAlert: null, pirateRaidTimer: 0,

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
        starSystems: STAR_SYSTEMS.map(s => ({
          ...s,
          status: s.status || (s.id === 'sol' ? 'owned' : 'unknown'),
          scouting: false, scoutProgress: 0,
          colonizing: false, colonizeProgress: 0
        })),

        cheatOpen: false,
        speedMult: 1,
        prestigePoints: 0,
        prestigeBonus: 0,
        fleetActiveTab: 'fleet_build'
      };
    },

    computed: {
      totalShips() { let n = 0; for (const t in this.ships) n += this.ships[t].count || 0; return n; },
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
        return rates;
      },
      effectiveIncomeMult() {
        let m = this.incomeMult * (1 + this.fameIncomeBonus) * (1 + this.prestigeBonus);
        for (const p of this.planets)
          if (p.explorationLevel > 0 && p.bonusType === 'income') m *= 1 + (p.bonusPerLevel || 0) * p.explorationLevel;
        return m;
      },
      visibleBuildings() { return this.buildings.filter(b => b.awarenessNeeded <= this.awareness); },
      visibleShips() { return this.shipTypes.filter(s => s.awarenessNeeded <= this.awareness); },
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
          if (s.role === 'explore') continue;
          const cnt = this.ships[s.type]?.count || 0;
          const lv = this.ships[s.type]?.level || 1;
          p += cnt * s.power * lv;
        }
        const militaryBonus = this.colonies.some(c => c.specialization === 'military') ? 1.2 : 1;
        return p * this.fleetPowerMult * militaryBonus;
      },
      currentPirate() {
        const pt = this.pirateTypes[(this.pirateWave - 1) % this.pirateTypes.length];
        const scale = Math.pow(1.25, this.pirateWave - 1);
        return { type: pt.type, name: pt.name, icon: pt.icon, weakTo: pt.weakTo, power: Math.floor(pt.powerBase * scale) };
      },
      piratePower() { return this.currentPirate ? this.currentPirate.power : 0; },
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
      visibleStarSystems() {
        return this.starSystems.filter(s => {
          if (s.awarenessNeeded > this.awareness) return false;
          if (s.id === 'sol') return true;
          const parent = this.starSystems.find(p => p.id === s.parent);
          return parent && (parent.status === 'owned' || parent.status === 'colonized');
        });
      },
      visibleColonies() {
        return this.colonies.filter(c => {
          const p = this.planets.find(x => x.id === c.planetId);
          return p && p.explorationLevel > 0;
        });
      },

    },

    methods: {
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
        this.awareness += b.awarenessGiven * this.awarenessMult;
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
        this.awareness += b.awarenessGiven * b.level * this.awarenessMult;
        this.toast(`⬆️ ${b.name} LV ${b.level}`);
        if (e) this.spawnFloatText('⬆️ LV' + b.level, '#a78bfa', e.clientX, e.clientY - 8);
        this.boostResourceBump(b.res);
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
          this.awareness += b.awarenessGiven * this.awarenessMult;
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
        const hasResearchColony = this.colonies.some(c => c.specialization === 'research');
        const speedMult = hasResearchColony ? 0.8 : 1;
        for (const r of this.research) {
          if (r.inProgress) {
            r.remaining = Math.max(0, r.remaining - dt * (1 / speedMult));
            if (r.remaining <= 0) { r.inProgress = false; r.completed = true; r.effect(this); this.toast(`🔬 ${r.name}`); this.checkAchievements(); this.recalcMaxes(); }
          }
        }
      },

      maxAffordable(st) {
        let max = 999;
        if (st.cost.metal) max = Math.min(max, Math.floor((this.resources.metal || new Decimal(0)).toNumber() / (st.cost.metal || 1)));
        if (st.cost.crystal) max = Math.min(max, Math.floor((this.resources.crystal || new Decimal(0)).toNumber() / (st.cost.crystal || 1)));
        if (st.cost.hydrogen) max = Math.min(max, Math.floor((this.resources.hydrogen || new Decimal(0)).toNumber() / (st.cost.hydrogen || 1)));
        if (st.cost.plasma) max = Math.min(max, Math.floor((this.resources.plasma || new Decimal(0)).toNumber() / (st.cost.plasma || 1)));
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
        s.building = true; s.buildCount = count; s.totalTime = st.time * count * this.shipBuildSpeedMult; s.elapsed = 0;
        s.spentMetal = (st.cost.metal || 0) * count;
        s.spentCrystal = (st.cost.crystal || 0) * count;
        s.spentHydrogen = (st.cost.hydrogen || 0) * count;
        s.spentPlasma = (st.cost.plasma || 0) * count;
        this.awareness += Math.max(1, Math.floor(st.power / 10)) * this.awarenessMult;
        this.toast(`🚀 ${st.name} ${count}척 건조 시작`);
      },
      cancelBuild(type) {
        const s = this.ships[type];
        if (!s || !s.building) return;
        const st = this.shipTypes.find(x => x.type === type);
        this.resources.metal = this.resources.metal.add(s.spentMetal || 0);
        this.resources.crystal = this.resources.crystal.add(s.spentCrystal || 0);
        if (s.spentHydrogen) this.resources.hydrogen = this.resources.hydrogen.add(s.spentHydrogen);
        if (s.spentPlasma) this.resources.plasma = this.resources.plasma.add(s.spentPlasma);
        s.building = false; s.buildCount = 0; s.totalTime = 0; s.elapsed = 0;
        s.spentMetal = 0; s.spentCrystal = 0; s.spentHydrogen = 0; s.spentPlasma = 0;
        this.toast(`↩️ ${st ? st.name : type} 건조 취소 (자원 환불)`);
      },
      tickShips(dt) {
        for (const t in this.ships) {
          const s = this.ships[t];
          if (s.building) {
            s.elapsed += dt;
            if (s.elapsed >= s.totalTime) {
              s.building = false; s.count += s.buildCount; s.buildCount = 0; s.totalTime = 0; s.elapsed = 0;
            }
          }
          if (s.upgrading) {
            s.upgradeElapsed += dt;
            if (s.upgradeElapsed >= s.upgradeTotalTime) {
              s.upgrading = false; s.level++; s.upgradeElapsed = 0; s.upgradeTotalTime = 0;
              const st = this.shipTypes.find(x => x.type === t);
              if (st) this.toast(`⬆️ ${st.name} 업그레이드 완료! LV ${s.level}`);
            }
          }
        }
        if (this.colonizer.building) {
          this.colonizer.elapsed += dt;
          if (this.colonizer.elapsed >= this.colonizer.totalTime) {
            this.colonizer.building = false; this.colonizer.count += this.colonizer.buildCount;
            this.colonizer.buildCount = 0; this.colonizer.totalTime = 0; this.colonizer.elapsed = 0;
          }
        }
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
        const scale = Math.pow(lv + 1, 1.7) * 0.5;
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
        const costMetal = 20000;
        const costCrystal = 10000;
        if (this.resources.metal.lt(costMetal) || this.resources.crystal.lt(costCrystal)) return;
        this.resources.metal = this.resources.metal.sub(costMetal);
        this.resources.crystal = this.resources.crystal.sub(costCrystal);
        this.colonizer.building = true; this.colonizer.buildCount = 1;
        this.colonizer.totalTime = 120 * this.shipBuildSpeedMult; this.colonizer.elapsed = 0;
        this.toast('🚀 식민 함선 건조 시작');
      },
      colonizerUpgradeCost() {
        const lv = this.colonizer.level || 1;
        return { metal: Math.floor(15000 * Math.pow(lv + 1, 1.6)), crystal: Math.floor(8000 * Math.pow(lv + 1, 1.6)) };
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

      visiblePlanets() {
        return this.planets.filter(p => p.fameNeeded <= this.awareness);
      },

      canExplore(p) {
        if (p.explorationLevel >= p.maxLevel || this.exploring) return false;
        return (this.ships.scout?.count || 0) > 0;
      },
      exploreChanceFor(p) {
        if (p.explorationLevel >= p.maxLevel) return 0;
        const scoutCount = this.ships.scout?.count || 0;
        const scoutLv = this.ships.scout?.level || 1;
        const power = scoutCount * scoutLv * 3;
        const diffMod = p.difficulty * (1 + 0.1 * p.explorationLevel);
        return Math.min(0.90, power / diffMod);
      },
      canEstablishColony(p) {
        return p && p.explorationLevel >= 1 && this.colonizer.count > 0 && !this.colonies.some(c => c.planetId === p.id);
      },
      establishColony(p) {
        if (!this.canEstablishColony(p)) return;
        this.colonySpecializing = p;
      },
      chooseSpecialization(type) {
        const p = this.colonySpecializing;
        if (!p) return;
        this.colonizer.count--;
        this.initColony(p.id, type);
        const spec = SPECIALIZATIONS.find(s => s.id === type);
        this.toast(`🏙️ ${p.name}에 ${spec ? spec.name : '식민지'} 건설 완료!`);
        this.colonySpecializing = null;
      },
      cancelSpecialization() {
        this.colonySpecializing = null;
      },
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
        const spec = SPECIALIZATIONS.find(s => s.id === c.specialization);
        const specBonus = spec ? spec.prodBonus || 1 : 1;
        const tier = this.colonyTier(c);
        const tierB = [1, 1, 1.2, 1.5, 2.0][tier] || 1;
        for (const f of c.factories) {
          if (f.level <= 0) continue;
          const t = this.colonyFactoryTypes[f.id] || this.colonyFactoryTypes[0];
          if (!rates[t.res]) rates[t.res] = 0;
          rates[t.res] += t.baseOutput * f.level * (1 + 0.15 * (f.level - 1)) * (c.prodSpeed || 1) * specBonus * tierB;
        }
        return rates;
      },
      colonyTier(c) {
        if (!c || !c.factories) return 1;
        const totalLv = c.factories.reduce((s, f) => s + (f.level || 0), 0);
        if (totalLv >= 60) return 4;
        if (totalLv >= 30) return 3;
        if (totalLv >= 10) return 2;
        return 1;
      },
      canScoutSystem(sys) {
        if (!sys || sys.id === 'sol' || sys.scouting || (sys.status !== 'unknown' && sys.status !== 'pirate')) return false;
        if (sys.awarenessNeeded > this.awareness) return false;
        return (this.ships.scout?.count || 0) > 0;
      },
      canAttackSystem(sys) {
        if (!sys || sys.id === 'sol' || sys.scouting || sys.status !== 'pirate') return false;
        if (sys.awarenessNeeded > this.awareness) return false;
        return this.fleetPower >= (sys.piratePower || 0);
      },
      canColonizeSystem(sys) {
        if (!sys || sys.id === 'sol' || sys.colonizing || sys.status !== 'scouted') return false;
        if (this.colonizer.count <= 0) return false;
        if (!sys.colonizeCost) return false;
        if (this.colonies.some(c => c.planetId === sys.id)) return false;
        for (const k in sys.colonizeCost) {
          if (!this.resources[k] || this.resources[k].lt(sys.colonizeCost[k])) return false;
        }
        return true;
      },
      scoutSystem(sys) {
        if (!this.canScoutSystem(sys)) return;
        sys.scouting = true;
        sys.scoutProgress = 0;
        this.toast(`🛰️ ${sys.name} 정찰 시작 (${this.fmtTime(sys.scoutTime)})`);
      },
      attackSystem(sys) {
        if (!this.canAttackSystem(sys)) return;
        sys.scouting = true;
        sys.scoutProgress = 0;
        this.toast(`⚔️ ${sys.name} 공격 개시! (전투력 ${sys.piratePower})`);
      },
      colonizeSystem(sys) {
        if (!this.canColonizeSystem(sys)) return;
        for (const k in sys.colonizeCost) {
          this.resources[k] = this.resources[k].sub(sys.colonizeCost[k]);
        }
        sys.colonizing = true;
        sys.colonizeProgress = 0;
        this.toast(`🏗️ ${sys.name} 개척 시작 (${this.fmtTime(sys.colonizeTime)})`);
      },
      tickStarSystems(dt) {
        for (const sys of this.starSystems) {
          if (sys.scouting) {
            sys.scoutProgress += dt;
            if (sys.scoutProgress >= sys.scoutTime) {
              sys.scouting = false;
              sys.scoutProgress = 0;
              if (sys.status === 'pirate') {
                sys.status = 'scouted';
                this.toast(`⚔️ ${sys.name} 점령 성공! 이제 개척 가능`);
                this.awareness += Math.floor((sys.piratePower || 0) / 10);
              } else {
                sys.status = 'scouted';
                this.toast(`🛰️ ${sys.name} 정찰 완료! (${sys.bonusDesc})`);
                this.awareness += Math.floor(sys.awarenessNeeded / 10);
              }
            }
          }
          if (sys.colonizing) {
            sys.colonizeProgress += dt;
            if (sys.colonizeProgress >= sys.colonizeTime) {
              sys.colonizing = false;
              sys.colonizeProgress = 0;
              sys.status = 'colonized';
              this.colonySpecializing = sys;
            }
          }
        }
      },
      starSystemHasBonus(sys) {
        if (!sys || sys.id === 'sol') return false;
        return sys.status === 'colonized';
      },
      startExplore(p) {
        if (!this.canExplore(p)) return;
        this.exploring = true; this.explorePlanet = p;
        this.exploreChance = this.exploreChanceFor(p);
        this.exploreTimer = 15;
        this.exploreEvent = this.pickExploreEvent();
        this.exploreEventTimer = 3;
        this.exploreChoice = null;
        this.exploreChoiceCooldown = 5;
        this.toast(`🚀 ${p.name} 탐험 시작 (${Math.round(this.exploreChance*100)}%)`);
      },
      completeExplore() {
        const p = this.explorePlanet;
        if (!p) return;
        this.exploreChoice = null;
        const roll = Math.random();
        if (roll < this.exploreChance) {
          p.explorationLevel = Math.min(p.maxLevel, p.explorationLevel + 1);
          const bonus = Math.round((p.bonusPerLevel || 0) * 100);
          this.triggerExploreReward();
          if (p.explorationLevel === 1) {
            this.toast(`🎉 ${p.name} 발견! 식민함선을 보내 점령하세요 (LV ${p.explorationLevel}/${p.maxLevel})`);
          } else {
            this.toast(`🎉 ${p.name} 추가 탐사 성공! LV ${p.explorationLevel}/${p.maxLevel} (+${bonus}%)`);
          }
          this.spawnFloatText('🎉 +Lv!', '#fbbf24', window.innerWidth/2, window.innerHeight/2);
          this.checkAchievements();
        } else {
          const loss = Math.max(1, Math.floor((this.ships.scout?.count || 1) * 0.2));
          this.ships.scout.count = Math.max(0, (this.ships.scout?.count || 0) - loss);
          this.toast(`💥 ${p.name} 탐험 실패! 정찰기 ${loss}기 손실`);
        }
        this.exploring = false; this.explorePlanet = null; this.exploreEvent = null;
      },
      tickExploration(dt) {
        if (this.exploring) {
          this.exploreTimer -= dt;
          this.exploreChoiceCooldown -= dt;
          this.exploreEventTimer -= dt;
          if (this.exploreEventTimer <= 0) {
            if (!this.exploreChoice && this.exploreChoiceCooldown <= 0 && this.exploreTimer > 3 && Math.random() < 0.35) {
              this.triggerExploreChoice();
            } else {
              this.exploreEvent = this.pickExploreEvent();
              this.exploreEventTimer = 3;
            }
          }
          if (this.exploreTimer <= 0 && !this.exploreChoice) this.completeExplore();
        }
      },
      triggerExploreChoice() {
        const choice = EXPLORE_CHOICES[Math.floor(Math.random() * EXPLORE_CHOICES.length)];
        this.exploreChoice = { ...choice };
        this.exploreEventTimer = 10;
      },
      resolveExploreChoice(idx) {
        if (!this.exploreChoice) return;
        const choice = this.exploreChoice;
        const opt = idx === 0 ? choice.optA : choice.optB;
        if (opt.risk > 0 && Math.random() < opt.risk) {
          const loss = Math.max(1, Math.floor((this.ships.scout?.count || 1) * 0.25));
          this.ships.scout.count = Math.max(0, (this.ships.scout?.count || 0) - loss);
          this.toast(`💥 정찰기 ${loss}기 손실!`);
        } else {
          const rewardRoll = Math.random();
          if (rewardRoll < 0.3) {
            const resKeys = ['metal', 'crystal', 'hydrogen'];
            const k = resKeys[Math.floor(Math.random() * resKeys.length)];
            const add = new Decimal(300 + Math.random() * 700);
            this.resources[k] = Decimal.min(this.resources[k + 'Max'] || new Decimal(999999), this.resources[k].add(add));
            this.toast(`📦 ${RES_ICO[k]} ${RES_KR[k]} ${this.fmt(add)} 발견!`);
          } else if (rewardRoll < 0.5) {
            this.exploreTimer = Math.max(3, this.exploreTimer - 5);
            this.toast(`⏩ 탐험 진행도 +33%`);
          } else if (rewardRoll < 0.7) {
            const add = new Decimal(500 + Math.random() * 1500);
            this.money = this.money.add(add);
            this.toast(`💰 ${this.fmt(add)} 발견!`);
          } else {
            this.toast(`✨ 특별한 발견은 없었습니다.`);
          }
        }
        this.exploreChoice = null;
      },

      initColony(planetId, specialization) {
        if (this.colonies.some(c => c.planetId === planetId)) return;
        const tmpl = COLONY_TEMPLATES.find(t => t.planetId === planetId);
        if (!tmpl) return;
        const factories = COLONY_FACTORY_TYPES.map((ft, i) => ({ id: i, level: 0 }));
        this.colonies.push({
          planetId, name: tmpl.name, prodSpeed: tmpl.prodSpeed,
          specialization: specialization || 'resource',
          resources: { metal: 0, crystal: 0, hydrogen: 0, plasma: 0, solar: 0, fission: 0, fusion: 0 },
          factories,
          transporting: false, transportProgress: 0, transportTime: 0,
          transportAmounts: {},
          eventTimer: 60 + Math.random() * 60,
          autoTransport: false,
          autoTransportCooldown: 0,
          totalTransported: 0
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
          const spec = SPECIALIZATIONS.find(s => s.id === c.specialization);
          const specBonus = spec ? spec.prodBonus || 1 : 1;
          const tier = this.colonyTier(c);
          const tierB = [1, 1, 1.2, 1.5, 2.0][tier] || 1;
          const haltActive = c.eventBoost && c.eventBoost.haltTimer && c.eventBoost.haltTimer > 0;
          if (haltActive) {
            c.eventBoost.haltTimer -= dt;
            if (c.eventBoost.haltTimer <= 0) c.eventBoost.haltTimer = null;
          }
          if (!haltActive) {
            const prodBoost = (c.eventBoost && c.eventBoost.multiplier && c.eventBoost.timer > 0) ? c.eventBoost.multiplier : 1;
            if (c.eventBoost && c.eventBoost.timer) {
              c.eventBoost.timer -= dt;
              if (c.eventBoost.timer <= 0) c.eventBoost.multiplier = null;
            }
            for (const f of c.factories) {
              if (f.level <= 0) continue;
              const t = this.colonyFactoryTypes[f.id];
              const rate = t.baseOutput * f.level * (1 + 0.15 * (f.level - 1)) * (c.prodSpeed || 1) * specBonus * tierB * prodBoost * dt;
              const cap = 1000 + f.level * 500;
              c.resources[t.res] = Math.min(cap, (c.resources[t.res] || 0) + rate);
            }
          }
          c.eventTimer -= dt;
          if (c.eventTimer <= 0) {
            if (!c.transporting) this.triggerColonyEvent(c);
            c.eventTimer = 60 + Math.random() * 60;
          }
          c.autoTransportCooldown = Math.max(0, (c.autoTransportCooldown || 0) - dt);
          if (c.autoTransport && this.autoTransportUnlocked && !c.transporting && this.colonizer.count > 0 && (!c.autoTransportCooldown || c.autoTransportCooldown <= 0)) {
            this.startTransport(c);
            if (c.transporting) c.autoTransportCooldown = 10;
          }
          if (c.transporting) {
            c.transportProgress += dt;
            if (c.transportProgress >= c.transportTime) {
              for (const k in c.transportAmounts) {
                if (this.resources[k]) this.resources[k] = Decimal.min(this.resources[k + 'Max'] || new Decimal(999999), this.resources[k].add(c.transportAmounts[k]));
              }
              const totalVal = Object.values(c.transportAmounts).reduce((s, v) => s + v, 0);
              c.totalTransported = (c.totalTransported || 0) + totalVal;
              this.toast(`📦 ${c.name} 자원 ${this.fmt(totalVal)} 본송 완료!`);
              c.transporting = false; c.transportProgress = 0; c.transportTime = 0; c.transportAmounts = {};
            }
          }
        }
      },
      triggerColonyEvent(colony) {
        const spec = SPECIALIZATIONS.find(s => s.id === colony.specialization);
        let events = COLONY_EVENTS.map(e => ({ ...e }));
        if (spec && spec.id === 'resource') {
          events.find(e => e.id === 'rich_vein').weight = 30;
          events.find(e => e.id === 'trade_ship').weight = 22;
        } else if (spec && spec.id === 'research') {
          events.find(e => e.id === 'tech_bk').weight = 28;
          events.find(e => e.id === 'ancient_art').weight = 28;
        } else if (spec && spec.id === 'military') {
          const raid = events.find(e => e.id === 'pirate_raid');
          if (raid) raid.weight = 8;
        }
        const totalW = events.reduce((s, e) => s + e.weight, 0);
        let r = Math.random() * totalW;
        let chosen = events[0];
        for (const e of events) {
          r -= e.weight;
          if (r <= 0) { chosen = e; break; }
        }
        if (!chosen) return;
        if (chosen.effect === 'prod_boost') {
          if (!colony.eventBoost) colony.eventBoost = {};
          colony.eventBoost.multiplier = chosen.mult || 2.5;
          colony.eventBoost.timer = chosen.dur || 30;
          this.toast(`💥 ${colony.name}: ${chosen.text} (${colony.eventBoost.timer}초)`);
        } else if (chosen.effect === 'free_up') {
          const upgradable = colony.factories.filter(f => f.level < 20);
          if (upgradable.length > 0) {
            const f = upgradable[Math.floor(Math.random() * upgradable.length)];
            f.level++;
            this.toast(`⬆️ ${colony.name}: ${chosen.text} (${this.colonyFactoryTypes[f.id].name} LV ${f.level})`);
          }
        } else if (chosen.effect === 'res_loss') {
          const lossPct = (spec && spec.id === 'military') ? (chosen.loss || 0.15) * 0.5 : (chosen.loss || 0.15);
          for (const k of Object.keys(colony.resources)) {
            colony.resources[k] = Math.floor((colony.resources[k] || 0) * (1 - lossPct));
          }
          this.toast(`⚠️ ${colony.name}: ${chosen.text}`);
        } else if (chosen.effect === 'aware') {
          const amt = Math.floor(10 + Math.random() * 40);
          this.awareness += amt;
          this.toast(`📡 ${colony.name}: ${chosen.text} (+${amt} 인지도)`);
        } else if (chosen.effect === 'res_gain') {
          const amt = Math.floor(500 + Math.random() * 1500);
          const rk = ['metal', 'crystal', 'hydrogen', 'plasma'][Math.floor(Math.random() * 4)];
          colony.resources[rk] = (colony.resources[rk] || 0) + amt;
          this.toast(`📦 ${colony.name}: ${chosen.text} (${RES_ICO[rk]} +${this.fmt(amt)})`);
          if (spec && spec.id === 'resource') {
            const bonus = Math.floor(amt * 0.3);
            colony.resources[rk] = (colony.resources[rk] || 0) + bonus;
          }
        } else if (chosen.effect === 'halt') {
          if (!colony.eventBoost) colony.eventBoost = {};
          colony.eventBoost.haltTimer = chosen.dur || 15;
          this.toast(`🌪️ ${colony.name}: ${chosen.text} (${colony.eventBoost.haltTimer}초 정지)`);
        }
      },
      startTransport(colony) {
        if (colony.transporting || this.colonizer.count <= 0) return;
        const amounts = {};
        let total = 0;
        const spec = SPECIALIZATIONS.find(s => s.id === colony.specialization);
        const transportBonus = spec ? spec.transportBonus || 1 : 1;
        const maxCapacity = this.colonizer.count * this.colonizer.level * 50 * transportBonus;
        const allRes = ['metal','crystal','hydrogen','plasma','solar','fission','fusion'];
        const hydroCost = Math.ceil(maxCapacity * 0.001);
        if (this.resources.hydrogen.lt(hydroCost)) { return; }
        this.resources.hydrogen = this.resources.hydrogen.sub(hydroCost);
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
        if (total <= 0) { this.resources.hydrogen = this.resources.hydrogen.add(hydroCost); return; }
        colony.transporting = true;
        colony.transportProgress = 0;
        const tier = this.colonyTier(colony);
        const timeReduction = tier >= 3 ? 0.8 : 1;
        colony.transportTime = (30 + total * 0.01) * timeReduction;
        colony.transportAmounts = amounts;
        colony.transportTotal = total;
        if (!colony.autoTransport) {
          this.toast(`📦 자원 ${this.fmt(total)} 운송 시작 (수소 -${hydroCost}, ${this.fmtTime(colony.transportTime)})`);
        }
      },

      effectiveFleetPower(pirateType) {
        let p = 0;
        for (const s of this.shipTypes) {
          if (s.role === 'explore') continue;
          const cnt = this.ships[s.type]?.count || 0;
          const lv = this.ships[s.type]?.level || 1;
          let mult = 1;
          if (s.strongAgainst === pirateType) mult = 1.6;
          p += cnt * s.power * lv * mult;
        }
        return p * this.fleetPowerMult;
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
          this.pirateWave++; this.combatCooldown = 10; this.pirateAttackTimer = 300; this.checkAchievements(); this.checkFameMilestones();
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
        for (const s of this.shipTypes) { const cnt = this.ships[s.type]?.count || 0; if (cnt <= 0) continue; const loss = Math.min(cnt, Math.max(1, Math.round(cnt * ratio))); this.ships[s.type].count -= loss; total += loss; }
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
        this.totalWealth = this.totalWealthCalc;
      },

      tickEvents(dt) {
        this.eventTimer -= dt;
        if (this.eventTimer <= 0) { this.eventTimer = 90 + Math.random() * 180; this.triggerRandomEvent(); }
        if (this.auctionActive) { this.auctionTimer -= dt; if (this.auctionTimer <= 0) this.auctionActive = false; }
        if (this.freeDispenserCD > 0) this.freeDispenserCD = Math.max(0, this.freeDispenserCD - dt);
        if (this.pirateAttackTimer > 0) this.pirateAttackTimer = Math.max(0, this.pirateAttackTimer - dt);
        if (this.pirateAttackTimer <= 0) { this.triggerPirateRaid(); this.pirateAttackTimer = 300 + Math.random() * 100; }
      },
      pickExploreEvent() {
        return EXPLORE_EVENTS[Math.floor(Math.random() * EXPLORE_EVENTS.length)];
      },
      triggerExploreReward() {
        const r = Math.random();
        if (r < 0.3) {
          const resKeys = ['metal','crystal','hydrogen'];
          const k = resKeys[Math.floor(Math.random() * resKeys.length)];
          const add = new Decimal(200 + Math.random() * 800);
          this.resources[k] = Decimal.min(this.resources[k + 'Max'] || new Decimal(999999), this.resources[k].add(add));
          this.toast(`📦 ${RES_ICO[k]} ${RES_KR[k]} ${this.fmt(add)} 발견!`);
        } else if (r < 0.5) {
          const add = new Decimal(500 + Math.random() * 2000);
          this.money = this.money.add(add);
          this.toast(`💰 ${this.fmt(add)} 상당의 잔해 발견!`);
        } else if (r < 0.7) {
          const add = Math.floor(5 + Math.random() * 20);
          this.awareness += add;
          this.toast(`📡 명성 +${add} (외계 문명 단서 발견)`);
        } else if (r < 0.85) {
          this.boostTimer = Math.max(this.boostTimer, 15);
          this.boostMultItem = Math.max(this.boostMultItem, 3);
          this.toast('⚡ 우주 에너지 흡수! 15초간 생산 ×3');
        } else {
          this.ships.scout.level = Math.min(this.ships.scout.maxLevel || 5, this.ships.scout.level + 1);
          this.toast('⬆️ 정찰기 시스템 업그레이드!');
        }
      },
      dismissPirateAlert() {
        this.pirateRaidAlert = null;
        this.pirateRaidTimer = 0;
      },
      triggerPirateRaid() {
        const enemy = this.currentPirate;
        const eff = this.effectiveFleetPower(enemy.type);
        const hasMilColony = this.colonies.some(c => c.specialization === 'military');
        const autoRoll = eff * (hasMilColony ? 1.2 : 0.9);
        if (autoRoll >= enemy.power) {
          this.pushLog(`🛡️ 자동 방어 성공 (${enemy.icon} ${enemy.name})`, 'log-win');
          this.toast(`🛡️ 방어 성공 ${enemy.name}`);
        } else {
          const stolen = new Decimal((hasMilColony ? 150 : 300) * this.pirateWave);
          this.money = this.money.sub(stolen);
          const resLoss = hasMilColony ? 0.05 : 0.1;
          for (const k of RES) { if (this.resources[k] && this.resources[k].gt(0)) this.resources[k] = this.resources[k].sub(this.resources[k].mul(resLoss)); }
          this.pushLog(`⚠️ 해적 약탈! ${this.fmt(stolen)} + 자원 ${Math.round(resLoss*100)}% 손실 (${enemy.icon})`, 'log-lose');
          this.toast(`⚠️ 해적 약탈 ${this.fmt(stolen)}`);
          this.pirateRaidAlert = { name: enemy.name, icon: enemy.icon, stolen: this.fmt(stolen), power: enemy.power };
          this.pirateRaidTimer = 8;
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
        const gain = this.clickPower * (this.boostTimer > 0 ? this.boostMultItem : 1);
        this.money = this.money.add(gain);
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

      addOfflineIncome(seconds) {
        this.money = this.money.add(this.passiveIncome * seconds * this.effectiveIncomeMult);
        for (const k of RES) { const rate = (this.resourceIncome[k] || 0) * (this.resMultipliers[k] || 1); if (rate > 0) this.resources[k] = Decimal.min(this.resources[k + 'Max'] || new Decimal(999999), this.resources[k].add(rate * seconds)); }
      },
      applyOffline() {
        if (!this.lastSeen) return;
        const now = Date.now(); let elapsed = Math.floor((now - this.lastSeen) / 1000);
        if (elapsed < 30) return; elapsed = Math.min(elapsed, 86400);
        const inc = this.passiveIncome * elapsed;
        if (inc > 0) { this.money = this.money.add(inc); this.offlineReport = { seconds: elapsed, gained: inc }; }
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
          if (b.level > 0) buildingBonus += b.level * 50;
        }
        const sm = this.storageMult * (1 + buildingBonus / 1000);
        const bases = { metal: 2000, crystal: 1500, hydrogen: 1000, plasma: 800, solar: 800, fission: 800, fusion: 800 };
        for (const k of RES) this.resources[k + 'Max'] = new Decimal(Math.floor((bases[k] || 800) * sm));
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

      cheatReset() {
        if (!confirm('정말 초기화? (환생 포인트는 유지)')) return;
        const pp = this.prestigePoints;
        const pb = this.prestigeBonus;
        const defaults = {
          money: new Decimal(2000), clickPower: 200,
          resources: { metal: new Decimal(20), metalMax: new Decimal(500), crystal: new Decimal(0), crystalMax: new Decimal(300), hydrogen: new Decimal(0), hydrogenMax: new Decimal(200), plasma: new Decimal(0), plasmaMax: new Decimal(200), solar: new Decimal(0), solarMax: new Decimal(200), fission: new Decimal(0), fissionMax: new Decimal(200), fusion: new Decimal(0), fusionMax: new Decimal(200) },
          resUnlocked: { metal: true, crystal: false, hydrogen: false, plasma: false, solar: false, fission: false, fusion: false },
          resMultipliers: { metal: 1, crystal: 1, hydrogen: 1, plasma: 1, solar: 1, fission: 1, fusion: 1 },
          storageMult: 1, incomeMult: 1, fameIncomeBonus: 0, awarenessMult: 1, shipBuildSpeedMult: 1, fleetPowerMult: 1,
          buildings: BUILDING_TEMPLATES.map(b => ({ ...b, currentPrice: b.basePrice, priceTier: 2, cooldown: 0, priceTimer: Math.random() * 120, owned: 0, level: 0, maxLevel: 20 })),
          awareness: 0, fameMilestones: FAME_MILESTONES.map(m => ({ ...m, reached: false })),
          research: RESEARCH_LIST.map(r => ({ ...r, completed: false, inProgress: false, remaining: 0 })),
        ships: Object.fromEntries(SHIP_TEMPLATES.map(s => [s.type, { count: 0, building: false, buildCount: 0, totalTime: 0, elapsed: 0, level: 1, upgrading: false, upgradeElapsed: 0, upgradeTotalTime: 0, spentMetal: 0, spentCrystal: 0, spentHydrogen: 0, spentPlasma: 0 }])),
          colonizer: { count: 0, building: false, buildCount: 0, totalTime: 0, elapsed: 0, level: 1 },
          planets: PLANETS.map(p => ({ ...p, explorationLevel: 0 })),
          pirateWave: 1, pirateAttackTimer: 300, pirateLog: [], combatCooldown: 0,
          achievements: this.achievements.map(a => ({ ...a })), achieved: {}, achievementToast: '',
          missions: this.missions.map(m => ({ ...m, progress: 0, completed: false })),
          totalBuys: 0, totalTrades: 0, totalWealth: new Decimal(0), bestProfit: 0,
          items: { timewarp: 1, surge: 1 }, boostTimer: 0, boostMultItem: 1, freeDispenserCD: 0,
          colonies: [], colonyDetailPlanet: null, exploring: false, explorePlanet: null, exploreChance: 0, exploreTimer: 0,
          exploreChoice: null, exploreChoiceCooldown: 0, colonySpecializing: null, autoTransportUnlocked: false,
          starSystems: STAR_SYSTEMS.map(s => ({
            ...s,
            status: s.status || (s.id === 'sol' ? 'owned' : 'unknown'),
            scouting: false, scoutProgress: 0,
            colonizing: false, colonizeProgress: 0
          })),
          eventMessage: '', eventTimer: 0, auctionActive: false, auctionBuilding: null, auctionPrice: 0, auctionDiscount: 0, auctionTimer: 0, auctionChance: 0
        };
        for (const k in defaults) this[k] = defaults[k];
        this.prestigePoints = pp;
        this.prestigeBonus = pb;
        this.incomeMult = 1 + pb;
        this.recalcMaxes();
        this.toast('🔄 초기화 완료');
      },
      prestige() {
        const wealth = this.totalWealthCalc.toNumber();
        if (wealth < 100000) { this.toast('🚫 환생 조건: 총 자산 100k 이상'); return; }
        const baseGain = Math.max(1, Math.floor(Math.pow(wealth / 100000, 0.5)));
        const buildingBonus = 1 + this.buildings.reduce((s, b) => s + (b.level > 0 ? b.level * 0.05 : 0), 0);
        const shipBonus = 1 + this.totalShips * 0.02;
        const planetBonus = 1 + this.planets.reduce((s, p) => s + p.explorationLevel * 0.1, 0);
        const gain = Math.floor(baseGain * buildingBonus * shipBonus * planetBonus);
        this.prestigePoints += gain;
        this.prestigeBonus = this.prestigePoints * 0.1;
        this.toast(`✨ 환생! +${gain} 포인트 (건물×${buildingBonus.toFixed(2)} 함선×${shipBonus.toFixed(2)} 행성×${planetBonus.toFixed(2)}) 총 ${this.prestigePoints}P 수입 +${Math.round(this.prestigeBonus*100)}%`);
        this.cheatReset();
      },

      tickSystems(dt) {
        const sdt = dt * this.speedMult;
        this.tickPrices(sdt);
        this.tickIncome(sdt);
        this.tickResearch(sdt);
        this.tickShips(sdt);
        this.tickExploration(sdt);
        this.tickStarSystems(sdt);
        this.tickColonies(sdt);
        this.tickEvents(sdt);
        if (this.combatCooldown > 0) this.combatCooldown = Math.max(0, this.combatCooldown - sdt);
        if (this.pirateRaidTimer > 0) {
          this.pirateRaidTimer = Math.max(0, this.pirateRaidTimer - sdt);
          if (this.pirateRaidTimer <= 0) this.pirateRaidAlert = null;
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
            ships: Object.fromEntries(Object.entries(this.ships).map(([k, v]) => [k, { count: v.count, building: v.building, buildCount: v.buildCount, totalTime: v.totalTime, elapsed: v.elapsed, level: v.level, upgrading: v.upgrading || false, upgradeElapsed: v.upgradeElapsed || 0, upgradeTotalTime: v.upgradeTotalTime || 0, spentMetal: v.spentMetal || 0, spentCrystal: v.spentCrystal || 0, spentHydrogen: v.spentHydrogen || 0, spentPlasma: v.spentPlasma || 0 }])),
            colonizer: { count: this.colonizer.count, building: this.colonizer.building, buildCount: this.colonizer.buildCount, totalTime: this.colonizer.totalTime, elapsed: this.colonizer.elapsed, level: this.colonizer.level },
            planets: this.planets.map(p => ({ id: p.id, explorationLevel: p.explorationLevel })),
            pirateWave: this.pirateWave, pirateAttackTimer: this.pirateAttackTimer,
            achieved: this.achieved, totalBuys: this.totalBuys, totalTrades: this.totalTrades, bestProfit: this.bestProfit,
            items: this.items, boostTimer: this.boostTimer, boostMultItem: this.boostMultItem, lastSeen: Date.now(),
            fameIncomeBonus: this.fameIncomeBonus,
            fameMilestones: this.fameMilestones.map(m => ({ id: m.id, reached: m.reached })),
            prestigePoints: this.prestigePoints,
            prestigeBonus: this.prestigeBonus,
            autoTransportUnlocked: this.autoTransportUnlocked || false,
            colonies: this.colonies.map(c => ({
              planetId: c.planetId, name: c.name, prodSpeed: c.prodSpeed,
              specialization: c.specialization || 'resource',
              resources: { ...c.resources },
              factories: c.factories.map(f => ({ id: f.id, level: f.level })),
              transporting: c.transporting || false,
              transportProgress: c.transportProgress || 0,
              transportTime: c.transportTime || 0,
              transportAmounts: { ...(c.transportAmounts || {}) },
              eventTimer: c.eventTimer || 60,
              autoTransport: c.autoTransport || false,
              totalTransported: c.totalTransported || 0
            })),
            starSystems: this.starSystems.map(s => ({
              id: s.id, status: s.status,
              scouting: s.scouting || false, scoutProgress: s.scoutProgress || 0,
              colonizing: s.colonizing || false, colonizeProgress: s.colonizeProgress || 0
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
            if (o.ships.interceptor || o.ships.fighter || o.ships.bomber) {
              this.ships = Object.fromEntries(SHIP_TEMPLATES.map(s => [s.type, { count: 0, building: false, buildCount: 0, totalTime: 0, elapsed: 0, level: 1, upgrading: false, upgradeElapsed: 0, upgradeTotalTime: 0, spentMetal: 0, spentCrystal: 0, spentHydrogen: 0, spentPlasma: 0 }]));
              this.toast('🔄 함선 시스템 업데이트! 함대를 다시 건조하세요.');
            } else {
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
                  this.ships[k].spentMetal = o.ships[k].spentMetal || 0;
                  this.ships[k].spentCrystal = o.ships[k].spentCrystal || 0;
                  this.ships[k].spentHydrogen = o.ships[k].spentHydrogen || 0;
                  this.ships[k].spentPlasma = o.ships[k].spentPlasma || 0;
                }
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
          if (o.autoTransportUnlocked !== undefined) this.autoTransportUnlocked = o.autoTransportUnlocked;
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
              specialization: c.specialization || 'resource',
              resources: c.resources || { metal: 0, crystal: 0, hydrogen: 0, plasma: 0, solar: 0, fission: 0, fusion: 0 },
              factories: (c.factories || []).map(f => ({ id: f.id, level: f.level || 0 })),
              transporting: c.transporting || false,
              transportProgress: c.transportProgress || 0,
              transportTime: c.transportTime || 0,
              transportAmounts: c.transportAmounts || {},
              eventTimer: c.eventTimer || 60 + Math.random() * 60,
              autoTransport: c.autoTransport || false,
              autoTransportCooldown: 0,
              totalTransported: c.totalTransported || 0
            }));
          }
          if (o.starSystems) {
            for (const saved of o.starSystems) {
              const sys = this.starSystems.find(x => x.id === saved.id);
              if (sys) {
                sys.status = saved.status || 'unknown';
                sys.scouting = saved.scouting || false;
                sys.scoutProgress = saved.scoutProgress || 0;
                sys.colonizing = saved.colonizing || false;
                sys.colonizeProgress = saved.colonizeProgress || 0;
              }
            }
          }
          this.recalcMaxes();
        } catch (e) {}
      }
    }
  };
})();