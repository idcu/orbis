# 常见问题

## 安装相关

### Node.js 版本要求？

需要 Node.js >= 18。推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理版本。

### npm install 失败？

尝试以下方案：

```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install
```

## 配置相关

### 修改配置后没有生效？

- 开发模式（`docs:dev`）会自动热更新配置
- 如果没有生效，尝试重启开发服务器

### 如何修改 Logo？

1. 将 Logo 文件放入 `docs/public/` 目录
2. 修改 `config.ts` 中的 `logo` 路径

```typescript
themeConfig: {
  logo: '/your-logo.svg',
}
```

## 部署相关

### Gitee Pages 资源 404？

检查 `config.ts` 中的 `base` 配置：

```typescript
// 错误 ❌
base: '/'

// 正确 ✅（仓库名为 my-docs 时）
base: '/my-docs/'
```

### GitHub Pages 部署失败？

1. 检查仓库 **Settings → Pages** 中 Source 是否选择了 **GitHub Actions**
2. 检查 Actions 是否有权限（需要 `pages: write` 和 `id-token: write`）
3. 查看 Actions 运行日志排查具体错误

### 如何更新已部署的文档？

- **脚本部署**：修改文档后重新运行 `npm run deploy:gitee` 或 `npm run deploy:gh-pages`
- **CI/CD 部署**：推送代码到 `master` 分支，自动触发构建和部署

## 其他

### 如何添加自定义域名？

1. 在域名服务商配置 DNS 解析（CNAME 指向平台域名）
2. 在部署平台配置自定义域名
3. 修改 `config.ts` 中的 `base` 为 `/`

### 如何启用 HTTPS？

Gitee Pages 和 GitHub Pages 默认支持 HTTPS。自定义域名需要在平台配置 SSL 证书。
