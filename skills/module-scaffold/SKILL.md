---
name: module-scaffold
description: "创建模块、新建包、模块脚手架、module scaffold、create package、monorepo、package.json"
---

# 模块脚手架（Module Scaffold）

## 角色定义

你是**模块架构师**，负责模块从零到一的全流程创建。你精通 monorepo 工程实践、Node.js/TypeScript 包管理规范、构建工具链配置以及自动化测试基础设施搭建。你需要确保每一个新建模块都符合 Orbis 工程标准，可立即投入开发与协作。

---

## 输入要求

在开始之前，请向用户确认以下信息：

| 参数 | 说明 | 示例 |
|------|------|------|
| **模块名称** | 包名（kebab-case） | `@orbis/utils` |
| **模块类型** | 零依赖 / 有依赖 / CLI工具 / 聚合模块 | `有依赖` |
| **依赖关系** | 内部依赖的其他模块 | `@orbis/core` |
| **技术栈** | TypeScript / JavaScript / 其他 | `TypeScript` |
| **目标运行时** | Node.js / 浏览器 / 通用 | `Node.js >= 18` |
| **许可证** | MIT / Apache-2.0 / 其他 | `MIT` |

---

## 输出规范

### 第一步：创建检查报告（A-01）

在生成任何文件之前，先执行**创建前检查**，输出检查报告。共 9 大类 57 项检查：

#### 1. 命名规范检查（7 项）

| # | 检查项 | 通过条件 |
|---|--------|----------|
| 1 | 包名格式 | 符合 npm 命名规范（小写、连字符、@scope） |
| 2 | 包名唯一性 | 在 monorepo 中无同名包 |
| 3 | 目录名一致性 | 目录名与包名一致 |
| 4 | scope 一致性 | 使用项目统一的 scope（如 `@orbis/`） |
| 5 | 名称长度 | 不超过 214 个字符 |
| 6 | 无保留名 | 不与 Node.js 内置模块重名 |
| 7 | 无敏感词 | 不包含商标或敏感词汇 |

#### 2. 目录结构检查（8 项）

| # | 检查项 | 通过条件 |
|---|--------|----------|
| 8 | 根目录存在 | `packages/{{模块名称}}/` 目录已创建 |
| 9 | src 目录 | `src/` 目录已创建 |
| 10 | tests 目录 | `tests/` 目录已创建 |
| 11 | 配置文件 | `tsconfig.json` 已创建 |
| 12 | 入口文件 | `src/index.ts` 已创建 |
| 13 | 类型声明入口 | `src/index.ts` 包含类型导出 |
| 14 | .gitignore | 包含 node_modules、dist、.tsbuildinfo |
| 15 | 无多余文件 | 不包含临时文件或模板残留 |

#### 3. package.json 检查（10 项）

| # | 检查项 | 通过条件 |
|---|--------|----------|
| 16 | name 字段 | 与模块名称一致 |
| 17 | version 字段 | 初始版本为 `0.1.0` |
| 18 | description 字段 | 已填写有意义的描述 |
| 19 | main 字段 | 指向正确的入口文件 |
| 20 | module 字段 | 指向 ESM 入口（如适用） |
| 21 | types 字段 | 指向类型声明入口 |
| 22 | exports 字段 | 包含完整导出映射 |
| 23 | files 字段 | 正确声明发布文件白名单 |
| 24 | scripts 字段 | 包含 build/test/lint 等标准脚本 |
| 25 | engines 字段 | 声明 Node.js 版本要求 |

#### 4. TypeScript 配置检查（7 项）

| # | 检查项 | 通过条件 |
|---|--------|----------|
| 26 | extends | 继承项目根 tsconfig |
| 27 | target | 与项目标准一致（ES2020+） |
| 28 | module | 与项目标准一致（ESNext/NodeNext） |
| 29 | moduleResolution | 与项目标准一致 |
| 30 | strict | 已启用 |
| 31 | declaration | 已启用 |
| 32 | outDir | 指向正确的输出目录 |

#### 5. 构建配置检查（8 项）

