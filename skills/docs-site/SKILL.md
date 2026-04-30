---
name: docs-site
description: "文档站、配置文档站、VitePress、Docusaurus、docs site、文档部署、文档主题"
---

# 文档站配置 Skill

## 角色定义

你是 **文档工程师**，精通技术文档站架构设计与配置。你能够根据项目需求和文档框架，生成完整的文档站配置，包括站点信息、导航结构、主题定制、搜索配置、多语言支持和部署方案，确保文档站专业、美观、易用。

---

## 输入收集

在开始生成配置之前，请确认以下信息：

| 字段 | 说明 | 示例 |
|------|------|------|
| **项目名称** | 项目/文档站名称 | `{{项目名称}}` |
| **文档框架** | 使用的文档框架 | `VitePress` / `Docusaurus` / `MkDocs` / `GitBook` |
| **站点 URL** | 文档站访问地址 | `https://docs.example.com` |
| **语言** | 支持的语言列表 | `zh-CN, en-US` |
| **默认语言** | 默认显示的语言 | `zh-CN` |
| **主题风格** | 主题色调 | `科技蓝` / `极简白` / `暗黑模式` |
| **导航结构** | 顶部导航和侧边栏结构 | 见下方详细说明 |
| **搜索方案** | 搜索实现方式 | `本地搜索` / `Algolia` |
| **部署平台** | 部署目标平台 | `GitHub Pages` / `Vercel` / `Netlify` |

> 如果用户未提供某些字段，请根据已有信息合理推断，并在配置中标注 `{{待确认}}`。

---

## 输出规范：完整文档站配置（B-07）

### 1. 站点基本信息

```typescript
// VitePress: .vitepress/config.ts
export default defineConfig({
  // === 站点基本信息 ===
  title: '{{站点标题}}',
  description: '{{站点描述，用于 SEO}}',
  lang: '{{默认语言，如zh-CN}}',
  head: [
    ['meta', { name: 'theme-color', content: '{{主题色，如#3eaf7c}}' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'author', content: '{{作者或组织名}}' }],
    ['meta', { name: 'keywords', content: '{{关键词，逗号分隔}}' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '{{Favicon路径}}' }],
    ['link', { rel: 'apple-touch-icon', href: '{{Apple Touch Icon路径}}' }],
    ['meta', { property: 'og:title', content: '{{站点标题}}' }],
    ['meta', { property: 'og:description', content: '{{站点描述}}' }],
    ['meta', { property: 'og:image', content: '{{OG图片URL}}' }],
    ['meta', { property: 'og:url', content: '{{站点URL}}' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],
});
```

**占位符说明**：

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{站点标题}}` | 站点标题，显示在浏览器标签和导航栏 | `MyProject 文档` |
| `{{站点描述}}` | 站点描述，用于 SEO 和社交分享 | `MyProject 是一个现代化的前端框架` |
| `{{默认语言}}` | 站点默认语言代码 | `zh-CN` |
| `{{主题色}}` | 主题主色调，十六进制颜色值 | `#3eaf7c` |
| `{{作者或组织名}}` | 作者或组织名称 | `MyTeam` |
| `{{关键词}}` | SEO 关键词，逗号分隔 | `前端,框架,组件库` |
| `{{Favicon路径}}` | 网站图标路径 | `/favicon.svg` |
| `{{Apple Touch Icon路径}}` | Apple 设备触摸图标路径 | `/apple-touch-icon.png` |
| `{{OG图片URL}}` | Open Graph 社交分享图片 | `https://example.com/og-image.png` |
| `{{站点URL}}` | 站点完整 URL | `https://docs.example.com` |

---

### 2. 国际化配置

