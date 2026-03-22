// 核心数据库：高度贴合实际应用场景的“学习笔记”
const notesData = [
    {
        id: "automation",
        title: "01. 办公自动化：解放双手的快感",
        content: `
            <h1>用 Python 搞定繁琐的项目运营报表</h1>
            <p>之前在金山办公做项目运营实习的时候，处理数据报表头都大了，每天要从系统里导出一堆零散的表格然后再合并。秉着“能让机器干绝不自己动手”的原则，今天花时间摸透了 <code>pandas</code> 和 <code>openpyxl</code>。</p>
            <h2>实战：批量合并多个 Excel 文件</h2>
            <p>写了一个极简的脚本，一键把文件夹里所有的周报合并成一个总表，爽感难以言表：</p>
            <pre><code>import pandas as pd
import os

folder_path = './weekly_reports'
all_data = pd.DataFrame()

for file in os.listdir(folder_path):
    if file.endswith('.xlsx'):
        file_path = os.path.join(folder_path, file)
        df = pd.read_excel(file_path)
        all_data = pd.concat([all_data, df], ignore_index=True)

all_data.to_excel('master_report_compiled.xlsx', index=False)
print(f"成功合并了 {len(os.listdir(folder_path))} 个报表！下班！")</code></pre>
            
            <h2>终端运行记录截图留念 👇</h2>
            <div class="mac-terminal">
                <div class="mac-terminal-header">
                    <span class="close"></span><span class="minimize"></span><span class="maximize"></span>
                </div>
                <div class="mac-terminal-body">
                    <span class="term-user">yizheng@MacBook-Pro</span>:<span class="term-dir">~/Documents/Kingsoft_Operations/weekly_reports</span>$ <span class="term-cmd">python merge_excel.py</span><br>
                    [INFO] Initializing pandas engine...<br>
                    [INFO] Found 14 Excel files in the directory.<br>
                    [INFO] Merging data... 100%|████████████████████| 14/14 [00:01<00:00, 11.23it/s]<br>
                    [SUCCESS] 成功合并了 14 个报表！下班！<br>
                    <span class="term-user">yizheng@MacBook-Pro</span>:<span class="term-dir">~/Documents/Kingsoft_Operations/weekly_reports</span>$ <span class="term-cursor"></span>
                </div>
            </div>
            
            <p><strong>感悟：</strong> 网络与新媒体时代的运营，真的不能只靠死磕体力，稍微懂点自动化脚本，工作效率直接起飞。</p>
        `
    },
    {
        id: "scraping_pixel",
        title: "02. 爬虫实战：数码产品价格监控",
        content: `
            <h1>写个爬虫，做个理性的数码“等等党”</h1>
            <p>一直心心念念想入手一台 Google Pixel，但由于没有国行版本，各渠道的价格水分和波动实在太大。与其每天手动刷网页，不如让 Python 帮我盯着。</p>
            <h2>Requests + BeautifulSoup 追踪价格</h2>
            <p>利用之前学的基础，针对海淘网站写了个监控脚本：</p>
            <pre><code>import requests
from bs4 import BeautifulSoup

def check_pixel_price():
    url = "https://example-tech-store.com/google-pixel"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    price_tag = soup.find('span', class_='current-price')
    if price_tag:
        price = int(price_tag.text.replace('¥', '').replace(',', ''))
        print(f"当前 Pixel 报价: ¥{price}")
        
        if price < 4500:
            print("🚨 价格已跌破 4500！冲冲冲！")
        else:
            print("再等等，做个理性的等等党...")

check_pixel_price()</code></pre>
            <p>今天跑了一下还在高位。下一步打算接入邮件提醒功能，只要降价就直接给我发邮件。</p>
        `
    },
    {
        id: "api_fashion",
        title: "03. API与自动化：批量下载社媒素材",
        content: `
            <h1>Instaloader：日系穿搭素材库一键搭建</h1>
            <p>平时在 Instagram 上关注了很多日系时尚博主，每次看到好看的 OOTD 都要手动截图，画质渣且不好整理。今天研究了一下开源库 <code>instaloader</code>。</p>
            <h2>一行代码级别的降维打击</h2>
            <pre><code>import instaloader

L = instaloader.Instaloader()
target_profile = "japanese_ootd_blogger_name"

print(f"开始获取 {target_profile} 的主页数据...")

profile = instaloader.Profile.from_username(L.context, target_profile)
count = 0
for post in profile.get_posts():
    L.download_post(post, target=target_profile)
    count += 1
    if count >= 10: break

print("素材下载完成，开始整理今天的穿搭灵感！")</code></pre>
            <p>看着终端里一行行跑出的下载进度，看着文件夹里满满的高清穿搭图，编程的成就感在此刻达到了顶峰。</p>
        `
    },
    {
        id: "data_finance",
        title: "04. 数据分析：有色金属市场初探",
        content: `
            <h1>Pandas 进阶：从沪铝/沪铜看宏观趋势</h1>
            <p>试着用 Python 来处理一下金融市场的数据，看看能不能从宏观经济和大宗商品中发现点规律。</p>
            <h2>多维度数据切片</h2>
            <pre><code>import pandas as pd

df = pd.read_csv('metal_market_data.csv')
target_metals = ['Aluminum', 'Copper']
filtered_df = df[df['Metal_Type'].isin(target_metals)]

monthly_stats = filtered_df.groupby(['Metal_Type', 'Month']).agg({
    'Spot_Price': 'mean',
    'Inventory_Tons': 'mean'
}).reset_index()

strong_trend = monthly_stats[
    (monthly_stats['Inventory_Tons'] < monthly_stats['Inventory_Tons'].shift(1)) & 
    (monthly_stats['Spot_Price'] > monthly_stats['Spot_Price'].shift(1))
]

print("符合去库涨价特征的品种：")
print(strong_trend)</code></pre>
            <p>数据背后的故事很有意思。技术面和基本面的结合，才是分析市场的王道。</p>
        `
    },
    {
        id: "nlp_spanish",
        title: "05. 文本处理：给自己写个外语辅助工具",
        content: `
            <h1>用 Python 进行西班牙语词频统计</h1>
            <p>最近在啃西班牙语的语法。遇到生词查字典太影响流畅度了。于是我用 Python 把文章里的高频词先提取出来集中背诵。</p>
            <h2>正则表达式与 Counter 的妙用</h2>
            <pre><code>import re
from collections import Counter

spanish_text = "El aprendizaje de idiomas requiere constancia..."
words = re.findall(r'\\b[a-záéíóúñ]+\\b', spanish_text.lower())

stop_words = {'el', 'de', 'la', 'y', 'en'}
filtered_words = [word for word in words if word not in stop_words]

word_counts = Counter(filtered_words)
print("需要重点记忆的核心词汇：")
for word, count in word_counts.most_common(3):
    print(f"- {word}: 出现了 {count} 次")</code></pre>
            <p>输出结果直接告诉我 <code>constancia</code> (坚持) 是高频词。用代码辅助语言学习，效率翻倍！</p>
        `
    }
];

