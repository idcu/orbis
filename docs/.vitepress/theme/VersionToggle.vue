<script setup>
import { computed } from 'vue'
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { frontmatter: fm } = useData()

const currentPath = computed(() => route.path)

// 是否在模板详情页中（仅在 simple/full 子路径下显示切换按钮）
const showToggle = computed(() => {
  const path = currentPath.value
  return path.includes('/simple/') || path.includes('/full/')
})

// 判断当前处于哪个版本
const isFull = computed(() => currentPath.value.includes('/full/'))

// 当前版本名
const currentVersion = computed(() => isFull.value ? '完整版' : '精简版')

// 切换链接：在模板页面中同步跳转，在首页/目录页跳转到对应目录首页
const toggleLink = computed(() => {
  const path = currentPath.value
  if (path.includes('/simple/')) {
    return path.replace('/simple/', '/full/')
  } else if (path.includes('/full/')) {
    return path.replace('/full/', '/simple/')
  }
  // 首页或其他页面：跳转到精简版目录首页
  return '/simple/'
})

const toggleLabel = computed(() => {
  return isFull.value ? '📌 切换到精简版' : '📋 切换到完整版'
})

const toggleIcon = computed(() => {
  return isFull.value ? '📌' : '📋'
})
</script>

<template>
  <a
    v-if="showToggle"
    :href="toggleLink"
    class="version-toggle"
    :title="toggleLabel"
  >
    <span class="icon">{{ toggleIcon }}</span>
    <span class="label">{{ toggleLabel }}</span>
  </a>
</template>

<style scoped>
.version-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  white-space: nowrap;
  line-height: 1.4;
}

.version-toggle:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(62, 175, 124, 0.3);
  transform: translateY(-1px);
}

.icon {
  font-size: 15px;
  line-height: 1;
}

.label {
  line-height: 1;
}

@media (max-width: 768px) {
  .version-toggle {
    padding: 4px 10px;
    font-size: 12px;
  }
}
</style>