```typescript
// VitePress: .vitepress/config.ts
export default defineConfig({
  // === 国际化配置 ===
  locales: {
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      title: '{{中文站点标题}}',
      description: '{{中文站点描述}}',
      themeConfig: {
        nav: nav('zh-CN'),
        sidebar: sidebar('zh-CN'),
        editLink: {
          pattern: '{{编辑链接模板}}',
          text: '在 GitHub 上编辑此页',
        },
        footer: {
          message: '{{中文页脚信息}}',
          copyright: '{{中文版权信息}}',
        },
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
        outline: {
          label: '页面导航',
        },
        lastUpdated: {
          text: '最后更新于',
        },
        returnToTopLabel: '回到顶部',
          text: '搜索文档',
          button: '搜索',
        },
      },
    },
    'en-US': {
      label: 'English',
      lang: 'en-US',
      title: '{{英文站点标题}}',
      description: '{{英文站点描述}}',
      themeConfig: {
        nav: nav('en-US'),
        sidebar: sidebar('en-US'),
        editLink: {
          pattern: '{{编辑链接模板}}',
          text: 'Edit this page on GitHub',
        },
        footer: {
          message: '{{英文页脚信息}}',
          copyright: '{{英文版权信息}}',
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next',
        },
        outline: {
          label: 'On This Page',
        },
        lastUpdated: {
          text: 'Last updated',
        },
        returnToTopLabel: 'Return to top',
          text: 'Search',
          button: 'Search',
        },
      },
    },
  },
});
```

**占位符说明**：

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{中文站点标题}}` | 中文站点标题 | `MyProject 文档` |
| `{{英文站点标题}}` | 英文站点标题 | `MyProject Docs` |
| `{{中文站点描述}}` | 中文站点描述 | `MyProject 是一个现代化的前端框架` |
| `{{英文站点描述}}` | 英文站点描述 | `MyProject is a modern frontend framework` |
| `{{编辑链接模板}}` | 编辑链接模板，含 `:path` 占位符 | `https://github.com/{{组织}}/{{仓库}}/edit/main/docs/:path` |
| `{{中文页脚信息}}` | 中文页脚提示信息 | `基于 MIT 许可发布` |
| `{{英文页脚信息}}` | 英文页脚提示信息 | `Released under the MIT License` |
| `{{中文版权信息}}` | 中文版权声明 | `Copyright 2024-present MyTeam` |
| `{{英文版权信息}}` | 英文版权声明 | `Copyright 2024-present MyTeam` |

---

### 3. 主题配置

```typescript
// VitePress: .vitepress/config.ts
export default defineConfig({
  themeConfig: {
    // === 颜色配置 ===
    logo: '{{Logo路径，如/logo.svg}}',
    siteTitle: '{{站点标题文字，留空则只显示Logo}}',

    // === 社交链接 ===
    socialLinks: [
      { icon: 'github', link: '{{GitHub仓库地址}}' },
      { icon: 'twitter', link: '{{Twitter/X主页}}' },
      { icon: 'discord', link: '{{Discord邀请链接}}' },
      { icon: '{{自定义图标名}}', link: '{{自定义社交链接}}' },
    ],

    // === 布局配置 ===
    layout: 'doc', // 'doc' | 'home' | 'page'

    // === 首页配置（仅 layout: 'home' 时生效） ===
    hero: {
      name: '{{首页主标题}}',
      text: '{{首页副标题}}',
      tagline: '{{首页标语}}',
      image: {
        src: '{{首页主图路径}}',
        alt: '{{主图描述}}',
      },
      actions: [
        {
          theme: 'brand',
          text: '{{主要按钮文字}}',
          link: '{{主要按钮链接}}',
        },
        {
          theme: 'alt',
          text: '{{次要按钮文字}}',
          link: '{{次要按钮链接}}',
        },
      ],
    },

    features: [
      {
        icon: '{{特性图标，如📦}}',
        title: '{{特性1标题}}',
        details: '{{特性1描述}}',
        link: '{{特性1链接}}',
        linkText: '{{特性1链接文字}}',
      },
      {
        icon: '{{特性图标}}',
        title: '{{特性2标题}}',
        details: '{{特性2描述}}',
      },
      {
        icon: '{{特性图标}}',
        title: '{{特性3标题}}',
        details: '{{特性3描述}}',
      },
    ],
  },
});
```

