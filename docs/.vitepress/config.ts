import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '通用文档模板体系',
  description: '全语言、全栈通用文档模板集合 — 精简版与完整版双层级',
  lang: 'zh-CN',
  base: '/orbis/',
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
    ],
    sidebar: {
      '/simple/': [
        {
          text: '📌 精简版模板',
          items: [
            { text: '使用说明', link: '/simple/' },
          ],
        },
        {
          text: 'A — 模块开发',
          collapsed: true,
          items: [
            { text: 'A-01 新模块创建检查清单', link: '/simple/A-模块开发/A-01-新模块创建检查清单' },
            { text: 'A-02 模块清单文件模板', link: '/simple/A-模块开发/A-02-模块清单文件模板' },
            { text: 'A-03 构建配置模板', link: '/simple/A-模块开发/A-03-构建配置模板' },
            { text: 'A-04 测试配置模板', link: '/simple/A-模块开发/A-04-测试配置模板' },
            { text: 'A-05 测试文件模板', link: '/simple/A-模块开发/A-05-测试文件模板' },
            { text: 'A-06 README 模板', link: '/simple/A-模块开发/A-06-README模板' },
            { text: 'A-07 变更日志模板', link: '/simple/A-模块开发/A-07-变更日志模板' },
            { text: 'A-08 子仓库初始化模板', link: '/simple/A-模块开发/A-08-子仓库初始化模板' },
            { text: 'A-09 接口定义模板', link: '/simple/A-模块开发/A-09-接口定义模板' },
          ],
        },
        {
          text: 'B — 工程化',
          collapsed: true,
          items: [
            { text: 'B-01 CI 流水线模板', link: '/simple/B-工程化/B-01-CI流水线模板' },
            { text: 'B-02 发布流水线模板', link: '/simple/B-工程化/B-02-发布流水线模板' },
            { text: 'B-03 文档部署模板', link: '/simple/B-工程化/B-03-文档部署模板' },
            { text: 'B-04 多仓库同步模板', link: '/simple/B-工程化/B-04-多仓库同步模板' },
            { text: 'B-05 Git 钩子配置模板', link: '/simple/B-工程化/B-05-Git钩子配置模板' },
            { text: 'B-06 共享脚本模板', link: '/simple/B-工程化/B-06-共享脚本模板' },
            { text: 'B-07 文档站配置模板', link: '/simple/B-工程化/B-07-文档站配置模板' },
            { text: 'B-08 工作区配置模板', link: '/simple/B-工程化/B-08-工作区配置模板' },
            { text: 'B-09 根仓库配置模板', link: '/simple/B-工程化/B-09-根仓库配置模板' },
          ],
        },
        {
          text: 'C — 质量保障',
          collapsed: true,
          items: [
            { text: 'C-01 代码评审报告模板', link: '/simple/C-质量保障/C-01-代码评审报告模板' },
            { text: 'C-02 评审修复任务模板', link: '/simple/C-质量保障/C-02-评审修复任务模板' },
            { text: 'C-03 新模块验收清单', link: '/simple/C-质量保障/C-03-新模块验收清单' },
            { text: 'C-04 发布检查清单', link: '/simple/C-质量保障/C-04-发布检查清单' },
            { text: 'C-05 PR 检查清单', link: '/simple/C-质量保障/C-05-PR检查清单' },
            { text: 'C-06 E2E 测试模板', link: '/simple/C-质量保障/C-06-E2E测试模板' },
            { text: 'C-07 性能基准模板', link: '/simple/C-质量保障/C-07-性能基准模板' },
          ],
        },
        {
          text: 'D — 项目管理',
          collapsed: true,
          items: [
            { text: 'D-01 需求文档模板', link: '/simple/D-项目管理/D-01-需求文档模板' },
            { text: 'D-02 技术方案模板', link: '/simple/D-项目管理/D-02-技术方案模板' },
            { text: 'D-03 API 文档模板', link: '/simple/D-项目管理/D-03-API文档模板' },
            { text: 'D-04 架构设计模板', link: '/simple/D-项目管理/D-04-架构设计模板' },
            { text: 'D-05 项目总览模板', link: '/simple/D-项目管理/D-05-项目总览模板' },
            { text: 'D-06 贡献指南模板', link: '/simple/D-项目管理/D-06-贡献指南模板' },
          ],
        },
        {
          text: 'E — 开发任务',
          collapsed: true,
          items: [
            { text: 'E-01 新功能开发模板', link: '/simple/E-开发任务/E-01-新功能开发模板' },
            { text: 'E-02 Bug 修复模板', link: '/simple/E-开发任务/E-02-Bug修复模板' },
            { text: 'E-03 重构任务模板', link: '/simple/E-开发任务/E-03-重构任务模板' },
            { text: 'E-04 性能优化模板', link: '/simple/E-开发任务/E-04-性能优化模板' },
            { text: 'E-05 阶段开发计划模板', link: '/simple/E-开发任务/E-05-阶段开发计划模板' },
            { text: 'E-06 版本发布模板', link: '/simple/E-开发任务/E-06-版本发布模板' },
          ],
        },
      ],
      '/full/': [
        {
          text: '📋 完整版模板',
          items: [
            { text: '使用说明', link: '/full/' },
          ],
        },
        {
          text: 'A — 模块开发',
          collapsed: true,
          items: [
            { text: 'A-01 新模块创建检查清单', link: '/full/A-模块开发/A-01-新模块创建检查清单' },
            { text: 'A-02 模块清单文件模板', link: '/full/A-模块开发/A-02-模块清单文件模板' },
            { text: 'A-03 构建配置模板', link: '/full/A-模块开发/A-03-构建配置模板' },
            { text: 'A-04 测试配置模板', link: '/full/A-模块开发/A-04-测试配置模板' },
            { text: 'A-05 测试文件模板', link: '/full/A-模块开发/A-05-测试文件模板' },
            { text: 'A-06 README 模板', link: '/full/A-模块开发/A-06-README模板' },
            { text: 'A-07 变更日志模板', link: '/full/A-模块开发/A-07-变更日志模板' },
            { text: 'A-08 子仓库初始化模板', link: '/full/A-模块开发/A-08-子仓库初始化模板' },
            { text: 'A-09 接口定义模板', link: '/full/A-模块开发/A-09-接口定义模板' },
          ],
        },
        {
          text: 'B — 工程化',
          collapsed: true,
          items: [
            { text: 'B-01 CI 流水线模板', link: '/full/B-工程化/B-01-CI流水线模板' },
            { text: 'B-02 发布流水线模板', link: '/full/B-工程化/B-02-发布流水线模板' },
            { text: 'B-03 文档部署模板', link: '/full/B-工程化/B-03-文档部署模板' },
            { text: 'B-04 多仓库同步模板', link: '/full/B-工程化/B-04-多仓库同步模板' },
            { text: 'B-05 Git 钩子配置模板', link: '/full/B-工程化/B-05-Git钩子配置模板' },
            { text: 'B-06 共享脚本模板', link: '/full/B-工程化/B-06-共享脚本模板' },
            { text: 'B-07 文档站配置模板', link: '/full/B-工程化/B-07-文档站配置模板' },
            { text: 'B-08 工作区配置模板', link: '/full/B-工程化/B-08-工作区配置模板' },
            { text: 'B-09 根仓库配置模板', link: '/full/B-工程化/B-09-根仓库配置模板' },
          ],
        },
        {
          text: 'C — 质量保障',
          collapsed: true,
          items: [
            { text: 'C-01 代码评审报告模板', link: '/full/C-质量保障/C-01-代码评审报告模板' },
            { text: 'C-02 评审修复任务模板', link: '/full/C-质量保障/C-02-评审修复任务模板' },
            { text: 'C-03 新模块验收清单', link: '/full/C-质量保障/C-03-新模块验收清单' },
            { text: 'C-04 发布检查清单', link: '/full/C-质量保障/C-04-发布检查清单' },
            { text: 'C-05 PR 检查清单', link: '/full/C-质量保障/C-05-PR检查清单' },
            { text: 'C-06 E2E 测试模板', link: '/full/C-质量保障/C-06-E2E测试模板' },
            { text: 'C-07 性能基准模板', link: '/full/C-质量保障/C-07-性能基准模板' },
          ],
        },
        {
          text: 'D — 项目管理',
          collapsed: true,
          items: [
            { text: 'D-01 需求文档模板', link: '/full/D-项目管理/D-01-需求文档模板' },
            { text: 'D-02 技术方案模板', link: '/full/D-项目管理/D-02-技术方案模板' },
            { text: 'D-03 API 文档模板', link: '/full/D-项目管理/D-03-API文档模板' },
            { text: 'D-04 架构设计模板', link: '/full/D-项目管理/D-04-架构设计模板' },
            { text: 'D-05 项目总览模板', link: '/full/D-项目管理/D-05-项目总览模板' },
            { text: 'D-06 贡献指南模板', link: '/full/D-项目管理/D-06-贡献指南模板' },
          ],
        },
        {
          text: 'E — 开发任务',
          collapsed: true,
          items: [
            { text: 'E-01 新功能开发模板', link: '/full/E-开发任务/E-01-新功能开发模板' },
            { text: 'E-02 Bug 修复模板', link: '/full/E-开发任务/E-02-Bug修复模板' },
            { text: 'E-03 重构任务模板', link: '/full/E-开发任务/E-03-重构任务模板' },
            { text: 'E-04 性能优化模板', link: '/full/E-开发任务/E-04-性能优化模板' },
            { text: 'E-05 阶段开发计划模板', link: '/full/E-开发任务/E-05-阶段开发计划模板' },
            { text: 'E-06 版本发布模板', link: '/full/E-开发任务/E-06-版本发布模板' },
          ],
        },
      ],
      '/': [
        {
          text: '快速开始',
          items: [
            { text: '首页', link: '/' },
          ],
        },
        {
          text: '模板分类',
          items: [
            { text: 'A — 模块开发', link: '/simple/A-模块开发/A-01-新模块创建检查清单' },
            { text: 'B — 工程化', link: '/simple/B-工程化/B-01-CI流水线模板' },
            { text: 'C — 质量保障', link: '/simple/C-质量保障/C-01-代码评审报告模板' },
            { text: 'D — 项目管理', link: '/simple/D-项目管理/D-01-需求文档模板' },
            { text: 'E — 开发任务', link: '/simple/E-开发任务/E-01-新功能开发模板' },
          ],
        },
      ],
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: { noResultsText: '没有找到相关结果', resetButtonTitle: '清除搜索条件', footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } },
        },
      },
    },
    footer: {
      message: '通用文档模板体系 — 全语言、全栈通用',
    },
    editLink: {
      pattern: '',
      text: '',
    },
  },
  vite: {
    srcDir: '.',
  },
})