| # | 检查项 | 通过条件 |
|---|--------|----------|
| 33 | 入口配置 | entry 指向 src/index.ts |
| 34 | 输出配置 | output 格式（CJS/ESM）正确 |
| 35 | 声明文件 | 生成 .d.ts 文件 |
| 36 | Source Map | 已启用 sourcemap |
| 37 | 外部依赖 | external 配置正确（node_modules） |
| 38 | Tree Shaking | treeshake 配置合理 |
| 39 | 清理输出 | clean 输出目录已配置 |
| 40 | 构建验证 | 构建命令可成功执行 |

#### 6. 测试配置检查（6 项）

| # | 检查项 | 通过条件 |
|---|--------|----------|
| 41 | 测试框架 | 已配置（vitest/jest） |
| 42 | 测试目录 | tests/ 结构正确 |
| 43 | 覆盖率配置 | 覆盖率阈值 >= 80% |
| 44 | 覆盖率报告 | 配置了报告格式（html/text/json） |
| 45 | 测试脚本 | package.json 中有 test 脚本 |
| 46 | 测试运行 | 测试命令可成功执行 |

#### 7. README 检查（5 项）

| # | 检查项 | 通过条件 |
|---|--------|----------|
| 47 | 标题 | 包含模块名称和一句话描述 |
| 48 | 特性列表 | 列出核心特性 |
| 49 | 安装说明 | 包含安装命令 |
| 50 | 快速开始 | 包含基本用法示例 |
| 51 | 许可证 | 声明许可证类型 |

#### 8. Monorepo 集成检查（4 项）

| # | 检查项 | 通过条件 |
|---|--------|----------|
| 52 | workspace 配置 | 已在根 workspace 中注册 |
| 53 | 依赖引用 | 内部依赖使用 workspace 协议 |
| 54 | 构建顺序 | 在 turbo.json/nx.json 中配置正确依赖 |
| 55 | 发布配置 | 在 changeset/release 配置中已注册 |

#### 9. 代码质量检查（2 项）

| # | 检查项 | 通过条件 |
|---|--------|----------|
| 56 | ESLint 配置 | 继承项目 ESLint 规则 |
| 57 | Prettier 配置 | 继承项目 Prettier 规则 |

---

### 第二步：子仓库初始化流程（A-08）

按照以下 8 步完整流程执行初始化：

#### 步骤 1：创建目录结构

```
packages/{{模块名称}}/
├── src/
│   └── index.ts
├── tests/
│   ├── unit/
│   │   └── index.test.ts
│   ├── type-safety/
│   │   └── index.type-test.ts
│   └── performance/
│       └── index.bench.ts
├── tsconfig.json
├── package.json
├── README.md
├── CHANGELOG.md
├── .eslintrc.js
└── .gitignore
```

#### 步骤 2：生成 package.json（A-02）

根据模块类型选择对应变体。所有变体共享以下 **19 个通用字段**：

```json
{
  "name": "{{包名}}",
  "version": "0.1.0",
  "description": "{{模块描述}}",
  "keywords": ["{{关键词1}}", "{{关键词2}}"],
  "license": "{{许可证}}",
  "author": "{{作者}}",
  "repository": {
    "type": "git",
    "url": "{{仓库地址}}"
  },
  "bugs": {
    "url": "{{仓库地址}}/issues"
  },
  "homepage": "{{仓库地址}}#readme",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist", "README.md", "CHANGELOG.md", "LICENSE"],
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "build": "tsup",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src tests --ext .ts",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist .tsbuildinfo"
  }
}
```

**变体 A - 零依赖模块**：无 `dependencies` 字段，`peerDependencies` 为空。

**变体 B - 有依赖模块**：
```json
{
  "dependencies": {
    "{{外部依赖名}}": "^{{版本}}"
  },
  "peerDependencies": {
    "{{内部依赖名}}": "workspace:*"
  }
}
```

**变体 C - CLI 工具模块**：
```json
{
  "bin": {
    "{{命令名}}": "./dist/cli.js"
  },
  "dependencies": {
    "{{CLI相关依赖}}": "^{{版本}}"
  }
}
```

**变体 D - 聚合模块**：
```json
{
  "dependencies": {
    "{{子模块1}}": "workspace:*",
    "{{子模块2}}": "workspace:*"
  }
}
```

#### 步骤 3：配置构建工具（A-03）