**占位符说明**：

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{Logo路径}}` | 导航栏 Logo 图片路径 | `/logo.svg` |
| `{{站点标题文字}}` | Logo 旁边的文字，留空则只显示 Logo | `MyProject` |
| `{{GitHub仓库地址}}` | GitHub 仓库完整 URL | `https://github.com/org/repo` |
| `{{Twitter/X主页}}` | Twitter/X 个人主页 URL | `https://twitter.com/myproject` |
| `{{Discord邀请链接}}` | Discord 服务器邀请链接 | `https://discord.gg/myproject` |
| `{{自定义图标名}}` | VitePress 内置或自定义图标名 | `youtube` |
| `{{自定义社交链接}}` | 自定义社交平台链接 | `https://youtube.com/@myproject` |
| `{{首页主标题}}` | 首页 Hero 区域主标题 | `MyProject` |
| `{{首页副标题}}` | 首页 Hero 区域副标题 | `下一代前端开发框架` |
| `{{首页标语}}` | 首页 Hero 区域标语 | `高性能 / 类型安全 / 开箱即用` |
| `{{首页主图路径}}` | 首页 Hero 区域主图 | `/hero-image.png` |
| `{{主图描述}}` | 主图 alt 文本 | `MyProject 架构图` |
| `{{主要按钮文字}}` | 主要 CTA 按钮文字 | `快速开始` |
| `{{主要按钮链接}}` | 主要 CTA 按钮链接 | `/guide/getting-started` |
| `{{次要按钮文字}}` | 次要按钮文字 | `了解更多` |
| `{{次要按钮链接}}` | 次要按钮链接 | `/guide/introduction` |
| `{{特性N标题}}` | 特性区块标题 | `高性能` |
| `{{特性N描述}}` | 特性区块描述 | `基于虚拟 DOM 的增量更新` |
| `{{特性N链接}}` | 特性区块链接 | `/guide/performance` |
| `{{特性N链接文字}}` | 特性区块链接文字 | `了解详情` |

---

### 4. 顶部导航

```typescript
// VitePress: .vitepress/config.ts
function nav(lang: string) {
  if (lang === 'zh-CN') {
    return [
      { text: '指南', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: 'API 参考', link: '/api/', activeMatch: '/api/' },
      { text: '教程', link: '/tutorial/', activeMatch: '/tutorial/' },
      {
        text: '更多',
        items: [
          { text: '更新日志', link: '/changelog' },
          { text: '贡献指南', link: '/contributing' },
          { text: '常见问题', link: '/faq' },
          {
            text: '旧版文档',
            link: '{{旧版文档URL}}',
          },
        ],
      },
    ];
  }

  return [
    { text: 'Guide', link: '/en/guide/introduction', activeMatch: '/en/guide/' },
    { text: 'API Reference', link: '/en/api/', activeMatch: '/en/api/' },
    { text: 'Tutorial', link: '/en/tutorial/', activeMatch: '/en/tutorial/' },
    {
      text: 'More',
      items: [
        { text: 'Changelog', link: '/en/changelog' },
        { text: 'Contributing', link: '/en/contributing' },
        { text: 'FAQ', link: '/en/faq' },
      ],
    },
  ];
}
```

**占位符说明**：

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{旧版文档URL}}` | 旧版文档的外部链接 | `https://v1.docs.example.com` |

---

### 5. 侧边栏

```typescript
// VitePress: .vitepress/config.ts
function sidebar(lang: string) {
  const prefix = lang === 'zh-CN' ? '' : '/en';

  return {
    [`${prefix}/guide/`]: [
      {
        text: '{{指南分组标题}}',
        items: [
          { text: '{{介绍}}', link: `${prefix}/guide/introduction` },
          { text: '{{快速开始}}', link: `${prefix}/guide/getting-started` },
          { text: '{{安装}}', link: `${prefix}/guide/installation` },
        ],
      },
      {
        text: '{{核心概念分组标题}}',
        items: [
          { text: '{{架构设计}}', link: `${prefix}/guide/architecture` },
          { text: '{{响应式系统}}', link: `${prefix}/guide/reactivity` },
          { text: '{{组件系统}}', link: `${prefix}/guide/components` },
          { text: '{{路由}}', link: `${prefix}/guide/routing` },
          { text: '{{状态管理}}', link: `${prefix}/guide/state-management` },
        ],
        collapsed: true,
      },
      {
        text: '{{进阶主题分组标题}}',
        items: [
          { text: '{{性能优化}}', link: `${prefix}/guide/performance` },
          { text: '{{服务端渲染}}', link: `${prefix}/guide/ssr` },
          { text: '{{测试}}', link: `${prefix}/guide/testing` },
          { text: '{{部署}}', link: `${prefix}/guide/deployment` },
        ],
        collapsed: true,
      },
    ],
    [`${prefix}/api/`]: [
      {
        text: '{{API分组标题}}',
        items: [
          { text: '{{核心API}}', link: `${prefix}/api/core` },
          { text: '{{响应式API}}', link: `${prefix}/api/reactivity` },
          { text: '{{组件API}}', link: `${prefix}/api/components` },
          { text: '{{工具函数}}', link: `${prefix}/api/utils` },
          { text: '{{类型定义}}', link: `${prefix}/api/types` },
        ],
      },
    ],
    [`${prefix}/tutorial/`]: [
      {
        text: '{{教程分组标题}}',
        items: [
          { text: '{{基础教程}}', link: `${prefix}/tutorial/basics` },
          { text: '{{进阶教程}}', link: `${prefix}/tutorial/advanced` },
          { text: '{{最佳实践}}', link: `${prefix}/tutorial/best-practices` },
          { text: '{{实战案例}}', link: `${prefix}/tutorial/examples` },
        ],
      },
    ],
  };
}
```

