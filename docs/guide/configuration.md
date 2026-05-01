# 配置说明

本文档详细介绍 VitePress 配置文件 `docs/.vitepress/config.ts` 的各项配置。

## 站点基本信息

```typescript
export default defineConfig({
  title: 'My Docs',           // 浏览器标签显示的标题
  description: '站点描述',     // 用于 SEO 和社交分享
  lang: 'zh-CN',              // 默认语言
  base: '/',                  // 部署基础路径（重要！）
  head: [                     // HTML head 标签
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
})
```

### `base` 路径详解

`base` 是部署时最关键的配置，决定了资源文件的 URL 前缀。

| 部署方式 | `base` 值 | 访问 URL |
|---------|----------|---------|
| 根域名 | `/` | `https://example.com/` |
| 子路径 | `/docs/` | `https://example.com/docs/` |
| Gitee Pages | `/<仓库名>/` | `https://user.gitee.io/<仓库名>/` |
| GitHub Pages | `/<仓库名>/` | `https://user.github.io/<仓库名>/` |

::: warning
如果 `base` 配置不正确，页面会出现资源 404（CSS、JS 加载失败）。
:::

## 主题配置

### Logo 和标题

```typescript
themeConfig: {
  logo: '/logo.svg',        // 导航栏 Logo
  siteTitle: 'My Docs',     // Logo 旁边的文字（留空则只显示 Logo）
}
```

### 导航栏

```typescript
themeConfig: {
  nav: [
    { text: '首页', link: '/' },
    { text: '指南', link: '/guide/getting-started', activeMatch: '/guide/' },
    {
      text: '更多',         // 下拉菜单
      items: [
        { text: 'GitHub', link: 'https://github.com/...' },
      ],
    },
  ],
}
```

- `activeMatch`：当前路径匹配时高亮导航项
- `items`：定义下拉菜单项

### 侧边栏

```typescript
themeConfig: {
  sidebar: {
    '/guide/': [                    // 路径前缀
      {
        text: '开始',               // 分组标题
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
        ],
      },
      {
        text: '进阶',
        items: [...],
        collapsed: true,            // 默认折叠
      },
    ],
  },
}
```

### 页脚

```typescript
themeConfig: {
  footer: {
    message: '基于 MIT 许可发布',
    copyright: 'Copyright © 2024 MyTeam',
  },
}
```

### 社交链接

```typescript
themeConfig: {
  socialLinks: [
    { icon: 'github', link: 'https://github.com/...' },
    { icon: 'twitter', link: 'https://twitter.com/...' },
    // 自定义图标
    { icon: { svg: '<svg>...</svg>' }, link: '...', ariaLabel: 'Gitee' },
  ],
}
```

## 构建配置

```typescript
export default defineConfig({
  vite: {
    srcDir: '.',              // 文档源码目录
  },
  cleanUrls: true,            // 去掉 .html 后缀
  lastUpdated: true,          // 显示最后更新时间
})
```

## 完整配置参考

完整的配置项请参考 [VitePress 官方配置文档](https://vitepress.dev/reference/site-config)。
