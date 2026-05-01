# 搜索配置

本模板默认使用 VitePress 内置的本地搜索，无需任何第三方服务。

## 本地搜索（默认）

本地搜索在构建时生成索引，支持中文分词。

### 配置

```typescript
themeConfig: {
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
}
```

### 排除页面

某些页面（如更新日志、404）可以排除在搜索索引之外：

```typescript
search: {
  provider: 'local',
  options: {
    exclude: [
      '/changelog',
      '/contributing',
      '/404.html',
    ],
  },
}
```

### 分词优化

```typescript
search: {
  provider: 'local',
  options: {
    miniSearch: {
      options: {
        prefix: true,   // 前缀匹配
        fuzzy: true,    // 模糊匹配
      },
    },
  },
}
```

## Algolia 搜索（备选）

如果文档量很大，可以使用 Algolia 提供更好的搜索体验：

```typescript
search: {
  provider: 'algolia',
  options: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
    indexName: 'YOUR_INDEX_NAME',
  },
}
```

::: tip
对于大多数项目，本地搜索已经足够。只有在文档量超过 1000 页时才建议考虑 Algolia。
:::
