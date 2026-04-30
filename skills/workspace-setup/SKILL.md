---
name: workspace-setup
description: "工作区配置、monorepo配置、根仓库初始化、workspace setup、pnpm workspace、Git钩子、husky、commitlint"
---

# 工作区配置 Skill

## 角色定义

你是 **工程化架构师**，精通 Monorepo 工作区架构设计与工程化基础设施搭建。你能够根据项目结构和技术栈，生成完整的工作区配置、根仓库配置、Git 钩子和共享脚本，确保多包项目的开发体验和工程规范。

---

## 输入收集

在开始生成配置之前，请确认以下信息：

| 字段 | 说明 | 示例 |
|------|------|------|
| **项目名称** | 项目/工作区名称 | `my-monorepo` |
| **项目结构** | 工作区包含的包类型 | `应用 + 库 + 工具` |
| **包管理器** | 使用的包管理器 | `pnpm` / `npm` / `yarn` |
| **构建工具** | 使用的构建工具 | `tsup` / `vite` / `rollup` / `tsc` |
| **代码规范工具** | 使用的 lint/format 工具 | `eslint + prettier` |
| **测试框架** | 使用的测试框架 | `vitest` / `jest` |
| **Node.js 版本** | 运行时版本要求 | `18.x / 20.x` |
| **Git 平台** | 使用的 Git 托管平台 | `GitHub` / `GitLab` |

> 如果用户未提供某些字段，请根据已有信息合理推断，并在配置中标注 `{{待确认}}`。

---

## 输出规范一：工作区配置（B-08）

### 1. 工作区定义

```yaml
# pnpm-workspace.yaml
packages:
  # === 应用层 ===
  - "apps/*"
  - "apps/**/packages/*"

  # === 库层 ===
  - "packages/*"
  - "packages/**/packages/*"

  # === 工具层 ===
  - "tools/*"

  # === 模板层 ===
  - "templates/*"

  # === 排除规则 ===
  - "!**/test/**"
  - "!**/__tests__/**"
  - "!**/dist/**"
  - "!**/node_modules/**"
  - "!**/.trae/**"
```

**分层说明**：

| 层级 | 目录 | 职责 | 发布方式 |
|------|------|------|----------|
| **应用层** | `apps/*` | 可部署的应用（Web/CLI/Server） | 独立部署 |
| **库层** | `packages/*` | 可复用的业务/工具库 | 发布到 npm |
| **工具层** | `tools/*` | 开发工具（脚本/生成器） | 不发布 |
| **模板层** | `templates/*` | 项目模板/脚手架 | 不发布 |

---

### 2. 目录协议 catalog（版本对齐）

```json
// package.json（根目录）
{
  "pnpm": {
    "catalog": {
      "default": "{{默认版本，如^1.0.0}}",
      "dev": "{{开发依赖版本，如workspace:*}}",
      "peer": "{{对等依赖版本，如^18.0.0}}",
      "react": "{{React版本，如^18.2.0}}",
      "typescript": "{{TypeScript版本，如^5.3.0}}",
      "vitest": "{{Vitest版本，如^1.0.0}}",
      "eslint": "{{ESLint版本，如^8.56.0}}",
      "prettier": "{{Prettier版本，如^3.2.0}}",
      "tsup": "{{tsup版本，如^8.0.0}}",
      "vite": "{{Vite版本，如^5.0.0}}"
    },
    "catalogs": {
      "react18": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "@types/react": "^18.2.0",
        "@types/react-dom": "^18.2.0"
      },
      "react19": {
        "react": "^19.0.0",
        "react-dom": "^19.0.0",
        "@types/react": "^19.0.0",
        "@types/react-dom": "^19.0.0"
      },
      "node": {
        "typescript": "^5.3.0",
        "tsup": "^8.0.0",
        "vitest": "^1.0.0"
      },
      "testing": {
        "vitest": "^1.0.0",
        "@vitest/coverage-v8": "^1.0.0",
        "happy-dom": "^13.0.0"
      }
    }
  }
}
```

**目录协议使用示例**：

