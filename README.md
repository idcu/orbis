# VitePress 文档站模板

> 基于 [VitePress](https://vitepress.dev) 的文档站模板，支持 Gitee Pages / GitHub Pages 一键部署，附带交互式配置脚本。

## ✨ 特性

- 📦 **开箱即用** — 完整的 VitePress 文档站模板
- 🚀 **一键部署** — 支持 Gitee Pages、GitHub Pages、Vercel、Netlify
- ⚙️ **交互式配置** — 运行脚本即可完成所有基础配置
- 🎨 **高度可定制** — 主题色、Logo、导航、侧边栏等均可配置
- 🔍 **内置搜索** — 本地全文搜索，无需第三方服务
- 📝 **完善文档** — 模板自带使用文档，覆盖配置到部署全流程
- 🌐 **多语言** — 支持国际化（i18n）

## 🚀 快速开始

### 1. 克隆模板

```bash
git clone <your-repo-url> my-docs
cd my-docs
```

### 2. 安装依赖

```bash
npm install
```

### 3. 交互式配置

```bash
npm run setup
```

脚本会引导你配置：
- 项目名称、站点标题、描述
- 部署平台（Gitee Pages / GitHub Pages / Vercel / Netlify）
- 主题色、Logo
- 社交链接
- 部署分支

### 4. 本地预览

```bash
npm run docs:dev
```

浏览器访问 `http://localhost:5173`

### 5. 部署

```bash
# Gitee Pages
npm run deploy:gitee

# GitHub Pages
npm run deploy:gh-pages
```

## 📁 项目结构

```
docs-site-template/
├── package.json                 # 项目配置
├── .site-config                 # 站点配置（setup 生成）
├── scripts/
│   ├── setup.sh                 # 交互式配置脚本
│   ├── deploy-gitee.sh          # Gitee Pages 部署
│   └── deploy-gh-pages.sh       # GitHub Pages 部署
├── .github/workflows/
│   └── deploy.yml               # GitHub Actions 自动部署
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts            # VitePress 配置
│   │   └── theme/               # 自定义主题
│   ├── public/                  # 静态资源
│   ├── index.md                 # 首页
│   └── guide/                   # 文档页面
└── README.md
```

## 📜 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run docs:dev` | 启动开发服务器 |
| `npm run docs:build` | 构建静态文件 |
| `npm run docs:preview` | 预览构建结果 |
| `npm run setup` | 交互式配置向导 |
| `npm run deploy:gitee` | 部署到 Gitee Pages |
| `npm run deploy:gh-pages` | 部署到 GitHub Pages |

## 🛠️ 技术栈

- [VitePress](https://vitepress.dev) — 基于 Vue 的静态站点生成器
- [Vue 3](https://vuejs.org/) — 渐进式 JavaScript 框架
- [GitHub Actions](https://docs.github.com/actions) — CI/CD 自动部署

## 📄 许可

[MIT](./LICENSE)
