# B-F05 Git 钩子配置模板（完整版）

> **模板 ID**: B-F05
> **模板名称**: Git 钩子配置模板（完整版）
> **版本**: 1.0.0
> **适用场景**: 完整 Git 钩子体系，覆盖提交前检查、提交信息规范及推送前验证

---

## 概述

本模板提供一个完整 Git 钩子体系，包含 **3 个钩子**：

1. **pre-commit** - 仅对暂存文件执行代码检查和格式化（lint-staged 模式）
2. **commit-msg** - 验证提交信息符合约定式提交规范
3. **pre-push** - 推送前执行测试和类型检查

---

## 钩子管理工具配置

使用 Git 钩子管理工具统一管理钩子，确保团队共享配置：

```yaml
# ｛｛项目名称｝｝ Git 钩子管理配置
# 适用于 Git 钩子管理工具（如 Husky 或等效工具）

hooks:
  # ====== pre-commit: 暂存文件检查 ======
  pre-commit:
    name: "提交前检查"
    description: "仅对暂存文件执行代码检查和格式化"
    command: |
      # 获取暂存文件列表
      STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '｛｛文件匹配模式｝｝')

      if [ -z "$STAGED_FILES" ]; then
        echo "没有需要检查的文件，跳过"
        exit 0
      fi

      echo "检查以下暂存文件:"
      echo "$STAGED_FILES"

      # --- 对暂存文件执行代码检查 ---
      echo ">>> 代码检查中..."
      echo "$STAGED_FILES" | xargs ｛｛代码检查命令｝｝
      if [ $? -ne 0 ]; then
        echo ""
        echo "错误: 代码检查未通过"
        echo "提示: 请修复上述问题后重新暂存并提交"
        exit 1
      fi

      # --- 对暂存文件执行格式化 ---
      echo ">>> 格式化中..."
      echo "$STAGED_FILES" | xargs ｛｛格式化命令｝｝
      if [ $? -ne 0 ]; then
        echo ""
        echo "错误: 格式化失败"
        exit 1
      fi

      # --- 重新暂存格式化后的文件 ---
      echo "$STAGED_FILES" | xargs git add
      echo "pre-commit 检查通过"

  # ====== commit-msg: 提交信息验证 ======
  commit-msg:
    name: "提交信息验证"
    description: "验证提交信息符合约定式提交规范"
    command: |
      COMMIT_MSG_FILE=$1
      COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

      # 约定式提交正则
      CONVENTIONAL_PATTERN='^(｛｛提交类型列表｝｝)(\(.+\))?!?: .+'

      # 提取提交信息第一行（忽略注释）
      FIRST_LINE=$(echo "$COMMIT_MSG" | head -n1 | sed 's/^#.*//' | xargs)

      if ! echo "$FIRST_LINE" | grep -qE "$CONVENTIONAL_PATTERN"; then
        echo ""
        echo "错误: 提交信息不符合约定式提交规范"
        echo ""
        echo "当前提交信息: $FIRST_LINE"
        echo ""
        echo "正确格式:"
        echo "  <type>(<scope>): <subject>"
        echo ""
        echo "允许的类型: ｛｛提交类型列表｝｝"
        echo "示例:"
        echo "  feat(auth): 添加用户登录功能"
        echo "  fix(api): 修复请求超时问题"
        echo "  docs: 更新 README"
        echo "  chore: 升级依赖版本"
        echo ""
        exit 1
      fi

      # 检查提交信息长度
      if [ ${#FIRST_LINE} -gt ｛｛提交标题最大长度｝｝ ]; then
        echo "错误: 提交标题长度超过 ｛｛提交标题最大长度｝｝ 个字符（当前: ${#FIRST_LINE}）"
        exit 1
      fi

      echo "提交信息验证通过: $FIRST_LINE"

  # ====== pre-push: 推送前验证 ======
  pre-push:
    name: "推送前验证"
    description: "推送前执行测试和类型检查"
    command: |
      # 获取将要推送的提交范围
      REMOTE_BRANCH=$(git rev-parse --abbrev-ref @{push} 2>/dev/null || echo "")
      LOCAL_BRANCH=$(git rev-parse --abbrev-ref HEAD)

      if [ -z "$REMOTE_BRANCH" ]; then
        echo "无法确定远程分支，跳过推送前检查"
        exit 0
      fi

      echo "推送前验证分支: $LOCAL_BRANCH → $REMOTE_BRANCH"

      # --- 运行测试 ---
      echo ">>> 运行测试..."
      ｛｛运行测试命令｝｝
      if [ $? -ne 0 ]; then
        echo ""
        echo "错误: 测试未通过，请修复后重新推送"
        exit 1
      fi

      # --- 类型检查 ---
      echo ">>> 类型检查..."
      ｛｛类型检查命令｝｝
      if [ $? -ne 0 ]; then
        echo ""
        echo "错误: 类型检查未通过，请修复后重新推送"
        exit 1
      fi

      echo "推送前验证通过"
```