```json
// packages/utils/package.json
{
  "dependencies": {
    "lodash-es": "catalog:default"
  },
  "devDependencies": {
    "typescript": "catalog:",
    "vitest": "catalog:testing",
    "@vitest/coverage-v8": "catalog:testing"
  },
  "peerDependencies": {
    "react": "catalog:react18"
  }
}

// apps/web/package.json
{
  "dependencies": {
    "react": "catalog:react18",
    "react-dom": "catalog:react18",
    "@{{组织名}}/utils": "workspace:*"
  },
  "devDependencies": {
    "typescript": "catalog:",
    "vite": "catalog:"
  }
}
```

---

### 3. 工作区行为配置

```yaml
# .npmrc（根目录）
# === 注册表配置 ===
registry={{包注册表URL，默认https://registry.npmmirror.com}}

# === 代理配置（可选） ===
# proxy={{代理地址}}
# https-proxy={{代理地址}}

# === 工作区行为 ===
link-workspace-packages=true
save-workspace-protocol=true
shared-workspace-lockfile=true

# === 严格模式 ===
strict-peer-dependencies=false
auto-install-peers=true

# === 钩子 ===
manage-package-manager-versions=true
package-import-method=hardlink

# === 构建行为 ===
shamefully-hoist=false
public-hoist-pattern[]=*eslint*
public-hoist-pattern[]=*prettier*
public-hoist-pattern[]=*typescript*

# === 保存行为 ===
save-exact=true
save-prefix=
```

---

### 4. 嵌套工作区结构

```
{{项目名称}}/
├── apps/                          # 应用层
│   ├── web/                       # Web 应用
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── cli/                       # CLI 工具
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsup.config.ts
│   └── docs/                      # 文档站
│       ├── docs/
│       ├── package.json
│       └── .vitepress/config.ts
├── packages/                      # 库层
│   ├── core/                      # 核心库
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsup.config.ts
│   ├── ui/                        # UI 组件库
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsup.config.ts
│   ├── utils/                     # 工具函数库
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsup.config.ts
│   └── config/                    # 共享配置
│       ├── src/
│       ├── package.json
│       └── tsup.config.ts
├── tools/                         # 工具层
│   ├── scripts/                   # 共享脚本
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsup.config.ts
│   ├── generators/                # 代码生成器
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsup.config.ts
│   └── release/                   # 发布工具
│       ├── src/
│       ├── package.json
│       └── tsup.config.ts
├── templates/                     # 模板层
│   ├── react-app/                 # React 应用模板
│   ├── node-lib/                  # Node.js 库模板
│   └── cli-tool/                  # CLI 工具模板
├── .trae/                         # Trae 配置
│   └── skills/
├── .github/                       # GitHub 配置
│   ├── workflows/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
├── docs/                          # 项目文档
├── pnpm-workspace.yaml            # 工作区定义
├── package.json                   # 根 package.json
├── tsconfig.json                  # 根 TypeScript 配置
├── turbo.json                     # Turborepo 配置（可选）
├── .editorconfig                  # 编辑器配置
├── .gitignore                     # Git 忽略规则
├── .npmrc                         # 包管理器配置
├── .prettierrc                    # Prettier 配置
├── .eslintrc.js                   # ESLint 配置
├── commitlint.config.js           # 提交信息规范
└── CHANGELOG.md                   # 变更日志
```

---

## 输出规范二：根仓库配置（B-09）

### 配置文件 1：根 package.json

