# B-F01 CI 流水线模板（完整版）

> **模板 ID**: B-F01
> **模板名称**: CI 流水线模板（完整版）
> **版本**: 1.0.0
> **适用场景**: 完整持续集成，8 个作业覆盖代码质量全链路

---

## 概述

本模板提供一个完整 CI 流水线，包含 **8 个独立作业**，覆盖从代码检查到端到端测试的全流程。支持矩阵策略、分片测试、覆盖率阈值、构建依赖排序、产物大小检查、依赖安全审计以及并发控制。

---

## 流水线配置

```yaml
# ｛｛项目名称｝｝ CI 流水线（完整版）
# 适用于 CI 平台（如 GitHub Actions / GitLab CI / Jenkins 等）

# ====== 全局变量 ======
variables:
  PROJECT_NAME: "｛｛项目名称｝｝"
  RUNTIME_VERSION: "｛｛运行时版本｝｝"
  NODE_VERSION: "｛｛运行时版本｝｝"
  COVERAGE_THRESHOLD: "｛｛覆盖率阈值｝｝"
  MAX_SIZE_KB: "｛｛产物大小上限KB｝｝"

# ====== 并发控制 ======
concurrency:
  group: "ci-$｛｛分支名称｝｝"
  cancel-in-progress: true

# ====== 触发条件 ======
triggers:
  branches:
    - "｛｛默认分支｝｝"
    - "｛｛开发分支｝｝"
    - "feat/*"
    - "fix/*"
  pull_requests:
    branches:
      - "｛｛默认分支｝｝"

# ====== 缓存配置 ======
cache:
  key: "deps-$｛｛运行时版本｝｝-$｛｛哈希值｝｝"
  paths:
    - "｛｛依赖缓存路径｝｝"

# ====== 作业 1: 代码检查 ======
jobs:
  lint:
    name: "代码检查"
    runs-on: "｛｛运行环境｝｝"
    steps:
      - name: 检出代码
        uses: "checkout@v4"
      - name: 安装依赖
        run: "｛｛安装依赖命令｝｝"
      - name: 执行代码检查
        run: "｛｛代码检查命令｝｝"
      - name: 执行格式检查
        run: "｛｛格式检查命令｝｝"

  # ====== 作业 2: 类型检查 ======
  type-check:
    name: "类型检查"
    runs-on: "｛｛运行环境｝｝"
    steps:
      - name: 检出代码
        uses: "checkout@v4"
      - name: 安装依赖
        run: "｛｛安装依赖命令｝｝"
      - name: 类型检查
        run: "｛｛类型检查命令｝｝"

  # ====== 作业 3: 单元测试（矩阵 + 分片） ======
  test:
    name: "单元测试 (｛｛运行时版本｝｝ / 分片 ｛｛分片编号｝｝)"
    runs-on: "｛｛运行环境｝｝"
    strategy:
      matrix:
        runtime-version: [｛｛运行时版本列表｝｝]
        shard: [｛｛分片编号列表｝｝]
      fail-fast: false
    steps:
      - name: 检出代码
        uses: "checkout@v4"
      - name: 安装依赖
        run: "｛｛安装依赖命令｝｝"
      - name: 运行测试（分片 ｛｛分片编号｝｝）
        run: |
          ｛｛运行分片测试命令｝｝
        env:
          SHARD: "$｛｛分片编号｝｝"
          TOTAL_SHARDS: "｛｛分片总数｝｝"
      - name: 上传测试报告
        uses: "upload-artifact@v4"
        with:
          name: "test-report-$｛｛运行时版本｝｝-$｛｛分片编号｝｝"
          path: "｛｛测试报告路径｝｝"

  # ====== 作业 4: 覆盖率检查 ======
  coverage:
    name: "覆盖率检查"
    runs-on: "｛｛运行环境｝｝"
    needs: [test]
    steps:
      - name: 检出代码
        uses: "checkout@v4"
      - name: 安装依赖
        run: "｛｛安装依赖命令｝｝"
      - name: 生成覆盖率报告
        run: "｛｛生成覆盖率命令｝｝"
      - name: 检查覆盖率阈值
        run: |
          # 覆盖率不得低于 ｛｛覆盖率阈值｝｝%
          ｛｛检查覆盖率命令｝｝
          if [ "$COVERAGE" -lt ｛｛覆盖率阈值｝｝ ]; then
            echo "错误: 覆盖率 $COVERAGE% 低于阈值 ｛｛覆盖率阈值｝｝%"
            exit 1
          fi
      - name: 上传覆盖率报告
        uses: "upload-artifact@v4"
        with:
          name: "coverage-report"
          path: "｛｛覆盖率报告路径｝｝"

  # ====== 作业 5: 构建（依赖顺序） ======
  build:
    name: "构建"
    runs-on: "｛｛运行环境｝｝"
    needs: [lint, type-check, test]
    steps:
      - name: 检出代码
        uses: "checkout@v4"
      - name: 安装依赖
        run: "｛｛安装依赖命令｝｝"
      - name: 按依赖顺序构建
        run: |
          # 按照包依赖拓扑排序依次构建
          ｛｛按序构建命令｝｝
      - name: 上传构建产物
        uses: "upload-artifact@v4"
        with:
          name: "build-artifacts"
          path: "｛｛构建产物路径｝｝"

  # ====== 作业 6: 产物大小检查 ======
  size-check:
    name: "产物大小检查"
    runs-on: "｛｛运行环境｝｝"
    needs: [build]
    steps:
      - name: 下载构建产物
        uses: "download-artifact@v4"
        with:
          name: "build-artifacts"
      - name: 检查产物大小
        run: |
          SIZE=$(du -sk ｛｛构建产物路径｝｝ | cut -f1)
          echo "产物大小: ${SIZE}KB"
          if [ "$SIZE" -gt ｛｛产物大小上限KB｝｝ ]; then
            echo "错误: 产物大小 ${SIZE}KB 超过上限 ｛｛产物大小上限KB｝｝KB"
            exit 1
          fi

  # ====== 作业 7: 依赖安全检查 ======
  dependency-check:
    name: "依赖安全检查"
    runs-on: "｛｛运行环境｝｝"
    steps:
      - name: 检出代码
        uses: "checkout@v4"
      - name: 安装依赖
        run: "｛｛安装依赖命令｝｝"
      - name: 检查依赖安全
        run: "｛｛依赖安全检查命令｝｝"
      - name: 检查依赖许可证
        run: "｛｛许可证检查命令｝｝"

  # ====== 作业 8: 端到端测试 ======
  e2e:
    name: "端到端测试"
    runs-on: "｛｛运行环境｝｝"
    needs: [build]
    steps:
      - name: 检出代码
        uses: "checkout@v4"
      - name: 下载构建产物
        uses: "download-artifact@v4"
        with:
          name: "build-artifacts"
      - name: 安装 E2E 依赖
        run: "｛｛安装E2E依赖命令｝｝"
      - name: 启动测试服务
        run: "｛｛启动测试服务命令｝｝"
      - name: 运行 E2E 测试
        run: "｛｛运行E2E测试命令｝｝"
      - name: 上传 E2E 报告
        uses: "upload-artifact@v4"
        with:
          name: "e2e-report"
          path: "｛｛E2E报告路径｝｝"
```

