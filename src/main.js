import "./styles/main.css";

// Pastel palette for covers — soft, airy
const PAL=[
  ['#4aaa85','#78c8a8'],  // mint
  ['#4a8ec8','#7ab4de'],  // sky
  ['#d48548','#e8a870'],  // peach
  ['#8a60b8','#aa88d0'],  // lavender
  ['#c85a72','#e08898'],  // rose
  ['#b8a030','#d0c060'],  // lemon
  ['#4a98b0','#78bcd0'],  // ice
  ['#98804a','#b8a878'],  // sand
];

const SM={语文:0,数学:1,英语:2,物理:3,化学:4,生物:5,历史:6,地理:7,政治:0,信息技术:1,美术:3,音乐:5};

/** 数字教材书目：readModeKeys 为后台配置的阅读模式，仅展示已配置的项（可省略或 [] 表示不展示） */
const BOOK_READ_MODES = [
  { key: 'read', label: '阅读模式' },
  { key: 'av', label: '视听模式' },
  { key: 'task', label: '任务模式' },
  { key: 'kg', label: '知识图谱' },
];

function resolveLibReadModes(b) {
  const keys = b && Array.isArray(b.readModeKeys) ? b.readModeKeys : [];
  if (!keys.length) return [];
  return keys.map((k) => BOOK_READ_MODES.find((a) => a.key === k)).filter(Boolean);
}

const MODE_ARROW_SVG_DETAIL =
  '<svg class="mode-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>';

/** 教材详情「学习模式」单卡（点击进入阅读器并选中对应模式） */
function detailModeCardHtml(modeKey) {
  const blocks = {
    read: {
      cls: 'mi-read',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
      name: '阅读模式',
      desc: '沉浸式阅读体验，支持批注、书签、笔记和划线标注',
    },
    av: {
      cls: 'mi-av',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
      name: '视听模式',
      desc: '配套微课视频、课文朗读、名师讲解音频资源',
    },
    task: {
      cls: 'mi-task',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
      name: '任务模式',
      desc: '章节练习、课后作业、自测试卷，自动批改与错题收集',
    },
    kg: {
      cls: 'mi-kg',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="5" y2="16"/><line x1="12" y1="8" x2="19" y2="16"/><line x1="5" y1="19" x2="19" y2="19"/></svg>',
      name: '知识图谱',
      desc: '可视化知识结构，智能关联跨章节概念与考点脉络',
    },
  };
  const m = blocks[modeKey];
  if (!m) return '';
  return `<div class="mode-card" onclick="openReaderFromDetailMode('${modeKey}')">
          <div class="mode-icon ${m.cls}">${m.icon}</div>
          <div class="mode-info">
            <div class="mode-name">${m.name}</div>
            <div class="mode-desc">${m.desc}</div>
          </div>
          ${MODE_ARROW_SVG_DETAIL}
        </div>`;
}

function detailLearningModesSectionHtml(modeEntries) {
  if (!modeEntries.length) return '';
  const cards = modeEntries.map((e) => detailModeCardHtml(e.key)).join('');
  if (!cards.trim()) return '';
  return `<div class="mode-section">
      <div class="intro-heading"><span class="bar"></span>学习模式</div>
      <div class="mode-grid">
        ${cards}
      </div>
    </div>`;
}

const books=[
  {t:'语文',s:'必修上册',g:'高一',p:'人民教育出版社',tp:'r',sub:'语文',paperDigital:true,editor:'温儒敏',readModeKeys:['read','av','task','kg']},
  {t:'语文',s:'必修下册',g:'高一',p:'人民教育出版社',tp:'r',sub:'语文',editor:'温儒敏',readModeKeys:['read','av','task']},
  {t:'数学',s:'必修第一册',g:'高一',p:'人民教育出版社',tp:'r',sub:'数学',paperDigital:true,editor:'章建跃 等',readModeKeys:['read','task']},
  {t:'数学',s:'必修第二册',g:'高一',p:'人民教育出版社',tp:'r',sub:'数学',editor:'章建跃 等',readModeKeys:['read']},
  {t:'英语',s:'必修第一册',g:'高一',p:'外语教学与研究出版社',tp:'r',sub:'英语',editor:'陈琳 等',readModeKeys:['read','av','task','kg']},
  {t:'英语',s:'必修第二册',g:'高一',p:'外语教学与研究出版社',tp:'r',sub:'英语',editor:'陈琳 等',readModeKeys:['read','av']},
  {t:'物理',s:'必修第一册',g:'高一',p:'人民教育出版社',tp:'r',sub:'物理',paperDigital:true,editor:'彭前程 等',readModeKeys:['read','av','task']},
  {t:'物理',s:'必修第二册',g:'高一',p:'人民教育出版社',tp:'r',sub:'物理',editor:'彭前程 等',readModeKeys:['read']},
  {t:'化学',s:'必修第一册',g:'高一',p:'人民教育出版社',tp:'r',sub:'化学',editor:'王晶 等',readModeKeys:['read','task','kg']},
  {t:'化学',s:'必修第二册',g:'高一',p:'人民教育出版社',tp:'r',sub:'化学',editor:'王晶 等'},
  {t:'生物',s:'必修一 分子与细胞',g:'高一',p:'人民教育出版社',tp:'r',sub:'生物',editor:'赵占良 等',readModeKeys:['read']},
  {t:'历史',s:'必修 中外历史纲要(上)',g:'高一',p:'人民教育出版社',tp:'r',sub:'历史',editor:'张海鹏 等',readModeKeys:['read','av','task','kg']},
  {t:'地理',s:'必修第一册',g:'高一',p:'人民教育出版社',tp:'r',sub:'地理',editor:'樊杰 等',readModeKeys:['read','av']},
  {t:'政治',s:'必修一 中国特色社会主义',g:'高一',p:'人民教育出版社',tp:'r',sub:'政治',editor:'秦宣 等',readModeKeys:['read','task']},
  {t:'信息技术',s:'必修一 数据与计算',g:'高一',p:'教育科学出版社',tp:'o',sub:'信息技术',paperDigital:true,editor:'李晓明 等',readModeKeys:['read','av','task','kg']},
  {t:'美术',s:'必修 美术鉴赏',g:'高一',p:'人民美术出版社',tp:'o',sub:'美术',editor:'黄宗贤 等',readModeKeys:['read','av']},
  {t:'音乐',s:'必修 音乐鉴赏',g:'高一',p:'人民音乐出版社',tp:'o',sub:'音乐',editor:'于润洋 等',readModeKeys:['read']},
  {t:'语文',s:'选择性必修上册',g:'高二',p:'人民教育出版社',tp:'r',sub:'语文',editor:'温儒敏',readModeKeys:['read','av','task','kg']},
  {t:'数学',s:'选择性必修第一册',g:'高二',p:'人民教育出版社',tp:'r',sub:'数学',editor:'章建跃 等',readModeKeys:['read','task','kg']},
  {t:'英语',s:'选择性必修第一册',g:'高二',p:'外语教学与研究出版社',tp:'r',sub:'英语',editor:'陈琳 等',readModeKeys:['read','av','task']},
  {t:'物理',s:'选择性必修第一册',g:'高二',p:'人民教育出版社',tp:'r',sub:'物理',editor:'彭前程 等',readModeKeys:['read','av','task','kg']},
  {t:'化学',s:'选择性必修一',g:'高二',p:'人民教育出版社',tp:'r',sub:'化学',editor:'王晶 等',readModeKeys:['read']},
  {t:'生物',s:'选择性必修一 稳态与调节',g:'高二',p:'人民教育出版社',tp:'r',sub:'生物',editor:'赵占良 等',readModeKeys:['read','task']},
  {t:'历史',s:'选择性必修一 国家制度',g:'高二',p:'人民教育出版社',tp:'r',sub:'历史',editor:'张海鹏 等',readModeKeys:['read','av','task','kg']},
];

const myB=[
  {t:'语文',s:'选择性必修上册',g:'高二',p:'人民教育出版社',tp:'r',sub:'语文',pr:78,paperDigital:true,editor:'温儒敏',actionKeys:['read','cloudHandout','teach','task','questionBank','internship','resourceLib','learnStats']},
  {t:'数学',s:'选择性必修第一册',g:'高二',p:'人民教育出版社',tp:'r',sub:'数学',pr:45,editor:'章建跃 等'},
  {t:'英语',s:'选择性必修第一册',g:'高二',p:'外语教学与研究出版社',tp:'r',sub:'英语',pr:92,paperDigital:true,editor:'陈琳 等',actionKeys:['read','task','questionBank','learnStats']},
  {t:'物理',s:'选择性必修第一册',g:'高二',p:'人民教育出版社',tp:'r',sub:'物理',pr:30,editor:'彭前程 等',actionKeys:['read','resourceLib']},
  {t:'化学',s:'选择性必修一',g:'高二',p:'人民教育出版社',tp:'r',sub:'化学',pr:15,editor:'王晶 等'},
  {t:'历史',s:'选择性必修一 国家制度',g:'高二',p:'人民教育出版社',tp:'r',sub:'历史',pr:60,paperDigital:true,editor:'张海鹏 等',actionKeys:['read','cloudHandout','teach','task','questionBank','internship','resourceLib','learnStats']},
];

function c(sub){return PAL[SM[sub]??0]}

/** 后台配置：是否为纸数融合教材 */
function isPaperDigital(b){return !!(b&&b.paperDigital)}

// Book descriptions
const DESC={
  '语文':'本教材以立德树人为根本任务，落实语文学科核心素养，精选古今中外优秀作品，涵盖诗歌、散文、小说、戏剧等多种文体。教材注重培养学生的语言建构与运用、思维发展与提升、审美鉴赏与创造、文化传承与理解等能力，引导学生在阅读与写作实践中提升语文素养。',
  '数学':'本教材遵循《普通高中数学课程标准》，系统介绍函数、几何与代数、概率与统计等核心内容。通过问题驱动的教学设计，注重数学抽象、逻辑推理、数学建模等核心素养的培养，帮助学生建立完整的数学知识体系。',
  '英语':'本教材围绕"人与自然""人与社会""人与自我"三大主题语境，设计真实的语言交际活动。采用任务型教学法，融合听说读写看五项技能训练，注重跨文化交际能力和英语思维品质的培养。',
  '物理':'本教材以物理学科核心素养为导向，涵盖力学、热学、电磁学等基础内容。通过实验探究和科学推理，培养学生的物理观念、科学思维、科学探究和科学态度，激发对自然规律的探索兴趣。',
  '化学':'本教材以"宏观辨识与微观探析"为核心，系统讲授物质结构、化学反应原理、有机化学基础等内容。注重实验探究与创新意识的培养，帮助学生理解化学与生活、社会的密切联系。',
  '生物':'本教材围绕生命的本质、生命活动的调节、生态系统等核心概念展开。通过观察、实验和探究活动，培养学生的生命观念、理性思维和社会责任感，理解生物学在现代社会中的重要作用。',
  '历史':'本教材以唯物史观为指导，系统梳理中外历史发展的基本脉络。通过丰富的史料和多元视角，培养学生的时空观念、史料实证、历史解释和家国情怀，提升历史学科核心素养。',
  '地理':'本教材以人地关系为主线，涵盖自然地理、人文地理和区域地理等内容。注重地理实践力的培养，引导学生用地理的眼光观察世界，理解人类活动与地理环境的相互关系。',
  '政治':'本教材以习近平新时代中国特色社会主义思想为指导，系统讲授中国特色社会主义理论与实践。培养学生的政治认同、科学精神、法治意识和公共参与等学科核心素养。',
  '信息技术':'本教材围绕数据与计算这一核心主题，介绍数据处理、算法设计、程序编写等基础知识。通过项目式学习，培养学生的信息意识、计算思维、数字化学习与创新能力。',
  '美术':'本教材精选中外经典美术作品，涵盖绘画、雕塑、建筑、设计等领域。通过鉴赏与实践相结合的方式，培养学生的审美感知、艺术表现和文化理解能力。',
  '音乐':'本教材精选中外经典音乐作品，涵盖声乐、器乐、戏曲等多种形式。通过聆听、演唱和音乐分析，培养学生的音乐审美感知和文化理解能力。',
};

// TOC data per subject
const TOC={
  '语文':[
    {u:'第一单元 青春的价值',ls:['1 沁园春·长沙','2 立在地球边上放号','3 峨日朵雪峰之侧','4 致云雀']},
    {u:'第二单元 劳动光荣',ls:['5 喜看稻菽千重浪','6 心有一团火，温暖众人心','7 "探界者"钟扬']},
    {u:'第三单元 生命的诗意',ls:['8 短歌行','9 归园田居（其一）','10 梦游天姥吟留别','11 登高','12 琵琶行']},
    {u:'第四单元 家乡文化',ls:['13 故都的秋','14 荷塘月色','15 我与地坛（节选）']},
  ],
  '数学':[
    {u:'第一章 集合与常用逻辑用语',ls:['1.1 集合的概念','1.2 集合间的基本关系','1.3 集合的基本运算','1.4 充分条件与必要条件']},
    {u:'第二章 一元二次函数、方程和不等式',ls:['2.1 等式性质与不等式性质','2.2 基本不等式','2.3 二次函数与一元二次方程、不等式']},
    {u:'第三章 函数的概念与性质',ls:['3.1 函数的概念及其表示','3.2 函数的基本性质','3.3 幂函数','3.4 函数的应用（一）']},
    {u:'第四章 指数函数与对数函数',ls:['4.1 指数','4.2 指数函数','4.3 对数','4.4 对数函数','4.5 函数的应用（二）']},
  ],
  '英语':[
    {u:'Unit 1 Teenage Life',ls:['Reading and Thinking','Discovering Useful Structures','Listening and Talking','Reading for Writing']},
    {u:'Unit 2 Travelling Around',ls:['Reading and Thinking','Discovering Useful Structures','Listening and Talking','Reading for Writing']},
    {u:'Unit 3 Sports and Fitness',ls:['Reading and Thinking','Discovering Useful Structures','Listening and Talking','Reading for Writing']},
    {u:'Unit 4 Natural Disasters',ls:['Reading and Thinking','Discovering Useful Structures','Listening and Talking','Reading for Writing']},
  ],
  '物理':[
    {u:'第一章 运动的描述',ls:['1.1 质点 参考系','1.2 时间 位移','1.3 位置变化快慢的描述——速度','1.4 速度变化快慢的描述——加速度']},
    {u:'第二章 匀变速直线运动的研究',ls:['2.1 实验：探究小车速度随时间变化的规律','2.2 匀变速直线运动的速度与时间的关系','2.3 匀变速直线运动的位移与时间的关系','2.4 自由落体运动']},
    {u:'第三章 相互作用——力',ls:['3.1 重力与弹力','3.2 摩擦力','3.3 牛顿第三定律']},
  ],
  '化学':[
    {u:'第一章 物质及其变化',ls:['1.1 物质的分类及转化','1.2 离子反应','1.3 氧化还原反应']},
    {u:'第二章 海水中的重要元素——钠和氯',ls:['2.1 钠及其化合物','2.2 氯及其化合物','2.3 物质的量']},
    {u:'第三章 铁 金属材料',ls:['3.1 铁及其化合物','3.2 金属材料']},
  ],
  '生物':[
    {u:'第一章 走近细胞',ls:['1.1 细胞是生命活动的基本单位','1.2 细胞的多样性和统一性']},
    {u:'第二章 组成细胞的分子',ls:['2.1 细胞中的元素和化合物','2.2 细胞中的无机物','2.3 细胞中的糖类和脂质','2.4 蛋白质是生命活动的主要承担者','2.5 核酸是遗传信息的携带者']},
    {u:'第三章 细胞的基本结构',ls:['3.1 细胞膜的结构和功能','3.2 细胞器之间的分工合作','3.3 细胞核的结构和功能']},
  ],
  '历史':[
    {u:'第一单元 从中华文明起源到秦汉统一多民族封建国家的建立与巩固',ls:['1 中华文明的起源与早期国家','2 诸侯纷争与变法运动','3 秦统一多民族封建国家的建立','4 西汉与东汉——统一多民族封建国家的巩固']},
    {u:'第二单元 三国两晋南北朝的民族交融与隋唐统一多民族封建国家的发展',ls:['5 三国两晋南北朝的政权更迭与民族交融','6 从隋唐盛世到五代十国','7 隋唐制度的变化与创新']},
    {u:'第三单元 辽宋夏金多民族政权的并立与元朝的统一',ls:['8 两宋的政治和军事','9 辽夏金元的统治','10 辽宋夏金元的经济与社会']},
  ],
  '地理':[
    {u:'第一章 宇宙中的地球',ls:['1.1 地球的宇宙环境','1.2 太阳对地球的影响','1.3 地球的历史','1.4 地球的圈层结构']},
    {u:'第二章 地球上的大气',ls:['2.1 大气的组成和垂直分层','2.2 大气受热过程和大气运动','2.3 常见天气系统']},
    {u:'第三章 地球上的水',ls:['3.1 水循环','3.2 海水的性质','3.3 海水的运动']},
  ],
  '政治':[
    {u:'第一课 社会主义从空想到科学',ls:['1.1 原始社会的解体和阶级社会的演进','1.2 科学社会主义的理论与实践']},
    {u:'第二课 只有社会主义才能救中国',ls:['2.1 新民主主义革命的胜利','2.2 社会主义制度在中国的确立']},
    {u:'第三课 只有中国特色社会主义才能发展中国',ls:['3.1 伟大的改革开放','3.2 中国特色社会主义的创立、发展和完善']},
  ],
};

