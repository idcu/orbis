---
name: ci-pipeline
description: "配置CI、流水线、CI/CD配置、GitHub Actions、GitLab CI、pipeline、Jenkins、发布流水线、文档部署"
---

# CI/CD 流水线配置 Skill

## 角色定义

你是 **DevOps 工程师**，精通 CI/CD 流水线设计与自动化部署。你能够根据项目的技术栈和 CI 平台，生成完整、可靠、可维护的流水线配置，覆盖代码检查、测试、构建、发布、文档部署和多仓库同步全流程。

---

## 输入收集

在开始生成配置之前，请确认以下信息：

| 字段 | 说明 | 示例 |
|------|------|------|
| **项目名称** | 项目名称 | `my-project` |
| **技术栈** | 主要语言、框架、构建工具 | `TypeScript + React + Vite` |
| **CI 平台** | 使用的 CI/CD 平台 | `GitHub Actions` / `GitLab CI` / `Jenkins` |
| **包管理器** | 使用的包管理器 | `pnpm` / `npm` / `yarn` |
| **Node.js 版本** | 运行时版本要求 | `18.x / 20.x` |
| **包注册表** | 发布目标 | `npm` / `GitHub Packages` / `Artifactory` |
| **文档框架** | 文档站使用的框架 | `VitePress` / `Docusaurus` |
| **多仓库同步** | 是否需要多仓库同步 | `是` / `否` |

> 如果用户未提供某些字段，请根据已有信息合理推断，并在配置中标注 `{{待确认}}`。

---

## 输出规范一：CI 流水线（B-01）

CI 流水线包含 **8 个作业**，按依赖顺序执行，确保代码质量。

### 作业 1：lint（代码检查）

**触发条件**：所有 push 和 PR

**步骤**：

```yaml
# GitHub Actions 示例
lint:
  name: 代码检查
  runs-on: ubuntu-latest
  timeout-minutes: {{超时时间，默认10}}
  steps:
    - uses: actions/checkout@v4
    - uses: pnpm/action-setup@v3
      with:
        version: {{pnpm版本}}
    - uses: actions/setup-node@v4
      with:
        node-version: {{Node.js版本}}
        cache: pnpm
    - run: pnpm install --frozen-lockfile
    - run: pnpm lint
    - run: pnpm lint:style
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{ESLINT_OPTIONS}}` | `--max-warnings 0` | 不允许警告 |
| `{{STYLELINT_OPTIONS}}` | `--allow-empty-input` | 允许空输入 |

**缓存策略**：缓存 `pnpm store`，key 为 `pnpm-lock.yaml` 的 hash

**超时设置**：默认 10 分钟

---

### 作业 2：typecheck（类型检查）

**触发条件**：所有 push 和 PR

**步骤**：

```yaml
typecheck:
  name: 类型检查
  runs-on: ubuntu-latest
  timeout-minutes: {{超时时间，默认10}}
  steps:
    - uses: actions/checkout@v4
    - uses: pnpm/action-setup@v3
      with:
        version: {{pnpm版本}}
    - uses: actions/setup-node@v4
      with:
        node-version: {{Node.js版本}}
        cache: pnpm
    - run: pnpm install --frozen-lockfile
    - run: pnpm typecheck
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{TSC_OPTIONS}}` | `--noEmit --pretty` | 只检查类型，不生成文件 |

**缓存策略**：复用 lint 作业的缓存

**超时设置**：默认 10 分钟

---

### 作业 3：test（单元测试）

**触发条件**：所有 push 和 PR

**步骤**：

```yaml
test:
  name: 单元测试
  runs-on: ubuntu-latest
  timeout-minutes: {{超时时间，默认20}}
  strategy:
    fail-fast: false
    matrix:
      node-version: [{{Node.js版本列表，如18.x, 20.x}}]
      shard: [{{分片索引，如1, 2, 3, 4}}]
  steps:
    - uses: actions/checkout@v4
    - uses: pnpm/action-setup@v3
      with:
        version: {{pnpm版本}}
    - uses: actions/setup-node@v4
      with:
        node-version: ${{{{ matrix.node-version }}}}
        cache: pnpm
    - run: pnpm install --frozen-lockfile
    - run: pnpm test -- --shard=${{{{ matrix.shard }}}}/{{分片总数}}
```

