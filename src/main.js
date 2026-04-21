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

const books=[
  {t:'语文',s:'必修上册',g:'高一',p:'人民教育出版社',tp:'r',sub:'语文'},
  {t:'语文',s:'必修下册',g:'高一',p:'人民教育出版社',tp:'r',sub:'语文'},
  {t:'数学',s:'必修第一册',g:'高一',p:'人民教育出版社',tp:'r',sub:'数学'},
  {t:'数学',s:'必修第二册',g:'高一',p:'人民教育出版社',tp:'r',sub:'数学'},
  {t:'英语',s:'必修第一册',g:'高一',p:'外语教学与研究出版社',tp:'r',sub:'英语'},
  {t:'英语',s:'必修第二册',g:'高一',p:'外语教学与研究出版社',tp:'r',sub:'英语'},
  {t:'物理',s:'必修第一册',g:'高一',p:'人民教育出版社',tp:'r',sub:'物理'},
  {t:'物理',s:'必修第二册',g:'高一',p:'人民教育出版社',tp:'r',sub:'物理'},
  {t:'化学',s:'必修第一册',g:'高一',p:'人民教育出版社',tp:'r',sub:'化学'},
  {t:'化学',s:'必修第二册',g:'高一',p:'人民教育出版社',tp:'r',sub:'化学'},
  {t:'生物',s:'必修一 分子与细胞',g:'高一',p:'人民教育出版社',tp:'r',sub:'生物'},
  {t:'历史',s:'必修 中外历史纲要(上)',g:'高一',p:'人民教育出版社',tp:'r',sub:'历史'},
  {t:'地理',s:'必修第一册',g:'高一',p:'人民教育出版社',tp:'r',sub:'地理'},
  {t:'政治',s:'必修一 中国特色社会主义',g:'高一',p:'人民教育出版社',tp:'r',sub:'政治'},
  {t:'信息技术',s:'必修一 数据与计算',g:'高一',p:'教育科学出版社',tp:'o',sub:'信息技术'},
  {t:'美术',s:'必修 美术鉴赏',g:'高一',p:'人民美术出版社',tp:'o',sub:'美术'},
  {t:'音乐',s:'必修 音乐鉴赏',g:'高一',p:'人民音乐出版社',tp:'o',sub:'音乐'},
  {t:'语文',s:'选择性必修上册',g:'高二',p:'人民教育出版社',tp:'r',sub:'语文'},
  {t:'数学',s:'选择性必修第一册',g:'高二',p:'人民教育出版社',tp:'r',sub:'数学'},
  {t:'英语',s:'选择性必修第一册',g:'高二',p:'外语教学与研究出版社',tp:'r',sub:'英语'},
  {t:'物理',s:'选择性必修第一册',g:'高二',p:'人民教育出版社',tp:'r',sub:'物理'},
  {t:'化学',s:'选择性必修一',g:'高二',p:'人民教育出版社',tp:'r',sub:'化学'},
  {t:'生物',s:'选择性必修一 稳态与调节',g:'高二',p:'人民教育出版社',tp:'r',sub:'生物'},
  {t:'历史',s:'选择性必修一 国家制度',g:'高二',p:'人民教育出版社',tp:'r',sub:'历史'},
];

const myB=[
  {t:'语文',s:'选择性必修上册',g:'高二',p:'人民教育出版社',tp:'r',sub:'语文',pr:78},
  {t:'数学',s:'选择性必修第一册',g:'高二',p:'人民教育出版社',tp:'r',sub:'数学',pr:45},
  {t:'英语',s:'选择性必修第一册',g:'高二',p:'外语教学与研究出版社',tp:'r',sub:'英语',pr:92},
  {t:'物理',s:'选择性必修第一册',g:'高二',p:'人民教育出版社',tp:'r',sub:'物理',pr:30},
  {t:'化学',s:'选择性必修一',g:'高二',p:'人民教育出版社',tp:'r',sub:'化学',pr:15},
  {t:'历史',s:'选择性必修一 国家制度',g:'高二',p:'人民教育出版社',tp:'r',sub:'历史',pr:60},
];

function c(sub){return PAL[SM[sub]??0]}

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

// === CLASS GROUP DATA ===
const CURRENT_USER = '李明远';

