// 这里是你的 "学习笔记" 数据库
const notesData = [
    {
        id: "intro",
        title: "01. Python基础与数据结构",
        content: `
            <h1>Python 基础：列表与字典的魔法</h1>
            <p>今天正式开始学习 Python。感觉其实没有想象中那么难，最核心的是理解它的数据结构。</p>
            <h2>1. 列表 (Lists) 与 字典 (Dictionaries)</h2>
            <p>为了加深理解，我用自己三月份初的多国旅行计划做了一个练习。用字典来管理预算真的非常清晰：</p>
            <pre><code># 我的东南亚特种兵旅行预算分配
travel_plan = {
    "departure": "Guangzhou",
    "destinations": ["Kuala Lumpur", "Singapore", "Surabaya", "Bangkok"],
    "total_budget_cny": 5000,
    "tour_booked": "Surabaya Bromo & Ijen 3 Days 2 Nights"
}

# 遍历查看我的目的地
print("本次跨国打卡点：")
for city in travel_plan["destinations"]:
    print(f"- {city}")
    
# 计算一下抛去大交通后，每天的极限生存预算...
print(f"总预算：{travel_plan['total_budget_cny']} 元")</code></pre>
            <p>通过这个简单的例子，我完全搞懂了 <code>for</code> 循环和字典键值对的提取。下一步准备用 Python 写个自动比价的脚本，看看怎么飞最省钱！</p>
        `
    },
    {
        id: "scraping",
        title: "02. Requests网络爬虫",
        content: `
            <h1>Web Scraping: 把互联网变成我的数据库</h1>
            <p>学完基础语法后，直接进阶到了 Requests 和 BeautifulSoup 库。爬虫简直太有意思了！</p>
            <h2>实战案例：批量获取动漫更新列表</h2>
            <p>作为《海贼王》老粉，实在受不了每次都要手动去查更新到哪一集了。于是我写了一段代码去抓取网页结构：</p>
            <pre><code>import requests
from bs4 import BeautifulSoup

url = "https://example-anime-site.com/one-piece"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

# 提取最新的冒险篇章标题
episodes = soup.find_all('div', class_='episode-title')
for ep in episodes[:5]:  # 只看最新5集
    print("最新更新:", ep.text.strip())</code></pre>
            <p><strong>避坑指南：</strong> 今天遇到了一直返回 403 错误的情况，查了半天资料才发现需要伪装 <code>User-Agent</code>。这算是在网络对抗中迈出的第一步吧。</p>
        `
    },
    {
        id: "pandas",
        title: "03. Pandas数据分析",
        content: `
            <h1>Pandas初探：用代码看懂市场</h1>
            <p>最近对大宗商品尤其是金属现货市场比较关注，所以顺便学习了 Python 中最强的数据处理库：Pandas。</p>
            <h2>DataFrame 的基本操作</h2>
            <p>我尝试模拟了一组上海铝市和铜市的行情数据来进行清洗和分析：</p>
            <pre><code>import pandas as pd

# 模拟市场行情数据
metals_data = {
    'Metal': ['Aluminum', 'Copper', 'Steel', 'Zinc'],
    'Price_CNY_per_Ton': [19200, 68500, 4100, 21500],
    'Inventory_Trend': ['Down', 'Stable', 'Up', 'Down']
}

df = pd.DataFrame(metals_data)

# 筛选出库存下降且价格高于15000的金属
bullish_metals = df[(df['Inventory_Trend'] == 'Down') & (df['Price_CNY_per_Ton'] > 15000)]

print("近期值得关注的金属品种：")
print(bullish_metals)</code></pre>
            <p>虽然这只是简单的数据筛选，但能明显感觉到 Pandas 在处理结构化表格时，比 Excel 强大且高效得多。</p>
        `
    },
    {
        id: "project",
        title: "04. 综合小项目：词汇测试器",
        content: `
            <h1>实战：写一个西语单词抽查小工具</h1>
            <p>语言学习需要不断重复。我利用最近学的随机模块（random）和字典，给自己写了一个极简的西班牙语词汇测试器。</p>
            <h2>核心逻辑</h2>
            <pre><code>import random

spanish_vocab = {
    "hola": "你好",
    "gracias": "谢谢",
    "amigo": "朋友",
    "adiós": "再见",
    "por favor": "请"
}

def vocabulary_quiz():
    words = list(spanish_vocab.keys())
    question = random.choice(words)
    
    answer = input(f"请问 '{question}' 的中文意思是？")
    
    if answer == spanish_vocab[question]:
        print("¡Excelente! 回答正确！")
    else:
        print(f"回答错误啦，正确答案是：{spanish_vocab[question]}")

# 运行测试器
# vocabulary_quiz()</code></pre>
            <p>不仅复习了 Python 知识，还顺便背了几个单词，一举两得。未来可以考虑引入数据库，把它做成一个带 UI 界面、有错题本功能的小程序。</p>
        `
    }
];

// 初始化页面
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const contentArea = document.getElementById("content");

    // 渲染侧边栏目录
    let sidebarHTML = '<div class="sidebar-title">章节目录</div>';
    notesData.forEach((note, index) => {
        sidebarHTML += `<a href="#" class="menu-item ${index === 0 ? 'active' : ''}" data-id="${note.id}">${note.title}</a>`;
    });
    sidebar.innerHTML = sidebarHTML;

    // 默认显示第一篇内容
    contentArea.innerHTML = notesData[0].content;

    // 绑定点击事件
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault(); // 阻止默认跳转
            
            // 更新导航高亮
            menuItems.forEach(nav => nav.classList.remove("active"));
            e.target.classList.add("active");

            // 获取对应的内容并更新
            const targetId = e.target.getAttribute("data-id");
            const note = notesData.find(n => n.id === targetId);
            
            // 添加淡入动画
            contentArea.classList.remove("fade-in");
            // 触发回流以重新启动动画
            void contentArea.offsetWidth; 
            contentArea.innerHTML = note.content;
            contentArea.classList.add("fade-in");
        });
    });
});