# 快速开始

本指南将帮助你快速搭建并运行文档站。

## 前提条件

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9（或 pnpm / yarn）

## 安装

::: code-group

```bash [npm]
npm install
```

```bash [pnpm]
pnpm install
```

```bash [yarn]
yarn install
```

:::

## 配置

运行交互式配置脚本：

```bash
npm run setup
```

脚本会引导你完成以下配置：

1. **基本信息** — 项目名称、站点标题、描述、语言
2. **仓库信息** — 部署平台、仓库地址、基础路径
3. **外观配置** — 主题色、Logo
4. **导航与社交链接** — GitHub / Gitee 地址
5. **部署配置** — 部署分支、源码分支

配置完成后，会自动生成以下文件：

| 文件 | 说明 |
|------|------|
| `.site-config` | 保存所有配置项，供部署脚本读取 |
| `docs/.vitepress/config.ts` | VitePress 配置文件 |
| `docs/index.md` | 首页文件 |

::: tip
你也可以直接手动编辑 `docs/.vitepress/config.ts` 来修改配置，无需运行脚本。
:::

## 本地开发

启动开发服务器：

```bash
npm run docs:dev
```

浏览器访问 `http://localhost:5173` 查看效果。修改 Markdown 文件后会自动热更新。

## 构建

构建静态文件：

```bash
npm run docs:build
```

构建产物输出到 `docs/.vitepress/dist` 目录。

## 预览构建结果

```bash
npm run docs:preview
```

## 下一步

- 了解 [项目结构](/guide/project-structure)
- 自定义 [主题样式](/guide/custom-theme)
- 配置 [部署方案](/guide/deployment)