// Prices
const PRICES={语文:18.90,数学:22.50,英语:24.00,物理:20.80,化学:19.50,生物:18.00,历史:17.50,地理:16.80,政治:17.00,信息技术:25.00,美术:15.50,音乐:14.00};

/** 数字教材：未购时默认可试读目录前 N 条，其余锁定；演示内「立即购买」写入会话 */
const LIB_PREVIEW_LESSON_COUNT = 2;
const libPurchasedBookKeys = new Set();
function libBookKey(b) {
  return b ? `${b.t}|${b.s}` : '';
}
function isLibBookPurchased(b) {
  return !!(b && libPurchasedBookKeys.has(libBookKey(b)));
}
let detailViewContext = { bookIdx: null, source: null, b: null };

// === CLASS GROUP DATA ===
const CURRENT_USER = '李明远';

const SCHOOL_STORAGE_KEY = 'sc-digital-school';
const SCHOOL_CODE_MAP = {
  CD7Z2026: '成都市第七中学',
  SCDEMO001: '四川省示范中学',
  SCH2026SC: '四川师范大学附属中学',
};

function normalizeSchoolCode(s) {
  return String(s).replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}

function getBoundSchool() {
  try {
    const raw = localStorage.getItem(SCHOOL_STORAGE_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (o && typeof o.name === 'string' && o.name) return o;
  } catch (_) {}
  return null;
}

function setBoundSchool(school) {
  if (school) localStorage.setItem(SCHOOL_STORAGE_KEY, JSON.stringify(school));
  else localStorage.removeItem(SCHOOL_STORAGE_KEY);
}

function resolveSchoolName(code) {
  const n = normalizeSchoolCode(code);
  if (SCHOOL_CODE_MAP[n]) return SCHOOL_CODE_MAP[n];
  const t = code.trim();
  if (t.length <= 10) return `合作学校（${t}）`;
  return `合作学校（${t.slice(0, 10)}…）`;
}

let schoolModalMode = 'bind';

function openSchoolModal(mode) {
  schoolModalMode = mode === 'change' ? 'change' : 'bind';
  const input = document.getElementById('schoolActivationCode');
  const school = getBoundSchool();
  if (input) {
    input.value = schoolModalMode === 'change' && school ? school.code : '';
    input.classList.remove('school-modal-input--err');
  }
  document.getElementById('schoolModalOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => input?.focus(), 100);
}

function closeSchoolModal() {
  document.getElementById('schoolModalOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function confirmSchoolBind() {
  const input = document.getElementById('schoolActivationCode');
  const raw = (input?.value || '').trim();
  if (raw.length < 4) {
    input?.classList.add('school-modal-input--err');
    setTimeout(() => input?.classList.remove('school-modal-input--err'), 1500);
    return;
  }
  const name = resolveSchoolName(raw);
  setBoundSchool({ name, code: raw });
  closeSchoolModal();
  refreshSchoolDependentPages();
  const toast = document.createElement('div');
  toast.style.cssText =
    'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--deep);color:white;padding:14px 28px;border-radius:12px;font-size:13px;z-index:320;box-shadow:0 8px 30px rgba(0,0,0,0.15);animation:fadeUp 0.3s ease;display:flex;align-items:center;gap:10px';
  toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>已绑定：${name}`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

function clearSchoolBind() {
  setBoundSchool(null);
  refreshSchoolDependentPages();
  const toast = document.createElement('div');
  toast.style.cssText =
    'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--deep);color:white;padding:14px 28px;border-radius:12px;font-size:13px;z-index:320;box-shadow:0 8px 30px rgba(0,0,0,0.15);animation:fadeUp 0.3s ease';
  toast.textContent = '已解除学校绑定';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

const PROFILE_STORAGE_KEY = 'sc-user-profile';
const DEFAULT_USER_PROFILE = {
  nickname: '李明远',
  phone: '13800138000',
  roleLine: '成都七中 · 高二教师',
  avatarDataUrl: '',
};

function getUserProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_USER_PROFILE };
    const o = JSON.parse(raw);
    return { ...DEFAULT_USER_PROFILE, ...o };
  } catch (_) {
    return { ...DEFAULT_USER_PROFILE };
  }
}

function saveUserProfile(partial) {
  const next = { ...getUserProfile(), ...partial };
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
  syncSidebarUser();
}

function escAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function syncSidebarUser() {
  const u = getUserProfile();
  const av = document.getElementById('sidebarAvatar') || document.querySelector('.sidebar-foot .avatar');
  if (av) {
    if (u.avatarDataUrl) {
      av.style.backgroundImage = `url(${JSON.stringify(u.avatarDataUrl)})`;
      av.style.backgroundSize = 'cover';
      av.style.backgroundPosition = 'center';
      av.textContent = '';
    } else {
      av.style.backgroundImage = '';
      av.style.backgroundSize = '';
      av.style.backgroundPosition = '';
      const n = (u.nickname && u.nickname.trim()) ? u.nickname.trim().slice(0, 1) : '用';
      av.textContent = n;
    }
  }
  const nameEl = document.getElementById('sidebarUserName') || document.querySelector('.sidebar-foot .user-name');
  if (nameEl) nameEl.textContent = u.nickname || DEFAULT_USER_PROFILE.nickname;
  const schoolEl = document.getElementById('sidebarUserSchool');
  const sch = getBoundSchool();
  if (schoolEl) {
    schoolEl.textContent = sch && sch.name ? sch.name : '成都市第七中学（演示）';
    schoolEl.hidden = false;
  }
}

function refreshSchoolDependentPages() {
  if (document.getElementById('page-my')?.classList.contains('active')) renderMy();
  if (document.getElementById('page-settings')?.classList.contains('active')) renderSettings();
  syncSidebarUser();
}

/** 设置页 — 用户反馈待上传图片（演示，提交后对接 FormData 接口） */
let feedbackDraftFiles = [];

function resetFeedbackDraft() {
  feedbackDraftFiles = [];
}

function onFeedbackFilesChange(e) {
  const input = e.target;
  const picked = Array.from(input.files || []);
  input.value = '';
  for (const f of picked) {
    if (feedbackDraftFiles.length >= 6) break;
    if (!/^image\//.test(f.type)) continue;
    if (f.size > 4 * 1024 * 1024) {
      showProfileToast('单张图片请小于 4MB');
      continue;
    }
    feedbackDraftFiles.push(f);
  }
  renderFeedbackPreview();
}

function removeFeedbackImage(idx) {
  feedbackDraftFiles.splice(idx, 1);
  renderFeedbackPreview();
}

function renderFeedbackPreview() {
  const box = document.getElementById('feedbackModalPreview');
  if (!box) return;
  box.querySelectorAll('.feedback-thumb').forEach((img) => {
    if (img.src.startsWith('blob:')) URL.revokeObjectURL(img.src);
  });
  box.innerHTML = feedbackDraftFiles
    .map(
      (f, i) => `
    <div class="feedback-thumb-wrap">
      <img class="feedback-thumb" src="${URL.createObjectURL(f)}" alt="">
      <button type="button" class="feedback-thumb-remove" onclick="removeFeedbackImage(${i})" aria-label="移除">×</button>
    </div>`
    )
    .join('');
}

function openFeedbackModal() {
  resetFeedbackDraft();
  const ta = document.getElementById('feedbackModalText');
  const fi = document.getElementById('feedbackModalFileInput');
  if (ta) ta.value = '';
  if (fi) fi.value = '';
  renderFeedbackPreview();
  document.getElementById('feedbackModalOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => ta?.focus(), 100);
}

function closeFeedbackModal() {
  document.getElementById('feedbackModalOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
  resetFeedbackDraft();
  const ta = document.getElementById('feedbackModalText');
  const fi = document.getElementById('feedbackModalFileInput');
  if (ta) ta.value = '';
  if (fi) fi.value = '';
  renderFeedbackPreview();
}

function submitUserFeedback() {
  const ta = document.getElementById('feedbackModalText');
  const text = (ta && ta.value.trim()) || '';
  if (!text && feedbackDraftFiles.length === 0) {
    showProfileToast('请填写反馈内容或上传图片');
    return;
  }
  const fd = new FormData();
  fd.append('content', text);
  fd.append('client', 'web-demo');
  feedbackDraftFiles.forEach((f, i) => fd.append(`image_${i}`, f, f.name));
  console.log('[用户反馈·演示]', {
    content: text,
    images: feedbackDraftFiles.map((f) => ({ name: f.name, size: f.size })),
  });
  closeFeedbackModal();
  showProfileToast('反馈已提交，我们会尽快处理（演示）');
}

function showProfileToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText =
    'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--deep);color:white;padding:14px 28px;border-radius:12px;font-size:13px;z-index:320;box-shadow:0 8px 30px rgba(0,0,0,0.15);animation:fadeUp 0.3s ease';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

function renderSettings() {
  const u = getUserProfile();
  const sch = getBoundSchool();
  const schoolHtml = sch
    ? `<div class="settings-school-line"><span class="settings-school-name">${escAttr(sch.name)}</span><span class="settings-school-sub">已绑定</span></div>
       <div class="settings-school-actions">
         <button type="button" class="btn-settings-ghost" onclick="openSchoolModal('change')">更换学校</button>
         <button type="button" class="settings-link-danger" onclick="clearSchoolBind()">解除绑定</button>
       </div>`
    : `<div class="settings-school-line muted">未绑定学校</div>
       <div class="settings-school-actions">
         <button type="button" class="btn-settings-primary" onclick="openSchoolModal('bind')">绑定学校</button>
       </div>`;

  const avLetter = escAttr((u.nickname && u.nickname.trim()) ? u.nickname.trim().slice(0, 1) : '用');

  document.getElementById('page-settings').innerHTML = `
    <div class="settings-page">
      <div class="settings-card">
        <h2 class="settings-card-title">个人信息</h2>
        <div class="settings-profile-block">
          <div class="settings-avatar-col">
            <div class="settings-avatar${u.avatarDataUrl ? ' settings-avatar--img' : ''}" id="settingsAvatarDisplay">${u.avatarDataUrl ? '' : avLetter}</div>
            <input type="file" id="settingsAvatarInput" accept="image/jpeg,image/png,image/webp,image/gif" style="display:none" onchange="handleSettingsAvatar(event)">
            <button type="button" class="btn-settings-text" onclick="document.getElementById('settingsAvatarInput').click()">更换头像</button>
            <p class="settings-hint">支持 JPG、PNG，建议小于 2MB</p>
          </div>
          <div class="settings-fields-col">
            <label class="settings-label" for="settingsNickname">昵称</label>
            <input type="text" id="settingsNickname" class="settings-input" maxlength="32" value="${escAttr(u.nickname)}" placeholder="请输入昵称" autocomplete="nickname">
            <label class="settings-label">学校 <span class="settings-optional">（选填）</span></label>
            ${schoolHtml}
          </div>
        </div>
      </div>
      <div class="settings-card">
        <h2 class="settings-card-title">账户信息</h2>
        <label class="settings-label" for="settingsPhone">手机号</label>
        <input type="tel" id="settingsPhone" class="settings-input" maxlength="11" value="${escAttr(u.phone)}" placeholder="11 位手机号码" autocomplete="tel">
        <p class="settings-hint">用于登录与安全验证，修改后请牢记新号码</p>
        <button type="button" class="btn-settings-save" onclick="saveSettingsProfile()">保存资料</button>
      </div>
      <div class="settings-card settings-card--compact">
        <h2 class="settings-card-title">安全</h2>
        <button type="button" class="settings-row-action" onclick="openPasswordModal()">
          <span>修改密码</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
      <div class="settings-card settings-card--compact">
        <h2 class="settings-card-title">帮助与反馈</h2>
        <button type="button" class="settings-row-action" onclick="openFeedbackModal()">
          <span>用户反馈</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
      <div class="settings-logout-wrap">
        <button type="button" class="btn-settings-logout" onclick="logoutAccount()">退出账号</button>
      </div>
    </div>`;
  const avDisp = document.getElementById('settingsAvatarDisplay');
  if (avDisp && u.avatarDataUrl) {
    avDisp.style.backgroundImage = `url(${JSON.stringify(u.avatarDataUrl)})`;
    avDisp.classList.add('settings-avatar--img');
    avDisp.textContent = '';
  }
}

function saveSettingsProfile() {
  const nick = document.getElementById('settingsNickname')?.value.trim() || '';
  const phone = document.getElementById('settingsPhone')?.value.trim() || '';
  if (!nick) {
    showProfileToast('请填写昵称');
    return;
  }
  if (phone && !/^1\d{10}$/.test(phone)) {
    showProfileToast('请输入正确的 11 位手机号');
    return;
  }
  saveUserProfile({ nickname: nick, phone });
  showProfileToast('资料已保存');
  renderSettings();
}

function handleSettingsAvatar(e) {
  const f = e.target.files && e.target.files[0];
  e.target.value = '';
  if (!f || !/^image\//.test(f.type)) return;
  if (f.size > 2 * 1024 * 1024) {
    showProfileToast('图片请小于 2MB');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    saveUserProfile({ avatarDataUrl: reader.result });
    showProfileToast('头像已更新');
    renderSettings();
  };
  reader.readAsDataURL(f);
}

function openPasswordModal() {
  const o = document.getElementById('pwdOld');
  const a = document.getElementById('pwdNew');
  const b = document.getElementById('pwdNew2');
  const err = document.getElementById('pwdModalErr');
  if (o) o.value = '';
  if (a) a.value = '';
  if (b) b.value = '';
  if (err) err.textContent = '';
  document.getElementById('pwdModalOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePasswordModal() {
  document.getElementById('pwdModalOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function confirmPasswordChange() {
  const oldP = document.getElementById('pwdOld')?.value || '';
  const n1 = document.getElementById('pwdNew')?.value || '';
  const n2 = document.getElementById('pwdNew2')?.value || '';
  const errEl = document.getElementById('pwdModalErr');
  if (!oldP) {
    if (errEl) errEl.textContent = '请输入当前密码';
    return;
  }
  if (n1.length < 6) {
    if (errEl) errEl.textContent = '新密码至少 6 位';
    return;
  }
  if (n1 !== n2) {
    if (errEl) errEl.textContent = '两次输入的新密码不一致';
    return;
  }
  if (errEl) errEl.textContent = '';
  closePasswordModal();
  showProfileToast('密码已更新（演示）');
}

function logoutAccount() {
  if (!confirm('确定退出当前账号？未同步的数据可能丢失。')) return;
  localStorage.removeItem(PROFILE_STORAGE_KEY);
  localStorage.removeItem(SCHOOL_STORAGE_KEY);
  syncSidebarUser();
  showProfileToast('已退出账号');
  go('library');
}

const classGroups=[
  {
    id:1,name:'高二（3）班语文研读组',subject:'语文',desc:'语文选择性必修课程深度研读',
    code:'SCH2-YWRD',created:'2026-03-15',admin:'李明远',
    books:[
      {t:'语文',s:'选择性必修上册',g:'高二',p:'人民教育出版社',sub:'语文'},
      {t:'语文',s:'必修下册',g:'高一',p:'人民教育出版社',sub:'语文'},
      {t:'数学',s:'选择性必修第一册',g:'高二',p:'人民教育出版社',sub:'数学'},
    ],
    students:[
      {name:'王思涵',id:'2024030101',bp:[95,88,72],last:'今天'},
      {name:'张子墨',id:'2024030102',bp:[82,79,68],last:'今天'},
      {name:'刘雨桐',id:'2024030103',bp:[78,65,61],last:'昨天'},
      {name:'陈思远',id:'2024030104',bp:[70,60,58],last:'昨天'},
      {name:'赵梓涵',id:'2024030105',bp:[66,55,52],last:'2天前'},
      {name:'孙晓彤',id:'2024030106',bp:[62,50,48],last:'2天前'},
      {name:'周文博',id:'2024030107',bp:[55,48,44],last:'3天前'},
      {name:'吴思琪',id:'2024030108',bp:[50,40,39],last:'3天前'},
      {name:'郑浩然',id:'2024030109',bp:[42,35,33],last:'4天前'},
      {name:'马欣怡',id:'2024030110',bp:[35,28,30],last:'5天前'},
      {name:'黄子轩',id:'2024030111',bp:[28,20,25],last:'6天前'},
      {name:'林雅琪',id:'2024030112',bp:[22,15,20],last:'1周前'},
    ]
  },
  {
    id:2,name:'高二数学提高班',subject:'数学',desc:'选择性必修函数与导数专题',
    code:'SCH2-SXTG',created:'2026-03-20',admin:'李明远',
    books:[
      {t:'数学',s:'选择性必修第一册',g:'高二',p:'人民教育出版社',sub:'数学'},
    ],
    students:[
      {name:'李泽宇',id:'2024030201',bp:[88],last:'今天'},
      {name:'杨思涵',id:'2024030202',bp:[82],last:'今天'},
      {name:'何子豪',id:'2024030203',bp:[75],last:'昨天'},
      {name:'罗雨萱',id:'2024030204',bp:[70],last:'昨天'},
      {name:'谢明轩',id:'2024030205',bp:[62],last:'2天前'},
      {name:'韩思琪',id:'2024030206',bp:[55],last:'3天前'},
      {name:'唐文杰',id:'2024030207',bp:[48],last:'4天前'},
      {name:'曹雅婷',id:'2024030208',bp:[40],last:'5天前'},
    ]
  },
  {
    id:3,name:'高二英语共读组',subject:'英语',desc:'选择性必修同步阅读训练',
    code:'SCH2-ENRD',created:'2026-04-02',admin:'刘芳',
    books:[
      {t:'英语',s:'选择性必修第一册',g:'高二',p:'外语教学与研究出版社',sub:'英语'},
    ],
    students:[
      {name:'周洋',id:'2024030301',bp:[90],last:'今天'},
      {name:'吴静',id:'2024030302',bp:[76],last:'昨天'},
      {name:'李明远',id:'2024030303',bp:[68],last:'昨天'},
    ]
  },
];

/** 当前用户可见的班级：创建者或已加入的成员 */
function isClassVisibleForUser(cls) {
  return cls.admin === CURRENT_USER || cls.students.some((s) => s.name === CURRENT_USER);
}

/** 班级教材条目与「我的教材」是否为同一本书（与添加教材逻辑一致） */
function classBookMatchesMyBook(cb, b) {
  return cb.t === b.t && cb.s === b.s;
}

/** 本书被哪些（当前用户可见的）班级用作教材，一书可对应多班 */
function getClassNamesForMyBook(b) {
  const names = [];
  for (const cls of classGroups) {
    if (!isClassVisibleForUser(cls)) continue;
    if (cls.books.some((cb) => classBookMatchesMyBook(cb, b))) names.push(cls.name);
  }
  return names;
}

/** 教材详情弹层 — 运用于组群（仅「我的教材」） */
function mkDetailGroupUseHtml(b) {
  const names = getClassNamesForMyBook(b);
  if (!names.length) {
    return `<div class="detail-group-use">
      <div class="detail-group-use-label">运用于组群</div>
      <p class="detail-group-use-empty">暂未关联组群</p>
    </div>`;
  }
  return `<div class="detail-group-use">
    <div class="detail-group-use-label">运用于组群</div>
    <div class="detail-group-tags" title="${names.map(escAttr).join('、')}">
      ${names.map((n) => `<span class="detail-group-tag">${escAttr(n)}</span>`).join('')}
    </div>
  </div>`;
}

function refreshMyPageIfActive() {
  if (document.getElementById('page-my')?.classList.contains('active')) renderMy();
}

const AVATAR_COLORS=[
  ['#4aaa85','#78c8a8'],['#4a8ec8','#7ab4de'],['#d48548','#e8a870'],
  ['#8a60b8','#aa88d0'],['#c85a72','#e08898'],['#b8a030','#d0c060'],
  ['#4a98b0','#78bcd0'],['#98804a','#b8a878'],
];

function openDetail(bookIdx, source){
  const list = source === 'my' ? myB : books;
  const b = list[bookIdx];
  detailViewContext = { bookIdx, source, b };
  const [c1,c2] = c(b.sub);
  const price = PRICES[b.sub] || 19.90;
  const isMine = source === 'my';
  const libUnlocked = source === 'lib' && isLibBookPurchased(b);
  const tocFullAccess = isMine || libUnlocked;

  // Hero
  document.getElementById('detailHero').innerHTML = `
    <div class="detail-cover">
      <div class="cover-inner" style="background:linear-gradient(145deg,${c1},${c2})">
        <div class="cover-name">${b.t}</div>
        <div class="cover-sub">${b.s}</div>
      </div>
    </div>
    <div class="detail-info">
      <div class="detail-book-title">${b.t} · ${b.s}</div>
      <div class="detail-book-sub">${b.g}${isPaperDigital(b)?' · <span class="detail-pd-badge">纸数融合</span>':''}</div>
      <div class="detail-meta-grid">
        <div class="meta-item"><span class="meta-label">出版社</span><span class="meta-value">${b.p}</span></div>
        <div class="meta-item"><span class="meta-label">主编</span><span class="meta-value">${(b&&b.editor)?b.editor:'—'}</span></div>
        <div class="meta-item"><span class="meta-label">ISBN</span><span class="meta-value">978-7-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1+Math.random()*9)}</span></div>
      </div>
      ${isMine ? mkDetailGroupUseHtml(b) : ''}
      <div class="detail-actions">
        ${isMine
          ? `<button class="btn-buy purchased">已购买</button>
             <button class="btn-print" onclick="handlePrint(event)">
               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
               打印教材
             </button>`
          : libUnlocked
            ? `<button type="button" class="btn-buy purchased" disabled>已购买</button>`
            : `<button type="button" class="btn-buy" onclick="handleBuy(this)">立即购买</button>
             <button type="button" class="btn-trial" onclick="openRedeem()">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="margin-right:4px;vertical-align:-2px"><path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="M16 2v6M8 2v6"/></svg>兑换码
             </button>
             <button type="button" class="btn-trial">免费试读</button>
             <span class="detail-price">¥${price.toFixed(2)}</span>
             <span class="detail-price-orig">¥${(price*1.5).toFixed(2)}</span>`
        }
        <button type="button" class="btn-enter-reader" onclick="openReaderFromDetail()">进入阅读</button>
      </div>
    </div>`;

  // Intro（我的教材：四种学习模式；数字教材：按 readModeKeys 展示）
  const desc = DESC[b.sub] || '本教材严格按照国家课程标准编写，内容科学规范，注重学科核心素养的培养。';
  const modeSectionHtml = isMine
    ? detailLearningModesSectionHtml(BOOK_READ_MODES)
    : detailLearningModesSectionHtml(resolveLibReadModes(b));

  document.getElementById('pane-intro').innerHTML = `
    ${modeSectionHtml}
    <div class="intro-section" ${modeSectionHtml ? 'style="margin-top:28px"' : ''}>
      <div class="intro-heading"><span class="bar"></span>教材简介</div>
      <div class="intro-text">${desc}</div>
    </div>
    <div class="intro-section">
      <div class="intro-heading"><span class="bar"></span>教材特色</div>
      <div class="intro-text">本教材具有以下特色：紧扣课程标准，科学设计教学内容；注重情境创设，激发学习兴趣；设置多样化练习，巩固知识要点；融入信息技术，支持数字化学习。配套丰富的数字资源，包括教学课件、微课视频、在线练习等。</div>
      <div class="intro-tags">
        <span class="intro-tag">${b.g}</span>
        ${isPaperDigital(b)?'<span class="intro-tag intro-tag--pd">纸数融合</span>':''}
        <span class="intro-tag">数字版</span>
        <span class="intro-tag">配套资源</span>
        <span class="intro-tag">课程标准</span>
      </div>
    </div>`;

  // TOC（商城未购：前 LIB_PREVIEW_LESSON_COUNT 条可试读，其余带锁；已购/我的教材：全部开放）
  const toc = TOC[b.sub] || [{u:'第一单元',ls:['第1课','第2课','第3课']},{u:'第二单元',ls:['第4课','第5课','第6课']}];
  const tocColor = c1;
  let lessonSeq = 0;
  const lockSvg = `<svg class="toc-lesson-lock" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
  document.getElementById('pane-toc').innerHTML = `
    ${source === 'lib' && !tocFullAccess ? `<p class="toc-trial-hint">试读：未购买时默认可阅读前 <strong>${LIB_PREVIEW_LESSON_COUNT}</strong> 条目录；购买本教材后解锁全部章节。</p>` : ''}
    <ul class="toc-list">
      ${toc.map((unit,ui) => `
        <li class="toc-unit${ui===0?' open':''}">
          <div class="toc-unit-head" onclick="toggleUnit(this)">
            <span class="toc-unit-num" style="background:${tocColor}15;color:${tocColor}">${ui+1}</span>
            <span>${unit.u}</span>
            <svg class="toc-unit-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          <div class="toc-lessons">
            ${unit.ls.map((l) => {
              const locked = !tocFullAccess && lessonSeq >= LIB_PREVIEW_LESSON_COUNT;
              lessonSeq += 1;
              return `
              <div class="toc-lesson${locked ? ' toc-lesson--locked' : ''}"${locked ? ' onclick="onTocLockedClick(event)" role="button" tabindex="0"' : ''}>
                <span class="toc-lesson-dot" style="background:${tocColor}"></span>
                <span class="toc-lesson-text">${l}</span>
                ${locked ? lockSvg : ''}
              </div>`;
            }).join('')}
          </div>
        </li>`).join('')}
    </ul>`;

  // Reset tabs
  document.querySelectorAll('.detail-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab==='intro'));
  document.querySelectorAll('.tab-pane').forEach(p=>p.classList.toggle('active',p.id==='pane-intro'));

  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeDetail(){
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow='';
}

function switchTab(tab){
  document.querySelectorAll('.detail-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  document.querySelectorAll('.tab-pane').forEach(p=>p.classList.toggle('active',p.id===`pane-${tab}`));
}

function toggleUnit(el){
  el.parentElement.classList.toggle('open');
}

function handleBuy(btn){
  const { source, b, bookIdx } = detailViewContext;
  if (source === 'lib' && b) {
    libPurchasedBookKeys.add(libBookKey(b));
    openDetail(bookIdx, 'lib');
    showProfileToast('购买成功，已解锁全部章节（演示）');
    return;
  }
  btn.textContent='已购买';
  btn.classList.add('purchased');
  const actions = btn.parentElement;
  const trial = actions.querySelector('.btn-trial');
  const price = actions.querySelector('.detail-price');
  const orig = actions.querySelector('.detail-price-orig');
  if(trial) trial.style.display='none';
  if(price) price.style.display='none';
  if(orig) orig.style.display='none';
}

function onTocLockedClick(e) {
  e.preventDefault();
  e.stopPropagation();
  showProfileToast('该章节需购买教材后解锁');
}

// Close on Escape
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    if(document.getElementById('readerOverlay')?.classList.contains('open')){closeReader();return;}
    closeRedeem();closeDetail();closeCreateClass();closeClassDetail();closeBookPicker();closeJoinClass();closeSchoolModal();closePasswordModal();closeFeedbackModal();
  }
});

// Redeem code
function openRedeem(){
  document.getElementById('redeemForm').style.display='block';
  document.getElementById('redeemSuccess').classList.remove('show');
  document.getElementById('redeemCode').value='';
  document.getElementById('redeemOverlay').classList.add('open');
}

function closeRedeem(){
  document.getElementById('redeemOverlay').classList.remove('open');
}

function doRedeem(){
  const code=document.getElementById('redeemCode').value.trim();
  if(code.length<4){
    document.getElementById('redeemCode').style.borderColor='var(--rose-deep)';
    document.getElementById('redeemCode').style.boxShadow='0 0 0 3px rgba(196,92,116,0.1)';
    setTimeout(()=>{
      document.getElementById('redeemCode').style.borderColor='';
      document.getElementById('redeemCode').style.boxShadow='';
    },1500);
    return;
  }
  document.getElementById('redeemForm').style.display='none';
  document.getElementById('redeemSuccess').classList.add('show');
  setTimeout(()=>closeRedeem(),2000);
}

// Auto-format redeem code (add dashes)
document.getElementById('redeemCode').addEventListener('input',function(e){
  let v=this.value.replace(/[^A-Za-z0-9]/g,'').toUpperCase();
  if(v.length>16) v=v.slice(0,16);
  let formatted='';
  for(let i=0;i<v.length;i++){
    if(i>0 && i%4===0) formatted+='-';
    formatted+=v[i];
  }
  this.value=formatted;
});

// Print
function handlePrint(e){
  e&&e.stopPropagation();
  const btn=e.target.closest('.btn-print');
  const orig=btn.innerHTML;
  btn.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> 已发送至打印队列';
  btn.style.color='var(--mint-deep)';
  btn.style.borderColor='var(--mint-mid)';
  btn.style.background='var(--mint)';
  setTimeout(()=>{
    btn.innerHTML=orig;
    btn.style.color='';
    btn.style.borderColor='';
    btn.style.background='';
  },2500);
}

// === CLASS GROUP FUNCTIONS ===
function openCreateClass(){
  document.getElementById('ccmName').value='';
  document.getElementById('ccmDesc').value='';
  document.getElementById('createClassOverlay').classList.add('open');
}
function closeCreateClass(){
  document.getElementById('createClassOverlay').classList.remove('open');
}
function doCreateClass(){
  const name=document.getElementById('ccmName').value.trim();
  if(!name){
    document.getElementById('ccmName').style.borderColor='var(--rose-deep)';
    document.getElementById('ccmName').style.boxShadow='0 0 0 3px rgba(196,92,116,0.1)';
    setTimeout(()=>{document.getElementById('ccmName').style.borderColor='';document.getElementById('ccmName').style.boxShadow=''},1500);
    return;
  }
  const sub=document.getElementById('ccmSubject').value;
  const desc=document.getElementById('ccmDesc').value.trim();
  const code='SC'+String.fromCharCode(65+Math.floor(Math.random()*26))+Math.floor(Math.random()*9)+'-'+sub.slice(0,2).toUpperCase()+Math.floor(1000+Math.random()*9000);
  classGroups.push({id:Date.now(),name,subject:sub,desc:desc||sub+'学习小组',code,created:new Date().toISOString().slice(0,10),admin:'李明远',books:[],students:[]});
  closeCreateClass();
  renderMy();
  // success toast
  const toast=document.createElement('div');
  toast.style.cssText='position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--deep);color:white;padding:14px 28px;border-radius:12px;font-size:13px;z-index:300;box-shadow:0 8px 30px rgba(0,0,0,0.15);animation:fadeUp 0.3s ease;display:flex;align-items:center;gap:10px';
  toast.innerHTML=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>班级「${name}」创建成功`;
  document.body.appendChild(toast);
  setTimeout(()=>{toast.style.opacity='0';toast.style.transition='opacity 0.3s';setTimeout(()=>toast.remove(),300)},2000);
}

function normalizeInviteCode(s){
  return String(s).replace(/[^A-Za-z0-9]/g,'').toUpperCase();
}

function openJoinClass(){
  const input=document.getElementById('joinClassCode');
  if(input)input.value='';
  const err=document.getElementById('joinClassErr');
  if(err)err.textContent='';
  const form=document.getElementById('joinClassForm');
  if(form)form.style.display='block';
  const ok=document.getElementById('joinClassSuccess');
  if(ok)ok.classList.remove('show');
  document.getElementById('joinClassOverlay').classList.add('open');
}

function closeJoinClass(){
  document.getElementById('joinClassOverlay').classList.remove('open');
}

function doJoinClass(){
  const raw=document.getElementById('joinClassCode').value;
  const norm=normalizeInviteCode(raw);
  const errEl=document.getElementById('joinClassErr');
  errEl.textContent='';
  if(norm.length<4){
    errEl.textContent='请输入管理员提供的邀请码';
    return;
  }
  const cls=classGroups.find(c=>normalizeInviteCode(c.code)===norm);
  if(!cls){
    errEl.textContent='未找到该邀请码，请核对后重试';
    return;
  }
  if(cls.admin===CURRENT_USER){
    errEl.textContent='你已是该班级的管理员，无需通过邀请码加入';
    return;
  }
  if(cls.students.some(s=>s.name===CURRENT_USER)){
    errEl.textContent='你已在该班级中';
    return;
  }
  const nBooks=cls.books.length;
  const bp=nBooks?Array.from({length:nBooks},()=>Math.floor(Math.random()*45)+35):[];
  cls.students.push({
    name:CURRENT_USER,
    id:'2024'+String(Math.floor(100000+Math.random()*900000)),
    bp,
    last:'今天'
  });
  document.getElementById('joinSuccessName').textContent=cls.name;
  document.getElementById('joinClassForm').style.display='none';
  document.getElementById('joinClassSuccess').classList.add('show');
  setTimeout(()=>{
    closeJoinClass();
    renderMy();
    const toast=document.createElement('div');
    toast.style.cssText='position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--deep);color:white;padding:14px 28px;border-radius:12px;font-size:13px;z-index:300;box-shadow:0 8px 30px rgba(0,0,0,0.15);animation:fadeUp 0.3s ease;display:flex;align-items:center;gap:10px';
    toast.innerHTML=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>已加入班级「${cls.name}」`;
    document.body.appendChild(toast);
    setTimeout(()=>{toast.style.opacity='0';toast.style.transition='opacity 0.3s';setTimeout(()=>toast.remove(),300)},2200);
  },1600);
}

