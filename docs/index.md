---
layout: home

hero:
  name: 通用文档模板体系
  text: 全语言 · 全栈 · 即取即用
  tagline: 从真实项目开发中提炼的 74 个通用模板，覆盖模块开发、工程化、质量保障、项目管理、开发任务五大领域
  actions:
    - theme: brand
      text: 📌 精简版模板
      link: /simple/
    - theme: alt
      text: 📋 完整版模板
      link: /full/

features:
  - icon: 📦
    title: A — 模块开发
    details: 9 组 18 个模板：模块清单、构建配置、测试配置、README、变更日志、接口定义等
  - icon: ⚙️
    title: B — 工程化
    details: 9 组 18 个模板：CI 流水线、发布流水线、文档部署、Git 钩子、工作区配置等
  - icon: ✅
    title: C — 质量保障
    details: 7 组 14 个模板：代码评审、验收清单、PR 检查、E2E 测试、性能基准等
  - icon: 📋
    title: D — 项目管理
    details: 6 组 12 个模板：需求文档、技术方案、API 文档、架构设计、贡献指南等
  - icon: 🔧
    title: E — 开发任务
    details: 6 组 12 个模板：新功能开发、Bug 修复、重构、性能优化、版本发布等
  - icon: 🔄
    title: 精简版 ↔ 完整版
    details: 每个模板均提供精简版和完整版两个层级，页面内一键切换，按需选用
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #3eaf7c 30%, #42b883);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #42b883aa 50%, #3eaf7caa 50%);
  --vp-home-hero-image-filter: blur(44px);
}

/* 标语排版优化：防止换行 */
.VPHero .text {
  font-size: 42px !important;
  white-space: nowrap;
}

.VPHero .tagline {
  font-size: 17px !important;
  max-width: 680px !important;
  line-height: 1.7 !important;
}

@media (max-width: 768px) {
  .VPHero .text {
    font-size: 28px !important;
    white-space: normal;
  }
  .VPHero .tagline {
    font-size: 15px !important;
  }
}
</style>
