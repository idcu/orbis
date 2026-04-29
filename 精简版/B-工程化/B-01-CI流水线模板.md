# B-S01 CI 流水线模板（精简版）

> **模板 ID**: B-S01
> **模板名称**: CI 流水线模板（精简版）
> **版本**: 1.0.0
> **适用场景**: 基础持续集成，单作业完成代码检查、测试与构建

---

## 概述

本模板提供一个最简 CI 流水线，在单个作业中依次执行 **代码检查 → 单元测试 → 构建**。适用于中小型项目或快速原型阶段。

---

## 流水线配置

```yaml
# {{项目名称}} CI 流水线
# 适用于 CI 平台（如 GitHub Actions / GitLab CI / Jenkins 等）
# 请根据实际平台调整顶层关键字和语法

# ====== 全局变量 ======
variables:
  PROJECT_NAME: "{{项目名称}}"
  RUNTIME_VERSION: "{{运行时版本}}"

# ====== 触发条件 ======
triggers:
  branches:
    - "{{默认分支}}"
    - "{{开发分支}}"
  pull_requests:
    branches:
      - "{{默认分支}}"

# ====== 作业定义 ======
jobs:
  ci:
    name: "代码检查 / 测试 / 构建"
    runs-on: "{{运行环境}}"
    steps:
      # --- 1. 检出代码 ---
      - name: 检出代码
        uses: "checkout@v4"  # 使用平台提供的代码检出操作

      # --- 2. 安装依赖 ---
      - name: 安装依赖
        run: "{{安装依赖命令}}"

      # --- 3. 代码检查 ---
      - name: 代码检查（Lint）
        run: "{{代码检查命令}}"

      # --- 4. 单元测试 ---
      - name: 单元测试
        run: "{{运行测试命令}}"

      # --- 5. 构建 ---
      - name: 构建
        run: "{{构建命令}}"
```

---

## 占位符说明

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{项目名称}}` | 项目或仓库的名称 | `my-project` |
| `{{运行时版本}}` | 运行时版本号 | `18` |
| `{{默认分支}}` | 主分支名称 | `main` |
| `{{开发分支}}` | 开发分支名称 | `develop` |
| `{{运行环境}}` | CI 执行环境 | `ubuntu-latest` |
| `{{安装依赖命令}}` | 安装项目依赖的命令 | `npm install` / `pip install -r requirements.txt` |
| `{{代码检查命令}}` | 执行代码检查的命令 | `npm run lint` / `ruff check .` |
| `{{运行测试命令}}` | 执行测试的命令 | `npm test` / `pytest` |
| `{{构建命令}}` | 执行项目构建的命令 | `npm run build` / `cargo build` |

---

## 适配指南

- **GitHub Actions**: 将 `jobs` 下的内容放入 `.github/workflows/ci.yml`，`uses` 对应 marketplace action。
- **GitLab CI**: 将 `variables` 放到顶层，`jobs` 改为各 `job` 定义，`steps` 改为 `script`。
- **Jenkins**: 使用 `pipeline { stages { ... } }` 语法，`steps` 对应 `sh` 步骤。
- **其他平台**: 参照各平台的 YAML/声明式语法进行映射。

---

## 注意事项

1. 此模板为精简版，所有步骤在单个作业中串行执行。
2. 如需并行执行或拆分作业，请参考完整版模板（B-F01）。
3. 建议在 `{{安装依赖命令}}` 中利用平台缓存机制加速依赖安装。