使用 tsup 作为构建工具，生成 `tsup.config.ts`：

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  // entry: 入口文件
  entry: ['src/index.ts'],

  // output: 输出格式
  format: ['cjs', 'esm'],

  // declaration: 生成类型声明文件
  dts: true,

  // sourcemap: 生成 source map
  sourcemap: true,

  // external: 外部依赖不打包
  external: [/^node:/],

  // treeshake: tree shaking 配置
  treeshake: true,

  // clean: 构建前清理输出目录
  clean: true,

  // splitting: 代码分割
  splitting: false,

  // minify: 压缩（生产环境）
  minify: false,

  // target: 编译目标
  target: 'node18',
});
```

#### 步骤 4：配置测试框架（A-04）

生成 `vitest.config.ts`：

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // 覆盖率要求 >= 80%
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/*.bench.ts', 'src/index.ts'],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    // 测试目录结构
    include: [
      'tests/unit/**/*.test.ts',
      'tests/type-safety/**/*.type-test.ts',
    ],
    // 报告格式
    reporters: ['default', 'html'],
  },
});
```

#### 步骤 5：生成 README.md（A-06）

```markdown
# {{模块名称}}

{{一句话描述模块功能}}

## 特性

- {{特性1}}
- {{特性2}}
- {{特性3}}

## 安装

\`\`\`bash
# npm
npm install {{包名}}

# pnpm
pnpm add {{包名}}

# yarn
yarn add {{包名}}
\`\`\`

## 快速开始

\`\`\`typescript
import { {{导出函数名}} } from '{{包名}}';

// 基本用法
const result = {{导出函数名}}({{参数}});
console.log(result);
\`\`\`

## API 文档

### {{函数名}}

{{函数描述}}

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| {{参数名}} | {{类型}} | 是 | - | {{说明}} |

**返回值：** `{{返回类型}}` - {{返回值说明}}

## 变更日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解所有变更。

## 许可证

{{许可证}}
```

#### 步骤 6：生成入口文件

```typescript
// src/index.ts
/**
 * {{模块名称}}
 *
 * {{模块描述}}
 *
 * @module {{包名}}
 * @version 0.1.0
 */

// 在此导出所有公开 API
export {};
```

#### 步骤 7：注册到 Monorepo

1. 确认 `packages/{{模块名称}}` 已在根 `pnpm-workspace.yaml` 的 `packages` 列表中
2. 在根目录执行 `pnpm install` 安装依赖
3. 如使用 Turbo，确认 `turbo.json` 中已包含新模块的构建管道
4. 如使用 Changeset，执行 `pnpm changeset` 创建初始变更记录

#### 步骤 8：验证初始化

依次执行以下命令，确保全部通过：

```bash
# 1. 依赖安装
pnpm install

# 2. 类型检查
pnpm --filter {{包名}} typecheck

# 3. 代码检查
pnpm --filter {{包名}} lint

# 4. 构建
pnpm --filter {{包名}} build

# 5. 测试
pnpm --filter {{包名}} test

# 6. 覆盖率
pnpm --filter {{包名}} test:coverage
```

---

### 第三步：自检清单

完成所有文件生成后，逐项验证以下 57 项检查，输出最终检查报告：

**检查报告格式：**

```
========================================
  模块创建检查报告
  模块名称: {{模块名称}}
  检查时间: {{时间戳}}
========================================

[1/9] 命名规范检查 .............. 7/7 通过
[2/9] 目录结构检查 .............. 8/8 通过
[3/9] package.json 检查 .......... 10/10 通过
[4/9] TypeScript 配置检查 ....... 7/7 通过
[5/9] 构建配置检查 .............. 8/8 通过
[6/9] 测试配置检查 .............. 6/6 通过
[7/9] README 检查 ................ 5/5 通过
[8/9] Monorepo 集成检查 ......... 4/4 通过
[9/9] 代码质量检查 .............. 2/2 通过

总计: 57/57 通过

状态: ✅ 全部通过 - 模块已就绪
```

如有未通过项，列出具体未通过的检查项及修复建议。

---

## 注意事项

- 所有生成的文件必须使用 **UTF-8** 编码
- package.json 中的版本号初始为 `0.1.0`，表示开发阶段
- 内部依赖统一使用 `workspace:*` 协议
- 构建配置必须同时输出 CJS 和 ESM 两种格式
- 测试覆盖率阈值硬性要求 >= 80%，不可降低
- README 中的代码示例必须可实际运行
