import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    // 在此处注册自定义组件
    // app.component('CustomBadge', CustomBadge)
  },
  setup() {
    // 在此处添加分析脚本（如 Google Analytics）
    // if (typeof window !== 'undefined') { ... }
  },
} satisfies Theme