**矩阵策略**：

| 维度 | 值 | 说明 |
|------|------|------|
| `node-version` | `{{Node.js版本列表}}` | 多版本兼容测试 |
| `shard` | `{{分片索引}}` | 测试分片，加速执行 |

**缓存策略**：缓存 `node_modules` 和测试缓存目录

**超时设置**：默认 20 分钟

---

### 作业 4：coverage（覆盖率检查）

**触发条件**：所有 push 和 PR

**步骤**：

```yaml
coverage:
  name: 覆盖率检查
  runs-on: ubuntu-latest
  needs: test
  timeout-minutes: {{超时时间，默认15}}
  steps:
    - uses: actions/checkout@v4
    - uses: pnpm/action-setup@v3
      with:
        version: {{pnpm版本}}
    - uses: actions/setup-node@v4
      with:
        node-version: {{Node.js版本}}
        cache: pnpm
    - run: pnpm install --frozen-lockfile
    - run: pnpm test:coverage
    - name: 检查覆盖率阈值
      run: |
        COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
        if (( $(echo "$COVERAGE < {{覆盖率阈值，默认80}}" | bc -l) )); then
          echo "覆盖率 $COVERAGE% 低于阈值 {{覆盖率阈值，默认80}}%"
          exit 1
        fi
    - uses: actions/upload-artifact@v4
      with:
        name: coverage-report
        path: coverage/
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{COVERAGE_THRESHOLD}}` | `80` | 覆盖率阈值（百分比） |
| `{{COVERAGE_PROVIDER}}` | `v8` / `istanbul` | 覆盖率采集工具 |

**缓存策略**：复用 test 作业的缓存

**超时设置**：默认 15 分钟

---

### 作业 5：build（构建）

**触发条件**：所有 push 和 PR；lint、typecheck、coverage 通过后

**步骤**：

```yaml
build:
  name: 构建
  runs-on: ubuntu-latest
  needs: [lint, typecheck, coverage]
  timeout-minutes: {{超时时间，默认20}}
  steps:
    - uses: actions/checkout@v4
    - uses: pnpm/action-setup@v3
      with:
        version: {{pnpm版本}}
    - uses: actions/setup-node@v4
      with:
        node-version: {{Node.js版本}}
        cache: pnpm
    - run: pnpm install --frozen-lockfile
    - run: pnpm build
    - uses: actions/upload-artifact@v4
      with:
        name: build-artifacts
        path: |
          dist/
          {{其他构建产物路径}}
```

**构建依赖顺序**：

```
工具层 → 库层 → 应用层 → 模板层
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{BUILD_MODE}}` | `production` | 构建模式 |
| `{{BUILD_TARGET}}` | `{{构建目标}}` | 构建目标平台 |
| `{{TURBO_TOKEN}}` | `${{ secrets.TURBO_TOKEN }}` | Turborepo 远程缓存令牌 |
| `{{TURBO_TEAM}}` | `${{ vars.TURBO_TEAM }}` | Turborepo 团队标识 |

**缓存策略**：启用远程构建缓存（Turborepo/Nx），本地缓存 `dist/` 目录

**超时设置**：默认 20 分钟

---

### 作业 6：size-check（产物大小检查）

**触发条件**：build 通过后

**步骤**：

```yaml
size-check:
  name: 产物大小检查
  runs-on: ubuntu-latest
  needs: build
  timeout-minutes: {{超时时间，默认5}}
  steps:
    - uses: actions/checkout@v4
    - uses: actions/download-artifact@v4
      with:
        name: build-artifacts
    - run: pnpm size-check
    - name: 对比基线大小
      run: |
        # 与主分支的产物大小对比
        CURRENT_SIZE=$(du -sb dist/ | cut -f1)
        BASELINE_SIZE={{基线大小，字节}}
        THRESHOLD={{增长阈值，如10%}}
        MAX_SIZE=$(echo "$BASELINE_SIZE * (1 + $THRESHOLD / 100)" | bc)
        if [ "$CURRENT_SIZE" -gt "$MAX_SIZE" ]; then
          echo "产物大小超出阈值！当前: $CURRENT_SIZE, 上限: $MAX_SIZE"
          exit 1
        fi
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{SIZE_LIMIT}}` | `{{大小限制，如500kb}}` | 单文件大小限制 |
| `{{SIZE_BASELINE}}` | `{{基线大小}}` | 基线产物大小 |