**占位符说明**：

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{指南分组标题}}` | 指南侧边栏分组标题 | `开始` |
| `{{介绍}}` | 介绍页面标题 | `介绍` |
| `{{快速开始}}` | 快速开始页面标题 | `快速开始` |
| `{{安装}}` | 安装页面标题 | `安装` |
| `{{核心概念分组标题}}` | 核心概念分组标题 | `核心概念` |
| `{{架构设计}}` | 架构设计页面标题 | `架构设计` |
| `{{响应式系统}}` | 响应式系统页面标题 | `响应式系统` |
| `{{组件系统}}` | 组件系统页面标题 | `组件系统` |
| `{{路由}}` | 路由页面标题 | `路由` |
| `{{状态管理}}` | 状态管理页面标题 | `状态管理` |
| `{{进阶主题分组标题}}` | 进阶主题分组标题 | `进阶` |
| `{{性能优化}}` | 性能优化页面标题 | `性能优化` |
| `{{服务端渲染}}` | 服务端渲染页面标题 | `服务端渲染` |
| `{{测试}}` | 测试页面标题 | `测试` |
| `{{部署}}` | 部署页面标题 | `部署` |
| `{{API分组标题}}` | API 侧边栏分组标题 | `API 参考` |
| `{{核心API}}` | 核心 API 页面标题 | `核心 API` |
| `{{响应式API}}` | 响应式 API 页面标题 | `响应式 API` |
| `{{组件API}}` | 组件 API 页面标题 | `组件 API` |
| `{{工具函数}}` | 工具函数页面标题 | `工具函数` |
| `{{类型定义}}` | 类型定义页面标题 | `类型定义` |
| `{{教程分组标题}}` | 教程侧边栏分组标题 | `教程` |
| `{{基础教程}}` | 基础教程页面标题 | `基础教程` |
| `{{进阶教程}}` | 进阶教程页面标题 | `进阶教程` |
| `{{最佳实践}}` | 最佳实践页面标题 | `最佳实践` |
| `{{实战案例}}` | 实战案例页面标题 | `实战案例` |

---

### 6. 搜索配置

```typescript
// VitePress: .vitepress/config.ts
export default defineConfig({
  themeConfig: {
    // === 本地搜索 ===
    search: {
      provider: 'local',
      options: {
        locales: {
          'zh-CN': {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
        // 索引排除
        exclude: [
          '{{排除路径1，如/changelog}}',
          '{{排除路径2，如/contributing}}',
          '{{排除路径3，如/404.html}}',
        ],
        // 分词配置
        miniSearch: {
          options: {
            prefix: true,
            fuzzy: true,
            boostDocument: (documentIndex, searchTerm) => {
              // 优先搜索标题
              if (documentIndex.includes('title')) return 2;
              return 1;
            },
          },
        },
      },
    },

    // === Algolia 搜索（备选方案） ===
    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: '{{Algolia应用ID}}',
    //     apiKey: '{{Algolia搜索API密钥}}',
    //     indexName: '{{Algolia索引名称}}',
    //     locales: {
    //       'zh-CN': {
    //         placeholder: '搜索文档',
    //         translations: {
    //           button: {
    //             buttonText: '搜索文档',
    //             buttonAriaLabel: '搜索文档',
    //           },
    //           modal: {
    //             noResultsText: '无法找到相关结果',
    //             resetButtonTitle: '清除查询条件',
    //             footer: {
    //               selectText: '选择',
    //               navigateText: '切换',
    //               closeText: '关闭',
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
  },
});
```

**占位符说明**：

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{排除路径1}}` | 搜索索引排除的路径 | `/changelog` |
| `{{排除路径2}}` | 搜索索引排除的路径 | `/contributing` |
| `{{排除路径3}}` | 搜索索引排除的路径 | `/404.html` |
| `{{Algolia应用ID}}` | Algolia 应用 ID | `ABC123DEF4` |
| `{{Algolia搜索API密钥}}` | Algolia 搜索 API Key | `a1b2c3d4e5f6` |
| `{{Algolia索引名称}}` | Algolia 索引名称 | `myproject_docs` |

---

### 7. 编辑链接

```typescript
// VitePress: .vitepress/config.ts
export default defineConfig({
  themeConfig: {
    editLink: {
      pattern: '{{编辑链接模板}}',
      text: '{{编辑按钮文字}}',
    },
    lastUpdated: {
      text: '{{最后更新文字}}',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short',
      },
    },
  },
});
```

**占位符说明**：

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{编辑链接模板}}` | 编辑链接 URL 模板，`:path` 会被替换为文件路径 | `https://github.com/org/repo/edit/main/docs/:path` |
| `{{编辑按钮文字}}` | 编辑按钮显示文字 | `在 GitHub 上编辑此页` |
| `{{最后更新文字}}` | 最后更新时间前缀文字 | `最后更新于` |

---

### 8. 页脚配置

```typescript
// VitePress: .vitepress/config.ts
export default defineConfig({
  themeConfig: {
    footer: {
      message: '{{页脚信息}}',
      copyright: '{{版权信息}}',
    },
  },
});
```

**占位符说明**：

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{页脚信息}}` | 页脚提示信息 | `基于 MIT 许可发布` |
| `{{版权信息}}` | 版权声明 | `Copyright 2024-present MyTeam` |

---

### 9. 自定义样式

```css
/* .vitepress/theme/style.css */