const classGroups=[
  {
    id:1,name:'高二（3）班语文研读组',subject:'语文',desc:'语文选择性必修课程深度研读',
    code:'SCH2-YWRD',created:'2026-03-15',admin:'李明远',
    books:[
      {t:'语文',s:'选择性必修上册',g:'高二',p:'人民教育出版社',sub:'语文'},
      {t:'语文',s:'必修下册',g:'高一',p:'人民教育出版社',sub:'语文'},
    ],
    students:[
      {name:'王思涵',id:'2024030101',bp:[95,88],last:'今天'},
      {name:'张子墨',id:'2024030102',bp:[82,79],last:'今天'},
      {name:'刘雨桐',id:'2024030103',bp:[78,65],last:'昨天'},
      {name:'陈思远',id:'2024030104',bp:[70,60],last:'昨天'},
      {name:'赵梓涵',id:'2024030105',bp:[66,55],last:'2天前'},
      {name:'孙晓彤',id:'2024030106',bp:[62,50],last:'2天前'},
      {name:'周文博',id:'2024030107',bp:[55,48],last:'3天前'},
      {name:'吴思琪',id:'2024030108',bp:[50,40],last:'3天前'},
      {name:'郑浩然',id:'2024030109',bp:[42,35],last:'4天前'},
      {name:'马欣怡',id:'2024030110',bp:[35,28],last:'5天前'},
      {name:'黄子轩',id:'2024030111',bp:[28,20],last:'6天前'},
      {name:'林雅琪',id:'2024030112',bp:[22,15],last:'1周前'},
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
    ]
  },
];

const AVATAR_COLORS=[
  ['#4aaa85','#78c8a8'],['#4a8ec8','#7ab4de'],['#d48548','#e8a870'],
  ['#8a60b8','#aa88d0'],['#c85a72','#e08898'],['#b8a030','#d0c060'],
  ['#4a98b0','#78bcd0'],['#98804a','#b8a878'],
];