function drawQR(canvas,text){
  // Simple visual QR-like pattern (decorative)
  const ctx=canvas.getContext('2d');
  const s=canvas.width;ctx.clearRect(0,0,s,s);
  const grid=21,cell=Math.floor(s/grid);
  // Seed from text
  let seed=0;for(let i=0;i<text.length;i++)seed=(seed*31+text.charCodeAt(i))&0x7fffffff;
  function rng(){seed=(seed*16807)%2147483647;return seed/2147483647}
  // Draw modules
  ctx.fillStyle='#1f2937';
  for(let r=0;r<grid;r++)for(let cl=0;cl<grid;cl++){
    // Fixed patterns (finder)
    const inFinder=(r<7&&cl<7)||(r<7&&cl>=grid-7)||(r>=grid-7&&cl<7);
    if(inFinder){
      const fr=r<7?0:grid-7,fc=cl<7?0:grid-7;
      const lr=r-fr,lc=cl-fc;
      if(lr===0||lr===6||lc===0||lc===6||(lr>=2&&lr<=4&&lc>=2&&lc<=4))
        ctx.fillRect(cl*cell,r*cell,cell,cell);
    } else if(rng()>0.5){
      ctx.fillRect(cl*cell,r*cell,cell,cell);
    }
  }
}

let currentClassIdx=null;