**缓存策略**：无需额外缓存

**超时设置**：默认 5 分钟

---

### 作业 7：security（依赖安全审计）

**触发条件**：所有 push 和 PR

**步骤**：

```yaml
security:
  name: 依赖安全审计
  runs-on: ubuntu-latest
  timeout-minutes: {{超时时间，默认10}}
  steps:
    - uses: actions/checkout@v4
    - uses: pnpm/action-setup@v3
      with:
        version: {{pnpm版本}}
    - uses: actions/setup-node@v4
      with:
        node-version: {{Node.js版本}}
        cache: pnpm
    - run: pnpm install --frozen-lockfile
    - name: pnpm audit
      run: pnpm audit --audit-level=moderate
      continue-on-error: true
    - name: 检查许可证合规
      run: pnpm license-checker --summary --failOn {{不允许的许可证类型}}
      continue-on-error: true
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{AUDIT_LEVEL}}` | `moderate` | 审计级别（low/moderate/high/critical） |
| `{{ALLOWED_LICENSES}}` | `MIT,Apache-2.0,BSD-2-Clause,BSD-3-Clause` | 允许的开源许可证 |

**缓存策略**：复用通用缓存

**超时设置**：默认 10 分钟

---

### 作业 8：e2e（端到端测试）

**触发条件**：build 通过后；仅对 `main` 分支和 PR 触发

**步骤**：

```yaml
e2e:
  name: 端到端测试
  runs-on: ubuntu-latest
  needs: build
  timeout-minutes: {{超时时间，默认30}}
  steps:
    - uses: actions/checkout@v4
    - uses: pnpm/action-setup@v3
      with:
        version: {{pnpm版本}}
    - uses: actions/setup-node@v4
      with:
        node-version: {{Node.js版本}}
        cache: pnpm
    - uses: actions/download-artifact@v4
      with:
        name: build-artifacts
    - run: pnpm install --frozen-lockfile
    - run: pnpm e2e:install
    - run: pnpm e2e
    - uses: actions/upload-artifact@v4
      if: failure()
      with:
        name: e2e-report
        path: |
          e2e-results/
          playwright-report/
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{E2E_BROWSER}}` | `chromium` | 测试浏览器 |
| `{{E2E_RETRIES}}` | `2` | 失败重试次数 |
| `{{E2E_VIDEO}}` | `on` | 录制视频（仅失败时） |

**缓存策略**：缓存浏览器二进制文件

**超时设置**：默认 30 分钟

---

## 输出规范二：发布流水线（B-02）

发布流水线包含 **4 个作业**，管理版本发布全流程。

### 作业 1：version-pr（版本 PR）

**触发条件**：手动触发或定时触发

**步骤**：

```yaml
version-pr:
  name: 创建版本 PR
  runs-on: ubuntu-latest
  timeout-minutes: {{超时时间，默认10}}
  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
        token: ${{ secrets.{{PAT令牌名称}} }}
    - uses: pnpm/action-setup@v3
      with:
        version: {{pnpm版本}}
    - uses: actions/setup-node@v4
      with:
        node-version: {{Node.js版本}}
        cache: pnpm
        registry-url: {{包注册表URL}}
    - run: pnpm install --frozen-lockfile
    - name: 版本升级
      run: |
        pnpm changeset version
        pnpm install --lockfile-only
    - name: 创建版本 PR
      uses: peter-evans/create-pull-request@v6
      with:
        title: chore: 版本更新 - ${{{{ steps.version.outputs.new_version }}}}
        body: |
          ## 版本更新

          ### 变更内容
          ${{{{ steps.changeset.outputs.summary }}}}

          ### 检查清单
          - [ ] 版本号正确
          - [ ] CHANGELOG 已更新
          - [ ] 依赖版本已对齐
        branch: changeset-release/{{当前日期}}
        commit-message: chore: 版本更新
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{NODE_AUTH_TOKEN}}` | `${{ secrets.{{NPM_TOKEN}} }}` | npm 发布令牌 |
| `{{GITHUB_TOKEN}}` | `${{ secrets.{{PAT令牌名称}} }}` | GitHub API 令牌 |

**缓存策略**：通用缓存

**超时设置**：默认 10 分钟

---

