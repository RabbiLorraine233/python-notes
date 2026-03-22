const notesData = [
    {
        id: "automation",
        title: "01. 办公自动化：解放双手的快感",
        content: `
            <h1>用 Python 搞定繁琐的项目运营报表</h1>
            <p>最近处理项目运营的数据报表头都大了，每天要从系统里导出一堆零散的表格然后再合并。秉着“能让机器干绝不自己动手”的原则，今天花了一下午摸透了 <code>pandas</code> 和 <code>openpyxl</code>。</p>
            <h2>实战：批量合并多个 Excel 文件</h2>
            <p>写了一个极简的脚本，一键把文件夹里所有的周报合并成一个总表，爽感难以言表：</p>
            <pre><code>import pandas as pd
import os

# 定义报表所在文件夹
folder_path = './weekly_reports'
all_data = pd.DataFrame()

# 遍历文件夹下的所有 Excel 文件
for file in os.listdir(folder_path):
    if file.endswith('.xlsx'):
        file_path = os.path.join(folder_path, file)
        # 读取数据并追加到总表中
        df = pd.read_excel(file_path)
        all_data = pd.concat([all_data, df], ignore_index=True)

# 导出汇总结果
all_data.to_excel('master_report_compiled.xlsx', index=False)
print(f"成功合并了 {len(os.listdir(folder_path))} 个报表！下班！")</code></pre>
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
            <p>利用之前学的基础，针对某个海淘电商网站写了个监控脚本：</p>
            <pre><code>import requests
from bs4 import BeautifulSoup
import time

def check_pixel_price():
    url = "https://example-tech-store.com/google-pixel"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 定位价格标签
    price_tag = soup.find('span', class_='current-price')
    if price_tag:
        price = int(price_tag.text.replace('¥', '').replace(',', ''))
        print(f"当前 Pixel 报价: ¥{price}")
        
        # 如果跌破我的心理预期，就触发提醒
        if price < 4500:
            print("🚨 价格已跌破 4500！冲冲冲！")
        else:
            print("再等等，做个理性的等等党...")

check_pixel_price()</code></pre>
            <p>今天跑了一下，还在高位。下一步打算接入邮件提醒功能，只要降价就直接给我发邮件。</p>
        `
    },
    {
        id: "api_fashion",
        title: "03. API与自动化：批量下载社媒素材",
        content: `
            <h1>Instaloader：日系穿搭博主素材库一键搭建</h1>
            <p>平时在 Instagram 上关注了特别多的日系时尚和穿搭博主，每次看到好看的 OOTD 都要手动截图保存，不仅画质渣，还不好整理。今天研究了一下开源库 <code>instaloader</code>。</p>
            <h2>一行代码级别的降维打击</h2>
            <p>原本以为要自己去分析 IG 的复杂接口，结果发现用现成的轮子太香了：</p>
            <pre><code>import instaloader

# 实例化对象
L = instaloader.Instaloader()

# 设置想要抓取的穿搭博主账号 ID
target_profile = "japanese_ootd_blogger_name"

print(f"开始获取 {target_profile} 的主页数据...")

# 提取并下载最新发布的 10 篇帖子的图片
profile = instaloader.Profile.from_username(L.context, target_profile)
count = 0
for post in profile.get_posts():
    L.download_post(post, target=target_profile)
    count += 1
    if count >= 10:
        break

print("素材下载完成，开始整理今天的穿搭灵感！")</code></pre>
            <p>看着终端里一行行跑出的下载进度，看着文件夹里满满的高清穿搭图，编程的成就感在此刻达到了顶峰。</p>
        `
    },
    {
        id: "data_finance",
        title: "04. 数据分析：有色金属市场初探",
        content: `
            <h1>Pandas 进阶：从沪铝/沪铜看宏观趋势</h1>
            <p>除了日常的代码，最近对大宗商品和宏观经济也产生了一些兴趣。试着用 Python 来处理一下金融市场的数据，看看能不能发现点规律。</p>
            <h2>多维度数据切片</h2>
            <p>假设我们拿到了一份包含金属种类、日期、现货价格和库存量的数据，用 Pandas 处理起来极其优雅：</p>
            <pre><code>import pandas as pd

# 读取本地的金属市场历史数据
df = pd.read_csv('metal_market_data.csv')

# 提取沪铝 (Aluminum) 和 沪铜 (Copper) 的数据
target_metals = ['Aluminum', 'Copper']
filtered_df = df[df['Metal_Type'].isin(target_metals)]

# 按月份进行聚合，计算月均价格和库存均值
monthly_stats = filtered_df.groupby(['Metal_Type', 'Month']).agg({
    'Spot_Price': 'mean',
    'Inventory_Tons': 'mean'
}).reset_index()

# 筛选出“库存下降且价格上涨”的强势阶段
strong_trend = monthly_stats[
    (monthly_stats['Inventory_Tons'] < monthly_stats['Inventory_Tons'].shift(1)) & 
    (monthly_stats['Spot_Price'] > monthly_stats['Spot_Price'].shift(1))
]

print("符合去库涨价特征的月份及品种：")
print(strong_trend)</code></pre>
            <p>数据背后的故事很有意思。技术面和基本面的结合，才是分析市场的王道。</p>
        `
    },
    {
        id: "nlp_spanish",
        title: "05. 文本处理：给自己写个外语辅助工具",
        content: `
            <h1>用 Python 进行西班牙语词频统计</h1>
            <p>最近在啃西班牙语的语法和长篇阅读。遇到生词总是查字典太影响流畅度了。于是我突发奇想，能不能用 Python 把文章里的高频词先提取出来，我集中背完再去阅读？</p>
            <h2>正则表达式与 Counter 的妙用</h2>
            <p>配合 <code>collections</code> 模块，分分钟搞定文本拆解：</p>
            <pre><code>import re
from collections import Counter

# 一段西班牙语新闻素材
spanish_text = """
El aprendizaje de idiomas requiere constancia y mucha práctica. 
La constancia es la clave del éxito en cualquier disciplina.
"""

# 转换为小写，并用正则提取所有单词 (过滤掉标点符号)
words = re.findall(r'\b[a-záéíóúñ]+\b', spanish_text.lower())

# 过滤掉无意义的停用词 (比如 el, de, la, y)
stop_words = {'el', 'de', 'la', 'y', 'en'}
filtered_words = [word for word in words if word not in stop_words]

# 统计词频并输出前 3 个最高频的词
word_counts = Counter(filtered_words)
print("需要重点记忆的核心词汇：")
for word, count in word_counts.most_common(3):
    print(f"- {word}: 出现了 {count} 次")</code></pre>
            <p>输出结果直接告诉我 <code>constancia</code> (坚持) 是高频词。用代码辅助语言学习，效率翻倍！</p>
        `
    }
];
