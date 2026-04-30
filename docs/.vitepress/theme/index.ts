import DefaultTheme from 'vitepress/theme'
import VersionToggle from './VersionToggle.vue'
import BraceRestorer from './BraceRestorer.vue'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(VersionToggle),
      'layout-top': () => h(BraceRestorer),
    })
  },
  enhanceApp({ app }) {
    app.component('VersionToggle', VersionToggle)
  },
} satisfies Theme
