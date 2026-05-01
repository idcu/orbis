#!/usr/bin/env bash
# ============================================================
#  VitePress 文档站模板 — 交互式配置脚本
#  用法: npm run setup  或  bash scripts/setup.sh
# ============================================================

set -euo pipefail

# ---------- 颜色定义 ----------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# ---------- 工具函数 ----------
info()    { echo -e "${BLUE}ℹ${NC} $1"; }
success() { echo -e "${GREEN}✔${NC} $1"; }
warn()    { echo -e "${YELLOW}⚠${NC} $1"; }
error()   { echo -e "${RED}✖${NC} $1"; }
header()  { echo -e "\n${BOLD}${CYAN}━━━ $1 ━━━${NC}\n"; }

# 带默认值的交互输入
ask() {
  local prompt="$1"
  local default="$2"
  local var_name="$3"

  if [[ -n "$default" ]]; then
    echo -ne "${CYAN}?${NC} ${prompt} ${YELLOW}(${default})${NC}: "
  else
    echo -ne "${CYAN}?${NC} ${prompt}: "
  fi
  read -r answer
  answer="${answer:-$default}"
  eval "$var_name=\"\$answer\""
}

# 选择菜单
choose() {
  local prompt="$1"
  shift
  local options=("$@")
  local default_idx="${1:-1}"

  echo -ne "${CYAN}?${NC} ${prompt}:\n"
  local i=1
  for opt in "${options[@]}"; do
    if [[ $i -eq 1 ]]; then
      echo -e "  ${GREEN}❯${NC} ${i}) ${opt}"
    else
      echo -e "    ${i}) ${opt}"
    fi
    ((i++))
  done
  echo -ne "\n${CYAN}  请输入序号${YELLOW} [1]${NC}: "
  read -r choice
  choice="${choice:-1}"
  echo "${options[$((choice-1))]}"
}

# ---------- 开始 ----------
clear
echo -e "${BOLD}${CYAN}"
echo "  ╔═══════════════════════════════════════════════╗"
echo "  ║   VitePress 文档站模板 — 交互式配置向导       ║"
echo "  ║   支持 Gitee Pages / GitHub Pages 部署       ║"
echo "  ╚═══════════════════════════════════════════════╝"
echo -e "${NC}"

# ---------- 项目根目录 ----------
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CONFIG_FILE="$PROJECT_ROOT/docs/.vitepress/config.ts"
SITE_CONFIG_FILE="$PROJECT_ROOT/.site-config"

# ---------- 1. 基本信息 ----------
header "1/6 基本信息"

ask "项目名称（英文，用于 package.json）" "my-docs" PROJECT_NAME
ask "站点标题（显示在浏览器标签和导航栏）" "$PROJECT_NAME 文档" SITE_TITLE
ask "站点描述（用于 SEO）" "一个现代化的文档站点" SITE_DESCRIPTION
ask "作者 / 团队名称" "MyTeam" AUTHOR_NAME
ask "默认语言" "zh-CN" LANG

# ---------- 2. 仓库信息 ----------
header "2/6 仓库信息"

DEPLOY_TARGET=$(choose "部署平台" "Gitee Pages" "GitHub Pages" "Vercel" "Netlify" "自定义路径（如 /docs/）")

case "$DEPLOY_TARGET" in
  "Gitee Pages")
    ask "Gitee 用户名或组织名" "" GITEE_OWNER
    ask "Gitee 仓库名" "$PROJECT_NAME" GITEE_REPO
    BASE_PATH="/$GITEE_REPO/"
    SITE_URL="https://$GITEE_OWNER.gitee.io/$GITEE_REPO/"
    ;;
  "GitHub Pages")
    ask "GitHub 用户名或组织名" "" GH_OWNER
    ask "GitHub 仓库名" "$PROJECT_NAME" GH_REPO
    BASE_PATH="/$GH_REPO/"
    SITE_URL="https://$GH_OWNER.github.io/$GH_REPO/"
    ;;
  "Vercel")
    BASE_PATH="/"
    ask "自定义域名（留空则使用 Vercel 默认域名）" "" SITE_URL
    SITE_URL="${SITE_URL:-https://$PROJECT_NAME.vercel.app}"
    ;;
  "Netlify")
    BASE_PATH="/"
    ask "自定义域名（留空则使用 Netlify 默认域名）" "" SITE_URL
    SITE_URL="${SITE_URL:-https://$PROJECT_NAME.netlify.app}"
    ;;
  *)
    ask "自定义基础路径（如 /docs/）" "/docs/" BASE_PATH
    ask "站点完整 URL" "https://example.com$BASE_PATH" SITE_URL
    ;;
esac

# ---------- 3. 外观配置 ----------
header "3/6 外观配置"

ask "主题色（十六进制，如 #3eaf7c）" "#3eaf7c" THEME_COLOR
ask "Logo 图片路径（如 /logo.svg，留空则不显示）" "/logo.svg" LOGO_PATH
ask "是否显示站点标题文字（y/n）" "y" SHOW_SITE_TITLE

if [[ "$SHOW_SITE_TITLE" == "y" ]]; then
  SITE_TITLE_TEXT="$SITE_TITLE"
