# 项目结构

了解模板的项目结构，有助于你快速定位和修改文件。

## 目录结构

```
docs-site-template/
├── package.json                    # 项目配置和 npm 脚本
├── .gitignore                      # Git 忽略规则
├── .site-config                    # 站点配置（由 setup.sh 生成）
├── scripts/
│   ├── setup.sh                    # 交互式配置脚本
│   ├── deploy-gitee.sh             # Gitee Pages 部署脚本
│   └── deploy-gh-pages.sh          # GitHub Pages 部署脚本
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions 自动部署
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts               # VitePress 主配置 ⭐
│   │   └── theme/
│   │       ├── index.ts            # 主题入口（自定义组件注册）
│   │       └── style.css           # 自定义样式 ⭐
│   ├── public/                     # 静态资源（会被复制到输出根目录）
│   │   └── logo.svg                # Logo
│   ├── index.md                    # 首页 ⭐
│   ├── guide/
│   │   ├── getting-started.md      # 快速开始
│   │   ├── project-structure.md    # 项目结构（本页）
│   │   ├── configuration.md        # 配置说明
│   │   ├── custom-theme.md         # 自定义主题
│   │   ├── i18n.md                 # 多语言支持
│   │   ├── search.md               # 搜索配置
│   │   └── deployment.md           # 部署指南
│   ├── changelog.md                # 更新日志
│   ├── contributing.md             # 贡献指南
│   └── faq.md                      # 常见问题
└── README.md                       # 项目说明
```

## 核心文件说明

### `docs/.vitepress/config.ts`

VitePress 的主配置文件，控制站点的所有行为。关键配置项：

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `title` | 站点标题 | `My Docs` |
| `description` | 站点描述 | `一个现代化的文档站点` |
| `base` | 部署基础路径 | `/` |
| `lang` | 默认语言 | `zh-CN` |
| `themeConfig.nav` | 顶部导航 | - |
| `themeConfig.sidebar` | 侧边栏 | - |
| `themeConfig.search` | 搜索配置 | 本地搜索 |

### `docs/.vitepress/theme/style.css`

自定义样式文件，通过 CSS 变量快速定制外观：

```css
:root {
  --vp-c-brand-1: #3eaf7c;    /* 主色调 */
  --vp-c-bg: #ffffff;          /* 背景色 */
  --vp-c-text-1: #213547;      /* 文字色 */
}
```

### `.site-config`

由 `setup.sh` 生成的配置文件，保存所有交互式配置的结果。部署脚本会读取此文件。

### `scripts/`

| 脚本 | 功能 | 用法 |
|------|------|------|
| `setup.sh` | 交互式配置 | `npm run setup` |
| `deploy-gitee.sh` | 部署到 Gitee Pages | `npm run deploy:gitee` |
| `deploy-gh-pages.sh` | 部署到 GitHub Pages | `npm run deploy:gh-pages` |

## 添加新页面

1. 在 `docs/` 目录下创建 `.md` 文件
2. 在 `config.ts` 的 `sidebar` 中添加链接
3. 如需顶部导航，在 `nav` 中添加

```typescript
// config.ts
sidebar: {
  '/guide/': [
    {
      text: '开始',
      items: [
        { text: '新页面', link: '/guide/new-page' },  // ← 添加这行
      ],
    },
  ],
},
```
