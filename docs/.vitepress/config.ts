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
      { text: '📖 使用指南', link: '/guide' },
      { text: '🤖 AI Skill', link: '/skills' },
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
      '/guide': [
        {
          text: '📖 使用指南',
          items: [
            { text: '快速开始', link: '/guide#快速开始' },
            { text: '模板分类总览', link: '/guide#模板分类总览' },
            { text: '精简版 vs 完整版', link: '/guide#精简版-vs-完整版' },
          ],
        },
        {
          text: '使用顺序',
          collapsed: true,
          items: [
            { text: '项目启动阶段', link: '/guide#项目启动阶段' },
            { text: '模块开发阶段', link: '/guide#模块开发阶段' },
            { text: '工程化配置阶段', link: '/guide#工程化配置阶段' },
            { text: '开发执行阶段', link: '/guide#开发执行阶段' },
            { text: '团队协作', link: '/guide#团队协作' },
          ],
        },
        {
          text: '进阶',
          collapsed: true,
          items: [
            { text: '典型使用场景', link: '/guide#典型使用场景' },
            { text: '与 AI 编程工具配合使用', link: '/guide#与-ai-编程工具配合使用' },
            { text: '注意事项', link: '/guide#注意事项' },
          ],
        },
      ],
      '/skills': [
        {
          text: '🤖 AI Skill 使用指南',
          items: [
            { text: '概述', link: '/skills#什么是-ai-skill' },
            { text: '安装方式', link: '/skills#安装方式' },
            { text: 'Skill 总览', link: '/skills#skill-总览' },
            { text: '触发方式', link: '/skills#触发方式' },
            { text: '模板映射关系', link: '/skills#模板与-skill-映射关系' },
            { text: '协同工作流', link: '/skills#skill-协同工作流' },
            { text: '效率提升', link: '/skills#效率提升' },
          ],
        },
      ],
      '/': [
        {
          text: '快速开始',
          items: [
            { text: '首页', link: '/' },
            { text: '📖 使用指南', link: '/guide' },
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/idcu/orbis' },
      { icon: { svg: '<svg viewBox="0 0 32 32" width="24" height="24"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" fill="#c71d23" r="16"/><path d="m24.0987698 14.2225144h-9.0863697c-.4362899.000207-.7900048.3538292-.790326.7901191l-.0005173 1.9752185c-.0003277.4363707.353328.7902117.7896987.790326.0000712 0 .0001424 0 .0002135-.0002135l5.5317648-.0000461c.4363708-.0000102.7901221.3537352.7901257.790106 0 .0000022 0 .0000044-.0000066.0000066v.1975077.1975318c0 1.3091122-1.0612451 2.3703573-2.3703573 2.3703573h-7.5067195c-.4363081-.0000218-.790009-.353713-.7900429-.7900211l-.0002069-7.5059917c-.0001014-1.3091122 1.0611145-2.3703865 2.3702267-2.3704226.0000217 0 .0000435 0 .0000653.0000653h11.0602463c.4361793-.0004902.7898484-.35394.7906091-.79011894l.0012251-1.97521881c.0007606-.43637034-.3527683-.79033806-.7891389-.79060871-.0001634-.0000001-.0003268-.00000015-.0004901.00048976h-11.0617654c-3.27278051 0-5.92589329 2.65311278-5.92589329 5.9258933v11.0612755c0 .4363707.35374837.7901191.7901191.7901191h11.65447149c2.9454379 0 5.3331872-2.3877493 5.3331872-5.3331872v-4.5430682c0-.4363707-.3537484-.7901191-.7901191-.7901191z" fill="#fff"/></g></svg>' }, link: 'https://gitee.com/idcu/orbis', ariaLabel: 'Gitee' },
      { icon: 'mail', link: 'mailto:idcu@qq.com' },
    ],
    footer: {
      message: '© 2026 idcu · idcu@qq.com',
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