---

## 钩子安装脚本

```bash
#!/bin/sh
# ｛｛项目名称｝｝ 钩子安装脚本
# 文件路径: scripts/setup-hooks.sh

echo "正在安装 Git 钩子..."

# 检查 Git 钩子管理工具是否已安装
if ! command -v ｛｛钩子管理工具命令｝｝ > /dev/null 2>&1; then
  echo "正在安装 Git 钩子管理工具..."
  ｛｛安装钩子管理工具命令｝｝
fi

# 初始化钩子管理
｛｛初始化钩子命令｝｝

# 创建钩子目录
mkdir -p ｛｛钩子目录｝｝

# 创建 pre-commit 钩子
cat > ｛｛钩子目录｝｝/pre-commit << 'EOF'
｛｛pre-commit钩子内容｝｝
EOF
chmod +x ｛｛钩子目录｝｝/pre-commit

# 创建 commit-msg 钩子
cat > ｛｛钩子目录｝｝/commit-msg << 'EOF'
｛｛commit-msg钩子内容｝｝
EOF
chmod +x ｛｛钩子目录｝｝/commit-msg

# 创建 pre-push 钩子
cat > ｛｛钩子目录｝｝/pre-push << 'EOF'
｛｛pre-push钩子内容｝｝
EOF
chmod +x ｛｛钩子目录｝｝/pre-push

echo "Git 钩子安装完成"
```

---

## 占位符说明

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `｛｛项目名称｝｝` | 项目名称 | `my-project` |
| `｛｛文件匹配模式｝｝` | 需要检查的文件匹配模式 | `\.(js\|ts\|jsx\|tsx)$` |
| `｛｛代码检查命令｝｝` | 执行代码检查的命令 | `eslint --fix` |
| `｛｛格式化命令｝｝` | 执行代码格式化的命令 | `prettier --write` |
| `｛｛提交类型列表｝｝` | 允许的提交类型 | `feat\|fix\|docs\|style\|refactor\|perf\|test\|chore\|ci\|build\|revert` |
| `｛｛提交标题最大长度｝｝` | 提交标题最大字符数 | `72` |
| `｛｛运行测试命令｝｝` | 执行测试的命令 | `npm test` |
| `｛｛类型检查命令｝｝` | 执行类型检查的命令 | `npm run typecheck` |
| `｛｛钩子管理工具命令｝｝` | 钩子管理工具的命令名 | `husky` |
| `｛｛安装钩子管理工具命令｝｝` | 安装钩子管理工具 | `npm install -D husky` |
| `｛｛初始化钩子命令｝｝` | 初始化钩子管理 | `npx husky init` |
| `｛｛钩子目录｝｝` | 钩子脚本存放目录 | `.husky` |
| `｛｛pre-commit钩子内容｝｝` | pre-commit 钩子脚本内容 | （见上方配置） |
| `｛｛commit-msg钩子内容｝｝` | commit-msg 钩子脚本内容 | （见上方配置） |
| `｛｛pre-push钩子内容｝｝` | pre-push 钩子脚本内容 | （见上方配置） |

---

## 约定式提交规范

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复缺陷 |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构（非新功能、非修复） |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具变更 |
| `ci` | CI 配置变更 |
| `build` | 构建系统变更 |
| `revert` | 回滚提交 |

---

## 钩子执行顺序

```
git commit
    │
    ├── pre-commit ──→ 代码检查 + 格式化（仅暂存文件）
    │       │
    │       └── 失败 → 终止提交
    │
    ├── commit-msg ──→ 验证提交信息格式
    │       │
    │       └── 失败 → 终止提交
    │
    └── 提交成功

git push
    │
    ├── pre-push ──→ 运行测试 + 类型检查
    │       │
    │       └── 失败 → 终止推送
    │
    └── 推送成功
```

---

## 适配指南

- **Git 钩子管理工具**: 使用专用的 Git 钩子管理工具（如 Husky 或等效工具），将钩子脚本纳入版本控制。
- **直接安装**: 将钩子脚本放入 `.git/hooks/`，通过 `scripts/setup-hooks.sh` 自动安装。
- **Makefile 集成**: 在 `make setup` 目标中调用钩子安装脚本。
- **CI/CD 集成**: CI 中可跳过钩子（设置 `SKIP_HOOKS=1`），但应通过 CI 流水线执行等效检查。

---

## 注意事项

1. `pre-commit` 应仅检查暂存文件（`git diff --cached`），而非全量检查，以提升速度。
2. `commit-msg` 验证应兼容 `git commit --amend` 和 `git rebase` 场景。
3. `pre-push` 中的测试可能耗时较长，可考虑仅对关键分支启用。
4. 格式化命令会修改文件，需在格式化后重新 `git add`。
5. 可通过环境变量（如 `SKIP_HOOKS=1`）临时跳过钩子，但不建议作为常规做法。
