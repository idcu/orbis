# 🤖 AI Skill 使用指南

基于 Orbis 模板体系，我们提供了 **15 个 AI Skill**，可将模板能力直接集成到 AI 编程工具中，实现自动化生成。

## 什么是 AI Skill

AI Skill 是将模板的结构、字段、检查清单等嵌入到 AI 的系统指令中，让 AI 能够：

- **自动识别场景**：根据对话关键词自动加载对应 Skill
- **结构化输出**：按模板规范生成文档，格式统一、内容完整
- **自检闭环**：生成后自动按检查清单逐项验证

## 支持的 AI 工具

目前 Skill 文件采用 **Trae MTC（More Than Coding）** 格式，兼容以下工具：

| 工具 | Skill 目录 | 说明 |
|------|-----------|------|
| **Trae** | `.trae/skills/` | 原生支持，自动触发 |
| **Claude Code** | `.claude/skills/` | 重命名目录即可 |
| **Cursor** | `.cursor/skills/` | 重命名目录即可 |

## 安装方式

### 方式一：项目级安装（推荐）

将仓库根目录的 `skills/` 文件夹复制为 `.trae/skills/`：

```bash
# 在项目根目录执行
cp -r skills .trae/skills
```

项目结构变为：

```
your-project/
├── .trae/
│   └── skills/
│       ├── project-init/SKILL.md
│       ├── code-reviewer/SKILL.md
│       └── ...（共 15 个）
├── src/
└── package.json
```

在 Trae 中打开该项目，Skill 会自动生效。

### 方式二：全局安装

```bash
# 复制到用户主目录，所有项目通用
mkdir -p ~/.trae/skills
cp -r skills/* ~/.trae/skills/
```

### 方式三：通过 Trae UI 导入

1. 打开 Trae → 进入项目
2. 点击右上角 **设置** → **规则和技能** → **技能**
3. 点击 **+ 创建** → 选择 **手动导入**
4. 将对应 `SKILL.md` 的内容粘贴进去

## Skill 总览

### 项目初始化组

| Skill | 对应模板 | 触发词 | 说明 |
|-------|---------|--------|------|
| `project-init` | D-05 + D-04 + D-06 | "初始化项目"、"项目脚手架" | 生成项目总览、架构设计、贡献指南 |
| `requirement-analysis` | D-01 + D-02 | "需求分析"、"技术方案" | 生成需求文档、技术方案 |
| `api-doc-generator` | D-03 + A-09 | "生成API文档"、"接口定义" | 从源码自动提取并生成 API 文档 |

### 模块开发组

| Skill | 对应模板 | 触发词 | 说明 |
|-------|---------|--------|------|
| `module-scaffold` | A-01 + A-02 + A-03 + A-04 + A-06 + A-08 | "创建模块"、"新建包" | 生成完整模块脚手架（57 项检查） |
| `test-generator` | A-05 + C-06 + C-07 | "生成测试"、"E2E测试" | 生成单元测试、E2E 测试、性能基准 |
| `interface-design` | A-09 + D-03 | "设计接口"、"定义API" | 设计接口签名、参数表、错误处理 |

### 开发执行组

| Skill | 对应模板 | 触发词 | 说明 |
|-------|---------|--------|------|
| `feature-dev` | E-01 + E-05 | "开发功能"、"新功能" | 规划功能开发全流程 |
| `bug-fix` | E-02 | "修复Bug"、"Bug分析" | 根因分析、修复方案、回归测试 |
| `refactor-planner` | E-03 + E-04 | "重构"、"性能优化" | 重构规划、性能优化方案 |

### 质量保障组

| Skill | 对应模板 | 触发词 | 说明 |
|-------|---------|--------|------|
| `code-reviewer` | C-01 + C-02 + C-03 | "代码评审"、"Code Review" | 14 维度评审、修复跟踪、模块验收 |
| `pr-checker` | C-05 | "PR检查"、"提交前检查" | 6 部分检查、PR 描述自动填充 |
| `release-manager` | E-06 + C-04 + A-07 | "发布版本"、"Release" | 8 阶段发布检查、CHANGELOG 生成 |

### 工程化配置组

| Skill | 对应模板 | 触发词 | 说明 |
|-------|---------|--------|------|
| `ci-pipeline` | B-01 + B-02 + B-03 + B-04 | "配置CI"、"流水线" | CI/CD、发布、文档部署、多仓库同步 |
| `workspace-setup` | B-08 + B-09 + B-05 + B-06 | "工作区配置"、"monorepo" | 工作区、根仓库、Git 钩子、共享脚本 |
| `docs-site` | B-07 | "文档站"、"VitePress" | 文档站配置（多平台适配） |

## 触发方式

### 自动触发

Skill 的 `description` 中包含触发关键词，当 AI 对话中出现这些词时会自动加载：