```json
{
  "name": "{{项目名称}}",
  "version": "0.0.0",
  "private": true,
  "description": "{{项目描述}}",
  "packageManager": "pnpm@{{pnpm版本}}",
  "engines": {
    "node": ">={{Node.js最低版本}}",
    "pnpm": ">={{pnpm最低版本}}"
  },
  "scripts": {
    "=== 开发命令 ===": "",
    "dev": "turbo dev --parallel",
    "dev:web": "turbo dev --filter=@{{组织名}}/web",
    "dev:cli": "turbo dev --filter=@{{组织名}}/cli",
    "dev:docs": "turbo dev --filter=@{{组织名}}/docs",

    "=== 构建命令 ===": "",
    "build": "turbo build",
    "build:force": "turbo build --force",
    "build:apps": "turbo build --filter='./apps/*'",
    "build:packages": "turbo build --filter='./packages/*'",
    "build:watch": "turbo build --watch",

    "=== 测试命令 ===": "",
    "test": "turbo test",
    "test:watch": "turbo test --watch",
    "test:coverage": "turbo test:coverage",
    "test:ui": "vitest --ui",
    "test:e2e": "turbo e2e",
    "test:ci": "vitest run --coverage",

    "=== 代码质量 ===": "",
    "lint": "turbo lint",
    "lint:fix": "turbo lint --fix",
    "lint:style": "turbo lint:style",
    "lint:style:fix": "turbo lint:style --fix",
    "typecheck": "turbo typecheck",
    "format": "prettier --write .",
    "format:check": "prettier --check .",

    "=== 发布命令 ===": "",
    "changeset": "changeset",
    "version": "changeset version",
    "release": "turbo build --filter='./packages/*' && changeset publish",
    "release:preview": "changeset pre enter",
    "release:exit": "changeset pre exit",

    "=== 清理命令 ===": "",
    "clean": "turbo clean && rm -rf node_modules",
    "clean:dist": "turbo clean",
    "clean:cache": "rm -rf .turbo node_modules/.cache",

    "=== 工具命令 ===": "",
    "prepare": "husky",
    "check-deps": "tsx tools/scripts/src/check-deps.ts",
    "sync-versions": "tsx tools/scripts/src/sync-versions.ts",
    "build-all": "tsx tools/scripts/src/build-all.ts",
    "test-all": "tsx tools/scripts/src/test-all.ts",
    "publish:packages": "tsx tools/scripts/src/publish.ts",
    "size-check": "turbo size-check",
    "docs:build": "turbo docs:build",
    "docs:deploy": "turbo docs:deploy"
  },
  "devDependencies": {
    "@changesets/cli": "catalog:",
    "@commitlint/cli": "catalog:",
    "@commitlint/config-conventional": "catalog:",
    "@{{组织名}}/eslint-config": "workspace:*",
    "@{{组织名}}/tsconfig": "workspace:*",
    "eslint": "catalog:",
    "husky": "catalog:",
    "lint-staged": "catalog:",
    "prettier": "catalog:",
    "tsx": "catalog:",
    "turbo": "catalog:",
    "typescript": "catalog:",
    "vitest": "catalog:"
  }
}
```

---

### 配置文件 2：构建配置基座

```json
// packages/config/tsconfig/base.json
{
  "compilerOptions": {
    "=== 入口/输出 ===": "",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,

    "=== 外部依赖 ===": "",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,

    "=== 别名 ===": "",
    "baseUrl": ".",
    "paths": {
      "@{{组织名}}/*": ["./src/*"]
    },

    "=== 严格模式 ===": "",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,

    "=== JSX ===": "",
    "jsx": "react-jsx",

    "=== 增量编译 ===": "",
    "incremental": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.tsbuildinfo"
  },
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.bench.ts"]
}
```

```json
// packages/config/tsconfig/react.json
{
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["ES2022", "DOM", "DOM.Iterable"]
  }
}
```

```json
// packages/config/tsconfig/node.json
{
  "extends": "./base.json",
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "types": ["node"]
  }
}
```

---

### 配置文件 3：代码检查配置

```javascript
// packages/config/eslint/index.js
module.exports = {
  root: true,

  // === 插件 ===
  plugins: [
    '@typescript-eslint',
    'import',
    'unused-imports',
    'react',
    'react-hooks',
    'jsdoc',
  ],

  // === 语言选项 ===
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },

  // === 继承规则 ===
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],

  // === 规则 ===
  rules: {
    // TypeScript
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_' },
    ],

    // Import
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'type',
        ],
        'newlines-between': 'never',
        alphabetize: { order: 'asc' },
      },
    ],
    'import/no-cycle': 'error',
    'import/no-duplicates': 'error',
    'import/no-self-import': 'error',

    // React
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // 通用
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
  },

  // === 覆盖规则 ===
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['**/scripts/**', 'tools/**'],
      rules: {
        'no-console': 'off',
      },
    },
  ],

  // === 忽略规则 ===
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.js',
    '*.mjs',
    '*.cjs',
    '.turbo/',
    'coverage/',
  ],

  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect',
    },
  },
};
```