function openClassDetail(idx){
  currentClassIdx=idx;
  const cls=classGroups[idx];
  if(!cls)return;
  const isClassAdmin=cls.admin===CURRENT_USER;
  // Compute avg progress per student across class books
  const students=[...cls.students].map(st=>{
    const avg=st.bp.length?Math.round(st.bp.reduce((a,b)=>a+b,0)/st.bp.length):0;
    return {...st,pr:avg};
  }).sort((a,b)=>b.pr-a.pr);
  const totalPr=students.length?Math.round(students.reduce((s,st)=>s+st.pr,0)/students.length):0;
  const activeCnt=students.filter(s=>s.last==='今天'||s.last==='昨天').length;
  const completedCnt=students.filter(s=>s.pr>=80).length;

  // Class books HTML
  const classBooksHtml=cls.books.map((bk,bi)=>{
    const [c1,c2]=c(bk.sub);
    // Avg progress for this book across students
    const bAvg=cls.students.length?Math.round(cls.students.reduce((s,st)=>s+(st.bp[bi]||0),0)/cls.students.length):0;
    const bpc=bAvg>=70?'var(--mint-deep)':bAvg>=40?'var(--peach-deep)':'var(--rose-deep)';
    const removeBtn=isClassAdmin?`<button class="class-book-remove" title="移除教材" onclick="removeClassBook(${idx},${bi})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>`:'';
    return `<div class="class-book-row">
      <div class="class-book-cover" style="background:linear-gradient(145deg,${c1},${c2})">
        <div class="class-book-cover-name">${bk.t}</div>
      </div>
      <div class="class-book-info">
        <div class="class-book-name">${bk.t} · ${bk.s}</div>
        <div class="class-book-pub">${bk.p} · ${bk.g}</div>
      </div>
      <div class="class-book-avg">
        <div class="class-book-avg-val" style="color:${bpc}">${bAvg}%</div>
        <div class="class-book-avg-lab">班级均分</div>
      </div>
      ${removeBtn}
    </div>`;
  }).join('');

  const titleBadge=isClassAdmin
    ?`<span class="admin-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>管理员</span>`
    :`<span class="member-pill">组员</span>`;

  const dangerBlock=isClassAdmin
    ?`<div class="class-detail-danger">
        <button type="button" class="btn-class-dissolve" onclick="dissolveClass(${idx})">解散群组</button>
        <p class="class-detail-danger-hint">解散后班级将从所有成员的「我的班级」中移除，且不可恢复。</p>
      </div>`
    :`<div class="class-detail-danger">
        <button type="button" class="btn-class-leave" onclick="leaveClass(${idx})">退出群组</button>
        <p class="class-detail-danger-hint">退出后你将不再出现在该班级成员列表中，可凭邀请码再次加入。</p>
      </div>`;

  const inviteBlock=isClassAdmin?`
    <div class="invite-section">
      <div class="invite-code-box">
        <div class="invite-label">邀请码</div>
        <div class="invite-code-display">
          <span class="invite-code-text">${cls.code}</span>
          <button class="invite-copy-btn" onclick="copyCode(this,'${cls.code}')">复制</button>
        </div>
      </div>
      <div class="invite-qr-box">
        <div class="invite-label">扫码加入</div>
        <div class="qr-canvas"><canvas id="qrCanvas" width="104" height="104"></canvas></div>
        <div class="qr-hint">学生扫码即可加入</div>
      </div>
    </div>`:`
    <div class="invite-readonly">
      <p class="invite-readonly-text">班级由 <strong>${cls.admin}</strong> 管理。邀请码仅管理员可见；如需邀请其他同学，请联系管理员获取邀请码。</p>
    </div>`;

  const addBookBtn=isClassAdmin?`
        <button class="btn-add-book" onclick="openBookPicker(${idx})">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          添加教材
        </button>`:'';

  const emptyBooksMsg=cls.books.length?'':(isClassAdmin
    ?'<div style="text-align:center;padding:24px;color:var(--stone);font-size:12.5px">暂未添加教材，点击上方按钮从「我的教材」中添加</div>'
    :'<div style="text-align:center;padding:24px;color:var(--stone);font-size:12.5px">班级暂未添加教材</div>');

  const content=document.getElementById('classDetailContent');
  content.innerHTML=`
    <div class="class-detail-header">
      <div class="class-detail-name">${cls.name} ${titleBadge}</div>
      <div class="class-detail-meta">
        <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>${cls.subject}</span>
        <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>${cls.created}</span>
        <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>${students.length} 名学生</span>
        <span>创建者: ${cls.admin}</span>
      </div>
    </div>
    ${inviteBlock}
    <div class="class-books-section">
      <div class="class-books-head">
        <div class="class-books-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          班级教材
          <span class="class-books-count">${cls.books.length} 本</span>
        </div>
        ${addBookBtn}
      </div>
      <div class="class-book-list">
        ${cls.books.length?classBooksHtml:emptyBooksMsg}
      </div>
    </div>
    <div class="class-stats-row">
      <div class="cs-box"><div class="cs-val">${students.length}</div><div class="cs-lab">班级人数</div></div>
      <div class="cs-box"><div class="cs-val">${totalPr}%</div><div class="cs-lab">平均进度</div></div>
      <div class="cs-box"><div class="cs-val">${activeCnt}</div><div class="cs-lab">近期活跃</div></div>
      <div class="cs-box"><div class="cs-val">${completedCnt}</div><div class="cs-lab">已完成</div></div>
    </div>
    <div class="student-section">
      <div class="student-head">
        <div class="student-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          学生学习进度排行
        </div>
        <span class="student-count">共 ${students.length} 人</span>
      </div>
      ${cls.books.length?`<div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap">
        ${cls.books.map((bk,bi)=>{
          const [bc1]=c(bk.sub);
          return `<span style="font-size:10px;padding:3px 10px;border-radius:6px;background:${bc1}18;color:${bc1};font-weight:500">${bk.t}·${bk.s.length>6?bk.s.slice(0,6)+'…':bk.s}</span>`;
        }).join('')}
      </div>`:''}
      <div class="student-list">
        ${students.map((st,i)=>{
          const ac=AVATAR_COLORS[i%AVATAR_COLORS.length];
          const pc=st.pr>=80?'var(--mint-deep)':st.pr>=50?'var(--peach-deep)':'var(--rose-deep)';
          const rc=i===0?'rank-1':i===1?'rank-2':i===2?'rank-3':'rank-other';
          // Per-book progress bars
          const bpHtml=cls.books.length?`<div class="student-book-progress">${st.bp.map((p,bi)=>{
            const bpc=p>=70?'var(--mint-deep)':p>=40?'var(--peach-deep)':'var(--rose-deep)';
            return `<div class="sbp-item"><div class="sbp-bar"><div class="sbp-fill" style="width:${p}%;background:${bpc}"></div></div><div class="sbp-pct" style="color:${bpc}">${p}%</div></div>`;
          }).join('')}</div>`:'';
          return `<div class="student-row">
            <div class="student-rank ${rc}">${i+1}</div>
            <div class="student-avatar" style="background:linear-gradient(135deg,${ac[0]},${ac[1]})">${st.name.slice(-1)}</div>
            <div class="student-info">
              <div class="student-name">${st.name}</div>
              <div class="student-id">${st.id}</div>
            </div>
            <div class="student-progress">
              <div class="student-bar"><div class="student-bar-fill" style="width:${st.pr}%;background:${pc}"></div></div>
              <span class="student-pct" style="color:${pc}">${st.pr}%</span>
            </div>
            ${bpHtml}
            <div class="student-last">${st.last}</div>
          </div>`;
        }).join('')}
      </div>
    </div>
    ${dangerBlock}`;

  document.getElementById('classOverlay').classList.add('open');
  document.body.style.overflow='hidden';
  setTimeout(()=>{
    const cv=document.getElementById('qrCanvas');
    if(cv)drawQR(cv,cls.code);
  },50);
}

function closeClassDetail(){
  document.getElementById('classOverlay').classList.remove('open');
  document.body.style.overflow='';
}

