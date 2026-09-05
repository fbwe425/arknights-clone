# 🏰 明日方舟官网复刻 (Arknights Official Website Clone)

> 一个高保真复刻 [明日方舟官网](https://ak.hypergryph.com/) 的前端项目，还原了原站的视觉风格、布局结构与交互动效。

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Swiper](https://img.shields.io/badge/Swiper-11-6332F6?style=flat&logo=swiper&logoColor=white)

---

## ✨ 特性

- **资源本地化** — 字体、背景、Banner、角色立绘及媒体素材随项目发布，不再依赖容易失效的第三方外链
- **锁定式整屏翻页** — 页面状态机统一处理滚轮、键盘、触摸、导航与圆点；720ms 遮罩转场期间锁定重复输入
- **Loading 动画** — 渐进式加载条 + 百分比计数 + 淡出过渡
- **Swiper 轮播** — Banner 自动轮播 + 干员卡片横向滚动
- **丰富的动画** — 淡入、滑入、缩放、交错入场、滚动提示等多处 CSS 动效
- **导航系统** — 固定顶部导航栏 + 侧边圆点指示器 + 当前 Section 高亮
- **响应式布局** — 适配桌面端和平板端
- **零依赖部署** — 单 HTML 文件，开箱即用

---

## 📸 页面结构

| Section | 内容描述 |
|---------|---------|
| **Hero 首页** | 全屏背景图 + ARKNIGHTS 标题 + 二维码下载 + 页码指示器 |
| **Information 情报** | Banner 轮播 + 新闻标签切换 + BREAKING NEWS 面板 |
| **Operator 干员** | 凯尔希档案展示 + 角色名片 Swiper + 精英化阶段 + CV 信息 |
| **World 设定** | 6 大世界观概念（源石/源石技艺/整合运动/感染者/移动城邦/罗德岛） |
| **Media 泰拉万象** | 4 宫格媒体卡片（Monster Siren / Gallery / Operator / Video） |
| **More 更多内容** | 集成战略 / 生息演算 / 衍生动画 / 泰拉记事社 |

---

## 🚀 快速开始

### 方式一：直接打开

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/arknights-clone.git
cd arknights-clone

# 直接在浏览器中打开
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

### 方式二：本地服务器

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve .

# 然后访问 http://localhost:8080
```

> 请通过 HTTP 服务器运行，不建议直接双击打开 `index.html`：页面依赖 ES Module 脚本和 CDN 资源。

### 翻页控制

- 鼠标滚轮 / 触控板上下滚动
- `↑` / `↓`、`PageUp` / `PageDown`、`Home` / `End`
- 触摸屏上下滑动
- 顶部导航、右侧圆点与首页 `SCROLL` 控件

每次翻页以 720ms 为一个锁定周期：当前页缩放位移离场、目标页反向进入，同时由上下分屏遮罩完成切换。

---

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| **HTML5** | 页面结构 |
| **CSS3** | 样式、动画、响应式布局 |
| **JavaScript ES Modules** | 翻页状态机、动画触发与输入控制 |
| **Swiper 11** | Banner 轮播与干员卡片滚动 |
| **CSS transforms / keyframes** | 页面进出场与分屏遮罩翻页动画 |

---

## 📁 项目结构

```
arknights-clone/
├── index.html            # 页面结构与第三方资源引用
├── assets/
│   ├── css/main.css      # 字体、视觉布局、响应式样式与翻页遮罩
│   └── js/app.js         # 页面状态机、输入控制、Loading 与 Swiper 初始化
├── README.md             # 项目说明
└── ARK_TODO.md           # 开发任务清单
```

---

## 🎨 设计细节

### 字体

直接引用原站 CDN 的 7 套字体：

- **Novecentosanswide** — 标题与英文标识
- **Bender** — 日期与辅助文字
- **Oswald** — 导航栏与章节标题
- **SourceHanSans** — 中文正文内容

### 配色方案

| 变量 | 色值 | 用途 |
|------|------|------|
| `--cyan` | `#18d1ff` | 主题色（高亮、激活态） |
| `--bg-dark` | `#000` | 主背景 |
| `--bg-gray` | `#272727` | 次级背景 |
| `--text-gray` | `#ababab` | 辅助文字 |
| `--text-light` | `#d2d2d2` | 正文文字 |

---

## 📝 注意事项

- 当前页面使用的图片与字体位于 `assets/media/`、`assets/fonts/`，部署时必须保留 `assets/` 目录
- 原站部分高级特效（WebGL 粒子、视频背景）使用了视觉等效替代
- 本项目仅用于前端学习与技术交流，版权归鹰角网络所有

---

## 📜 免责声明

本项目为个人学习用途的前端复刻作品，所有图片、字体、品牌标识的版权归 **鹰角网络 (Hypergryph)** 所有。

- 🔗 官网：https://ak.hypergryph.com/
- 🔗 鹰角网络：https://www.hypergryph.com/

---

<div align="center">

**明日方舟 · Arknights** — Hypergryph © 2017-2026

</div>