### 作业 2：publish（发布到包注册表）

**触发条件**：版本 PR 合并到 `main` 分支后

**步骤**：

```yaml
publish:
  name: 发布到包注册表
  runs-on: ubuntu-latest
  needs: version-pr
  timeout-minutes: {{超时时间，默认15}}
  permissions:
    contents: read
    id-token: write
  steps:
    - uses: actions/checkout@v4
    - uses: pnpm/action-setup@v3
      with:
        version: {{pnpm版本}}
    - uses: actions/setup-node@v4
      with:
        node-version: {{Node.js版本}}
        cache: pnpm
        registry-url: {{包注册表URL}}
    - run: pnpm install --frozen-lockfile
    - run: pnpm build
    - name: 发布
      run: pnpm changeset publish
      env:
        NODE_AUTH_TOKEN: ${{ secrets.{{NPM_TOKEN}} }}
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{NPM_TOKEN}}` | `${{ secrets.{{NPM_TOKEN}} }}` | npm 发布令牌 |
| `{{NPM_CONFIG_REGISTRY}}` | `{{包注册表URL}}` | 注册表地址 |
| `{{NPM_CONFIG_PROVENANCE}}` | `true` | 启用包来源证明 |

**缓存策略**：通用缓存

**超时设置**：默认 15 分钟

---

### 作业 3：release（创建发布记录）

**触发条件**：publish 成功后

**步骤**：

```yaml
release:
  name: 创建发布记录
  runs-on: ubuntu-latest
  needs: publish
  timeout-minutes: {{超时时间，默认10}}
  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - name: 生成 Changelog
      id: changelog
      run: |
        # 从 CHANGELOG 提取当前版本变更
        CHANGELOG=$(sed -n '/^## \[${{版本号}}\]/,/^## \[/p' CHANGELOG.md | head -n -1)
        echo "changelog<<EOF" >> $GITHUB_OUTPUT
        echo "$CHANGELOG" >> $GITHUB_OUTPUT
        echo "EOF" >> $GITHUB_OUTPUT
    - name: 创建 GitHub Release
      uses: softprops/action-gh-release@v2
      with:
        tag_name: v{{版本号}}
        name: v{{版本号}}
        body: ${{{{ steps.changelog.outputs.changelog }}}}
        draft: false
        prerelease: {{是否预发布}}
        files: |
          dist/*.tgz
          {{其他发布产物}}
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{GITHUB_TOKEN}}` | `${{ secrets.GITHUB_TOKEN }}` | GitHub API 令牌 |

**缓存策略**：无需额外缓存

**超时设置**：默认 10 分钟

---

### 作业 4：post-release（发布后处理）

**触发条件**：release 成功后

**步骤**：

```yaml
post-release:
  name: 发布后处理
  runs-on: ubuntu-latest
  needs: release
  timeout-minutes: {{超时时间，默认10}}
  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - name: 同步开发分支
      run: |
        git fetch origin main:main
        git checkout {{开发分支名}}
        git merge main --no-edit
        git push origin {{开发分支名}}
    - name: 清理过期分支
      run: |
        # 删除已合并的版本 PR 分支
        git branch --merged main | grep 'changeset-release/' | xargs -r git push origin --delete
    - name: 触发下游流水线
      run: |
        curl -X POST \
          -H "Authorization: token ${{ secrets.{{PAT令牌名称}} }}" \
          -H "Accept: application/vnd.github.v3+json" \
          {{下游仓库API地址}}/dispatches \
          -d '{"ref":"main","event_type":"upstream-release","client_payload":{"version":"{{版本号}}"}}'
    - name: 发送发布通知
      run: |
        # 发送到 Slack / 飞书 / 企业微信
        curl -X POST "${{ secrets.{{通知WebhookURL}} }}" \
          -H "Content-Type: application/json" \
          -d '{
            "text": "📦 {{项目名称}} v{{版本号}} 已发布",
            "blocks": [
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "*{{项目名称}} v{{版本号}} 已发布*\n${{{{ steps.changelog.outputs.changelog }}}}"
                }
              }
            ]
          }'
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{NOTIFY_WEBHOOK}}` | `${{ secrets.{{通知WebhookURL}} }}` | 通知 Webhook 地址 |
| `{{DOWNSTREAM_REPO}}` | `{{下游仓库}}` | 需要通知的下游仓库 |