function openDetail(bookIdx, source){
  const list = source === 'my' ? myB : books;
  const b = list[bookIdx];
  const [c1,c2] = c(b.sub);
  const price = PRICES[b.sub] || 19.90;
  const isMine = source === 'my';

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
      <div class="detail-book-sub">${b.g} · ${b.tp==='r'?'必修教材':'选修教材'}</div>
      <div class="detail-meta-grid">
        <div class="meta-item"><span class="meta-label">出版社</span><span class="meta-value">${b.p}</span></div>
        <div class="meta-item"><span class="meta-label">版本</span><span class="meta-value">2024年修订版</span></div>
        <div class="meta-item"><span class="meta-label">ISBN</span><span class="meta-value">978-7-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1+Math.random()*9)}</span></div>
        <div class="meta-item"><span class="meta-label">格式</span><span class="meta-value">PDF / EPUB</span></div>
      </div>
      <div class="detail-actions">
        ${isMine
          ? `<button class="btn-buy purchased">已购买</button>
             <button class="btn-print" onclick="handlePrint(event)">
               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
               打印教材
             </button>`
          : `<button class="btn-buy" onclick="handleBuy(this)">立即购买</button>
             <button class="btn-trial" onclick="openRedeem()">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="margin-right:4px;vertical-align:-2px"><path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="M16 2v6M8 2v6"/></svg>兑换码
             </button>
             <button class="btn-trial">免费试读</button>
             <span class="detail-price">¥${price.toFixed(2)}</span>
             <span class="detail-price-orig">¥${(price*1.5).toFixed(2)}</span>`
        }
      </div>
    </div>`;

  // Intro
  const desc = DESC[b.sub] || '本教材严格按照国家课程标准编写，内容科学规范，注重学科核心素养的培养。';
  const modeHtml = isMine ? `
    <div class="mode-section">
      <div class="intro-heading"><span class="bar"></span>学习模式</div>
      <div class="mode-grid">
        <div class="mode-card" onclick="alertMode('阅读模式')">
          <div class="mode-icon mi-read">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <div class="mode-info">
            <div class="mode-name">阅读模式</div>
            <div class="mode-desc">沉浸式阅读体验，支持批注、书签、笔记和划线标注</div>
          </div>
          <svg class="mode-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
        <div class="mode-card" onclick="alertMode('视听模式')">
          <div class="mode-icon mi-av">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <div class="mode-info">
            <div class="mode-name">视听模式</div>
            <div class="mode-desc">配套微课视频、课文朗读、名师讲解音频资源</div>
          </div>
          <svg class="mode-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
        <div class="mode-card" onclick="alertMode('任务模式')">
          <div class="mode-icon mi-task">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          </div>
          <div class="mode-info">
            <div class="mode-name">任务模式</div>
            <div class="mode-desc">章节练习、课后作业、自测试卷，自动批改与错题收集</div>
          </div>
          <svg class="mode-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
        <div class="mode-card" onclick="alertMode('知识图谱')">
          <div class="mode-icon mi-kg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="5" y2="16"/><line x1="12" y1="8" x2="19" y2="16"/><line x1="5" y1="19" x2="19" y2="19"/></svg>
          </div>
          <div class="mode-info">
            <div class="mode-name">知识图谱</div>
            <div class="mode-desc">可视化知识结构，智能关联跨章节概念与考点脉络</div>
          </div>
          <svg class="mode-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>
    </div>` : '';

  document.getElementById('pane-intro').innerHTML = `
    ${isMine ? modeHtml : ''}
    <div class="intro-section" ${isMine?'style="margin-top:28px"':''}>
      <div class="intro-heading"><span class="bar"></span>教材简介</div>
      <div class="intro-text">${desc}</div>
    </div>
    <div class="intro-section">
      <div class="intro-heading"><span class="bar"></span>教材特色</div>
      <div class="intro-text">本教材具有以下特色：紧扣课程标准，科学设计教学内容；注重情境创设，激发学习兴趣；设置多样化练习，巩固知识要点；融入信息技术，支持数字化学习。配套丰富的数字资源，包括教学课件、微课视频、在线练习等。</div>
      <div class="intro-tags">
        <span class="intro-tag">${b.g}</span>
        <span class="intro-tag">${b.tp==='r'?'必修':'选修'}</span>
        <span class="intro-tag">数字版</span>
        <span class="intro-tag">配套资源</span>
        <span class="intro-tag">课程标准</span>
      </div>
    </div>`;

  // TOC
  const toc = TOC[b.sub] || [{u:'第一单元',ls:['第1课','第2课','第3课']},{u:'第二单元',ls:['第4课','第5课','第6课']}];
  const tocColor = c1;
  document.getElementById('pane-toc').innerHTML = `
    <ul class="toc-list">
      ${toc.map((unit,ui) => `
        <li class="toc-unit${ui===0?' open':''}">
          <div class="toc-unit-head" onclick="toggleUnit(this)">
            <span class="toc-unit-num" style="background:${tocColor}15;color:${tocColor}">${ui+1}</span>
            <span>${unit.u}</span>
            <svg class="toc-unit-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          <div class="toc-lessons">
            ${unit.ls.map(l => `
              <div class="toc-lesson">
                <span class="toc-lesson-dot" style="background:${tocColor}"></span>
                <span>${l}</span>
                ${!isMine?`<svg class="toc-lesson-lock" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`:''}
              </div>`).join('')}
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
  btn.textContent='已购买';
  btn.classList.add('purchased');
  // hide trial & price
  const actions = btn.parentElement;
  const trial = actions.querySelector('.btn-trial');
  const price = actions.querySelector('.detail-price');
  const orig = actions.querySelector('.detail-price-orig');
  if(trial) trial.style.display='none';
  if(price) price.style.display='none';
  if(orig) orig.style.display='none';
}

// Close on Escape
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeRedeem();closeDetail();closeCreateClass();closeClassDetail();closeBookPicker();closeJoinClass()}
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

// Mode alert
function alertMode(name){
  closeDetail();
  const toast=document.createElement('div');
  toast.style.cssText='position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--deep);color:white;padding:14px 28px;border-radius:12px;font-size:13px;z-index:300;box-shadow:0 8px 30px rgba(0,0,0,0.15);animation:fadeUp 0.3s ease;display:flex;align-items:center;gap:10px';
  toast.innerHTML=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>正在进入「${name}」...`;
  document.body.appendChild(toast);
  setTimeout(()=>{toast.style.opacity='0';toast.style.transition='opacity 0.3s';setTimeout(()=>toast.remove(),300)},2000);
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
    :`<span class="member-pill">学生成员</span>`;

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
    </div>`;

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
  cls.books.push({t:bk.t,s:bk.s,g:bk.g,p:bk.p,sub:bk.sub});
  // Add random progress for existing students
  cls.students.forEach(st=>{st.bp.push(Math.floor(Math.random()*60))});
  el.classList.add('added');
  el.onclick=null;
  // Refresh detail
  closeBookPicker();
  openClassDetail(classIdx);
}

function removeClassBook(classIdx,bookIdx){
  const cls=classGroups[classIdx];
  if(!cls||cls.admin!==CURRENT_USER)return;
  cls.books.splice(bookIdx,1);
  cls.students.forEach(st=>{st.bp.splice(bookIdx,1)});
  openClassDetail(classIdx);
}

function mkCard(b,i,wp){
  const [c1,c2]=c(b.sub);
  const pc=(b.pr||0)>=80?'var(--mint-deep)':(b.pr||0)>=40?'var(--peach-deep)':'var(--rose-deep)';
  let st='';
  if(wp) st=`<div class="card-st st-ok" title="已在书架"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>`;
  let pg='';
  if(wp) pg=`<div class="prog"><div class="prog-track"><div class="prog-fill" style="width:${b.pr}%;background:${pc}"></div></div><span class="prog-pct">${b.pr}%</span></div>`;
  return `<div class="card" style="animation-delay:${i*0.04}s" onclick="openDetail(${i},'${wp?'my':'lib'}')">${st}<div class="cover"><div class="cover-inner" style="background:linear-gradient(145deg,${c1},${c2})"><span class="cover-grade">${b.g}</span><div class="cover-name">${b.t}</div><div class="cover-sub">${b.s}</div></div></div><div class="detail"><div class="detail-title">${b.t} · ${b.s}</div><div class="detail-row"><span class="detail-pub">${b.p}</span><span class="tag ${b.tp==='r'?'tag-req':'tag-opt'}">${b.tp==='r'?'必修':'选修'}</span></div>${pg}</div></div>`;
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
    ?`<div class="grid">${list.map((b,i)=>mkCard(b,i,false)).join('')}</div>`
    :`<div style="text-align:center;padding:80px;color:var(--stone)"><p style="font-size:14px;margin-bottom:4px">未找到匹配的教材</p><p style="font-size:12px;color:var(--silver)">请尝试调整筛选条件</p></div>`;

  document.getElementById('page-library').innerHTML=`
    <div class="filters">${gc}<div class="pill-sep"></div>${sc}</div>
    <div class="sec-head"><div class="sec-title"><span class="dot"></span>教材资源</div><div class="sec-extra">共 ${list.length} 本</div></div>${bk}`;
}

function renderMy(){
  const avg=Math.round(myB.reduce((s,b)=>s+b.pr,0)/myB.length);

  const classHtml=classGroups.map((cls,i)=>{
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
    <div class="stats">
      <div class="stat-box"><div class="stat-ic si-mint"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div><div class="stat-data"><div class="stat-val">${myB.length}</div><div class="stat-lab">我的教材总数</div></div></div>
      <div class="stat-box stat-box--action" onclick="openRedeem()" role="button" tabindex="0">
        <div class="stat-ic si-lavender"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="M16 2v6M8 2v6"/></svg></div>
        <div class="stat-data"><div class="stat-val stat-val--action">兑换教材</div><div class="stat-lab">输入兑换码添加至书架</div></div>
      </div>
      <div class="stat-box"><div class="stat-ic si-peach"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div><div class="stat-data"><div class="stat-val">${avg}%</div><div class="stat-lab">平均学习进度</div></div></div>
    </div>
    <div class="join-class-entry" onclick="openJoinClass()" role="button" tabindex="0">
      <div class="join-class-entry-ic">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </div>
      <div class="join-class-entry-text">
        <div class="join-class-entry-title">通过邀请码加入班级</div>
        <div class="join-class-entry-desc">管理员向你发送邀请后，输入对方提供的邀请码即可加入对应班级</div>
      </div>
      <svg class="join-class-entry-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
    <div class="sec-head"><div class="sec-title"><span class="dot"></span>我的书架</div><div class="sec-extra">管理教材 →</div></div>
    <div class="grid">${myB.map((b,i)=>mkCard(b,i,true)).join('')}</div>
    <div class="class-section">
      <div class="sec-head">
        <div class="sec-title"><span class="dot"></span>我的班级</div>
        <div class="sec-head-actions">
          <button type="button" class="btn-join-inline" onclick="event.stopPropagation();openJoinClass()">通过邀请码加入</button>
          <span class="sec-extra">共 ${classGroups.length} 个班级</span>
        </div>
      </div>
      <div class="class-grid">
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
  if(p==='library'){t.textContent='数字教材';h.textContent='浏览全部数字教材资源';renderLib()}
  else{t.textContent='我的教材';h.textContent='管理已添加的教材与学习进度';renderMy()}
}

renderLib();

document.getElementById('joinClassCode')?.addEventListener('keydown',e=>{
  if(e.key==='Enter'){e.preventDefault();doJoinClass();}
});

Object.assign(window, {
  go, renderLib, openDetail, closeDetail, switchTab, toggleUnit, handleBuy, handlePrint,
  openRedeem, closeRedeem, doRedeem, openCreateClass, closeCreateClass, doCreateClass,
  openJoinClass, closeJoinClass, doJoinClass,
  openClassDetail, closeClassDetail, copyCode, openBookPicker, closeBookPicker,
  addBookToClass, removeClassBook, setGradeFilter, setSubjectFilter
});