---

### 配置文件 4：.editorconfig

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[*.{json,yml,yaml}]
indent_size = 2

[Makefile]
indent_style = tab

[*.py]
indent_size = 4

[*.go]
indent_style = tab
indent_size = 4

[*.rs]
indent_size = 4

[*.dart]
indent_size = 2
```

---

### 配置文件 5：包管理器配置

```ini
# .npmrc（根目录）
# === 注册表 ===
registry={{包注册表URL，默认https://registry.npmmirror.com}}

# === 代理（可选） ===
# proxy={{代理地址}}
# https-proxy={{代理地址}}

# === 行为 ===
link-workspace-packages=true
save-workspace-protocol=true
shared-workspace-lockfile=true
strict-peer-dependencies=false
auto-install-peers=true
save-exact=true
save-prefix=

# === 提升 ===
shamefully-hoist=false
public-hoist-pattern[]=*eslint*
public-hoist-pattern[]=*prettier*
public-hoist-pattern[]=*typescript*

# === 钩子 ===
manage-package-manager-versions=true
package-import-method=hardlink
```

---

### 配置文件 6：产物大小限制

```javascript
// size-limit.config.js
module.exports = [
  {
    name: '{{包名}} - 核心包',
    path: 'packages/core/dist/index.mjs',
    limit: '{{大小限制，如10KB}}',
  },
  {
    name: '{{包名}} - UI 组件库',
    path: 'packages/ui/dist/index.mjs',
    limit: '{{大小限制，如50KB}}',
  },
  {
    name: '{{包名}} - 工具函数库',
    path: 'packages/utils/dist/index.mjs',
    limit: '{{大小限制，如5KB}}',
  },
  {
    name: '{{包名}} - Web 应用',
    path: 'apps/web/dist/assets/*.js',
    limit: '{{大小限制，如200KB}}',
    webpack: false,
  },
];
```

```json
// package.json 中对应脚本
{
  "scripts": {
    "size-check": "size-limit",
    "size-check:json": "size-limit --json"
  },
  "devDependencies": {
    "@size-limit/preset-small-lib": "catalog:",
    "size-limit": "catalog:"
  }
}
```

---

### 配置文件 7：.gitignore

```gitignore
# === 依赖 ===
node_modules/
.pnpm-store/
.pnpm-debug.log

# === 构建产物 ===
dist/
*.tsbuildinfo
.turbo/

# === 测试 ===
coverage/
test-results/
playwright-report/
.nyc_output/

# === 编辑器 ===
.vscode/
!.vscode/extensions.json
!.vscode/settings.json
!.vscode/tasks.json
.idea/
*.swp
*.swo
*~

# === 操作系统 ===
.DS_Store
Thumbs.db

# === 环境变量 ===
.env
.env.local
.env.*.local
!.env.example

# === 日志 ===
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*

# === 临时文件 ===
*.tmp
*.temp
.cache/
.tmp/

# === 包管理器 ===
.yarn/
.yarnrc.yml
.pnp.*

# === 发布 ===
*.tgz

# === 其他 ===
.vercel/
.netlify/
```

---

## 输出规范三：Git 钩子配置（B-05）

### 钩子 1：pre-commit（暂存文件检查）

```javascript
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

```json
// package.json 中的 lint-staged 配置
{
  "lint-staged": {
    "*.{ts,tsx,mts,cts}": [
      "eslint --fix --max-warnings 0",
      "prettier --write"
    ],
    "*.{js,jsx,mjs,cjs}": [
      "eslint --fix --max-warnings 0",
      "prettier --write"
    ],
    "*.{json,yml,yaml,md,mdx}": [
      "prettier --write"
    ],
    "*.{css,scss,less}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.{html,vue,svelte}": [
      "eslint --fix --max-warnings 0",
      "prettier --write"
    ],
    "package.json": [
      "pnpm sort-package-json"
    ]
  }
}
```

**检查内容**：

| 检查项 | 工具 | 说明 |
|--------|------|------|
| ESLint | `eslint --fix` | 代码规范检查与自动修复 |
| Prettier | `prettier --write` | 代码格式化 |
| Stylelint | `stylelint --fix` | 样式规范检查 |
| sort-package-json | `sort-package-json` | package.json 字段排序 |

---

### 钩子 2：commit-msg（提交信息验证）

```javascript
// .husky/commit-msg
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit "$1"
```

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 类型枚举
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复 Bug
        'docs',     // 文档变更
        'style',    // 代码格式（不影响功能）
        'refactor', // 重构（不新增功能、不修复 Bug）
        'perf',     // 性能优化
        'test',     // 测试相关
        'build',    // 构建系统或外部依赖
        'ci',       // CI 配置
        'chore',    // 其他不修改源码的变更
        'revert',   // 回滚
      ],
    ],
    // type 不能为空
    'type-empty': [2, 'never'],
    // subject 不能为空
    'subject-empty': [2, 'never'],
    // subject 最大长度
    'subject-max-length': [2, 'always', {{最大长度，默认100}}],
    // subject 不能以句号结尾
    'subject-full-stop': [2, 'never', '.'],
    // body 每行最大长度
    'body-max-line-length': [2, 'always', {{最大长度，默认100}}],
    // footer 每行最大长度
    'footer-max-line-length': [2, 'always', {{最大长度，默认100}}],
    // scope 枚举（可选）
    'scope-enum': [
      1,
      'always',
      [
        'core',
        'ui',
        'utils',
        'config',
        'web',
        'cli',
        'docs',
        'deps',
      ],
    ],
    // scope 可以为空
    'scope-empty': [1, 'never'],
  },
};
```

**Conventional Commits 格式**：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**示例**：

```
feat(ui): 新增 Button 组件

