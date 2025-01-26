// 目的地数据
const destinations = [
  // 中国城市
  {
    name: '北京',
    image: 'beijing.jpg',
    description: '中国的首都，拥有丰富的历史文化遗产',
    tips: [
      '参观故宫和天安门广场',
      '尝试北京烤鸭',
      '游览长城'
    ]
  },
  {
    name: '上海',
    image: 'shanghai.jpg',
    description: '现代化大都市，融合了东西方文化',
    tips: [
      '游览外滩',
      '参观上海博物馆',
      '体验磁悬浮列车'
    ]
  },
  {
    name: '西安',
    image: 'xian.jpg',
    description: '古代丝绸之路的起点，兵马俑的故乡',
    tips: [
      '参观兵马俑',
      '游览古城墙',
      '品尝当地小吃'
    ]
  },
  {
    name: '广州',
    image: 'guangzhou.jpg',
    description: '中国南方的门户城市，美食之都',
    tips: [
      '参观广州塔',
      '品尝早茶',
      '游览沙面岛'
    ]
  },

  // 澳大利亚城市
  {
    name: '悉尼',
    image: 'sydney.jpg',
    description: '澳大利亚最大的城市，以歌剧院闻名',
    tips: [
      '参观悉尼歌剧院',
      '游览邦迪海滩',
      '攀登海港大桥'
    ]
  },
  {
    name: '墨尔本',
    image: 'melbourne.jpg',
    description: '澳大利亚的文化之都',
    tips: [
      '参观联邦广场',
      '体验咖啡文化',
      '游览大洋路'
    ]
  },

  // 日本城市
  {
    name: '东京',
    image: 'tokyo.jpg',
    description: '日本首都，现代与传统的完美融合',
    tips: [
      '参观浅草寺',
      '游览涩谷十字路口',
      '体验秋叶原的动漫文化'
    ]
  },
  {
    name: '京都',
    image: 'kyoto.jpg',
    description: '日本古都，保存完好的传统文化',
    tips: [
      '参观金阁寺',
      '体验茶道',
      '游览岚山竹林'
    ]
  },

  // 韩国城市
  {
    name: '首尔',
    image: 'seoul.jpg',
    description: '韩国首都，充满活力的现代都市',
    tips: [
      '参观景福宫',
      '游览明洞购物街',
      '体验韩式汗蒸幕'
    ]
  },
  {
    name: '釜山',
    image: 'busan.jpg',
    description: '韩国第二大城市，以海滩和海鲜闻名',
    tips: [
      '游览海云台海滩',
      '参观釜山塔',
      '品尝海鲜市场美食'
    ]
  },

  // 美国城市
  {
    name: '纽约',
    image: 'newyork.jpg',
    description: '美国最大城市，世界金融中心',
    tips: [
      '参观自由女神像',
      '游览中央公园',
      '观看百老汇演出'
    ]
  },
  {
    name: '洛杉矶',
    image: 'losangeles.jpg',
    description: '美国西海岸娱乐之都',
    tips: [
      '游览好莱坞',
      '参观环球影城',
      '漫步圣莫尼卡海滩'
    ]
  }
];

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
  loadDestinations();
  setupItineraryForm();
  loadTravelTips();
});

// 加载目的地
function loadDestinations() {
  const grid = document.querySelector('.destination-grid');
  grid.innerHTML = destinations.map(dest => `
    <div class="destination-card">
      <div class="card-image" style="background-image: url('images/${dest.image}')"></div>
      <h3>${dest.name}</h3>
      <p>${dest.description}</p>
    </div>
  `).join('');
  
  // 填充目的地选择框
  const select = document.getElementById('destination');
  select.innerHTML = destinations.map(dest => `
    <option value="${dest.name}">${dest.name}</option>
  `).join('');
}

// 设置行程表单
function setupItineraryForm() {
  const form = document.getElementById('plan-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    generateItinerary();
  });
}

// 生成行程
function generateItinerary() {
  const destination = document.getElementById('destination').value;
  const days = parseInt(document.getElementById('days').value);
  const resultDiv = document.getElementById('itinerary-result');
  
  if (!destination || !days) {
    resultDiv.innerHTML = '<p class="error">请填写完整信息</p>';
    return;
  }

  const selectedDest = destinations.find(d => d.name === destination);
  const itinerary = createItinerary(selectedDest, days);
  
  resultDiv.innerHTML = `
    <h3>${destination} ${days}日游行程建议</h3>
    <ol>${itinerary.map(day => `<li>${day}</li>`).join('')}</ol>
  `;
}

// 创建行程计划
function createItinerary(destination, days) {
  const itinerary = [];
  const tips = [...destination.tips];
  
  const timeSlots = [
    '08:00-10:00',
    '10:30-12:30',
    '13:30-15:30',
    '16:00-18:00',
    '19:00-21:00'
  ];

  for (let i = 1; i <= days; i++) {
    const dayPlan = [];
    dayPlan.push(`第${i}天行程：`);
    
    // 添加主要活动
    if (tips.length > 0) {
      dayPlan.push(`${timeSlots[0]} ${tips.shift()}`);
    } else {
      dayPlan.push(`${timeSlots[0]} 自由活动`);
    }

    // 添加其他时间段活动
    for (let j = 1; j < timeSlots.length; j++) {
      const activity = getRandomActivity(destination.name);
      dayPlan.push(`${timeSlots[j]} ${activity}`);
    }

    itinerary.push(dayPlan.join('<br>'));
  }
  
  return itinerary;
}

// 随机活动建议
function getRandomActivity(city) {
  const activities = {
    '北京': ['胡同游览', '798艺术区参观', '国家大剧院演出'],
    '上海': ['南京路购物', '田子坊艺术区游览', '黄浦江夜游'],
    '西安': ['大唐不夜城游览', '回民街美食体验', '大雁塔音乐喷泉'],
    '广州': ['珠江夜游', '北京路步行街购物', '长隆野生动物园'],
    '悉尼': ['达令港游览', '岩石区探索', '塔龙加动物园'],
    '墨尔本': ['维多利亚市场购物', '皇家植物园漫步', '雅拉河游船'],
    '东京': ['原宿时尚街购物', '台场海滨公园游览', '东京塔夜景'],
    '京都': ['祗园漫步', '清水寺参观', '岚山小火车体验'],
    '首尔': ['弘大艺术区游览', '南山首尔塔夜景', '汉江公园野餐'],
    '釜山': ['甘川文化村游览', '广安里海滩漫步', '札嘎其市场美食'],
    '纽约': ['时代广场游览', '大都会博物馆参观', '布鲁克林大桥漫步'],
    '洛杉矶': ['比佛利山庄游览', '格里菲斯天文台参观', '圣莫尼卡码头体验']
  };

  const cityActivities = activities[city] || ['当地美食体验', '城市观光', '购物休闲'];
  return cityActivities[Math.floor(Math.random() * cityActivities.length)];
}

// 加载旅行小贴士
function loadTravelTips() {
  const tipsList = document.querySelector('.tips-list');
  const allTips = destinations.flatMap(dest => dest.tips);
  
  tipsList.innerHTML = allTips.map(tip => `
    <li>${tip}</li>
  `).join('');
}