```
用户：帮我做一下代码评审
→ 自动加载 code-reviewer Skill
```

### 手动调用

在对话中输入 `/skill-name` 直接调用：

```
用户：/code-reviewer
→ 直接调用代码评审 Skill
```

## 精简版 / 完整版切换

在对话中加上 **"精简版"** 即可输出核心章节：

```
用户：帮我做代码评审，精简版
→ 只输出评审核心结论，不展开每个维度
```

不加则默认输出完整版。

## 模板与 Skill 映射关系

下表展示了每个 Orbis 模板与对应 Skill 的关系：

| 模板 | 对应 Skill | 角色 |
|------|-----------|------|
| A-01 新模块创建检查 | `module-scaffold` | 核心模板 |
| A-02 模块清单文件 | `module-scaffold` | 核心模板 |
| A-03 构建配置 | `module-scaffold` | 核心模板 |
| A-04 测试配置 | `module-scaffold` | 核心模板 |
| A-05 测试文件 | `test-generator` | 核心模板 |
| A-06 README | `module-scaffold` | 输出组件 |
| A-07 变更日志 | `release-manager` | 核心模板 |
| A-08 子仓库初始化 | `module-scaffold` | 核心模板 |
| A-09 接口定义 | `interface-design` | 核心模板 |
| B-01 CI 流水线 | `ci-pipeline` | 核心模板 |
| B-02 发布流水线 | `ci-pipeline` | 核心模板 |
| B-03 文档部署 | `ci-pipeline` | 输出组件 |
| B-04 多仓库同步 | `ci-pipeline` | 扩展模板 |
| B-05 Git 钩子 | `workspace-setup` | 核心模板 |
| B-06 共享脚本 | `workspace-setup` | 输出组件 |
| B-07 文档站配置 | `docs-site` | 核心模板 |
| B-08 工作区配置 | `workspace-setup` | 核心模板 |
| B-09 根仓库配置 | `workspace-setup` | 核心模板 |
| C-01 代码评审报告 | `code-reviewer` | 核心模板 |
| C-02 评审修复任务 | `code-reviewer` | 输出组件 |
| C-03 新模块验收 | `code-reviewer` | 扩展模板 |
| C-04 发布检查 | `release-manager` | 核心模板 |
| C-05 PR 检查 | `pr-checker` | 核心模板 |
| C-06 E2E 测试 | `test-generator` | 扩展模板 |
| C-07 性能基准 | `test-generator` | 扩展模板 |
| D-01 需求文档 | `requirement-analysis` | 核心模板 |
| D-02 技术方案 | `requirement-analysis` | 核心模板 |
| D-03 API 文档 | `api-doc-generator` | 核心模板 |
| D-04 架构设计 | `project-init` | 核心模板 |
| D-05 项目总览 | `project-init` | 核心模板 |
| D-06 贡献指南 | `project-init` | 核心模板 |
| E-01 新功能开发 | `feature-dev` | 核心模板 |
| E-02 Bug 修复 | `bug-fix` | 核心模板 |
| E-03 重构任务 | `refactor-planner` | 核心模板 |
| E-04 性能优化 | `refactor-planner` | 核心模板 |
| E-05 阶段开发计划 | `feature-dev` | 扩展模板 |
| E-06 版本发布 | `release-manager` | 核心模板 |

## Skill 协同工作流

### 项目启动

```
project-init → requirement-analysis → workspace-setup → ci-pipeline → docs-site
```

### 模块开发

```
feature-dev → module-scaffold → interface-design → test-generator → api-doc-generator
```

### 质量保障

```
pr-checker → code-reviewer → bug-fix → release-manager
```

## 效率提升

| 工作项 | 手动耗时 | Skill 耗时 | 节省比例 |
|--------|---------|-----------|---------|
| 项目初始化文档 | 2-3 小时 | 10-20 分钟 | 80-90% |
| 需求分析 + 技术方案 | 1-2 小时 | 10-20 分钟 | 75-85% |
| 模块脚手架搭建 | 1-2 小时 | 5-15 分钟 | 80-90% |
| 测试用例编写 | 1-2 小时/模块 | 10-20 分钟 | 60-80% |
| API 文档编写 | 1-2 小时 | 5-15 分钟 | 75-90% |
| 代码评审 | 30-60 分钟/PR | 10-20 分钟 | 50-70% |
| CI/CD 配置 | 2-4 小时 | 10-30 分钟 | 80-90% |
| 版本发布流程 | 30-60 分钟 | 5-15 分钟 | 60-75% |

## 注意事项

1. Skill 是模板的 AI 化封装，模板本身仍是规范的核心
2. AI 生成的文档建议人工审核后再使用
3. 可根据团队实际情况调整 Skill 中的模板内容
4. Skill 文件使用 `{{占位符}}` 格式，AI 会自动替换为实际内容