else
  SITE_TITLE_TEXT=""
fi

# ---------- 4. 导航与社交链接 ----------
header "4/6 导航与社交链接"

ask "GitHub 仓库地址（留空则不显示）" "" GITHUB_URL
ask "Gitee 仓库地址（留空则不显示）" "" GITEE_URL

# ---------- 5. 部署配置 ----------
header "5/6 部署配置"

ask "部署分支（用于推送构建产物）" "gitee-pages" DEPLOY_BRANCH
ask "文档源码分支" "master" DOCS_BRANCH

# ---------- 6. 确认 ----------
header "6/6 确认配置"

echo -e "${BOLD}配置摘要：${NC}"
echo ""
echo -e "  项目名称:     ${GREEN}$PROJECT_NAME${NC}"
echo -e "  站点标题:     ${GREEN}$SITE_TITLE${NC}"
echo -e "  站点描述:     ${GREEN}$SITE_DESCRIPTION${NC}"
echo -e "  作者:         ${GREEN}$AUTHOR_NAME${NC}"
echo -e "  语言:         ${GREEN}$LANG${NC}"
echo -e "  部署平台:     ${GREEN}$DEPLOY_TARGET${NC}"
echo -e "  基础路径:     ${GREEN}$BASE_PATH${NC}"
echo -e "  站点 URL:     ${GREEN}$SITE_URL${NC}"
echo -e "  主题色:       ${GREEN}$THEME_COLOR${NC}"
echo -e "  部署分支:     ${GREEN}$DEPLOY_BRANCH${NC}"
echo -e "  源码分支:     ${GREEN}$DOCS_BRANCH${NC}"
echo ""

echo -ne "${CYAN}?${NC} 确认以上配置？${YELLOW}(Y/n)${NC}: "
read -r confirm
confirm="${confirm:-Y}"

if [[ "$confirm" != "Y" && "$confirm" != "y" ]]; then
  warn "已取消配置。"
  exit 0
fi

# ---------- 保存配置 ----------
header "正在生成配置文件..."

# 保存 .site-config 供部署脚本使用
cat > "$SITE_CONFIG_FILE" <<EOF
# VitePress 文档站配置 — 由 setup.sh 自动生成
# 生成时间: $(date '+%Y-%m-%d %H:%M:%S')

PROJECT_NAME=$PROJECT_NAME
SITE_TITLE=$SITE_TITLE
SITE_DESCRIPTION=$SITE_DESCRIPTION
AUTHOR_NAME=$AUTHOR_NAME
LANG=$LANG
DEPLOY_TARGET=$DEPLOY_TARGET
BASE_PATH=$BASE_PATH
SITE_URL=$SITE_URL
THEME_COLOR=$THEME_COLOR
LOGO_PATH=$LOGO_PATH
SHOW_SITE_TITLE=$SHOW_SITE_TITLE
SITE_TITLE_TEXT=$SITE_TITLE_TEXT
GITHUB_URL=$GITHUB_URL
GITEE_URL=$GITEE_URL
DEPLOY_BRANCH=$DEPLOY_BRANCH
DOCS_BRANCH=$DOCS_BRANCH
EOF

success "已保存配置到 .site-config"