function dissolveClass(idx) {
  const cls = classGroups[idx];
  if (!cls || cls.admin !== CURRENT_USER) return;
  if (!confirm('确定解散该班级？解散后所有成员将无法再从「我的班级」进入本群，此操作不可恢复。')) return;
  classGroups.splice(idx, 1);
  currentClassIdx = null;
  closeClassDetail();
  renderMy();
  const toast = document.createElement('div');
  toast.style.cssText =
    'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--deep);color:white;padding:14px 28px;border-radius:12px;font-size:13px;z-index:300;box-shadow:0 8px 30px rgba(0,0,0,0.15);animation:fadeUp 0.3s ease;display:flex;align-items:center;gap:10px';
  toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>已解散班级「${cls.name}」`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

function leaveClass(idx) {
  const cls = classGroups[idx];
  if (!cls || cls.admin === CURRENT_USER) return;
  const si = cls.students.findIndex((s) => s.name === CURRENT_USER);
  if (si < 0) return;
  if (!confirm('确定退出该班级？退出后将不再显示在「我的班级」中。')) return;
  cls.students.splice(si, 1);
  currentClassIdx = null;
  closeClassDetail();
  renderMy();
  const toast = document.createElement('div');
  toast.style.cssText =
    'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--deep);color:white;padding:14px 28px;border-radius:12px;font-size:13px;z-index:300;box-shadow:0 8px 30px rgba(0,0,0,0.15);animation:fadeUp 0.3s ease;display:flex;align-items:center;gap:10px';
  toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>已退出班级「${cls.name}」`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

function copyCode(btn,code){
  navigator.clipboard.writeText(code).catch(()=>{});
  btn.textContent='已复制';btn.classList.add('copied');
  setTimeout(()=>{btn.textContent='复制';btn.classList.remove('copied')},2000);
}

function openBookPicker(classIdx){
  const cls=classGroups[classIdx];
  if(!cls||cls.admin!==CURRENT_USER)return;
  currentClassIdx=classIdx;
  const list=document.getElementById('bpList');
  list.innerHTML=myB.map((bk,i)=>{
    const [c1,c2]=c(bk.sub);
    const already=cls.books.some(cb=>cb.t===bk.t&&cb.s===bk.s);
    return `<div class="bp-item${already?' added':''}" onclick="${already?'':'addBookToClass('+classIdx+','+i+',this)'}">
      <div class="bp-cover" style="background:linear-gradient(145deg,${c1},${c2})">
        <div class="bp-cover-name">${bk.t}</div>
      </div>
      <div class="bp-info">
        <div class="bp-name">${bk.t} · ${bk.s}</div>
        <div class="bp-sub">${bk.p} · ${bk.g}</div>
      </div>
    </div>`;
  }).join('');
  document.getElementById('bookPickerOverlay').classList.add('open');
}

function closeBookPicker(){
  document.getElementById('bookPickerOverlay').classList.remove('open');
}

function addBookToClass(classIdx,bookIdx,el){
  const cls=classGroups[classIdx];
  if(!cls||cls.admin!==CURRENT_USER)return;
  const bk=myB[bookIdx];
  cls.books.push({t:bk.t,s:bk.s,g:bk.g,p:bk.p,sub:bk.sub,paperDigital:!!bk.paperDigital,editor:bk.editor||''});
  // Add random progress for existing students
  cls.students.forEach(st=>{st.bp.push(Math.floor(Math.random()*60))});
  el.classList.add('added');
  el.onclick=null;
  // Refresh detail
  closeBookPicker();
  openClassDetail(classIdx);
  refreshMyPageIfActive();
}

function removeClassBook(classIdx,bookIdx){
  const cls=classGroups[classIdx];
  if(!cls||cls.admin!==CURRENT_USER)return;
  cls.books.splice(bookIdx,1);
  cls.students.forEach(st=>{st.bp.splice(bookIdx,1)});
  openClassDetail(classIdx);
  refreshMyPageIfActive();
}

/** 我的教材：单书功能元数据（「阅读」也可通过封面/信息区进入详情） */
const BOOK_MY_ACTIONS = [
  { key: 'read', label: '阅读' },
  { key: 'cloudHandout', label: '智能云讲义' },
  { key: 'teach', label: '教学' },
  { key: 'task', label: '任务' },
  { key: 'questionBank', label: '题库' },
  { key: 'internship', label: '岗位实习' },
  { key: 'resourceLib', label: '资源库' },
  { key: 'learnStats', label: '学习统计' },
];

function resolveBookActionEntries(b) {
  const keys = b && Array.isArray(b.actionKeys) ? b.actionKeys : [];
  if (!keys.length) return [];
  return keys.map((k) => BOOK_MY_ACTIONS.find((a) => a.key === k)).filter(Boolean);
}

function bookShortcut(bookIdx, actionKey) {
  const b = myB[bookIdx];
  if (!b) return;
  if (actionKey === 'read') {
    openReader(bookIdx, 'my');
    return;
  }
  const act = BOOK_MY_ACTIONS.find((a) => a.key === actionKey);
  const actionName = act ? act.label : actionKey;
  const toast = document.createElement('div');
  toast.style.cssText =
    'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--deep);color:white;padding:14px 24px;border-radius:12px;font-size:13px;z-index:300;box-shadow:0 8px 30px rgba(0,0,0,0.15);animation:fadeUp 0.3s ease;max-width:min(420px,calc(100vw - 48px));text-align:center;line-height:1.5';
  toast.innerHTML = `<span style="opacity:0.9">「${b.t} · ${b.s}」</span><br><span style="font-weight:500">${actionName}</span> <span style="opacity:0.75">（演示入口，可对接业务）</span>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2400);
}

function mkMyActionRow(b, i) {
  const entries = resolveBookActionEntries(b);
  if (!entries.length) return '';
  return `<div class="card-actions" onclick="event.stopPropagation()">
    <div class="card-actions-scroll" role="toolbar" aria-label="教材功能">
    ${entries.map(
      (a) =>
        `<button type="button" class="card-action" onclick="event.stopPropagation();bookShortcut(${i},'${a.key}')">${a.label}</button>`
    ).join('')}
    </div>
  </div>`;
}

function mkCard(b,i,wp){
  const [c1,c2]=c(b.sub);
  const pc=(b.pr||0)>=80?'var(--mint-deep)':(b.pr||0)>=40?'var(--peach-deep)':'var(--rose-deep)';
  let st='';
  if(wp) st=`<div class="card-st st-ok" title="已在书架"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>`;
  let pg='';
  if(wp) pg=`<div class="prog"><div class="prog-track"><div class="prog-fill" style="width:${b.pr}%;background:${pc}"></div></div><span class="prog-pct">${b.pr}%</span></div>`;
  const pdTag=isPaperDigital(b)?`<span class="tag tag-pd">纸数融合</span>`:'';
  const actions=wp?mkMyActionRow(b,i):'';
  const cardCls=wp?'card card--mine':'card';
  const coverInner=`<div class="cover-inner" style="background:linear-gradient(145deg,${c1},${c2})"><span class="cover-grade">${b.g}</span><div class="cover-name">${b.t}</div><div class="cover-sub">${b.s}</div></div>`;
  if(wp){
    const open=`onclick="openDetail(${i},'my')"`;
    return `<div class="${cardCls}" style="animation-delay:${i*0.04}s">${st}<div class="cover cover--open" ${open} title="打开教材详情">${coverInner}</div><div class="detail"><div class="detail-main" ${open}><div class="detail-title">${b.t} · ${b.s}</div><div class="detail-row"><span class="detail-pub">${b.p}</span>${pdTag}</div>${pg}</div>${actions}</div></div>`;
  }
  const bookIdx=i;
  return `<div class="${cardCls}" style="animation-delay:${bookIdx*0.04}s" onclick="openDetail(${bookIdx},'lib')">${st}<div class="cover">${coverInner}</div><div class="detail"><div class="detail-title">${b.t} · ${b.s}</div><div class="detail-row"><span class="detail-pub">${b.p}</span>${pdTag}</div>${pg}</div></div>`;
}

let fG='全部',fS='全部科目';
function setGradeFilter(g){fG=g;renderLib();}
function setSubjectFilter(s){fS=s;renderLib();}

const GS=['全部','高一','高二','高三'];
const SS=['全部科目','语文','数学','英语','物理','化学','生物','历史','地理','政治'];

function renderLib(){
  let list=books;
  if(fG!=='全部')list=list.filter(b=>b.g===fG);
  if(fS!=='全部科目')list=list.filter(b=>b.sub===fS);
  const q=(document.getElementById('sInput').value||'').trim().toLowerCase();
  if(q)list=list.filter(b=>b.t.includes(q)||b.s.includes(q)||b.p.includes(q));

  const gc=GS.map(g=>`<div class="pill ${g===fG?'active':''}" onclick="setGradeFilter('${g}')">${g}</div>`).join('');
  const sc=SS.map(s=>`<div class="pill ${s===fS?'active':''}" onclick="setSubjectFilter('${s}')">${s}</div>`).join('');

  const bk=list.length
    ?`<div class="grid">${list.map((b)=>mkCard(b,books.indexOf(b),false)).join('')}</div>`
    :`<div style="text-align:center;padding:80px;color:var(--stone)"><p style="font-size:14px;margin-bottom:4px">未找到匹配的图书</p><p style="font-size:12px;color:var(--silver)">请尝试调整筛选条件</p></div>`;

  document.getElementById('page-library').innerHTML=`
    <div class="filters">${gc}<div class="pill-sep"></div>${sc}</div>
    <div class="sec-head"><div class="sec-title"><span class="dot"></span>数字教材</div><div class="sec-extra">共 ${list.length} 本</div></div>${bk}`;
}

function renderMy(){
  const school = getBoundSchool();
  const schoolCardHtml = school
    ? `<div class="school-bind-card school-bind-card--in-grid">
      <div class="school-bind-main">
        <div class="school-bind-ic">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <div class="school-bind-text">
          <div class="school-bind-label">当前学校</div>
          <div class="school-bind-value">${school.name}</div>
        </div>
      </div>
      <div class="school-bind-actions">
        <button type="button" class="school-bind-link" onclick="event.stopPropagation();clearSchoolBind()">解除绑定</button>
        <button type="button" class="btn-school-ghost" onclick="event.stopPropagation();openSchoolModal('change')">更换学校</button>
      </div>
    </div>`
    : `<div class="school-bind-card school-bind-card--in-grid">
      <div class="school-bind-main">
        <div class="school-bind-ic">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <div class="school-bind-text">
          <div class="school-bind-label">学校信息</div>
          <div class="school-bind-value muted">尚未绑定学校（可选）。绑定后可与学校课程、班级服务关联</div>
        </div>
      </div>
      <div class="school-bind-actions">
        <button type="button" class="btn-school-primary" onclick="event.stopPropagation();openSchoolModal('bind')">绑定学校</button>
      </div>
    </div>`;

  const myClassEntries = classGroups
    .map((cls, i) => ({ cls, i }))
    .filter(({ cls }) => isClassVisibleForUser(cls));
  const classHtml=myClassEntries.map(({cls,i})=>{
    const avgPr=cls.students.length?Math.round(cls.students.reduce((s,st)=>{
      const sp=st.bp.length?Math.round(st.bp.reduce((a,b)=>a+b,0)/st.bp.length):0;
      return s+sp;
    },0)/cls.students.length):0;
    const barColor=avgPr>=60?'var(--mint-deep)':avgPr>=30?'var(--peach-deep)':'var(--rose-deep)';
    return `<div class="class-card" onclick="openClassDetail(${i})">
      ${cls.admin===CURRENT_USER?'<div class="class-card-admin"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>管理员</div>':''}
      <div class="class-card-head">
        <div class="class-card-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="class-card-info">
          <div class="class-card-name">${cls.name}</div>
          <div class="class-card-sub">${cls.subject} · ${cls.books.length} 本教材 · ${cls.students.length} 人</div>
        </div>
      </div>
      <div class="class-card-stats">
        <div class="class-stat"><div class="class-stat-val">${cls.students.length}</div><div class="class-stat-lab">学生人数</div></div>
        <div class="class-stat"><div class="class-stat-val">${avgPr}%</div><div class="class-stat-lab">平均进度</div></div>
        <div class="class-stat"><div class="class-stat-val">${cls.books.length}</div><div class="class-stat-lab">班级教材</div></div>
      </div>
      <div class="class-card-bar"><div class="class-card-bar-fill" style="width:${avgPr}%;background:${barColor}"></div></div>
      <div class="class-card-foot">
        <div class="class-card-date">创建于 ${cls.created}</div>
        <svg class="class-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </div>`;
  }).join('');

  document.getElementById('page-my').innerHTML=`
    <div class="my-action-row">
      <div class="join-class-entry join-class-entry--duo" onclick="openRedeem()" role="button" tabindex="0">
        <div class="join-class-entry-ic join-class-entry-ic--lavender">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="M16 2v6M8 2v6"/></svg>
        </div>
        <div class="join-class-entry-text">
          <div class="join-class-entry-title">兑换教材</div>
          <div class="join-class-entry-desc">输入兑换码，将数字教材添加至书架</div>
        </div>
        <svg class="join-class-entry-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
      <div class="join-class-entry join-class-entry--duo" onclick="openJoinClass()" role="button" tabindex="0">
        <div class="join-class-entry-ic join-class-entry-ic--mint">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="join-class-entry-text">
          <div class="join-class-entry-title">加入班级</div>
          <div class="join-class-entry-desc">输入管理员提供的邀请码加入对应班级</div>
        </div>
        <svg class="join-class-entry-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </div>
    <div class="sec-head"><div class="sec-title"><span class="dot"></span>我的书架</div><div class="sec-extra">管理教材 →</div></div>
    <div class="grid grid--my-books">${myB.map((b,i)=>mkCard(b,i,true)).join('')}</div>
    <div class="class-section">
      <div class="sec-head">
        <div class="sec-title"><span class="dot"></span>我的班级</div>
        <div class="sec-head-actions">
          <span class="sec-extra">共 ${myClassEntries.length} 个班级</span>
        </div>
      </div>
      <div class="class-grid">
        ${schoolCardHtml}
        ${classHtml}
        <div class="class-card-create" onclick="openCreateClass()">
          <div class="class-create-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <div class="class-create-text">创建新班级</div>
        </div>
      </div>
    </div>`;
}

function go(p){
  document.querySelectorAll('.nav-item[data-page]').forEach(el=>el.classList.toggle('active',el.dataset.page===p));
  document.querySelectorAll('.page').forEach(el=>el.classList.toggle('active',el.id===`page-${p}`));
  const t=document.getElementById('pTitle'),h=document.getElementById('pHint');
  const sw=document.getElementById('topbarSearchWrap');
  if(sw) sw.style.display=p==='library'?'':'none';
  if(p==='library'){t.textContent='数字教材';h.textContent='浏览、选购全部上架数字教材';renderLib()}
  else if(p==='my'){t.textContent='我的教材';h.textContent='管理已添加的教材与学习进度';renderMy()}
  else if(p==='settings'){t.textContent='设置';h.textContent='账号与个人信息';renderSettings()}
}

renderLib();
syncSidebarUser();

document.getElementById('joinClassCode')?.addEventListener('keydown',e=>{
  if(e.key==='Enter'){e.preventDefault();doJoinClass();}
});

document.getElementById('schoolActivationCode')?.addEventListener('keydown',e=>{
  if(e.key==='Enter'){e.preventDefault();confirmSchoolBind();}
});

document.getElementById('pwdNew2')?.addEventListener('keydown',e=>{
  if(e.key==='Enter'){e.preventDefault();confirmPasswordChange();}
});

// === 数字教材阅读页 ===
/** 三级目录演示数据（可对接接口替换） */
const READER_OUTLINE = [
  {
    title: '第一单元 阅读与鉴赏',
    children: [
      {
        title: '第1课 沁园春·长沙',
        children: [
          { title: '学习提示', cid: 'r1' },
          { title: '课文正文', cid: 'r2' },
        ],
      },
      {
        title: '第2课 立在地球边上放号',
        children: [{ title: '综合练习', cid: 'r3' }],
      },
    ],
  },
  {
    title: '第二单元 劳动光荣',
    children: [
      {
        title: '第5课 喜看稻菽千重浪',
        children: [{ title: '拓展阅读', cid: 'r4' }],
      },
    ],
  },
];

/** 阅读页嵌入「测试/练习」演示题库（可对接 CMS） */
const READER_DEMO_QUIZ = {
  title: '本节综合测评',
  subtitle: '《沁园春·长沙》与「劳动光荣」单元（演示）',
  questions: [
    {
      id: 'q1',
      type: 'choice',
      stem: '下列对「劳动精神」在当代的内涵理解，最恰当的一项是？',
      options: [
        '仅指体力劳动与技能训练',
        '体脑结合、敬业精益、创新创造的价值取向',
        '与学科学习、立德树人无关',
      ],
      correctIndex: 1,
      explain: '劳动精神强调正确的劳动观念与品质，涵盖脑力与体力劳动，并与社会主义核心价值观相联系。',
    },
    {
      id: 'q2',
      type: 'fill',
      stem: '《沁园春·长沙》上阕以「________」一句收束写景，写出万物竞发的生命力。',
      answers: ['万类霜天竞自由'],
      explain: '该句意象开阔，总写上阕秋景，为下阕抒情张本。',
    },
    {
      id: 'q3',
      type: 'tf',
      stem: '「沁园春」是词牌，「长沙」为题目，二者分别标示格律与内容或地点。',
      correct: true,
      explain: '词牌规定格律句式，题目往往标示题材、地点或主旨。',
    },
    {
      id: 'q4',
      type: 'short',
      stem: '请简要说明：「问苍茫大地，谁主沉浮」表达了作者怎样的情怀与思考？（建议不少于 25 字）',
      keywords: ['时代', '家国', '青年', '责任', '主宰', '命运', '豪情'],
      minLen: 25,
      sampleAnswer:
        '由自然之景上升到对时代与民族命运的追问，体现以天下为己任的担当与改造社会的青年豪情。',
      explain: '应联系上下阕，指出从写景到抒怀的升华，以及对「谁主沉浮」的历史之问。',
    },
  ],
};

/** 第二套演示题（拓展阅读主题；与综合测评独立计分与完成态） */
const READER_DEMO_QUIZ_B = {
  title: '单元拓展测评',
  subtitle: '报告文学与典型人物报道（演示）',
  questions: [
    {
      id: 'bq1',
      type: 'choice',
      stem: '报告文学与新闻通讯相比，最突出的体裁特征通常是？',
      options: ['以虚构情节增强可读性', '在真实基础上允许适度夸张细节', '强调文学性表达与典型形象的深度刻画', '以短平快时效为唯一目标'],
      correctIndex: 2,
      explain: '报告文学在真实新闻材料基础上，注重文学手法与人物/事件的典型化呈现。',
    },
    {
      id: 'bq2',
      type: 'fill',
      stem: '人物通讯常通过________、细节与语言等手法，使形象立得住、传得开。',
      answers: ['典型事例', '事例'],
      explain: '典型事例是通讯写人的重要抓手，常与细节描写、人物语言结合。',
    },
    {
      id: 'bq3',
      type: 'tf',
      stem: '「劳动光荣」主题报道选材时，应优先选取能体现爱岗敬业与时代精神的平凡岗位故事。',
      correct: true,
      explain: '主题报道重在价值导向与可感可学的榜样力量，平凡岗位同样具有典型意义。',
    },
  ],
};

