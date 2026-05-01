import { defineConfig } from 'vitepress'

export default defineConfig({
  // ============================================
  //  站点基本信息
  //  运行 `npm run setup` 可交互式修改以下配置
  // ============================================
  title: 'My Docs',
  description: '一个现代化的文档站点',
  lang: 'zh-CN',
  base: '/',
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'author', content: 'MyTeam' }],
    ['meta', { name: 'keywords', content: 'docs, 文档' }],
    ['meta', { property: 'og:title', content: 'My Docs' }],
    ['meta', { property: 'og:description', content: '一个现代化的文档站点' }],
    ['meta', { property: 'og:url', content: 'https://example.com/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  // ============================================
  //  主题配置
  // ============================================
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'My Docs',

    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: '部署', link: '/guide/deployment', activeMatch: '/guide/deployment' },
      {
        text: '更多',
        items: [
          { text: '更新日志', link: '/changelog' },
          { text: '贡献指南', link: '/contributing' },
          { text: '常见问题', link: '/faq' },
        ],
      },
    ],

    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '项目结构', link: '/guide/project-structure' },
            { text: '配置说明', link: '/guide/configuration' },
          ],
        },
        {
          text: '进阶',
          items: [
            { text: '自定义主题', link: '/guide/custom-theme' },
            { text: '多语言支持', link: '/guide/i18n' },
            { text: '搜索配置', link: '/guide/search' },
          ],
          collapsed: true,
        },
        {
          text: '部署',
          items: [
            { text: '部署指南', link: '/guide/deployment' },
            { text: 'Gitee Pages', link: '/guide/deployment#gitee-pages' },
            { text: 'GitHub Pages', link: '/guide/deployment#github-pages' },
            { text: 'CI/CD 自动部署', link: '/guide/deployment#ci-cd-自动部署' },
          ],
          collapsed: true,
        },
      ],
    },

    // 本地搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },

    // 社交链接
    socialLinks: [],

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © MyTeam',
    },

    // 编辑链接
    editLink: {
      pattern: '',
      text: '',
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short',
      },
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
      level: [2, 3],
    },

    returnToTopLabel: '回到顶部',
  },

  // ============================================
  //  构建配置
  // ============================================
  vite: {
    srcDir: '.',
  },

  ignoreDeadLinks: true,
  cleanUrls: true,

  lastUpdated: true,
})