- 支持 primary/secondary/danger 三种变体
- 支持自定义尺寸
- 添加单元测试

Closes #123
```

---

### 钩子 3：pre-push（推送前验证）

```javascript
// .husky/pre-push
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 1. 检查是否有未提交的变更
if [ -n "$(git status --porcelain)" ]; then
  echo "错误：存在未提交的变更，请先提交后再推送。"
  echo ""
  echo "未提交的文件："
  git status --porcelain
  exit 1
fi

# 2. 运行类型检查
echo "正在运行类型检查..."
pnpm typecheck
if [ $? -ne 0 ]; then
  echo "错误：类型检查失败，请修复后再推送。"
  exit 1
fi

# 3. 运行测试
echo "正在运行测试..."
pnpm test:ci
if [ $? -ne 0 ]; then
  echo "错误：测试失败，请修复后再推送。"
  exit 1
fi

echo "推送前检查通过！"
```

**检查内容**：

| 检查项 | 说明 | 失败处理 |
|--------|------|----------|
| 未提交变更 | 确保工作区干净 | 阻止推送 |
| 类型检查 | 确保类型正确 | 阻止推送 |
| 测试通过 | 确保测试全部通过 | 阻止推送 |

---

## 输出规范四：共享脚本（B-06）

### 脚本 1：check-deps（依赖方向检查）

```typescript
// tools/scripts/src/check-deps.ts
#!/usr/bin/env tsx
/**
 * 依赖方向检查脚本
 * 防止循环依赖，确保依赖方向正确
 *
 * 依赖方向规则：
 *   应用层 → 库层 → 工具层
 *   禁止反向依赖
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { parse } from 'jsonc-parser';

interface PackageInfo {
  name: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

// === 配置 ===
const WORKSPACE_ROOT = process.cwd();
const ORG_SCOPE = '{{组织名}}'; // 如 @myorg

// === 依赖层级定义 ===
const LAYERS = {
  apps: { order: 3, name: '应用层', path: 'apps' },
  packages: { order: 2, name: '库层', path: 'packages' },
  tools: { order: 1, name: '工具层', path: 'tools' },
  templates: { order: 0, name: '模板层', path: 'templates' },
} as const;

// === 获取所有工作区包 ===
function getWorkspacePackages(): Map<string, PackageInfo & { layer: string; order: number }> {
  const packages = new Map<string, PackageInfo & { layer: string; order: number }>();

  for (const [layer, config] of Object.entries(LAYERS)) {
    const layerDir = join(WORKSPACE_ROOT, config.path);
    if (!existsSync(layerDir)) continue;

    const dirs = readdirSync(layerDir, { withFileTypes: true });
    for (const dir of dirs) {
      if (!dir.isDirectory()) continue;
      const pkgPath = join(layerDir, dir.name, 'package.json');
      if (!existsSync(pkgPath)) continue;

      const content = readFileSync(pkgPath, 'utf-8');
      const pkg = parse(content) as PackageInfo;
      packages.set(pkg.name, { ...pkg, layer: config.name, order: config.order });
    }
  }

  return packages;
}

// === 检查依赖方向 ===
function checkDependencyDirection() {
  const packages = getWorkspacePackages();
  const errors: string[] = [];

  for (const [name, pkg] of packages) {
    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
      ...pkg.peerDependencies,
    };

    for (const dep of Object.keys(allDeps)) {
      if (!dep.startsWith(`@${ORG_SCOPE}/`)) continue;
      const depPkg = packages.get(dep);
      if (!depPkg) continue;

      if (depPkg.order >= pkg.order) {
        errors.push(
          `${name}（${pkg.layer}，层级${pkg.order}）→ ${dep}（${depPkg.layer}，层级${depPkg.order}）：违反依赖方向规则`
        );
      }
    }
  }

  return errors;
}

// === 主函数 ===
const errors = checkDependencyDirection();
if (errors.length > 0) {
  console.error('依赖方向检查失败：\n');
  errors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
} else {
  console.log('依赖方向检查通过！');
}
```

---

### 脚本 2：sync-versions（版本同步）

```typescript
// tools/scripts/src/sync-versions.ts
#!/usr/bin/env tsx
/**
 * 版本同步脚本
 * 确保工作区中所有包的共享依赖版本一致
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { parse, stringify } from 'jsonc-parser';

interface PackageJson {
  name: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  [key: string]: unknown;
}

// === 配置 ===
const WORKSPACE_ROOT = process.cwd();
const PACKAGES_DIR = ['packages', 'apps', 'tools'];

// === 需要同步的依赖 ===
const SYNC_DEPS: Record<string, string> = {
  // 从 catalog 中读取的版本
  'typescript': '{{TypeScript版本}}',
  'react': '{{React版本}}',
  'react-dom': '{{React版本}}',
  'eslint': '{{ESLint版本}}',
  'prettier': '{{Prettier版本}}',
  'vitest': '{{Vitest版本}}',
  'tsup': '{{tsup版本}}',
  'vite': '{{Vite版本}}',
};

function syncVersions() {
  const updated: string[] = [];

  for (const dir of PACKAGES_DIR) {
    const dirPath = join(WORKSPACE_ROOT, dir);
    if (!existsSync(dirPath)) continue;

    const entries = readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const pkgPath = join(dirPath, entry.name, 'package.json');
      if (!existsSync(pkgPath)) continue;

      const content = readFileSync(pkgPath, 'utf-8');
      const pkg = parse(content) as PackageJson;
      let changed = false;

      for (const [dep, version] of Object.entries(SYNC_DEPS)) {
        for (const depType of ['dependencies', 'devDependencies', 'peerDependencies'] as const) {
          const deps = pkg[depType];
          if (!deps || !(dep in deps)) continue;

          // 跳过 workspace 协议和 catalog 协议
          if (deps[dep].startsWith('workspace:') || deps[dep].startsWith('catalog:')) continue;

          if (deps[dep] !== version) {
            deps[dep] = version;
            changed = true;
            updated.push(`${pkg.name}: ${dep} ${deps[dep]} → ${version}`);
          }
        }
      }

      if (changed) {
        writeFileSync(pkgPath, stringify(pkg, null, 2) + '\n', 'utf-8');
      }
    }
  }

  if (updated.length > 0) {
    console.log('版本同步完成：');
    updated.forEach((u) => console.log(`  - ${u}`));
  } else {
    console.log('所有依赖版本已同步，无需更新。');
  }
}

syncVersions();
```

---

### 脚本 3：build-all（按依赖层级顺序构建）

```typescript
// tools/scripts/src/build-all.ts
#!/usr/bin/env tsx
/**
 * 按依赖层级顺序构建所有包
 * 构建顺序：工具层 → 库层 → 应用层
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

// === 配置 ===
const WORKSPACE_ROOT = process.cwd();

// === 构建层级（从底层到高层） ===
const BUILD_LAYERS = [
  { name: '工具层', filter: './tools/*', order: 0 },
  { name: '配置包', filter: './packages/config', order: 1 },
  { name: '核心库', filter: './packages/core', order: 2 },
  { name: '工具库', filter: './packages/utils', order: 3 },
  { name: 'UI 组件库', filter: './packages/ui', order: 4 },
  { name: '其他库', filter: './packages/*', order: 5 },
  { name: '应用层', filter: './apps/*', order: 6 },
];

function buildLayer(layer: { name: string; filter: string; order: number }) {
  const dir = join(WORKSPACE_ROOT, layer.filter.replace('./*', ''));
  if (!existsSync(dir)) {
    console.log(`[${layer.name}] 跳过（目录不存在）`);
    return;
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`[${layer.order + 1}/${BUILD_LAYERS.length}] 构建 ${layer.name}`);
  console.log(`${'='.repeat(50)}\n`);

  try {
    execSync(
      `pnpm --filter "${layer.filter}" run build`,
      {
        cwd: WORKSPACE_ROOT,
        stdio: 'inherit',
        timeout: {{构建超时时间，默认300000}}ms,
      }
    );
    console.log(`[${layer.name}] 构建成功`);
  } catch (error) {
    console.error(`[${layer.name}] 构建失败！`);
    process.exit(1);
  }
}

// === 主函数 ===
console.log('开始按依赖层级顺序构建...\n');

for (const layer of BUILD_LAYERS) {
  buildLayer(layer);
}

console.log('\n所有包构建完成！');
```

---

### 脚本 4：test-all（全量测试，支持过滤）

```typescript
// tools/scripts/src/test-all.ts
#!/usr/bin/env tsx
/**
 * 全量测试脚本
 * 支持按包名、层级、标签过滤
 *
 * 用法：
 *   pnpm test-all                          # 运行所有测试
 *   pnpm test-all --filter=core            # 只测试 core 包
 *   pnpm test-all --layer=packages         # 只测试库层
 *   pnpm test-all --tag=unit               # 只运行单元测试
 *   pnpm test-all --coverage               # 生成覆盖率报告
 */