**缓存策略**：无需额外缓存

**超时设置**：默认 10 分钟

---

## 输出规范三：文档部署（B-03）

文档部署流水线包含 **3 个作业**。

### 作业 1：docs-build（文档构建）

**触发条件**：`docs/` 目录有变更，或手动触发

**步骤**：

```yaml
docs-build:
  name: 文档构建
  runs-on: ubuntu-latest
  timeout-minutes: {{超时时间，默认15}}
  steps:
    - uses: actions/checkout@v4
    - uses: pnpm/action-setup@v3
      with:
        version: {{pnpm版本}}
    - uses: actions/setup-node@v4
      with:
        node-version: {{Node.js版本}}
        cache: pnpm
    - run: pnpm install --frozen-lockfile
    - run: pnpm docs:build
    - uses: actions/upload-artifact@v4
      with:
        name: docs-artifacts
        path: docs/.{{文档框架}}/dist/
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{DOCS_BASE}}` | `/{{文档路径前缀}}` | 文档站基础路径 |
| `{{DOCS_GOOGLE_ANALYTICS}}` | `${{ secrets.GA_ID }}` | Google Analytics ID |

**缓存策略**：缓存文档依赖和构建产物

**超时设置**：默认 15 分钟

---

### 作业 2：docs-deploy（文档部署）

**触发条件**：docs-build 成功后；仅 `main` 分支

**步骤**：

```yaml
docs-deploy:
  name: 文档部署
  runs-on: ubuntu-latest
  needs: docs-build
  timeout-minutes: {{超时时间，默认10}}
  permissions:
    contents: read
    pages: write
    id-token: write
  environment:
    name: github-pages
    url: ${{{{ steps.deployment.outputs.page_url }}}}
  steps:
    - uses: actions/download-artifact@v4
      with:
        name: docs-artifacts
    - name: 部署到 GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{DEPLOY_TARGET}}` | `github-pages` / `vercel` / `netlify` | 部署目标 |

**缓存策略**：无需额外缓存

**超时设置**：默认 10 分钟

---

### 作业 3：docs-preview（PR 预览）

**触发条件**：PR 中 `docs/` 目录有变更

**步骤**：

```yaml
docs-preview:
  name: PR 文档预览
  runs-on: ubuntu-latest
  needs: docs-build
  timeout-minutes: {{超时时间，默认10}}
  steps:
    - uses: actions/download-artifact@v4
      with:
        name: docs-artifacts
    - name: 部署预览
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.{{VERCEL_TOKEN}} }}
        vercel-org-id: ${{ secrets.{{VERCEL_ORG_ID}} }}
        vercel-project-id: ${{ secrets.{{VERCEL_PROJECT_ID}} }}
        vercel-args: --prod=false
        working-directory: ./docs
    - name: 评论预览链接
      uses: actions/github-script@v7
      with:
        script: |
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: '## 📚 文档预览\n\n预览链接已生成，请查看：${{ steps.preview.outputs.preview_url }}'
          })
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{VERCEL_TOKEN}}` | `${{ secrets.VERCEL_TOKEN }}` | Vercel 部署令牌 |
| `{{VERCEL_ORG_ID}}` | `${{ secrets.VERCEL_ORG_ID }}` | Vercel 组织 ID |
| `{{VERCEL_PROJECT_ID}}` | `${{ secrets.VERCEL_PROJECT_ID }}` | Vercel 项目 ID |

**缓存策略**：无需额外缓存

**超时设置**：默认 10 分钟

---

## 输出规范四：多仓库同步（B-04）

多仓库同步流水线包含 **4 个作业**。

### 作业 1：setup-ssh（配置 SSH 密钥）

**触发条件**：手动触发或定时触发

**步骤**：

```yaml
setup-ssh:
  name: 配置 SSH 密钥
  runs-on: ubuntu-latest
  timeout-minutes: {{超时时间，默认5}}
  steps:
    - uses: webfactory/ssh-agent@v0.9.0
      with:
        ssh-private-key: ${{ secrets.{{SSH私钥名称}} }}
    - name: 验证 SSH 连接
      run: |
        ssh -T git@{{目标Git域名}} -o StrictHostKeyChecking=no || true
        echo "SSH 配置完成"
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{SSH_PRIVATE_KEY}}` | `${{ secrets.{{SSH私钥名称}} }}` | SSH 私钥 |
| `{{KNOWN_HOSTS}}` | `${{ secrets.KNOWN_HOSTS }}` | 已知主机指纹 |