// “关于项目”页面的内容
const aboutData = `
    <h1>关于这个项目</h1>
    <p>你好！我是 Yizheng。👋</p>
    <p>作为一个网络与新媒体专业的学生，我始终相信：<strong>技术不应该只是冰冷的代码，而应该成为解决生活痛点、拓展世界边界的工具。</strong></p>
    <h2>为什么做这个页面？</h2>
    <p>从广州出发去探索世界，无论是精打细算做旅游攻略，还是在新媒体运营实习中处理海量数据，我发现只懂“策划”是不够的。这个极简的单页应用，不仅用来记录我自学 Python 的点滴，更是我尝试将<strong>内容运营、视觉审美与前端技术</strong>相融合的一次实践。</p>
    <h2>技术栈</h2>
    <ul>
        <li><strong>Frontend:</strong> HTML5, CSS3, Vanilla JavaScript (零框架，追求极致轻量与原生流畅感)</li>
        <li><strong>Data / Backend Logic:</strong> Python (Pandas, Requests, BeautifulSoup)</li>
        <li><strong>Design:</strong> Glassmorphism 苹果风交互设计</li>
    </ul>
    <p>在这个页面里，你可以看到我如何用代码抓取《海贼王》更新、监控数码产品价格、甚至辅助我学习西班牙语。希望这些带着生活气息的脚本，也能给你带来一些灵感。</p>
`;

// 页面初始化与交互逻辑
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const contentArea = document.getElementById("content");
    const navNotes = document.getElementById("nav-notes");
    const navAbout = document.getElementById("nav-about");

    // 渲染侧边栏目录
    let sidebarHTML = '<div class="sidebar-title">章节目录</div>';
    notesData.forEach((note, index) => {
        sidebarHTML += `<a href="#" class="menu-item ${index === 0 ? 'active' : ''}" data-id="${note.id}">${note.title}</a>`;
    });
    sidebar.innerHTML = sidebarHTML;

    // 默认加载第一篇笔记
    contentArea.innerHTML = notesData[0].content;

    // 目录点击事件
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault(); 
            menuItems.forEach(nav => nav.classList.remove("active"));
            e.target.classList.add("active");

            const targetId = e.target.getAttribute("data-id");
            const note = notesData.find(n => n.id === targetId);
            
            triggerFadeIn(note.content);
        });
    });

    // 顶部导航栏切换事件
    navNotes.addEventListener("click", (e) => {
        e.preventDefault();
        navNotes.classList.add("active");
        navAbout.classList.remove("active");
        sidebar.classList.remove("hidden"); // 显示侧边栏
        
        // 恢复当前选中的笔记内容
        const activeMenuItem = document.querySelector(".menu-item.active");
        const targetId = activeMenuItem ? activeMenuItem.getAttribute("data-id") : notesData[0].id;
        const note = notesData.find(n => n.id === targetId);
        triggerFadeIn(note.content);
    });

    navAbout.addEventListener("click", (e) => {
        e.preventDefault();
        navAbout.classList.add("active");
        navNotes.classList.remove("active");
        sidebar.classList.add("hidden"); // 隐藏侧边栏
        
        triggerFadeIn(aboutData);
    });

    // 封装淡入动画函数
    function triggerFadeIn(htmlContent) {
        contentArea.classList.remove("fade-in");
        void contentArea.offsetWidth; // 触发回流重置动画
        contentArea.innerHTML = htmlContent;
        contentArea.classList.add("fade-in");
    }
});
