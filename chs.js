/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Default Save": "默认存档",
    "Delete": "删除",
    "No": "否",
    "Saves": "存档",
    "Options": "选项",
    "Yes": "是",
    "Are you sure?": "你确定吗？",
    "Edit Name": "编辑名称",
    "Info": "信息",
    "Currently:": "当前:",
    "Appearance": "外观",
    "How the game looks.": "游戏看起来如何。",
    "Theme": "主题",
    "Show milestones": "显示里程碑",
    "Show TPS meter at the bottom-left corner of the page.": "在页面左下角显示 TPS。",
    "Show TPS": "显示 TPS",
    "None": "无",
    "Align modifier units": "对齐概览单位",
    "Align numbers to the beginning of the unit in modifier view.": "在概览视图中将数字与单元的开头对齐。",
    "Select which milestones to display based on criterias.": "根据标准选择要显示的里程碑。",
    "All": "全部",
    "Classic": "经典",
    "Configurable": "可配置",
    "Duplicate": "复制",
    "Mute": "静音",
    "Unmute": "播放",
    "log2(Points + 2)": "log2(点数 + 2)",
    "\"Having a Garden improves your quality of life\"": "“拥有一个花园可以提高你的生活质量”",
    "(Ecological Plant Agency)": "（生态植物局）",
    "(Get 3 Reclaimed Ecosystems)": "(获得 3 个回收的生态系统)",
    "1st Plant!": "第一棵植物！",
    "2 ^ Floor(log10(Points))": "2^地板(log10(点))",
    "Achieve 1,200 Research. Reward: Research Speed x2": "完成1,200项研究奖励：研究速度x2",
    "Achieve a Scientific Breakthrough!": "实现科学突破！",
    "AMERICAN SPACE": "美国太空",
    "Anthurium": "红掌",
    "Attract a Bear to your garden": "将熊吸引到您的花园",
    "Attract a Fox to your Garden": "吸引狐狸到你的花园",
    "Attract your first Animal to the Garden": "将你的第一只动物吸引到花园",
    "Bear-Paw Succulent": "熊掌多肉植物",
    "Begin Generation of Ecology": "生态学的开端",
    "BETTER SPACE": "更好的空间",
    "Bulk buy 50 Plants at once. Reward: Unlock a Garden Milestone": "一次批量购买 50 株植物。奖励：解锁花园里程碑",
    "But": "但",
    "Buy '100% Recycled Materials'": "购买“100% 再生材料”",
    "Buy 'Tipi'": "购买“蒂皮”",
    "Buy a Koi": "买一条锦鲤",
    "Buy a Row 3 Plant Tree Upgrade?": "购买第 3 行植物树升级版？",
    "Buy a Sedum Succulent": "购买景天多肉植物",
    "Buy a Snake Plant": "买一株蛇植物",
    "Buy a Time Speed Increase": "购买时间速度提升",
    "Buy an Anthurium": "买一朵红掌",
    "Buy Plant Robotics": "购买植物机器人",
    "Buy your first Plant": "购买你的第一株植物",
    "Cleaning - Fish Edition": "清洁-鱼版",
    "Coconut Palm": "椰子树",
    "Combined": "组合",
    "Complete 'Abandoned Quarry' Twice": "完成“废弃采石场”两次",
    "Complete 'Polluted Ocean' Twice": "完成两次“污染的海洋”",
    "Complete the Reference": "完成参考",
    "Costco sells plants now!": "Costco 现在有卖植物啦！",
    "Daft Wildlife": "愚蠢的野生动物",
    "Didn't know there was that much space": "不知道有这么大的空间",
    "Ecosystem Lost": "生态系统消失",
    "EPA": "美国环保局",
    "Finally, Some Satisfaction!": "最后，有点满意！",
    "Find 50 Fish": "找到 50 条鱼",
    "Floor(plants ÷ 10) x 10": "地板（植物/10）x 10",
    "Fully Complete the Tropical Zone": "完全完成热带地区",
    "Gain a Second Ecosystem. Reward: Divide Ecosystem Requirements by 1.20": "获得第二个生态系统奖励：将生态系统要求除以1.20",
    "Get 'Americas Inspired Zone'": "获得“美洲灵感区”",
    "Get 300 Leaves": "获得 300 片叶子",
    "Get 370 Plants in The Alpine Zone. Reward: 2x Point gain under 3 Zones": "在高山地区获得 370 株植物。奖励：3 个区域下获得 2 倍点数",
    "Get a Garden Milestone. Reward: Prickly Pears don't use up Plants": "获得花园里程碑。奖励：仙人球不会耗尽植物",
    "Get a new Garden": "获得一个新花园",
    "Get a new Zone": "获取新区域",
    "Get an Overpowered Boost from a Certain Research Upgrade": "从某些研究升级中获得超强的提升",
    "Get Ecosystem Milestone 2": "获取生态系统里程碑 2",
    "Habitat Master": "栖息地大师",
    "Hard Work!": "辛苦了！",
    "Have 100 Plants": "拥有 100 株植物",
    "Have Infinite (1.8e308) Wildlife per Plant": "每株植物拥有无限 (1.8e308) 野生动物",
    "Jade Plant": "玉树",
    "Just 1 More Completion...": "只剩下 1 个完成...",
    "Magnitude of x: log10(x)": "x 的大小：log10(x)",
    "Make Prickly Pears cheaper than 0.01 Plants": "使仙人掌比 0.01 植物便宜",
    "Make Prickly Pears Cheaper Than 1.80e-308 Plants, Don't worry, this will be out of order": "使仙人掌比 1.80e-308 植物便宜，别担心，这会出问题",
    "Make Prickly Pears cheaper than 3 Plants. Reward: Keep plant upgrades on Garden reset": "使仙人球比 3 种植物便宜。奖励：在花园重置时保持植物升级",
    "More Resources?": "更多资源？",
    "MORE SPACE": "更多的空间",
    "Multiply point gain based on points": "基于点的乘点增益",
    "Multiply Point gain by plants. Currently: x1.00": "乘以植物的点数增益。",
    "Obtain All the Habitats": "获得所有栖息地",
    "Philodendron": "喜林芋",
    "PLACES WHICH HELP YOU GET BETTER SPACE": "帮助您获得更好空间的地方",
    "Plant Central": "植物中心",
    "Plant costs are divided based on magnitude": "植物成本根据规模划分",
    "Plant costs are divided by plants": "植物成本按植物划分",
    "Plant costs are divided by points": "植物成本除以点数",
    "Plant costs divided by plants, only goes up at intervals of 10": "植物成本除以植物，仅以 10 为间隔增加",
    "Plant Points": "植物点数",
    "plants": "植物",
    "Play The Plant Tree Inside of The Plant Tree": "玩植物树里面的植物树",
    "Points ^ 0.1": "点数^0.1",
    "Points are multiplied based on magnitude": "点根据大小相乘",
    "Press CTRL to See Specific Values": "按 CTRL 键查看具体值",
    "Prickly Pears from": "仙人掌梨来自",
    "Prickly Pears from IKEA": "宜家的仙人掌梨",
    "Prickly Pears from the Desert": "来自沙漠的仙人掌梨",
    "Quality OF LIFE": "生活质量",
    "Reach 100 Wildlife": "野生动物数量达到 100 种",
    "Reach the Echinocactus Limit. Reward: Keep Plant Buyables on Garden Reset": "达到金盏花限制。奖励：在花园重置时保留植物可购买物品",
    "Real Wildlife!": "真正的野生动物！",
    "Reclaim 3 Ecosystems": "回收 3 个生态系统",
    "Recursion": "递归",
    "Recycle 50 Times": "循环使用50次",
    "Research for Infinitely (1.8e308) Long": "无限长 (1.8e308) 的研究",
    "RETURN OF THE MAGNITUDE": "震级回归",
    "Sassy Wildlife": "时髦的野生动物",
    "Sedum": "景天",
    "Set devSpeed to": "将 devSpeed 设置为",
    "Snake Plant": "虎尾兰",
    "Square milestone effect": "方形里程碑效应",
    "Sub-Milestones?": "子里程碑？",
    "TAINABLE SPACE": "可用空间",
    "The Fishing Trip": "钓鱼之旅",
    "The Knockoff Trees": "仿冒树",
    "The Plant Tree Discussion": "植物树讨论",
    "The Plants...": "植物...",
    "The Reclaimer": "回收者",
    "the Void": "虚空",
    "This Isn't How The Food Chain Works...": "这不是食物链的运作方式......",
    "this you Speak of?": "你说的是这个吗？",
    "Time Control": "时间控制",
    "Time Portal": "时间传送门",
    "Time Walrus": "时间海象",
    "Uh oh, this achievement name contains spoilers!": "呃哦，这个成就名称有剧透！",
    "Unlock Gardens and double point gain": "解锁花园并获得双倍点数",
    "Unlock More Wildlife Upgrades": "解锁更多野生动物升级",
    "What does divided mean?": "分开是什么意思？",
    "What does Magnitude mean?": "幅度是什么意思？",
    "What Does This Mean?": "这是什么意思？",
    "What is": "这是",
    "Wildlife Central": "野生动物中心",
    "You Can Stop Now": "你现在可以停下来",
    "You need more containers": "您需要更多容器",
    "You Need More Trash Cans": "你需要更多垃圾桶",
    "Yucca": "丝兰",
    "Achievement Gotten!": "成就达成！",
    "Prickly Pear": "仙人掌梨",
    "Saguaro": "仙人掌",
    "Total Effect:": "总效果：",
    "Divide plant costs by 10. Hold to buy max.": "将植物成本除以 10。持有以购买最大。",
    "Multiply point gain and divide plant costs by 5. Hold to buy max.": "乘以点数增益并将植物成本除以 5。持有以购买最大。",
    "(Gardens + 1) x (Plants + 1)": "（花园 + 1）x（植物 + 1）",
    "Ceramic Pots": "陶瓷盆",
    "Divide buyable cost based on magnitude of plants": "根据植物规模划分可购买成本",
    "Divide Garden costs based on Magnitude of Plants": "根据植物的大小划分花园成本",
    "Garden upgrade 1-1 also divides plant costs": "花园升级1-1也分摊了植物成本",
    "gardens": "花园",
    "Lawn": "草地",
    "Multiply point gain based on Gardens and Plants": "基于花园和植物的多点增益",
    "Plants don't reset anything, automatically reset for plants and unlock a new row of Plant upgrades": "植物不会重置任何东西，自动重置植物并解锁新的一行植物升级",
    "Raised Beds": "高架床",
    "Raised Beds II": "高架床 II",
    "Shed": "棚屋",
    "Terracotta Pots": "赤土陶罐",
    "Unlock a Plant buyable": "解锁可购买的植物",
    "Unlock another buyable": "解锁另一个可购买",
    "Divide plant costs by gardens": "将植物成本除以花园",
    "Woodshed": "木棚",
    "Chives": "韭菜",
    "Decking I": "铺板 I",
    "Decking II": "铺板 II",
    "Decking III": "铺板 III",
    "Divide Garden costs based on points": "根据点数划分花园成本",
    "Garden Upgrade 1-1 Uses Zones as well": "花园升级 1-1 也使用区域",
    "Garden upgrade 1-4's effect is better": "花园升级1-4的效果更好",
    "Greenhouse": "温室",
    "Mint": "薄荷",
    "Parsley": "香菜",
    "Plants multiply point gain slightly": "植物略微增加点增益",
    "Previous Plant upgrades based on magnitude are better": "以前基于量级的植物升级效果更好",
    "Reduce \"Prickly Pear\" base by 0.1": "将“仙人掌梨”基础减少 0.1",
    "Rosemary": "迷迭香",
    "Unlock Zones": "解锁区域",
    "Garden Upgrade 2-2 is better": "花园升级 2-2 更好",
    "Date Palm": "枣椰树",
    "Divide Plant costs based on Points and Plants": "根据点数和植物划分植物成本",
    "Divide point gain by Plants": "按植物划分点数增益",
    "Reward:": "奖励：",
    "The Tropical Zone": "热带地区",
    "Unlock 1: The Tropical Zone": "解锁1：热带地区",
    "Unlock 2: The Alpine Zone": "解锁2：高山地区",
    "Unlock 3: The Temperate Zone": "解锁3：温带地区",
    "Unlock 4: The Forest Zone": "解锁4：森林地区",
    "Unlock new Content": "解锁新内容",
    "zones": "区域",
    "Multiply point gain based on Gardens": "乘以点数增益基于花园",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    // 图标代码，不能汉化
    "Jacorb's Games": "Jacorb's Games",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "Scientific": "科学计数法",
    "Standard": "标准",
    "Blind": "盲文",
    "Letters": "字母",
    "Mixed Engineering": "混合工程",
    "Mixed Scientific": "混合科学",
    "Chemistry": "化学",
    "Engineering": "工程符号",
    "By Jacorb90": "By Jacorb90",
    "content_copy": "content_copy",
    "library_books": "library_books",
    "discord": "discord",
    "drag_handle": "drag_handle",
    "edit": "edit",
    "forum": "forum",
    "content_paste": "content_paste",
    "delete": "delete",
    "info": "info",
    "settings": "settings",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    'x': 'x',
    'QQ群号:': 'QQ群号:',
    '* 启用后台游戏': '* 启用后台游戏',
    '更多同类游戏:': '更多同类游戏:',
    'i': 'i',
    'I': 'I',
    'II': 'I',
    'III': 'III',
    'IV': 'IV',
    'V': 'V',
    'VI': 'VI',
    'VII': 'VII',
    'VIII': 'VIII',
    'X': 'X',
    'XI': 'XI',
    'XII': 'XII',
    'XIII': 'XIII',
    'XIV': 'XIV',
    'XV': 'XV',
    'XVI': 'XVI',
    'A': 'A',
    'B': 'B',
    'C': 'C',
    'D': 'D',
    'E': 'E',
    'F': 'F',
    'G': 'G',
    'H': 'H',
    'I': 'I',
    'J': 'J',
    'K': 'K',
    'L': 'L',
    'M': 'M',
    'N': 'N',
    'O': 'O',
    'P': 'P',
    'Q': 'Q',
    'R': 'R',
    'S': 'S',
    'T': 'T',
    'U': 'U',
    'V': 'V',
    'W': 'W',
    'X': 'X',
    'Y': 'Y',
    'Z': 'Z',
    'v8': 'v8',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀，此处可以截取语句开头部分的内容进行汉化