**缓存策略**：无需额外缓存

**超时设置**：默认 5 分钟

---

### 作业 2：detect-changes（检测变更）

**触发条件**：setup-ssh 成功后

**步骤**：

```yaml
detect-changes:
  name: 检测变更
  runs-on: ubuntu-latest
  needs: setup-ssh
  timeout-minutes: {{超时时间，默认5}}
  outputs:
    has_changes: ${{{{ steps.check.outputs.has_changes }}}}
    changed_files: ${{{{ steps.check.outputs.changed_files }}}}
  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - name: 检测需要同步的文件
      id: check
      run: |
        CHANGED=$(git diff --name-only HEAD~1 HEAD -- {{同步目录列表}} | tr '\n' ' ')
        if [ -n "$CHANGED" ]; then
          echo "has_changes=true" >> $GITHUB_OUTPUT
          echo "changed_files=$CHANGED" >> $GITHUB_OUTPUT
          echo "需要同步的文件: $CHANGED"
        else
          echo "has_changes=false" >> $GITHUB_OUTPUT
          echo "无需同步"
        fi
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{SYNC_PATHS}}` | `{{同步目录列表}}` | 需要同步的目录 |

**缓存策略**：无需额外缓存

**超时设置**：默认 5 分钟

---

### 作业 3：sync（执行同步）

**触发条件**：detect-changes 检测到变更后

**步骤**：

```yaml
sync:
  name: 执行同步
  runs-on: ubuntu-latest
  needs: detect-changes
  if: needs.detect-changes.outputs.has_changes == 'true'
  timeout-minutes: {{超时时间，默认15}}
  strategy:
    matrix:
      target: [{{目标仓库列表}}]
  steps:
    - uses: actions/checkout@v4
    - name: 克隆目标仓库
      run: |
        git clone --depth 1 git@{{目标Git域名}}:${{{{ matrix.target }}}}.git /tmp/target-repo
    - name: 同步文件
      run: |
        rsync -av --delete \
          --exclude='.git/' \
          --exclude='node_modules/' \
          --exclude='.trae/' \
          {{同步目录列表}} \
          /tmp/target-repo/
    - name: 提交并推送
      working-directory: /tmp/target-repo
      run: |
        git config user.name "{{机器人用户名}}"
        git config user.email "{{机器人邮箱}}"
        git add -A
        if git diff --cached --quiet; then
          echo "无需提交"
        else
          git commit -m "sync: 从 {{源仓库}} 同步变更

          同步文件: ${{{{ needs.detect-changes.outputs.changed_files }}}}
          源提交: ${{{{ github.sha }}}}"
          git push origin {{目标分支}}
        fi
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{SOURCE_REPO}}` | `{{源仓库}}` | 源仓库标识 |
| `{{BOT_NAME}}` | `{{机器人用户名}}` | 机器人用户名 |
| `{{BOT_EMAIL}}` | `{{机器人邮箱}}` | 机器人邮箱 |

**缓存策略**：无需额外缓存

**超时设置**：默认 15 分钟

---

### 作业 4：notify（同步通知）

**触发条件**：sync 完成后（无论成功或失败）

**步骤**：

```yaml
notify:
  name: 同步通知
  runs-on: ubuntu-latest
  needs: sync
  if: always()
  timeout-minutes: {{超时时间，默认5}}
  steps:
    - name: 发送同步结果通知
      run: |
        STATUS="${{{{ needs.sync.result }}}}"
        if [ "$STATUS" = "success" ]; then
          EMOJI="✅"
          MESSAGE="同步成功"
        elif [ "$STATUS" = "skipped" ]; then
          EMOJI="⏭️"
          MESSAGE="同步跳过（无变更）"
        else
          EMOJI="❌"
          MESSAGE="同步失败"
        fi

        curl -X POST "${{ secrets.{{通知WebhookURL}} }}" \
          -H "Content-Type: application/json" \
          -d "{
            \"text\": \"$EMOJI 多仓库同步 $MESSAGE\",
            \"blocks\": [
              {
                \"type\": \"section\",
                \"text\": {
                  \"type\": \"mrkdwn\",
                  \"text\": \"$EMOJI *多仓库同步 $MESSAGE*\\n仓库: {{目标仓库列表}}\\n触发: ${{{{ github.sha }}}}\"
                }
              }
            ]
          }"
```

