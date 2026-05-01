#!/usr/bin/env bash
# ============================================================
#  GitHub Pages 部署脚本
#  用法: npm run deploy:gh-pages  或  bash scripts/deploy-gh-pages.sh
# ============================================================

set -euo pipefail

# ---------- 颜色 ----------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

info()    { echo -e "${BLUE}ℹ${NC} $1"; }
success() { echo -e "${GREEN}✔${NC} $1"; }
error()   { echo -e "${RED}✖${NC} $1"; }

# ---------- 路径 ----------
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SITE_CONFIG="$PROJECT_ROOT/.site-config"

# ---------- 读取配置 ----------
if [[ ! -f "$SITE_CONFIG" ]]; then
  error "未找到配置文件 .site-config，请先运行: npm run setup"
  exit 1
fi

source "$SITE_CONFIG"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-gh-pages}"

# ---------- 检查 ----------
if ! command -v git &> /dev/null; then
  error "未检测到 git，请先安装 git"
  exit 1
fi

cd "$PROJECT_ROOT"
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
  error "当前目录不是 git 仓库，请先初始化: git init"
  exit 1
fi

if [[ -n $(git status --porcelain) ]]; then
  error "存在未提交的更改，请先提交或暂存"
  git status --short
  exit 1
fi

# ---------- 构建 ----------
info "正在构建文档..."
npm run docs:build

if [[ ! -d "$PROJECT_ROOT/docs/.vitepress/dist" ]]; then
  error "构建失败：未找到 docs/.vitepress/dist 目录"
  exit 1
fi

success "构建完成"

# ---------- 部署 ----------
info "正在部署到 $DEPLOY_BRANCH 分支..."

if git ls-remote --heads origin "$DEPLOY_BRANCH" | grep -q "$DEPLOY_BRANCH"; then
  git subtree push --prefix=docs/.vitepress/dist origin "$DEPLOY_BRANCH" --force
else
  git subtree push --prefix=docs/.vitepress/dist origin "$DEPLOY_BRANCH"
fi

success "部署完成！"
echo ""
info "请前往 GitHub 仓库 → Settings → Pages"
info "Source 选择 'Deploy from a branch'，分支选择 $DEPLOY_BRANCH"
if [[ -n "${SITE_URL:-}" ]]; then
  info "部署成功后访问: $SITE_URL"
fi
echo ""