/** 拓展阅读页可挂载多组练习（id 对应 localStorage 槽位与弹层题库） */
const READER_PRACTICE_SLOTS = [
  {
    id: 'a',
    quiz: READER_DEMO_QUIZ,
    sectionTitle: '拓展练习',
    eyebrow: '本节综合测评',
  },
  {
    id: 'b',
    quiz: READER_DEMO_QUIZ_B,
    sectionTitle: '拓展练习',
    eyebrow: '单元拓展测评',
  },
];

/** 演示：无 localStorage 记录时，该槽位默认展示「已完成」样例（另一槽位仍为未完成；作答提交后以真实记录为准） */
const READER_DEMO_PRESET_COMPLETED_SLOT = 'a';

let readerQuizPhase = 'idle';
let readerActiveQuizSlot = 'a';
let readerQuizStepIndex = 0;
/** 单题作答：跨题暂存答案（题号切换时写入） */
let readerQuizDraftAnswers = {};

/** 嵌入练习题库（演示；正式环境可按书目 id 从接口取） */
function readerGetQuizBySlot(slotId) {
  const s = READER_PRACTICE_SLOTS.find((x) => x.id === slotId);
  return s ? s.quiz : READER_DEMO_QUIZ;
}

function readerGetCurrentQuiz() {
  return readerGetQuizBySlot(readerActiveQuizSlot);
}

function readerQuizLsKey(b, slotId = 'a') {
  if (!b || !b.t) return null;
  return `readerQuizDone:v2:${b.t}::${b.s}::${slotId}`;
}

function readerGetQuizCompletion(b, slotId = 'a') {
  const k = readerQuizLsKey(b, slotId);
  if (!k || typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(k);
    if (raw) return JSON.parse(raw);
    if (slotId === 'a') {
      const legacy = `readerQuizDone:v1:${b.t}::${b.s}`;
      const raw2 = localStorage.getItem(legacy);
      if (raw2) return JSON.parse(raw2);
    }
  } catch {
    return null;
  }
  if (slotId === READER_DEMO_PRESET_COMPLETED_SLOT) {
    const report = readerBuildDemoReportResult(slotId);
    if (!report) return null;
    return {
      done: true,
      score: report.score,
      total: report.total,
      at: 0,
      report,
      demoPreset: true,
    };
  }
  return null;
}

function readerSaveQuizCompletion(b, result, slotId = 'a') {
  const k = readerQuizLsKey(b, slotId);
  if (!k || !result) return;
  try {
    localStorage.setItem(
      k,
      JSON.stringify({
        done: true,
        score: result.score,
        total: result.total,
        at: Date.now(),
        report: result,
      })
    );
  } catch (_) {}
}

/** 正确率 0–100，整数 */
function readerQuizAccuracyPercent(score, total) {
  if (score == null || total == null || !Number.isFinite(total) || total <= 0) return null;
  return Math.round((score / total) * 100);
}

/** 「拓展练习」板块 HTML */
function readerPracticeSectionHtml(b, slot) {
  const comp = readerGetQuizCompletion(b, slot.id);
  const done = !!(comp && comp.done);
  const nQ = slot.quiz.questions.length;
  const score = comp && Number.isFinite(comp.score) ? comp.score : null;
  const total = comp && Number.isFinite(comp.total) ? comp.total : nQ;
  const accPct = done ? readerQuizAccuracyPercent(score, total) : null;
  const sectionCls = done
    ? 'reader-practice-section reader-practice-section--done reader-practice-section--under-extend'
    : 'reader-practice-section reader-practice-section--under-extend';
  const iconCls = done ? 'reader-practice-icon reader-practice-icon--done' : 'reader-practice-icon';
  const clipboardSvg =
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const checkSvg =
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M8 12l2.5 2.5L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const badge = done ? '<span class="reader-practice-done-pill">已完成</span>' : '';
  const desc = done
    ? '你已完成本节测评。如需巩固可再次作答，成绩以最近一次提交为准。'
    : '含选择题、填空题、判断题与简答题；提交后自动判分，并生成答题报告、每题解析与 AI 学习评价（演示，可对接 CMS）。';
  const meta = done
    ? `<ul class="reader-practice-meta reader-practice-meta--done">
        <li><span class="reader-practice-meta-k">题量</span> 共 ${nQ} 题</li>
        <li><span class="reader-practice-meta-k">正确率</span> ${accPct != null ? `${accPct}%` : '—'}</li>
        <li class="reader-practice-meta-report-cell">
          <button type="button" class="reader-practice-report-open" onclick="readerOpenSavedReport('${slot.id}')" aria-label="查看答题报告">
            <span class="reader-practice-report-open-glow" aria-hidden="true"></span>
            <span class="reader-practice-report-open-ic" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span class="reader-practice-report-open-text">答题报告</span>
            <span class="reader-practice-report-open-arrow" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </span>
          </button>
        </li>
      </ul>`
    : `<ul class="reader-practice-meta reader-practice-meta--todo">
        <li><span class="reader-practice-meta-k">题量</span> 共 ${nQ} 题</li>
      </ul>`;
  const btnCls = done ? 'reader-practice-btn reader-practice-btn--secondary' : 'reader-practice-btn';
  const btnLabel = done ? '再次测评' : '进入答题';
  const ariaLab = escAttr(`${slot.sectionTitle} · ${slot.eyebrow}`);
  const titleHtml = escAttr(slot.sectionTitle);
  const eyebrowHtml = escAttr(slot.eyebrow);
  return `<section class="${sectionCls}" aria-label="${ariaLab}">
        <div class="reader-practice-section-head">
          <div class="reader-practice-section-head-start">
            <span class="reader-practice-bar" aria-hidden="true"></span>
            <span class="reader-practice-section-title">${titleHtml}</span>
          </div>
          ${badge}
        </div>
        <div class="reader-practice-panel">
          <div class="reader-practice-panel-top">
            <div class="${iconCls}" aria-hidden="true">${done ? checkSvg : clipboardSvg}</div>
            <div class="reader-practice-panel-lead">
              <span class="reader-practice-eyebrow">${eyebrowHtml}</span>
              <p class="reader-practice-desc">${desc}</p>
            </div>
          </div>
          <div class="reader-practice-panel-body">
            ${meta}
            <button type="button" class="${btnCls}" onclick="readerOpenQuizModal('${slot.id}')">${btnLabel}</button>
          </div>
        </div>
      </section>`;
}

let readerContext = { bookIdx: null, source: null, b: null, currentCid: null };
const readerNotesStore = [];

function firstReaderCid(nodes) {
  for (const n of nodes) {
    if (n.cid) return n.cid;
    if (n.children) {
      const c = firstReaderCid(n.children);
      if (c) return c;
    }
  }
  return null;
}

function readerOutlineHasCid(nodes, cid) {
  for (const n of nodes) {
    if (n.cid === cid) return true;
    if (n.children && readerOutlineHasCid(n.children, cid)) return true;
  }
  return false;
}

/** 打开阅读器时默认进入的章节（优先 r4「拓展阅读」，便于直接看到「测试与练习」板块） */
function readerDefaultEntryCid() {
  if (readerOutlineHasCid(READER_OUTLINE, 'r4')) return 'r4';
  return firstReaderCid(READER_OUTLINE);
}

function renderReaderTocNodes(nodes, depth) {
  return nodes
    .map((node) => {
      if (node.cid) {
        const st = escAttr(node.title);
        return `<div class="reader-toc-leaf" data-cid="${node.cid}" data-search="${st}" onclick="readerGo('${node.cid}')">${node.title}</div>`;
      }
      return `<div class="reader-toc-group open" data-depth="${depth}">
      <button type="button" class="reader-toc-head" onclick="readerToggleTocGroup(this)">
        <span class="reader-toc-chev">▾</span>
        <span class="reader-toc-head-text">${node.title}</span>
      </button>
      <div class="reader-toc-children">${renderReaderTocNodes(node.children, depth + 1)}</div>
    </div>`;
    })
    .join('');
}

function readerToggleTocGroup(btn) {
  const g = btn && btn.closest('.reader-toc-group');
  if (g) g.classList.toggle('open');
}

function readerGo(cid, opts) {
  readerContext.currentCid = cid;
  document.querySelectorAll('#readerTocTree .reader-toc-leaf').forEach((el) => {
    el.classList.toggle('is-active', el.dataset.cid === cid);
  });
  const el = document.getElementById('readerArticle');
  if (el) el.innerHTML = buildReaderArticleHtml(cid, readerContext.b);
  if (!opts || !opts.noScroll) {
    document.getElementById('readerMain')?.scrollTo(0, 0);
  }
}

function buildReaderArticleHtml(cid, b) {
  const bt = b ? `${b.t} · ${b.s}` : '本教材';
  const blocks = {
    r1: `<div class="reader-block"><h2>学习提示</h2><p>本课为「${bt}」的导读与学法提示。请结合单元目标，关注关键词句与情感脉络。</p><p>阅读时建议先通读全篇，再分段批注：标出意象、修辞与抒情线索。</p></div>`,
    r2: `<div class="reader-block"><h2>课文正文</h2><p>独立寒秋，湘江北去，橘子洲头。看万山红遍，层林尽染；漫江碧透，百舸争流。鹰击长空，鱼翔浅底，万类霜天竞自由……</p><p>（以下为演示正文占位，正式环境由 CMS 或排版引擎渲染。）</p>
      <figure class="reader-figure"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" alt="插图" loading="lazy"><figcaption class="reader-figcap">图 · 山川意象（示意）</figcaption></figure>
      <div class="reader-video-wrap">
        <video class="reader-video-el" controls playsinline preload="metadata" poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80">
          <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
        </video>
        <p class="reader-video-cap">配套微课 · 意象与节奏（演示视频，支持播放/暂停与进度条）</p>
      </div>
      <div class="reader-gallery"><img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80" alt="" loading="lazy"><img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80" alt="" loading="lazy"></div>
      </div>`,
    r3: `<div class="reader-block"><h2>综合练习</h2><p>请概括本诗主旨，并结合时代背景说明「问苍茫大地，谁主沉浮」的意蕴。</p></div>`,
    r4: `<div class="reader-r4-split">
      <div class="reader-block reader-ext-read">
        <h2>拓展阅读</h2>
        <p>对比阅读：新闻通讯与报告文学在叙事视角上的差异；结合本单元「劳动光荣」主题，思考典型人物报道的选材与结构。</p>
        <div class="reader-video-wrap">
          <video class="reader-video-el" controls playsinline preload="metadata" poster="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80">
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
          </video>
          <p class="reader-video-cap">拓展素材 · 报告文学导读（演示视频）</p>
        </div>
      </div>
      <div class="reader-practice-below" aria-label="拓展阅读之下的测评区">
        ${READER_PRACTICE_SLOTS.map((s) => readerPracticeSectionHtml(b, s)).join('')}
      </div>
    </div>`,
  };
  return blocks[cid] || `<div class="reader-block"><p>本节暂无演示内容。</p></div>`;
}

function readerQuizNormalizeText(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/[\s\u3000，。、；：""''（）()．·]/g, '');
}

function readerQuizGradeFill(user, acceptedList) {
  const u = readerQuizNormalizeText(user);
  if (!u) return false;
  return acceptedList.some((a) => {
    const t = readerQuizNormalizeText(a);
    return t && (u === t || u.includes(t));
  });
}

function readerQuizGradeShort(user, q) {
  const raw = (user || '').trim();
  if (raw.length < (q.minLen || 15)) return false;
  const low = raw.toLowerCase();
  const kws = q.keywords || [];
  let hits = 0;
  for (const kw of kws) {
    if (low.includes(String(kw).toLowerCase())) hits += 1;
  }
  return hits >= 2 || (raw.length >= (q.minLen || 25) && hits >= 1);
}

function readerQuizTypeLabel(type) {
  const m = { choice: '选择题', fill: '填空题', tf: '判断题', short: '简答题' };
  return m[type] || type;
}

function readerQuizPickChoice(btn) {
  const wrap = btn.closest('.reader-q-choices');
  if (!wrap) return;
  wrap.querySelectorAll('.reader-q-choice').forEach((b) => b.classList.remove('is-on'));
  btn.classList.add('is-on');
  readerQuizAfterAnswerChange();
}

function readerQuizPickTf(btn, qid, val) {
  const row = btn.closest('.reader-q-tf');
  if (!row) return;
  row.querySelectorAll('.reader-q-tf-btn').forEach((b) => b.classList.remove('is-on'));
  btn.classList.add('is-on');
  row.dataset.picked = val;
  readerQuizAfterAnswerChange();
}

function readerQuizAfterAnswerChange() {
  if (readerQuizPhase !== 'questions') return;
  readerQuizSyncCurrentToDraft();
  readerQuizUpdateSheet();
}

function readerQuizOnInputChanged() {
  readerQuizAfterAnswerChange();
}

/** 将当前屏这一题的作答写入草稿 */
function readerQuizSyncCurrentToDraft() {
  const quiz = readerGetCurrentQuiz();
  if (!quiz || readerQuizPhase !== 'questions') return;
  const q = quiz.questions[readerQuizStepIndex];
  if (!q) return;
  if (q.type === 'choice') {
    const on = document.querySelector(`.reader-q-choice.is-on[data-qid="${q.id}"]`);
    if (on) readerQuizDraftAnswers[q.id] = parseInt(on.dataset.idx, 10);
    else delete readerQuizDraftAnswers[q.id];
  } else if (q.type === 'fill') {
    const inp = document.getElementById(`reader-q-fill-${q.id}`);
    const t = inp ? String(inp.value).trim() : '';
    if (t) readerQuizDraftAnswers[q.id] = inp.value;
    else delete readerQuizDraftAnswers[q.id];
  } else if (q.type === 'tf') {
    const row = document.querySelector(`.reader-q-tf[data-qid="${q.id}"]`);
    const p = row && row.dataset.picked;
    if (p === 'true') readerQuizDraftAnswers[q.id] = true;
    else if (p === 'false') readerQuizDraftAnswers[q.id] = false;
    else delete readerQuizDraftAnswers[q.id];
  } else if (q.type === 'short') {
    const ta = document.getElementById(`reader-q-short-${q.id}`);
    const t = ta ? String(ta.value).trim() : '';
    if (t) readerQuizDraftAnswers[q.id] = ta.value;
    else delete readerQuizDraftAnswers[q.id];
  }
}

function readerQuizApplyDraftToDom(q) {
  const v = readerQuizDraftAnswers[q.id];
  if (v === undefined) return;
  if (q.type === 'choice' && typeof v === 'number' && !Number.isNaN(v)) {
    const btn = document.querySelector(`.reader-q-choice[data-qid="${q.id}"][data-idx="${v}"]`);
    if (btn) btn.classList.add('is-on');
  } else if (q.type === 'fill') {
    const inp = document.getElementById(`reader-q-fill-${q.id}`);
    if (inp) inp.value = v;
  } else if (q.type === 'tf' && (v === true || v === false)) {
    const row = document.querySelector(`.reader-q-tf[data-qid="${q.id}"]`);
    if (row) {
      row.dataset.picked = String(v);
      row.querySelectorAll('.reader-q-tf-btn').forEach((b) => b.classList.remove('is-on'));
      const btn = row.querySelector(`.reader-q-tf-btn[data-val="${v}"]`);
      btn?.classList.add('is-on');
    }
  } else if (q.type === 'short') {
    const ta = document.getElementById(`reader-q-short-${q.id}`);
    if (ta) ta.value = v;
  }
}

function readerQuizIsDraftAnswered(q) {
  const v = readerQuizDraftAnswers[q.id];
  if (q.type === 'choice') return v != null && !Number.isNaN(v);
  if (q.type === 'tf') return v === true || v === false;
  if (q.type === 'fill' || q.type === 'short') return String(v || '').trim().length > 0;
  return false;
}