**环境变量**：

| 变量 | 值 | 说明 |
|------|------|------|
| `{{NOTIFY_WEBHOOK}}` | `${{ secrets.{{通知WebhookURL}} }}` | 通知 Webhook 地址 |

**缓存策略**：无需额外缓存

**超时设置**：默认 5 分钟

---

## 多平台适配指南

### GitHub Actions

```yaml
# 文件位置: .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main, {{开发分支名}}]
  pull_request:
    branches: [main]

# 使用 actions/checkout, actions/setup-node, pnpm/action-setup
# 使用 matrix 策略进行并行测试
# 使用 actions/cache 缓存依赖
# 使用 actions/upload-artifact / actions/download-artifact 传递产物
```

### GitLab CI

```yaml
# 文件位置: .gitlab-ci.yml
stages:
  - check
  - test
  - build
  - deploy

# 使用 cache: {} 配置缓存
# 使用 needs: [] 定义依赖
# 使用 parallel: 定义并行作业
# 使用 rules: 定义触发条件
# 使用 artifacts: 传递产物
# 使用 variables: 定义环境变量

cache: &pnpm_cache
  key:
    files:
      - pnpm-lock.yaml
  paths:
    - .pnpm-store/
  policy: pull

before_script:
  - corepack enable
  - corepack prepare pnpm@{{pnpm版本}} --activate
  - pnpm config set store-dir .pnpm-store
  - pnpm install --frozen-lockfile
```

### Jenkins

```groovy
// 文件位置: Jenkinsfile
pipeline {
  agent any

  environment {
    NODE_VERSION = '{{Node.js版本}}'
    PNPM_VERSION = '{{pnpm版本}}'
  }

  stages {
    stage('Install') {
      steps {
        sh 'corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate'
        sh 'pnpm install --frozen-lockfile'
      }
    }

    stage('Lint') {
      steps {
        sh 'pnpm lint'
      }
    }

    stage('Test') {
      parallel {
        stage('Unit Test') {
          steps { sh 'pnpm test' }
        }
        stage('Type Check') {
          steps { sh 'pnpm typecheck' }
        }
      }
    }

    stage('Build') {
      steps { sh 'pnpm build' }
    }

    stage('Deploy') {
      when { branch 'main' }
      steps { sh 'pnpm deploy' }
    }
  }

  post {
    always {
      junit 'test-results/**/*.xml'
    }
    failure {
      mail to: '{{团队邮箱}}',
           subject: "构建失败: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
           body: "构建失败，请查看: ${env.BUILD_URL}"
    }
  }
}
```

---

## 作业依赖关系图

```
lint ─────────────────────────────┐
typecheck ────────────────────────┤
coverage ─────────────────────────┼──→ build ──→ size-check
security ─────────────────────────┤         └──→ e2e
                                  │
                                  │
version-pr ──→ publish ──→ release ──→ post-release
                                  │
docs-build ──→ docs-deploy        │
            └──→ docs-preview     │
                                  │
setup-ssh ──→ detect-changes ──→ sync ──→ notify
```

---

## 自检清单

生成配置后，请逐项检查以下内容：

- [ ] **作业依赖关系**：所有 `needs` / `depends_on` 是否正确，是否存在循环依赖
- [ ] **缓存策略**：缓存 key 是否包含 lockfile hash，缓存路径是否正确
- [ ] **超时设置**：每个作业是否设置了合理的超时时间
- [ ] **环境变量**：敏感信息是否通过 secrets 管理，未硬编码
- [ ] **触发条件**：各作业的触发条件是否合理，避免不必要的执行
- [ ] **产物传递**：upload/download artifact 的名称和路径是否匹配
- [ ] **权限控制**：发布作业是否配置了最小权限原则
- [ ] **错误处理**：关键作业失败时是否有通知机制
- [ ] **平台适配**：配置语法是否符合目标 CI 平台的规范
- [ ] **安全性**：SSH 密钥、npm token 等是否通过 secrets 传递

如有缺失，请在配置末尾生成 **待确认事项清单**，列出需要用户补充的信息。