import { execSync } from 'child_process';
import { parseArgs } from 'util';

const { values } = parseArgs({
  options: {
    filter: { type: 'string', short: 'f' },
    layer: { type: 'string', short: 'l' },
    tag: { type: 'string', short: 't' },
    coverage: { type: 'boolean', default: false, short: 'c' },
    watch: { type: 'boolean', default: false, short: 'w' },
    ui: { type: 'boolean', default: false, short: 'u' },
  },
});

function buildFilter(): string {
  const filters: string[] = [];

  if (values.filter) {
    filters.push(`--filter="*${values.filter}*"`);

  if (values.layer) {
    filters.push(`--filter="./${values.layer}/*"`);

  return filters.join(' ');
}

function buildVitestArgs(): string {
  const args: string[] = ['run'];

  if (values.coverage) args.push('--coverage');
  if (values.tag) args.push(`--grep="${values.tag}"`);

  return args.join(' ');
}

function main() {
  const filter = buildFilter();
  const vitestArgs = buildVitestArgs();

  const command = `pnpm ${filter} exec vitest ${vitestArgs}`;

  console.log(`执行命令: ${command}\n`);

  try {
    execSync(command, {
      cwd: process.cwd(),
      stdio: 'inherit',
      timeout: {{测试超时时间，默认600000}}ms,
    });
    console.log('\n所有测试通过！');
  } catch (error) {
    console.error('\n测试失败！');
    process.exit(1);
  }
}

main();
```

---

### 脚本 5：publish（统一发布）

```typescript
// tools/scripts/src/publish.ts
#!/usr/bin/env tsx
/**
 * 统一发布脚本
 * 按依赖层级顺序发布所有包
 *
 * 用法：
 *   pnpm publish:packages                   # 发布所有变更的包
 *   pnpm publish:packages --dry-run         # 预演发布
 *   pnpm publish:packages --tag=next        # 发布到 next 标签
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { parse } from 'jsonc-parser';
import { parseArgs } from 'util';

const { values } = parseArgs({
  options: {
    'dry-run': { type: 'boolean', default: false },
    tag: { type: 'string', default: 'latest' },
    'access': { type: 'string', default: 'public' },
  },
});

interface PackageJson {
  name: string;
  version: string;
  private?: boolean;
  publishConfig?: {
    access?: string;
    directory?: string;
  };
}

// === 配置 ===
const WORKSPACE_ROOT = process.cwd();
const PUBLISH_LAYERS = [
  './packages/config',
  './packages/core',
  './packages/utils',
  './packages/ui',
  './packages/*',
];

function getPackagesToPublish(): PackageJson[] {
  const packages: PackageJson[] = [];

  for (const filter of PUBLISH_LAYERS) {
    const dir = join(WORKSPACE_ROOT, filter.replace('./*', ''));
    if (!existsSync(dir)) continue;

    const entries = execSync(`ls -d ${filter}/package.json 2>/dev/null`, {
      cwd: WORKSPACE_ROOT,
      encoding: 'utf-8',
      shell: true,
    }).trim().split('\n').filter(Boolean);

    for (const pkgPath of entries) {
      const content = readFileSync(pkgPath, 'utf-8');
      const pkg = parse(content) as PackageJson;
      if (pkg.private) continue;
      packages.push(pkg);
    }
  }

  return packages;
}

function publishPackage(pkg: PackageJson) {
  const tagArg = values.tag !== 'latest' ? `--tag ${values.tag}` : '';
  const accessArg = `--access ${values['access']}`;
  const dryRunArg = values['dry-run'] ? '--dry-run' : '';

  const command = `pnpm --filter "${pkg.name}" exec npm publish ${tagArg} ${accessArg} ${dryRunArg}`;

  console.log(`\n发布 ${pkg.name}@${pkg.version}...`);

  try {
    execSync(command, {
      cwd: WORKSPACE_ROOT,
      stdio: 'inherit',
      timeout: {{发布超时时间，默认120000}}ms,
    });
    console.log(`${pkg.name}@${pkg.version} 发布成功`);
  } catch (error) {
    console.error(`${pkg.name}@${pkg.version} 发布失败！`);
    process.exit(1);
  }
}

// === 主函数 ===
const packages = getPackagesToPublish();

if (packages.length === 0) {
  console.log('没有需要发布的包。');
  process.exit(0);
}

console.log(`即将发布 ${packages.length} 个包：`);
packages.forEach((pkg) => console.log(`  - ${pkg.name}@${pkg.version}`));

if (values['dry-run']) {
  console.log('\n[预演模式] 不会实际发布');
}

for (const pkg of packages) {
  publishPackage(pkg);
}

console.log('\n所有包发布完成！');
```

---

## 自检清单

生成配置后，请逐项检查以下内容：

- [ ] **工作区注册**：`pnpm-workspace.yaml` 中的包路径是否与实际目录结构匹配
- [ ] **catalog 版本**：所有 catalog 条目是否使用了有效的版本号
- [ ] **依赖方向**：应用层是否只依赖库层和工具层，不存在反向依赖
- [ ] **Git 钩子**：husky 是否正确初始化，`.husky/` 目录下的钩子脚本是否可执行
- [ ] **commitlint**：提交信息规范是否与团队约定一致
- [ ] **lint-staged**：暂存文件检查是否覆盖了所有文件类型
- [ ] **根 package.json**：scripts 命令是否完整，devDependencies 是否包含所有工具
- [ ] **TypeScript 配置**：base config 是否被所有子包正确继承
- [ ] **ESLint 配置**：规则是否合理，忽略规则是否正确
- [ ] **.gitignore**：是否覆盖了所有应忽略的文件和目录
- [ ] **共享脚本**：脚本是否可独立运行，路径是否正确
- [ ] **包管理器配置**：`.npmrc` 配置是否与团队环境一致

如有缺失，请在配置末尾生成 **待确认事项清单**，列出需要用户补充的信息。