---

## 占位符说明

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `｛｛项目名称｝｝` | 项目或仓库的名称 | `my-project` |
| `｛｛运行时版本｝｝` | 运行时版本号 | `18` |
| `｛｛运行时版本列表｝｝` | 矩阵测试的版本列表 | `[18, 20, 22]` |
| `｛｛分片编号列表｝｝` | 测试分片编号列表 | `[1, 2, 3, 4]` |
| `｛｛分片编号｝｝` | 当前分片编号 | `1` |
| `｛｛分片总数｝｝` | 总分片数 | `4` |
| `｛｛覆盖率阈值｝｝` | 覆盖率最低百分比 | `80` |
| `｛｛产物大小上限KB｝｝` | 构建产物最大体积（KB） | `1024` |
| `｛｛默认分支｝｝` | 主分支名称 | `main` |
| `｛｛开发分支｝｝` | 开发分支名称 | `develop` |
| `｛｛运行环境｝｝` | CI 执行环境 | `ubuntu-latest` |
| `｛｛依赖缓存路径｝｝` | 依赖缓存目录 | `node_modules` |
| `｛｛哈希值｝｝` | 锁文件的哈希值 | `sha256:...` |
| `｛｛安装依赖命令｝｝` | 安装项目依赖的命令 | `npm ci` |
| `｛｛代码检查命令｝｝` | 执行代码检查的命令 | `npm run lint` |
| `｛｛格式检查命令｝｝` | 执行格式检查的命令 | `npm run format:check` |
| `｛｛类型检查命令｝｝` | 执行类型检查的命令 | `npm run typecheck` |
| `｛｛运行分片测试命令｝｝` | 执行分片测试的命令 | `npm run test:shard` |
| `｛｛测试报告路径｝｝` | 测试报告输出路径 | `coverage/reports/` |
| `｛｛生成覆盖率命令｝｝` | 生成覆盖率报告的命令 | `npm run coverage` |
| `｛｛检查覆盖率命令｝｝` | 提取覆盖率数值的命令 | `COVERAGE=$(cat coverage/summary.txt)` |
| `｛｛覆盖率报告路径｝｝` | 覆盖率报告路径 | `coverage/` |
| `｛｛按序构建命令｝｝` | 按依赖顺序构建的命令 | `turbo run build` |
| `｛｛构建产物路径｝｝` | 构建产物输出路径 | `dist/` |
| `｛｛依赖安全检查命令｝｝` | 依赖安全审计命令 | `npm audit --audit-level=high` |
| `｛｛许可证检查命令｝｝` | 许可证合规检查命令 | `license-checker --summary` |
| `｛｛安装E2E依赖命令｝｝` | 安装 E2E 测试依赖 | `npx playwright install` |
| `｛｛启动测试服务命令｝｝` | 启动被测服务 | `npm run serve &` |
| `｛｛运行E2E测试命令｝｝` | 运行端到端测试 | `npm run test:e2e` |
| `｛｛E2E报告路径｝｝` | E2E 测试报告路径 | `e2e-results/` |