function readerRenderQuizQuestionForm(q, index) {
  const n = index + 1;
  const lab = readerQuizTypeLabel(q.type);
  if (q.type === 'choice') {
    return `<div class="reader-q-item" data-qid="${q.id}">
      <div class="reader-q-label"><span class="reader-q-num">${n}</span><span class="reader-q-type">${lab}</span></div>
      <p class="reader-q-stem">${escAttr(q.stem)}</p>
      <div class="reader-q-choices">
        ${q.options
          .map(
            (opt, j) =>
              `<button type="button" class="reader-q-choice" data-qid="${q.id}" data-idx="${j}" onclick="readerQuizPickChoice(this)">${escAttr(opt)}</button>`
          )
          .join('')}
      </div>
    </div>`;
  }
  if (q.type === 'fill') {
    return `<div class="reader-q-item" data-qid="${q.id}">
      <div class="reader-q-label"><span class="reader-q-num">${n}</span><span class="reader-q-type">${lab}</span></div>
      <p class="reader-q-stem">${escAttr(q.stem)}</p>
      <input type="text" class="reader-q-fill" id="reader-q-fill-${q.id}" placeholder="请填写答案" autocomplete="off" oninput="readerQuizOnInputChanged()">
    </div>`;
  }
  if (q.type === 'tf') {
    return `<div class="reader-q-item" data-qid="${q.id}">
      <div class="reader-q-label"><span class="reader-q-num">${n}</span><span class="reader-q-type">${lab}</span></div>
      <p class="reader-q-stem">${escAttr(q.stem)}</p>
      <div class="reader-q-tf" data-qid="${q.id}" data-picked="">
        <button type="button" class="reader-q-tf-btn" data-val="true" onclick="readerQuizPickTf(this,'${q.id}', 'true')">正确</button>
        <button type="button" class="reader-q-tf-btn" data-val="false" onclick="readerQuizPickTf(this,'${q.id}', 'false')">错误</button>
      </div>
    </div>`;
  }
  if (q.type === 'short') {
    return `<div class="reader-q-item" data-qid="${q.id}">
      <div class="reader-q-label"><span class="reader-q-num">${n}</span><span class="reader-q-type">${lab}</span></div>
      <p class="reader-q-stem">${escAttr(q.stem)}</p>
      <textarea class="reader-q-short" id="reader-q-short-${q.id}" rows="4" placeholder="请输入作答内容" oninput="readerQuizOnInputChanged()"></textarea>
    </div>`;
  }
  return '';
}

function readerCollectQuizAnswers() {
  readerQuizSyncCurrentToDraft();
  const out = {};
  const quiz = readerGetCurrentQuiz();
  if (!quiz) return out;
  for (const q of quiz.questions) {
    const v = readerQuizDraftAnswers[q.id];
    if (q.type === 'choice') {
      out[q.id] = v == null || Number.isNaN(v) ? null : v;
    } else if (q.type === 'fill' || q.type === 'short') {
      out[q.id] = v != null ? String(v) : '';
    } else if (q.type === 'tf') {
      out[q.id] = v === true || v === false ? v : null;
    }
  }
  return out;
}

function readerQuizLayoutHtml() {
  return `<div class="reader-quiz-layout">
    <div class="reader-quiz-main-col">
      <div class="reader-quiz-step-hint" id="readerQuizStepHint"></div>
      <div class="reader-quiz-step-inner" id="readerQuizStepInner"></div>
    </div>
    <aside class="reader-quiz-sheet-col" aria-label="答题卡">
      <div class="reader-quiz-sheet-head">答题卡</div>
      <p class="reader-quiz-sheet-progress" id="readerQuizSheetProgress"></p>
      <div class="reader-quiz-sheet-grid" id="readerQuizSheetGrid"></div>
    </aside>
  </div>`;
}

function readerQuizUpdateSheet() {
  const quiz = readerGetCurrentQuiz();
  const grid = document.getElementById('readerQuizSheetGrid');
  const prog = document.getElementById('readerQuizSheetProgress');
  if (!quiz || !grid) return;
  readerQuizSyncCurrentToDraft();
  let answered = 0;
  for (const q of quiz.questions) {
    if (readerQuizIsDraftAnswered(q)) answered += 1;
  }
  if (prog) {
    prog.textContent = `共 ${quiz.questions.length} 题 · 已答 ${answered} 题`;
  }
  grid.innerHTML = quiz.questions
    .map((q, i) => {
      const ok = readerQuizIsDraftAnswered(q);
      const cur = i === readerQuizStepIndex;
      let cls = 'reader-quiz-sheet-pill';
      if (cur) cls += ' is-current';
      if (ok) cls += ' is-answered';
      const ac = cur ? ' aria-current="step"' : '';
      return `<button type="button" class="${cls}" data-i="${i}" aria-label="第 ${i + 1} 题${ok ? '，已作答' : '，未作答'}${cur ? '，当前' : ''}"${ac} onclick="readerQuizJumpToStep(${i})">${i + 1}</button>`;
    })
    .join('');
}

function readerQuizUpdateFoot() {
  const quiz = readerGetCurrentQuiz();
  const foot = document.getElementById('readerQuizFoot');
  if (!quiz || !foot) return;
  const total = quiz.questions.length;
  const isFirst = readerQuizStepIndex === 0;
  const isLast = readerQuizStepIndex === total - 1;
  const prevDis = isFirst ? ' disabled' : '';
  const primaryLabel = isLast ? '提交并生成报告' : '下一题';
  const primaryFn = isLast ? 'readerSubmitQuizModal()' : 'readerQuizGoNext()';
  foot.innerHTML = `<button type="button" class="reader-quiz-btn" onclick="readerCloseQuizModal()">取消</button>
    <button type="button" class="reader-quiz-btn" onclick="readerQuizGoPrev()"${prevDis}>上一题</button>
    <button type="button" class="reader-quiz-btn reader-quiz-btn--primary" onclick="${primaryFn}">${primaryLabel}</button>`;
}

function readerQuizRenderCurrentStep() {
  const quiz = readerGetCurrentQuiz();
  const inner = document.getElementById('readerQuizStepInner');
  const hint = document.getElementById('readerQuizStepHint');
  if (!quiz || !inner) return;
  const q = quiz.questions[readerQuizStepIndex];
  const total = quiz.questions.length;
  if (!q) return;
  if (hint) hint.textContent = `第 ${readerQuizStepIndex + 1} / ${total} 题 · ${readerQuizTypeLabel(q.type)}`;
  inner.innerHTML = readerRenderQuizQuestionForm(q, readerQuizStepIndex);
  readerQuizApplyDraftToDom(q);
  readerQuizUpdateSheet();
  readerQuizUpdateFoot();
}

function readerQuizGoNext() {
  const quiz = readerGetCurrentQuiz();
  if (!quiz || readerQuizPhase !== 'questions') return;
  readerQuizSyncCurrentToDraft();
  if (readerQuizStepIndex >= quiz.questions.length - 1) return;
  readerQuizStepIndex += 1;
  readerQuizRenderCurrentStep();
}

function readerQuizGoPrev() {
  const quiz = readerGetCurrentQuiz();
  if (!quiz || readerQuizPhase !== 'questions') return;
  if (readerQuizStepIndex <= 0) return;
  readerQuizSyncCurrentToDraft();
  readerQuizStepIndex -= 1;
  readerQuizRenderCurrentStep();
}

function readerQuizJumpToStep(i) {
  const quiz = readerGetCurrentQuiz();
  if (!quiz || readerQuizPhase !== 'questions') return;
  if (i < 0 || i >= quiz.questions.length || i === readerQuizStepIndex) return;
  readerQuizSyncCurrentToDraft();
  readerQuizStepIndex = i;
  readerQuizRenderCurrentStep();
}

function readerGradeQuizSession(answers) {
  const details = [];
  let score = 0;
  const quiz = readerGetCurrentQuiz();
  if (!quiz) return { score: 0, total: 0, details: [] };
  const total = quiz.questions.length;
  for (const q of quiz.questions) {
    const u = answers[q.id];
    let ok = false;
    let displayUser = '';
    let displayCorrect = '';
    if (q.type === 'choice') {
      ok = u === q.correctIndex;
      displayUser = u == null ? '（未作答）' : q.options[u] || '（无效选项）';
      displayCorrect = q.options[q.correctIndex];
    } else if (q.type === 'fill') {
      ok = readerQuizGradeFill(u, q.answers);
      displayUser = (u && String(u).trim()) || '（未作答）';
      displayCorrect = q.answers.join(' / ');
    } else if (q.type === 'tf') {
      ok = u === q.correct;
      displayUser =
        u === null ? '（未作答）' : u ? '正确' : '错误';
      displayCorrect = q.correct ? '正确' : '错误';
    } else if (q.type === 'short') {
      ok = readerQuizGradeShort(u, q);
      displayUser = (u && String(u).trim()) || '（未作答）';
      displayCorrect = q.sampleAnswer;
    }
    if (ok) score += 1;
    details.push({
      q,
      ok,
      userLabel: displayUser,
      correctLabel: displayCorrect,
    });
  }
  return { score, total, details };
}

/** 演示用：生成一套「错一题」的判分结果，用于无存档时的预设已完成态与查看报告 */
function readerBuildDemoReportResult(slotId) {
  const slot = READER_PRACTICE_SLOTS.find((s) => s.id === slotId);
  if (!slot) return null;
  const quiz = slot.quiz;
  const answers = {};
  quiz.questions.forEach((q, i) => {
    if (i === 0) {
      if (q.type === 'choice') answers[q.id] = q.correctIndex === 0 ? 1 : 0;
      else if (q.type === 'fill') answers[q.id] = '（演示错题）';
      else if (q.type === 'tf') answers[q.id] = !q.correct;
      else answers[q.id] = 'x';
    } else if (q.type === 'choice') {
      answers[q.id] = q.correctIndex;
    } else if (q.type === 'fill') {
      answers[q.id] = q.answers[0];
    } else if (q.type === 'tf') {
      answers[q.id] = q.correct;
    } else {
      answers[q.id] = q.sampleAnswer || '演示作答';
    }
  });
  return readerGradeQuizSession(answers);
}

function readerQuizAiSummary(score, total, details) {
  const ratio = total ? score / total : 0;
  const weak = details.filter((d) => !d.ok).map((d) => readerQuizTypeLabel(d.q.type));
  const weakHint = weak.length ? `建议重点回顾：${[...new Set(weak)].join('、')}。` : '各题型表现均衡，可尝试拓展阅读与综合写作。';
  let tone =
    ratio >= 0.85
      ? '整体掌握扎实，能理解核心概念与关键语句。'
      : ratio >= 0.5
        ? '已掌握部分要点，仍有提升空间，可针对错题回到课文与注释精读。'
        : '基础尚可加强，建议先梳理课文结构与术语，再完成同类题型巩固。';
  const pct = total ? Math.round((score / total) * 100) : 0;
  return `综合 AI 评价（演示）：本题组正确率 ${pct}%（${score}/${total} 题）。${tone}${weakHint}正式环境中可接入大模型，结合班级学情生成个性化学习路径与错题再练。`;
}

function readerRenderQuizReport(result) {
  const { score, total, details } = result;
  const aiText = readerQuizAiSummary(score, total, details);
  const pct = total ? Math.round((score / total) * 100) : 0;
  const rows = details
    .map((d, i) => {
      const tag = d.ok
        ? '<span class="reader-quiz-tag-ok">正确</span>'
        : '<span class="reader-quiz-tag-bad">待加强</span>';
      const u = escAttr(String(d.userLabel));
      const c = escAttr(String(d.correctLabel));
      const ex = escAttr(d.q.explain);
      const cardMod = d.ok ? ' reader-quiz-qreport--ok' : ' reader-quiz-qreport--miss';
      return `<div class="reader-quiz-qreport${cardMod}">
        <div class="reader-quiz-qreport-head">
          <span class="reader-quiz-qreport-num">${i + 1}</span>
          <div class="reader-quiz-qreport-head-text">
            <div class="reader-quiz-qreport-title">${readerQuizTypeLabel(d.q.type)} · 第 ${i + 1} 题 ${tag}</div>
          </div>
        </div>
        <div class="reader-quiz-qreport-body">
          <div class="reader-quiz-qreport-row"><span class="reader-quiz-qreport-k">你的答案</span><span class="reader-quiz-qreport-v">${u}</span></div>
          <div class="reader-quiz-qreport-row"><span class="reader-quiz-qreport-k">参考答案</span><span class="reader-quiz-qreport-v">${c}</span></div>
          <div class="reader-quiz-parse"><span class="reader-quiz-parse-k">解析</span>${ex}</div>
        </div>
      </div>`;
    })
    .join('');
  return `<div class="reader-quiz-report-wrap">
    <div class="reader-quiz-report-hero">
      <div class="reader-quiz-report-donut" style="--acc:${pct}">
        <div class="reader-quiz-report-donut-hole">
          <span class="reader-quiz-report-donut-pct">${pct}<span class="reader-quiz-report-donut-unit">%</span></span>
          <span class="reader-quiz-report-donut-lab">正确率</span>
        </div>
      </div>
      <div class="reader-quiz-report-hero-text">
        <div class="reader-quiz-report-hero-kicker">测评报告</div>
        <h3 class="reader-quiz-report-hero-title">本次作答概览</h3>
        <p class="reader-quiz-report-hero-sub">共 <strong>${total}</strong> 题 · 答对 <strong>${score}</strong> 题</p>
      </div>
    </div>
    <div class="reader-quiz-report-ai-card">
      <div class="reader-quiz-report-ai-card-head">
        <span class="reader-quiz-report-ai-spark" aria-hidden="true"></span>
        <span class="reader-quiz-report-ai-label">AI 学习评价</span>
      </div>
      <p class="reader-quiz-report-ai">${escAttr(aiText)}</p>
    </div>
  </div>
  <div class="reader-quiz-report-detail-head">逐题解析</div>
  ${rows}`;
}

function readerOpenQuizModal(slotId) {
  if (slotId && READER_PRACTICE_SLOTS.some((s) => s.id === slotId)) {
    readerActiveQuizSlot = slotId;
  } else {
    readerActiveQuizSlot = 'a';
  }
  const qz = readerGetCurrentQuiz();
  const ov = document.getElementById('readerQuizOverlay');
  const body = document.getElementById('readerQuizBody');
  const foot = document.getElementById('readerQuizFoot');
  const sub = document.getElementById('readerQuizSub');
  const title = document.getElementById('readerQuizTitle');
  if (!qz || !ov || !body || !foot) return;
  if (title) title.textContent = qz.title;
  if (sub) sub.textContent = qz.subtitle;
  readerQuizPhase = 'questions';
  readerQuizStepIndex = 0;
  readerQuizDraftAnswers = {};
  body.innerHTML = readerQuizLayoutHtml();
  readerQuizRenderCurrentStep();
  ov.classList.add('open');
  ov.setAttribute('aria-hidden', 'false');
}

function readerCloseQuizModal() {
  const ov = document.getElementById('readerQuizOverlay');
  if (!ov) return;
  ov.classList.remove('open');
  ov.setAttribute('aria-hidden', 'true');
  readerQuizPhase = 'idle';
  readerQuizStepIndex = 0;
  readerQuizDraftAnswers = {};
}