//例如：Coin: 13、Coin: 14、Coin: 15... 这种有相同开头的语句
//可以在这里汉化开头："Coin: ":"金币: "
var cnPrefix = {
    "\n": "\n",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": " ",
    " ": " ",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Shift-Click to Toggle Tooltips: ": "Shift-单击以切换工具提示：",
    "Notation: ": "符号: ",
    "Toggle Music: ": "切换声音: ",
    "Multiply Point gain by plants. Currently: ": "将点数增益乘以植物。目前：",
    "Tick Length: ": "Tick 长度: ",
    "Total Effect: ": "总效果：",
    "Your best zones is ": "你最佳的区域数量是 ",
    "Your best gardens is ": "你最佳的花园数量是 ",
    "Gardens + ": "花园 + ",
    "(log10(Points)) ^ ": "(log10(点数)) ^ ",
    "Plants ^ ": "植物 ^ ",
    "Points x (Plants ^ ": "点数 x (植物 ^ ",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀，此处可以截取语句结尾部分的内容进行汉化
//例如：13 Coin、14 Coin、15 Coin... 这种有相同结尾的语句
//可以在这里汉化结尾：" Coin":" 金币"
var cnPostfix = {
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "  ",
    " ": " ",
    "\n": "\n",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "/sec)": "/秒)",
    " (Before Bonus Levels)": "（奖金等级之前）",
    " ^ Floor(log10(Plants))": " ^ Floor(log10(植物))",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)h ([\d\.]+)m ([\d\.]+)s$/,
    /^([\d\.]+)y ([\d\.]+)d ([\d\.]+)h$/,
    /^([\d\.]+)\-([\d\.]+)\-([\d\.]+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^\$([\d\.]+)$/,
    /^\÷([\d\.]+)$/,
    /^\(([\d\.]+)\)$/,
    /^([\d\.]+)\%$/,
    /^([\d\.]+)\/([\d\.]+)$/,
    /^\(([\d\.]+)e([\d\.,]+)$/,
    /^\÷([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)\/([\d\.,]+)$/,
    /^([\d\.,]+)\/([\d\.,]+)$/,
    /^\(([\d\.]+)\/([\d\.]+)\)$/,
    /^成本(.+)$/,
    /^\(([\d\.]+)\%\)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)K$/,
    /^([\d\.]+)M$/,
    /^([\d\.]+)B$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+) T$/,
    /^([\d\.]+) Qi$/,
    /^([\d\.]+) Qa$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^\(([\d\.,]+)$/,
    /^\$([\d\.,]+)$/,
    /^\÷([\d\.,]+)$/,
    /^\+([\d\.,]+)$/,
    /^\-([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.,]+) \/ ([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+) \/ ([\d\.]+)e([\d\.,]+)$/,
    /^\$([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.,]+)\/([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)\/([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e\+([\d\.,]+)$/,
    /^e([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^You have (.+) plants$/, '你有 $1 植物'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
    [/^Reach (.+) plants to unlock \(You have (.+) plants\)$/, '达到 $1 株植物即可解锁（您有 $2 株植物）'],
    [/^You have made a total of (.+) gardens$/, '你总共建造了 $1 花园'],
    [/^You have made a total of (.+) zones$/, '你总共建造了 $1 区域'],
    [/^Next Magnitude increase at (.+) Points (.+)$/, '下一个幅度增加 $1 点数 $2'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^(.+) \/ (.+) points$/, '$1 \/ $2 点数'],
    [/^(.+) Plants. \((.+)\)$/, '$1 植物. \($2\)'],
    [/^([\d\.]+) sec$/, '$1 秒'],
    [/^([\d\.]+) hour$/, '$1 小时'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+)d ([\d\.]+)h ([\d\.]+)m$/, '$1天 $2小时 $3分'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^([\d\.,]+) Useless Paperclips$/, '$1 无用的回形针'],
    [/^([\d\.,]+) zones$/, '$1 区域'],
    [/^([\d\.,]+) Zone$/, '$1 区域'],
    [/^([\d\.,]+) Zones$/, '$1 区域'],
    [/^([\d\.,]+) Plant$/, '$1 植物'],
    [/^([\d\.,]+) Plants$/, '$1 植物'],
    [/^([\d\.,]+) Gardens$/, '$1 花园'],
    [/^([\d\.,]+) gardens$/, '$1 花园'],
    [/^([\d\.,]+) elves$/, '$1 精灵'],
    [/^Day ([\d\.,]+)$/, '天数 $1'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Next: (.+) plants$/, '下一个：$1 植物'],
    [/^Next: (.+) points$/, '下一个：$1 点数'],
    [/^Cost: (.+). Amount: (.+).$/, '成本：$1。数量：$2。'],
    [/^Cost: (.+) gardens$/, '成本：$1 花园'],
    [/^Cost: (.+) plants$/, '成本：$1 植物'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) points$/, '要求：$1 点数'],
    [/^Req: (.+) elves$/, '要求：$1 精灵'],
    [/^Req: (.+) \/ (.+) plants$/, '要求：$1 \/ $2 植物'],
    [/^Req: (.+) \/ (.+) elves$/, '要求：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);