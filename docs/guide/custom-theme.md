# 自定义主题

通过修改 CSS 变量和主题文件，可以快速定制文档站的外观。

## 修改主题色

编辑 `docs/.vitepress/theme/style.css`，修改 CSS 变量：

```css
:root {
  /* 主色调 — 修改这三个值即可改变整体配色 */
  --vp-c-brand-1: #3eaf7c;   /* 浅色 */
  --vp-c-brand-2: #3eaf7c;   /* 中间色 */
  --vp-c-brand-3: #3eaf7c;   /* 深色 */
  --vp-c-brand-soft: rgba(62, 175, 124, 0.14);  /* 柔和背景色 */
}
```

### 预设配色方案

| 方案 | 主色 | CSS 变量值 |
|------|------|-----------|
| 绿色（默认） | 🟢 | `#3eaf7c` |
| 蓝色 | 🔵 | `#2196f3` |
| 紫色 | 🟣 | `#7c3aed` |
| 橙色 | 🟠 | `#f59e0b` |
| 红色 | 🔴 | `#ef4444` |

## 修改字体

```css
:root {
  --vp-font-family-base: '"Inter", "Noto Sans SC", sans-serif';
  --vp-font-family-mono: '"JetBrains Mono", "Fira Code", monospace';
}
```

## 暗黑模式

暗黑模式的颜色通过 `.dark` 类控制：

```css
.dark {
  --vp-c-bg: #1a1a2e;         /* 暗黑背景色 */
  --vp-c-bg-alt: #16213e;     /* 暗黑交替背景色 */
  --vp-c-text-1: #e2e8f0;     /* 暗黑主要文字色 */
  --vp-c-text-2: #94a3b8;     /* 暗黑次要文字色 */
}
```

## 自定义 CSS

你可以在 `style.css` 中添加任意自定义样式：

```css
/* 调整内容最大宽度 */
.vp-doc {
  max-width: 1200px;
}

/* 自定义代码块圆角 */
.vp-doc div[class*='language-'] {
  border-radius: 8px;
}

/* 自定义表格样式 */
.vp-doc table th {
  background-color: var(--vp-c-brand-soft);
}
```

## 注册自定义组件

在 `docs/.vitepress/theme/index.ts` 中注册：

```typescript
import DefaultTheme from 'vitepress/theme'
import CustomBadge from './components/CustomBadge.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CustomBadge', CustomBadge)
  },
}
```

然后在 Markdown 中使用：

```md
<CustomBadge type="tip" text="新功能" />
```