/** 已完成：从本地存档打开最近一次答题报告（无逐题存档时仅展示正确率说明） */
function readerOpenSavedReport(slotId) {
  if (slotId && READER_PRACTICE_SLOTS.some((s) => s.id === slotId)) {
    readerActiveQuizSlot = slotId;
  } else {
    readerActiveQuizSlot = 'a';
  }
  const b = readerContext.b;
  if (!b) {
    showProfileToast('请先打开教材阅读');
    return;
  }
  const comp = readerGetQuizCompletion(b, slotId);
  if (!comp || !comp.done) {
    showProfileToast('暂无答题报告');
    return;
  }
  let result = comp.report;
  if (!result && comp.demoPreset && slotId === READER_DEMO_PRESET_COMPLETED_SLOT) {
    result = readerBuildDemoReportResult(slotId);
  }
  const qz = readerGetQuizBySlot(readerActiveQuizSlot);
  const ov = document.getElementById('readerQuizOverlay');
  const body = document.getElementById('readerQuizBody');
  const foot = document.getElementById('readerQuizFoot');
  const title = document.getElementById('readerQuizTitle');
  const sub = document.getElementById('readerQuizSub');
  if (!qz || !ov || !body || !foot) return;
  if (title) title.textContent = qz.title;
  if (sub) sub.textContent = qz.subtitle;
  readerQuizPhase = 'report';
  const sid = readerActiveQuizSlot;
  if (result) {
    body.innerHTML = readerRenderQuizReport(result);
  } else {
    const sc = comp.score != null ? comp.score : '—';
    const tot = comp.total != null ? comp.total : '—';
    const legacyPct =
      sc !== '—' && tot !== '—' && Number.isFinite(Number(sc)) && Number.isFinite(Number(tot)) && Number(tot) > 0
        ? Math.round((Number(sc) / Number(tot)) * 100)
        : null;
    body.innerHTML = `<div class="reader-quiz-report-wrap">
      <div class="reader-quiz-report-hero reader-quiz-report-hero--simple">
        <div class="reader-quiz-report-donut" style="--acc:${legacyPct != null ? legacyPct : 0}">
          <div class="reader-quiz-report-donut-hole">
            <span class="reader-quiz-report-donut-pct">${legacyPct != null ? legacyPct : '—'}${legacyPct != null ? '<span class="reader-quiz-report-donut-unit">%</span>' : ''}</span>
            <span class="reader-quiz-report-donut-lab">正确率</span>
          </div>
        </div>
        <div class="reader-quiz-report-hero-text">
          <div class="reader-quiz-report-hero-kicker">答题报告</div>
          <h3 class="reader-quiz-report-hero-title">历史记录</h3>
          <p class="reader-quiz-report-hero-sub">答对 <strong>${sc}</strong> / <strong>${tot}</strong> 题</p>
        </div>
      </div>
      <div class="reader-quiz-report-ai-card reader-quiz-report-ai-card--muted">
        <p class="reader-quiz-report-ai">暂无逐题解析存档。可点击「再测一次」重新作答以生成完整报告与 AI 评价。</p>
      </div>
    </div>`;
  }
  foot.innerHTML = `<button type="button" class="reader-quiz-btn" onclick="readerCloseQuizModal()">关闭</button>
    <button type="button" class="reader-quiz-btn reader-quiz-btn--primary" onclick="readerOpenQuizModal('${sid}')">再测一次</button>`;
  ov.classList.add('open');
  ov.setAttribute('aria-hidden', 'false');
}

function readerSubmitQuizModal() {
  if (readerQuizPhase !== 'questions') return;
  const qz = readerGetCurrentQuiz();
  if (!qz) return;
  const answers = readerCollectQuizAnswers();
  const missing = qz.questions.some((q) => {
    const v = answers[q.id];
    if (q.type === 'choice') return v == null || Number.isNaN(v);
    if (q.type === 'tf') return v !== true && v !== false;
    if (q.type === 'fill' || q.type === 'short') return !String(v || '').trim();
    return false;
  });
  if (missing) {
    showProfileToast('请完成全部题目后再提交');
    return;
  }
  const result = readerGradeQuizSession(answers);
  readerSaveQuizCompletion(readerContext.b, result, readerActiveQuizSlot);
  const body = document.getElementById('readerQuizBody');
  const foot = document.getElementById('readerQuizFoot');
  const slot = readerActiveQuizSlot;
  if (body) body.innerHTML = readerRenderQuizReport(result);
  if (foot) {
    foot.innerHTML = `<button type="button" class="reader-quiz-btn" onclick="readerCloseQuizModal()">关闭</button>
      <button type="button" class="reader-quiz-btn reader-quiz-btn--primary" onclick="readerOpenQuizModal('${slot}')">再测一次</button>`;
  }
  readerQuizPhase = 'report';
  if (readerContext.currentCid === 'r4') {
    readerGo('r4', { noScroll: true });
  }
}

function readerQuizOnKeydown(ev) {
  if (ev.key !== 'Escape') return;
  if (document.getElementById('readerQuizOverlay')?.classList.contains('open')) {
    readerCloseQuizModal();
  }
}
document.addEventListener('keydown', readerQuizOnKeydown);

/** 阅读顶栏模式 pill 前的彩色小图标（与模式 key 对应） */
function readerModePillIconHtml(modeKey) {
  const ic = {
    read: `<span class="reader-mode-pill-icon" aria-hidden="true"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#15803d" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path fill="#22c55e" d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path fill="#4ade80" d="M6.5 2H18v18H6.5A2.5 2.5 0 0 1 4 17.5v-13A2.5 2.5 0 0 1 6.5 2z" opacity=".4"/></svg></span>`,
    av: `<span class="reader-mode-pill-icon" aria-hidden="true"><svg width="17" height="17" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#8b5cf6"/><path fill="#fff" d="M10 8.5l5.5 3.5-5.5 3.5v-7z"/></svg></span>`,
    task: `<span class="reader-mode-pill-icon" aria-hidden="true"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="3" width="14" height="18" rx="2" fill="#f97316"/><path fill="#fff" fill-opacity=".9" d="M8 7h8v1.8H8V7zm0 3.2h5v1.8H8v-1.8z"/><path stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M8.3 16.2l2.2 2.2 4.2-5"/></svg></span>`,
    kg: `<span class="reader-mode-pill-icon" aria-hidden="true"><svg width="17" height="17" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="5.5" cy="8" r="3" fill="#0ea5e9"/><circle cx="18.5" cy="8" r="3" fill="#6366f1"/><circle cx="12" cy="17" r="3" fill="#ec4899"/><path stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round" d="M7.8 10.2l4.4 5M16.2 10.2l-4.4 5"/></svg></span>`,
  };
  return ic[modeKey] || '';
}

function openReader(bookIdx, source, initialModeKey) {
  const list = source === 'my' ? myB : books;
  const b = list[bookIdx];
  if (!b) return;
  readerCloseQuizModal();
  readerActiveQuizSlot = 'a';
  readerContext = { bookIdx, source, b, currentCid: null };
  const tEl = document.getElementById('readerDocTitle');
  if (tEl) tEl.textContent = `${b.t} · ${b.s}`;
  const tocEl = document.getElementById('readerTocTree');
  if (tocEl) tocEl.innerHTML = renderReaderTocNodes(READER_OUTLINE, 0);
  const validModes = new Set(['read', 'av', 'task', 'kg']);
  const initial = validModes.has(initialModeKey) ? initialModeKey : 'read';
  const bar = document.getElementById('readerModeBar');
  if (bar) {
    bar.innerHTML = [
      ['read', '阅读模式'],
      ['av', '视听模式'],
      ['task', '任务模式'],
      ['kg', '知识图谱'],
    ]
      .map(
        ([k, lab]) =>
          `<button type="button" data-mode="${k}" class="reader-mode-pill${initial === k ? ' reader-mode-pill--on' : ''}" onclick="readerQuickMode('${k}')">${readerModePillIconHtml(k)}<span class="reader-mode-pill-label">${lab}</span></button>`
      )
      .join('');
  }
  const entry = readerDefaultEntryCid();
  if (entry) readerGo(entry);
  const ov = document.getElementById('readerOverlay');
  if (ov) {
    ov.classList.add('open');
    ov.setAttribute('aria-hidden', 'false');
  }
  document.body.style.overflow = 'hidden';
  readerSetBg('paper', true);
  readerApplyFontSize(document.getElementById('readerFontRange')?.value || '17', true);
  renderReaderNotesList();
  if (initial !== 'read') {
    readerQuickMode(initial);
  }
}

function closeReader() {
  readerCloseQuizModal();
  const ov = document.getElementById('readerOverlay');
  if (ov) {
    ov.classList.remove('open', 'ai-open', 'notes-open', 'toc-collapsed');
    ov.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
  readerCloseToolSlots();
}

function openReaderFromDetail() {
  const { bookIdx, source, b } = detailViewContext;
  if (bookIdx == null || !b) return;
  closeDetail();
  openReader(bookIdx, source);
}

/** 详情「学习模式」卡片：关闭详情并进入阅读器，顶栏选中对应模式 */
function openReaderFromDetailMode(modeKey) {
  const { bookIdx, source, b } = detailViewContext;
  if (bookIdx == null || !b) return;
  const valid = new Set(['read', 'av', 'task', 'kg']);
  const k = valid.has(modeKey) ? modeKey : 'read';

  if (source === 'lib' && !isLibBookPurchased(b)) {
    if (k === 'read') {
      closeDetail();
      openReader(bookIdx, 'lib', 'read');
      return;
    }
    closeDetail();
    const m = BOOK_READ_MODES.find((x) => x.key === k);
    if (!m) return;
    const toast = document.createElement('div');
    toast.style.cssText =
      'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--deep);color:white;padding:14px 24px;border-radius:12px;font-size:13px;z-index:300;box-shadow:0 8px 30px rgba(0,0,0,0.15);animation:fadeUp 0.3s ease;max-width:min(420px,calc(100vw - 48px));text-align:center;line-height:1.5';
    toast.innerHTML = `<span style="opacity:0.9">「${b.t} · ${b.s}」</span><br><span style="font-weight:500">正在进入「${m.label}」</span> <span style="opacity:0.75">（演示）</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 2400);
    return;
  }

  closeDetail();
  openReader(bookIdx, source, k);
}

function readerQuickMode(k) {
  document.querySelectorAll('.reader-mode-pill').forEach((p) => p.classList.remove('reader-mode-pill--on'));
  document.querySelector(`.reader-mode-pill[data-mode="${k}"]`)?.classList.add('reader-mode-pill--on');
  if (k === 'read') return;
  const labels = { av: '视听模式', task: '任务模式', kg: '知识图谱' };
  showProfileToast(`正在进入「${labels[k] || k}」（演示）`);
}

function readerToggleAi() {
  readerCloseToolSlots();
  const ov = document.getElementById('readerOverlay');
  if (!ov) return;
  ov.classList.toggle('ai-open');
  ov.classList.remove('notes-open');
  if (ov.classList.contains('ai-open') && !document.getElementById('readerAiMessages')?.dataset.inited) {
    const box = document.getElementById('readerAiMessages');
    if (box) {
      box.innerHTML = `<div class="reader-ai-bubble">你好，我是阅读助手。可为你讲解本课生词、段落大意与阅读题思路。</div>`;
      box.dataset.inited = '1';
    }
  }
}

function readerSendAi() {
  const inp = document.getElementById('readerAiInput');
  const q = (inp && inp.value.trim()) || '';
  if (!q) return;
  const box = document.getElementById('readerAiMessages');
  if (!box) return;
  box.insertAdjacentHTML(
    'beforeend',
    `<div class="reader-ai-bubble reader-ai-bubble--user">${escAttr(q)}</div><div class="reader-ai-bubble">已收到。演示环境不连接真实大模型，可对接业务接口后返回答案。</div>`
  );
  inp.value = '';
  box.scrollTop = box.scrollHeight;
}

function readerToggleNotes() {
  readerCloseToolSlots();
  const ov = document.getElementById('readerOverlay');
  if (!ov) return;
  ov.classList.toggle('notes-open');
  ov.classList.remove('ai-open');
}

function readerSaveNote() {
  const ta = document.getElementById('readerNotesTextarea');
  const text = (ta && ta.value.trim()) || '';
  if (!text) {
    showProfileToast('请先输入笔记内容');
    return;
  }
  readerNotesStore.push({ text, t: Date.now(), cid: readerContext.currentCid });
  if (ta) ta.value = '';
  renderReaderNotesList();
  showProfileToast('笔记已保存（演示）');
}

function renderReaderNotesList() {
  const list = document.getElementById('readerNotesList');
  if (!list) return;
  if (!readerNotesStore.length) {
    list.innerHTML = '<p style="color:var(--silver);font-size:12px;margin:0">暂无笔记</p>';
    return;
  }
  list.innerHTML = readerNotesStore
    .map(
      (n) =>
        `<div class="reader-note-item"><div class="reader-note-time">${new Date(n.t).toLocaleString()}</div>${escAttr(n.text)}</div>`
    )
    .reverse()
    .join('');
}

function readerToggleDisplayPanel() {
  const d = document.getElementById('readerToolDisplay');
  const s = document.getElementById('readerToolSearch');
  if (!d) return;
  d.classList.toggle('is-open');
  s?.classList.remove('is-open');
}

function readerToggleSearch() {
  const d = document.getElementById('readerToolDisplay');
  const s = document.getElementById('readerToolSearch');
  if (!s) return;
  s.classList.toggle('is-open');
  d?.classList.remove('is-open');
  if (s.classList.contains('is-open')) {
    setTimeout(() => document.getElementById('readerSearchInput')?.focus(), 30);
  }
}

function readerOnSearchInput() {
  const q = (document.getElementById('readerSearchInput')?.value || '').trim().toLowerCase();
  document.querySelectorAll('#readerTocTree .reader-toc-leaf').forEach((el) => {
    const t = (el.dataset.search || el.textContent || '').toLowerCase();
    el.classList.toggle('reader-toc-dim', !!q && !t.includes(q));
  });
}

function readerCloseToolSlots() {
  document.querySelectorAll('.reader-tool-slot.is-open').forEach((el) => el.classList.remove('is-open'));
}

function readerClosePopovers() {
  readerCloseToolSlots();
}

function readerApplyFontSize(px, silent) {
  const n = Math.min(22, Math.max(14, parseInt(px, 10) || 17));
  const main = document.getElementById('readerMain');
  if (main) main.style.setProperty('--reader-font', `${n}px`);
  const fv = document.getElementById('readerFontVal');
  if (fv) fv.textContent = `${n}px`;
  const r = document.getElementById('readerFontRange');
  if (r) r.value = String(n);
}

function readerSetBg(mode, silent) {
  const main = document.getElementById('readerMain');
  if (main) main.setAttribute('data-bg', mode);
  document.querySelectorAll('.reader-bg-swatch').forEach((s) => {
    s.classList.toggle('is-active', s.dataset.bg === mode);
  });
}

function readerToggleTocCollapse() {
  document.getElementById('readerOverlay')?.classList.toggle('toc-collapsed');
}

document.getElementById('readerFontRange')?.addEventListener('input', (e) => {
  readerApplyFontSize(e.target.value, true);
});

Object.assign(window, {
  go, renderLib, openDetail, closeDetail, switchTab, toggleUnit, handleBuy, handlePrint, onTocLockedClick,
  openRedeem, closeRedeem, doRedeem, openCreateClass, closeCreateClass, doCreateClass,
  openJoinClass, closeJoinClass, doJoinClass,
  openClassDetail, closeClassDetail, copyCode, openBookPicker, closeBookPicker, dissolveClass, leaveClass,
  addBookToClass, removeClassBook, setGradeFilter, setSubjectFilter,
  openSchoolModal, closeSchoolModal, confirmSchoolBind, clearSchoolBind,
  bookShortcut,
  openReader, closeReader, openReaderFromDetail, openReaderFromDetailMode, readerGo, readerToggleTocGroup,
  readerOpenQuizModal, readerCloseQuizModal, readerSubmitQuizModal, readerQuizPickChoice, readerQuizPickTf,
  readerQuizGoNext, readerQuizGoPrev, readerQuizJumpToStep, readerQuizOnInputChanged, readerOpenSavedReport,
  readerQuickMode, readerToggleAi, readerSendAi, readerToggleNotes, readerSaveNote, readerToggleSearch, readerOnSearchInput,
  readerToggleDisplayPanel, readerClosePopovers, readerCloseToolSlots, readerApplyFontSize, readerSetBg, readerToggleTocCollapse,
  renderSettings, saveSettingsProfile, handleSettingsAvatar, openPasswordModal, closePasswordModal, confirmPasswordChange, logoutAccount,
  onFeedbackFilesChange, removeFeedbackImage, submitUserFeedback, openFeedbackModal, closeFeedbackModal
});