---

## 作业依赖关系

```
lint ─────────────────────────────┐
type-check ───────────────────────┼──→ build ──→ size-check
test ──→ coverage                 │         └──→ e2e
dependency-check ────────────────┘
```

---

## 并发控制说明

- **同一分支**的多次推送只保留最新一次运行，自动取消之前的运行。
- **不同分支**的运行互不影响。
- 可通过 `cancel-in-progress: false` 改为排队等待模式。

---

## 缓存策略

- 缓存键基于运行时版本 + 锁文件哈希值，确保依赖变更时自动更新缓存。
- `｛｛依赖缓存路径｝｝` 应指向包管理器的本地缓存目录。

---

## 适配指南

- **GitHub Actions**: 将 `jobs` 直接映射，`uses` 对应 marketplace action，`strategy.matrix` 原生支持。
- **GitLab CI**: 使用 `parallel: matrix` 实现矩阵，`needs` 实现依赖，`cache` 放到顶层。
- **Jenkins**: 使用 `matrix` + `axes` 实现矩阵，`trigger` 实现并发控制。
- **其他平台**: 参照各平台文档进行语法映射。

---

## 注意事项

1. 矩阵测试会成倍增加 CI 运行时间，请根据项目规模合理配置版本和分片数量。
2. 分片测试需要测试框架支持分片功能（如 `--shard` 参数）。
3. 覆盖率阈值应根据项目实际情况设定，建议从较低值开始逐步提升。
4. 产物大小检查有助于防止构建产物意外膨胀。
5. 依赖安全检查建议配置为定期运行（如每日定时任务）。