# ---------- 生成 VitePress 配置 ----------
generate_config() {
  local github_link=""
  local gitee_link=""

  if [[ -n "$GITHUB_URL" ]]; then
    github_link="{ icon: 'github', link: '$GITHUB_URL' },"
  fi

  if [[ -n "$GITEE_URL" ]]; then
    gitee_link="{ icon: { svg: '<svg viewBox=\"0 0 32 32\" width=\"24\" height=\"24\"><g fill=\"none\" fill-rule=\"evenodd\"><circle cx=\"16\" cy=\"16\" fill=\"#c71d23\" r=\"16\"/><path d=\"m24.0987698 14.2225144h-9.0863697c-.4362899.000207-.7900048.3538292-.790326.7901191l-.0005173 1.9752185c-.0003277.4363707.353328.7902117.7896987.790326.0000712 0 .0001424 0 .0002135-.0000213l5.5317648-.0000461c.4363708-.0000102.7901221.3537352.7901257.790106 0 .0000022 0 .0000044 0 .0000066v.1975077.1975318c0 1.3091122-1.0612451 2.3703573-2.3703573 2.3703573h-7.5067195c-.4363081-.0000218-.790009-.353713-.7900429-.7900211l-.0002069-7.5059917c-.0001014-1.3091122 1.0611145-2.3703865 2.3702267-2.3704226.0000217 0 .0000435 0 .0000653.0000653h11.0602463c.4361793-.0004902.7898484-.35394.7906091-.7901189l.0012251-1.9752188c.0007606-.4363703-.3527683-.7903380-.7891389-.7906087-.0001634-.0000001-.0003268-.0000001-.0004901.0004898h-11.0617654c-3.27278051 0-5.92589329 2.6531128-5.92589329 5.9258933v11.0612755c0 .4363707.35374837.7901191.7901191.7901191h11.65447149c2.9454379 0 5.3331872-2.3877493 5.3331872-5.3331872v-4.5430682c0-.4363707-.3537484-.7901191-.7901191-.7901191z\" fill=\"#fff\"/></g></svg>' }, link: '$GITEE_URL', ariaLabel: 'Gitee' },"
  fi

  local site_title_config=""
  if [[ -n "$SITE_TITLE_TEXT" ]]; then
    site_title_config="siteTitle: '$SITE_TITLE_TEXT',"
  fi

  local logo_config=""
  if [[ -n "$LOGO_PATH" ]]; then
    logo_config="logo: '$LOGO_PATH',"
  fi

  cat > "$CONFIG_FILE" <<VPRESS_EOF
import { defineConfig } from 'vitepress'

export default defineConfig({
  // ============================================
  //  站点基本信息（由 setup.sh 自动生成）
  // ============================================
  title: '${SITE_TITLE}',
  description: '${SITE_DESCRIPTION}',
  lang: '${LANG}',
  base: '${BASE_PATH}',
  head: [
    ['meta', { name: 'theme-color', content: '${THEME_COLOR}' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'author', content: '${AUTHOR_NAME}' }],
    ['meta', { name: 'keywords', content: '${PROJECT_NAME}, 文档, docs' }],
    ['meta', { property: 'og:title', content: '${SITE_TITLE}' }],
    ['meta', { property: 'og:description', content: '${SITE_DESCRIPTION}' }],
    ['meta', { property: 'og:url', content: '${SITE_URL}' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  // ============================================
  //  主题配置
  // ============================================
  themeConfig: {
    ${logo_config}
    ${site_title_config}

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
    socialLinks: [
      ${github_link}
      ${gitee_link}
    ],

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © ${AUTHOR_NAME}',
    },

    // 编辑链接（设为空禁用，可按需开启）
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

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    // 大纲标题
    outline: {
      label: '页面导航',
      level: [2, 3],
    },

    // 返回顶部
    returnToTopLabel: '回到顶部',
  },

  // ============================================
  //  构建配置
  // ============================================
  vite: {
    srcDir: '.',
  },

  cleanUrls: true,

  lastUpdated: true,
})
VPRESS_EOF
}

generate_config
success "已生成 VitePress 配置: docs/.vitepress/config.ts"

# ---------- 更新 package.json ----------
# 更新项目名称
if command -v node &> /dev/null; then
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('$PROJECT_ROOT/package.json', 'utf8'));
    pkg.name = '$PROJECT_NAME';
    pkg.description = '$SITE_DESCRIPTION';
    fs.writeFileSync('$PROJECT_ROOT/package.json', JSON.stringify(pkg, null, 2) + '\n');
  "
  success "已更新 package.json"
else
  warn "未检测到 Node.js，跳过 package.json 更新"
fi

# ---------- 更新首页 ----------
generate_index() {
  cat > "$PROJECT_ROOT/docs/index.md" <<INDEX_EOF
---
layout: home

hero:
  name: "$SITE_TITLE"
  text: "文档中心"
  tagline: "$SITE_DESCRIPTION"
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 部署指南
      link: /guide/deployment

features:
  - icon: 📦
    title: 开箱即用
    details: 基于 VitePress 构建，提供完整的文档站模板和交互式配置脚本。
    link: /guide/getting-started
    linkText: 了解更多
  - icon: 🚀
    title: 一键部署
    details: 支持 Gitee Pages、GitHub Pages、Vercel、Netlify 等多平台一键部署。
    link: /guide/deployment
    linkText: 部署指南
  - icon: 🎨
    title: 高度可定制
    details: 支持自定义主题色、Logo、导航、侧边栏、多语言等。
    link: /guide/custom-theme
    linkText: 自定义配置
  - icon: 🔍
    title: 内置搜索
    details: 内置本地全文搜索，无需第三方服务，开箱即用。
    link: /guide/search
    linkText: 配置搜索
  - icon: 🌐
    title: 多语言支持
    details: 支持中英文等多语言切换，SEO 友好。
    link: /guide/i18n
    linkText: 国际化
  - icon: 📝
    title: 完善文档
    details: 模板自带使用文档，从配置到部署全流程覆盖。
    link: /guide/project-structure
    linkText: 查看文档
---
INDEX_EOF
}

generate_index
success "已生成首页: docs/index.md"

# ---------- 完成 ----------
echo ""
header "配置完成！"
echo ""
success "所有配置文件已生成。接下来请执行："
echo ""
echo -e "  ${CYAN}1.${NC} 安装依赖:    ${BOLD}npm install${NC}"
echo -e "  ${CYAN}2.${NC} 本地预览:    ${BOLD}npm run docs:dev${NC}"
echo -e "  ${CYAN}3.${NC} 构建文档:    ${BOLD}npm run docs:build${NC}"
echo -e "  ${CYAN}4.${NC} 部署上线:    ${BOLD}npm run deploy:gitee${NC}  或  ${BOLD}npm run deploy:gh-pages${NC}"
echo ""
info "配置文件保存在: .site-config"
info "VitePress 配置: docs/.vitepress/config.ts"
echo ""
