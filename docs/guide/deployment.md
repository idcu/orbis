# 部署指南

本文档介绍如何将文档站部署到各个平台。

## 部署前准备

1. 确保已完成 [交互式配置](/guide/getting-started#配置)：`npm run setup`
2. 确保本地构建通过：`npm run docs:build`
3. 确认 `base` 路径与部署目标匹配

## Gitee Pages

### 方式一：脚本部署（推荐）

```bash
npm run deploy:gitee
```

脚本会自动：
1. 构建文档
2. 将构建产物推送到 `gitee-pages` 分支

### 方式二：手动部署

```bash
# 1. 构建
npm run docs:build

# 2. 推送到 gitee-pages 分支
git subtree push --prefix=docs/.vitepress/dist origin gitee-pages
```

### Gitee 后台配置

1. 进入 Gitee 仓库 → **服务** → **Gitee Pages**
2. 部署分支选择 `gitee-pages`
3. 部署目录选择 `/`
4. 点击 **启动**

::: warning
Gitee Pages 需要实名认证。部署后访问地址为 `https://<用户名>.gitee.io/<仓库名>/`。
:::

## GitHub Pages

### 方式一：脚本部署

```bash
npm run deploy:gh-pages
```

### 方式二：GitHub Actions 自动部署

模板已内置 `.github/workflows/deploy.yml`，推送到 `master` 分支后自动触发部署。

**使用步骤：**

1. Fork 或创建 GitHub 仓库
2. 在仓库 **Settings → Pages** 中，Source 选择 **GitHub Actions**
3. 推送代码到 `master` 分支
4. 等待 Actions 构建完成

### 手动部署

```bash
# 构建
npm run docs:build

# 推送到 gh-pages 分支
git subtree push --prefix=docs/.vitepress/dist origin gh-pages
```

## Vercel

1. 在 [Vercel](https://vercel.com) 导入 GitHub / Gitee 仓库
2. 配置：
   - **Framework Preset**: VitePress
   - **Build Command**: `npm run docs:build`
   - **Output Directory**: `docs/.vitepress/dist`
3. `base` 设置为 `/`

## Netlify

1. 在 [Netlify](https://netlify.com) 导入仓库
2. 配置：
   - **Build Command**: `npm run docs:build`
   - **Publish Directory**: `docs/.vitepress/dist`
3. `base` 设置为 `/`

## CI/CD 自动部署

### GitHub Actions（内置）

模板已包含 `.github/workflows/deploy.yml`：

```yaml
name: Deploy VitePress to GitHub Pages
on:
  push:
    branches: [master]
  workflow_dispatch:
# ...
```

### GitLab CI

```yaml
# .gitlab-ci.yml
pages:
  script:
    - npm ci
    - npm run docs:build
  artifacts:
    paths:
      - docs/.vitepress/dist
  only:
    - master
```

## 部署检查清单

- [ ] `base` 路径与部署目标匹配
- [ ] 本地构建成功（`npm run docs:build`）
- [ ] 本地预览正常（`npm run docs:preview`）
- [ ] 资源文件（Logo、图片）正常加载
- [ ] 搜索功能正常
- [ ] 导航链接正确

## 常见问题

### 资源 404

通常是 `base` 路径配置不正确。检查 `config.ts` 中的 `base` 是否与实际部署路径匹配。

### 样式丢失

同上，检查 `base` 路径。

### Gitee Pages 更新延迟

Gitee Pages 有时需要手动在后台重新部署，或等待几分钟生效。
