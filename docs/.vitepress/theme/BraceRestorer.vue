<script setup>
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const restore = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null)
  const nodes = []
  while (walker.nextNode()) {
    const n = walker.currentNode
    if (n.textContent && (n.textContent.includes('\uFF5B') || n.textContent.includes('\uFF5D'))) {
      nodes.push({ node: n, text: n.textContent })
    }
  }
  for (const { node, text } of nodes) {
    const r = text.replace(/\uFF5B\uFF5B/g, '{{').replace(/\uFF5D\uFF5D/g, '}}')
    if (r !== text) node.textContent = r
  }
}

onMounted(() => {
  nextTick(() => restore())
  watch(() => route.path, () => nextTick(() => setTimeout(restore, 100)))
})
</script>

<template></template>
