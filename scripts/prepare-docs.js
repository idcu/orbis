/**
 * prepare-docs.js
 * 
 * 将精简版/和完整版/中的模板文件复制到 docs/ 目录下，
 * 并对代码块外的 {{ }} 进行 HTML 实体转义，避免 VitePress (Vue) 误解析。
 * 
 * 源文件（精简版/、完整版/）不会被修改。
 */

import { cpSync, mkdirSync, rmSync, existsSync, readdirSync, statSync, readFileSync, writeFileSync } from 'fs'
import { join, relative, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DOCS_DIR = join(ROOT, 'docs')
const SOURCE_DIRS = ['精简版', '完整版']

// 清理 docs 下的旧文件（保留 .vitepress、public 和手动创建的 index.md）
function cleanDocsContent() {
  for (const dir of SOURCE_DIRS) {
    const target = join(DOCS_DIR, dir)
    if (existsSync(target)) {
      // 保留手动创建的 index.md
      const indexPath = join(target, 'index.md')
      if (existsSync(indexPath)) {
        const content = readFileSync(indexPath, 'utf-8')
        rmSync(target, { recursive: true })
        mkdirSync(target, { recursive: true })
        writeFileSync(indexPath, content, 'utf-8')
      } else {
        rmSync(target, { recursive: true })
      }
    }
  }
}

// 处理单个文件：将所有 {{ 和 }} 替换为全角花括号
// 全角花括号（U+FF5B ｛ / U+FF5D ）视觉上与半角几乎一样，但 Vue 不会解析
const FULL_LBRACE = '\uFF5B'  // ｛
const FULL_RBRACE = '\uFF5D'  // ｝

function processFileContent(content) {
  return content
    .replace(/\{\{/g, `${FULL_LBRACE}${FULL_LBRACE}`)
    .replace(/\}\}/g, `${FULL_RBRACE}${FULL_RBRACE}`)
}

// 递归复制并处理目录
function processDirectory(srcDir, targetDir) {
  mkdirSync(targetDir, { recursive: true })

  for (const entry of readdirSync(srcDir)) {
    const srcPath = join(srcDir, entry)
    const targetPath = join(targetDir, entry)
    const stat = statSync(srcPath)

    if (stat.isDirectory()) {
      processDirectory(srcPath, targetPath)
    } else if (entry.endsWith('.md')) {
      const content = readFileSync(srcPath, 'utf-8')
      const processed = processFileContent(content)
      writeFileSync(targetPath, processed, 'utf-8')
    } else {
      cpSync(srcPath, targetPath)
    }
  }
}

// 主流程
function main() {
  console.log('📦 准备文档站内容...')

  // 1. 清理旧内容
  cleanDocsContent()

  // 2. 复制并处理每个源目录
  for (const dir of SOURCE_DIRS) {
    const srcDir = join(ROOT, dir)
    const targetDir = join(DOCS_DIR, dir)
    console.log(`  处理 ${dir}/ ...`)
    processDirectory(srcDir, targetDir)
  }

  console.log('✅ 文档站内容准备完成')
}

main()