/* === CSS 变量覆盖 === */
:root {
  /* 主色调 */
  --vp-c-brand-1: {{主色-1，如#3eaf7c}};
  --vp-c-brand-2: {{主色-2，如#3eaf7c}};
  --vp-c-brand-3: {{主色-3，如#3eaf7c}};
  --vp-c-brand-soft: {{主色-柔和，如rgba(62, 175, 124, 0.14)}};

  /* 背景色 */
  --vp-c-bg: {{背景色，如#ffffff}};
  --vp-c-bg-alt: {{背景色-交替，如#f6f6f6}};
  --vp-c-bg-soft: {{背景色-柔和，如#f6f6f6}};

  /* 文字色 */
  --vp-c-text-1: {{文字色-1，如#213547}};
  --vp-c-text-2: {{文字色-2，如#4e5969}};
  --vp-c-text-3: {{文字色-3，如#86909c}};

  /* 字体 */
  --vp-font-family-base: {{正文字体，如'"Inter", "Noto Sans SC", sans-serif'}};
  --vp-font-family-mono: {{等宽字体，如'"JetBrains Mono", "Fira Code", monospace'}};

  /* 圆角 */
  --vp-radius: {{圆角大小，如8px}};

  /* 阴影 */
  --vp-shadow-1: {{阴影-1}};
  --vp-shadow-2: {{阴影-2}};
  --vp-shadow-3: {{阴影-3}};

  /* 自定义变量 */
  --custom-primary: {{自定义主色}};
  --custom-secondary: {{自定义次色}};
  --custom-accent: {{自定义强调色}};
  --custom-max-width: {{内容最大宽度，如1200px}};
}

/* === 暗黑模式 === */
.dark {
  --vp-c-bg: {{暗黑背景色，如#1a1a2e}};
  --vp-c-bg-alt: {{暗黑背景色-交替，如#16213e}};
  --vp-c-bg-soft: {{暗黑背景色-柔和，如#16213e}};
  --vp-c-text-1: {{暗黑文字色-1，如#e2e8f0}};
  --vp-c-text-2: {{暗黑文字色-2，如#94a3b8}};
  --vp-c-text-3: {{暗黑文字色-3，如#64748b}};
}

/* === 全局样式覆盖 === */
.vp-doc {
  max-width: var(--custom-max-width);
}

/* 自定义容器 */
.custom-container.tip {
  border-color: var(--custom-primary);
}

.custom-container.warning {
  border-color: {{警告色，如#e6a23c}};
}

.custom-container.danger {
  border-color: {{危险色，如#f56c6c}};
}

/* 代码块样式 */
.vp-doc div[class*='language-'] {
  border-radius: var(--vp-radius);
}

/* 表格样式 */
.vp-doc table {
  display: table;
  width: 100%;
  overflow: auto;
}

.vp-doc table th {
  background-color: var(--vp-c-brand-soft);
}

/* 首页定制 */
.VPHome {
  background: linear-gradient(135deg, {{渐变色-1}} 0%, {{渐变色-2}} 100%);
}

/* 自定义组件样式 */
.custom-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: var(--custom-primary);
  color: white;
}

.custom-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin: 24px 0;
}
```

**占位符说明**：

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{主色-1}}` | 品牌主色（最浅） | `#3eaf7c` |
| `{{主色-2}}` | 品牌主色（中间） | `#3eaf7c` |
| `{{主色-3}}` | 品牌主色（最深） | `#3eaf7c` |
| `{{主色-柔和}}` | 品牌主色半透明版本 | `rgba(62, 175, 124, 0.14)` |
| `{{背景色}}` | 页面背景色 | `#ffffff` |
| `{{背景色-交替}}` | 交替区块背景色 | `#f6f6f6` |
| `{{背景色-柔和}}` | 柔和背景色 | `#f6f6f6` |
| `{{文字色-1}}` | 主要文字色 | `#213547` |
| `{{文字色-2}}` | 次要文字色 | `#4e5969` |
| `{{文字色-3}}` | 辅助文字色 | `#86909c` |
| `{{正文字体}}` | 正文 CSS 字体栈 | `'"Inter", "Noto Sans SC", sans-serif'` |
| `{{等宽字体}}` | 代码块 CSS 字体栈 | `'"JetBrains Mono", "Fira Code", monospace'` |
| `{{圆角大小}}` | 全局圆角 | `8px` |
| `{{阴影-1/2/3}}` | 三级阴影 | `0 1px 3px rgba(0,0,0,0.1)` |
| `{{自定义主色}}` | 自定义 CSS 变量 | `#3eaf7c` |
| `{{自定义次色}}` | 自定义 CSS 变量 | `#42b883` |
| `{{自定义强调色}}` | 自定义 CSS 变量 | `#f59e0b` |
| `{{内容最大宽度}}` | 内容区域最大宽度 | `1200px` |
| `{{暗黑背景色}}` | 暗黑模式背景色 | `#1a1a2e` |
| `{{暗黑背景色-交替}}` | 暗黑模式交替背景色 | `#16213e` |
| `{{暗黑背景色-柔和}}` | 暗黑模式柔和背景色 | `#16213e` |
| `{{暗黑文字色-1}}` | 暗黑模式主要文字色 | `#e2e8f0` |
| `{{暗黑文字色-2}}` | 暗黑模式次要文字色 | `#94a3b8` |
| `{{暗黑文字色-3}}` | 暗黑模式辅助文字色 | `#64748b` |
| `{{警告色}}` | 警告容器边框色 | `#e6a23c` |
| `{{危险色}}` | 危险容器边框色 | `#f56c6c` |
| `{{渐变色-1}}` | 首页渐变起始色 | `#667eea` |
| `{{渐变色-2}}` | 首页渐变结束色 | `#764ba2` |

---

### 10. 自定义脚本

```typescript
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import './style.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    // === 注册自定义组件 ===
    // app.component('CustomBadge', CustomBadge);
    // app.component('CustomCard', CustomCard);

    // === 路由钩子 ===
    if (typeof window !== 'undefined') {
      router.onAfterRouteChanged = () => {
        // 页面切换后执行
      };
    }
  },
  setup() {
    // === 分析脚本 ===
    if (typeof window !== 'undefined') {
      // Google Analytics
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id={{GA跟踪ID}}';
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        // eslint-disable-next-line prefer-rest-params
        (window as any).dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', '{{GA跟踪ID}}');
    }
  },
} satisfies Theme;
```

**占位符说明**：

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{GA跟踪ID}}` | Google Analytics 跟踪 ID | `G-XXXXXXXXXX` |

---

### 11. 部署配置

```typescript
// VitePress: .vitepress/config.ts
export default defineConfig({
  // === 基础路径（子路径部署时使用） ===
  base: '{{基础路径，如/docs/}}',

  // === 构建配置 ===
  srcDir: '{{文档源码目录，默认docs}}',
  outDir: '{{构建输出目录，默认.vitepress/dist}}',
  cacheDir: '{{缓存目录，默认.vitepress/cache}}',

  // === 重定向配置 ===
  cleanUrls: {{是否启用干净URL，默认true}},

  // === 404 页面 ===
  notFound: {
    title: '{{404页面标题}}',
    themeConfig: {
      nav: [],
      sidebar: [],
    },
  },
});
```

```yaml
# Vercel 部署配置: vercel.json
{
  "rewrites": [
    { "source": "/docs/:path*", "destination": "/docs/index.html" }
  ],
  "headers": [
    {
      "source": "/docs/assets/:path*",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

```yaml
# Netlify 部署配置: netlify.toml
[build]
  command = "pnpm docs:build"
  publish = "docs/.vitepress/dist"

[[redirects]]
  from = "/docs/*"
  to = "/docs/index.html"
  status = 200

[[headers]]
  for = "/docs/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**占位符说明**：

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{基础路径}}` | 部署子路径，根路径部署时为 `/` | `/docs/` |
| `{{文档源码目录}}` | 文档 Markdown 文件所在目录 | `docs` |
| `{{构建输出目录}}` | 构建产物输出目录 | `.vitepress/dist` |
| `{{缓存目录}}` | 构建缓存目录 | `.vitepress/cache` |
| `{{是否启用干净URL}}` | 是否去掉 `.html` 后缀 | `true` |
| `{{404页面标题}}` | 404 页面标题 | `页面未找到` |

---

## 多语言文件结构示例

```
docs/
├── .vitepress/
│   ├── config.ts              # 主配置文件
│   └── theme/
│       ├── index.ts           # 主题入口
│       └── style.css          # 自定义样式
├── index.md                   # 中文首页
├── guide/
│   ├── introduction.md        # 中文：介绍
│   ├── getting-started.md     # 中文：快速开始
│   ├── installation.md        # 中文：安装
│   ├── architecture.md        # 中文：架构设计
│   ├── reactivity.md          # 中文：响应式系统
│   ├── components.md          # 中文：组件系统
│   ├── routing.md             # 中文：路由
│   ├── state-management.md    # 中文：状态管理
│   ├── performance.md         # 中文：性能优化
│   ├── ssr.md                 # 中文：服务端渲染
│   ├── testing.md             # 中文：测试
│   └── deployment.md          # 中文：部署
├── api/
│   ├── index.md               # 中文：API 概览
│   ├── core.md                # 中文：核心 API
│   ├── reactivity.md          # 中文：响应式 API
│   ├── components.md          # 中文：组件 API
│   ├── utils.md               # 中文：工具函数
│   └── types.md               # 中文：类型定义
├── tutorial/
│   ├── basics.md              # 中文：基础教程
│   ├── advanced.md            # 中文：进阶教程
│   ├── best-practices.md      # 中文：最佳实践
│   └── examples.md            # 中文：实战案例
├── en/
│   ├── index.md               # 英文首页
│   ├── guide/
│   │   ├── introduction.md    # 英文：Introduction
│   │   ├── getting-started.md # 英文：Getting Started
│   │   └── ...
│   ├── api/
│   │   └── ...
│   └── tutorial/
│       └── ...
├── public/
│   ├── logo.svg               # Logo
│   ├── favicon.svg            # Favicon
│   ├── hero-image.png         # 首页主图
│   └── og-image.png           # OG 社交分享图片
├── changelog.md               # 更新日志
├── contributing.md            # 贡献指南
└── faq.md                     # 常见问题
```

---

## 多平台适配指南

### VitePress（.vitepress/config.ts）

```typescript
// 推荐用于：Vue 生态项目、轻量级文档站
// 配置文件：docs/.vitepress/config.ts
// 构建命令：pnpm docs:build
// 开发命令：pnpm docs:dev

import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '{{站点标题}}',
  description: '{{站点描述}}',
  lang: '{{默认语言}}',
  base: '{{基础路径}}',
  // ... 其他配置
});
```

### Docusaurus（docusaurus.config.js）

```javascript
// 推荐用于：React 生态项目、大型文档站
// 配置文件：docs/docusaurus.config.js
// 构建命令：pnpm docs:build
// 开发命令：pnpm docs:dev

module.exports = {
  title: '{{站点标题}}',
  tagline: '{{站点标语}}',
  url: '{{站点URL}}',
  baseUrl: '{{基础路径}}',
  favicon: '{{Favicon路径}}',
  i18n: {
    defaultLocale: '{{默认语言}}',
    locales: ['{{默认语言}}', '{{其他语言}}'],
    localeConfigs: {
      '{{默认语言}}': {
        label: '{{语言标签}}',
        htmlLang: '{{HTML lang属性}}',
      },
    },
  },
  themeConfig: {
    navbar: {
      title: '{{导航栏标题}}',
      logo: {
        alt: '{{Logo描述}}',
        src: '{{Logo路径}}',
      },
      items: [
        { type: 'doc', docId: 'introduction', label: '{{指南}}' },
        { type: 'doc', docId: 'api', label: '{{API}}' },
      ],
    },
    footer: {
      copyright: '{{版权信息}}',
    },
  },
};
```

### MkDocs（mkdocs.yml）

```yaml
# 推荐用于：Python 生态项目、静态文档
# 配置文件：mkdocs.yml
# 构建命令：mkdocs build
# 开发命令：mkdocs serve

site_name: '{{站点标题}}'
site_description: '{{站点描述}}'
site_url: '{{站点URL}}'
site_author: '{{作者}}'
docs_dir: '{{文档目录，默认docs}}'
site_dir: '{{输出目录，默认site}}'
theme:
  name: material
  language: '{{默认语言}}'
  palette:
    - scheme: default
      primary: '{{主色调}}'
      accent: '{{强调色}}'
      toggle:
        icon: material/brightness-7
        name: 切换到暗黑模式
    - scheme: slate
      primary: '{{主色调}}'
      accent: '{{强调色}}'
      toggle:
        icon: material/brightness-4
        name: 切换到亮色模式
nav:
  - 首页: index.md
  - 指南:
    - 介绍: guide/introduction.md
    - 快速开始: guide/getting-started.md
  - API:
    - 核心 API: api/core.md
```

### GitBook（book.json）

```json
{
  "title": "{{站点标题}}",
  "description": "{{站点描述}}",
  "author": "{{作者}}",
  "language": "{{默认语言}}",
  "root": "{{文档根目录}}",
  "plugins": [
    "search",
    "sharing",
    "highlight",
    "fontsettings"
  ],
  "pluginsConfig": {
    "sharing": {
      "all": ["facebook", "google", "twitter", "weibo"],
      "facebook": true,
      "google": false,
      "twitter": true,
      "weibo": true
    },
    "theme-default": {
      "showLevel": true
    }
  },
  "structure": {
    "readme": "{{README文件名，默认README.md}}",
    "summary": "{{目录文件名，默认SUMMARY.md}}"
  }
}
```

---

## 自检清单

生成配置后，请逐项检查以下内容：

- [ ] **站点信息**：标题、描述、URL 是否已填充（非空）
- [ ] **导航结构**：顶部导航是否覆盖所有主要文档分类
- [ ] **侧边栏**：侧边栏分组是否合理，链接是否正确，collapsible 设置是否恰当
- [ ] **搜索配置**：搜索是否已配置（本地搜索或 Algolia），排除规则是否合理
- [ ] **多语言**：语言切换是否可用，翻译文件是否存在
- [ ] **编辑链接**：编辑链接模板是否正确，`:path` 占位符是否保留
- [ ] **页脚**：版权信息是否正确
- [ ] **自定义样式**：CSS 变量是否完整，暗黑模式是否适配
- [ ] **部署配置**：基础路径是否与部署目标匹配，重定向是否正确
- [ ] **404 页面**：是否配置了自定义 404 页面
- [ ] **SEO**：meta 标签是否完整（title、description、og、twitter）
- [ ] **Favicon**：Favicon 和 Apple Touch Icon 是否已配置
- [ ] **社交链接**：社交链接是否正确
- [ ] **占位符**：所有 `{{占位符}}` 是否已标注，待确认项是否已汇总

如有缺失，请在配置末尾生成 **待确认事项清单**，列出需要用户补充的信息。
