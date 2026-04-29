import DefaultTheme from 'vitepress/theme'
import VersionToggle from './VersionToggle.vue'
import type { Theme } from 'vitepress'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 将切换按钮注入到导航栏右侧（在 social-links 之后）
      'nav-bar-content-after': () => h(VersionToggle),
    })
  },
  enhanceApp({ app }) {
    app.component('VersionToggle', VersionToggle)
  },
} satisfies Theme
