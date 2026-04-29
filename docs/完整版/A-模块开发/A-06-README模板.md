# A-F06 README模板（完整版）

> **模板 ID**: A-F06
> **模板名称**: README模板（完整版）
> **版本**: 1.0.0
> **适用范围**: 模块/包的完整说明文档

---

## 模板说明

README 是模块最重要的文档，是使用者接触模块的第一入口。
完整版 README 应包含模块的所有关键信息，帮助使用者快速了解、安装和使用模块。

---

## 模板内容

```markdown
# ｛｛MODULE_NAME｝｝

｛｛BADGE_BUILD｝｝ ｛｛BADGE_COVERAGE｝｝ ｛｛BADGE_LICENSE｝｝ ｛｛BADGE_VERSION｝｝

> ｛｛ONE_LINE_DESCRIPTION｝｝

## 特性

- ｛｛FEATURE_1｝｝
- ｛｛FEATURE_2｝｝
- ｛｛FEATURE_3｝｝

## 安装

### 使用包管理器

\`\`\`bash
# 生态 A
pkg-a add ｛｛MODULE_NAME｝｝

# 生态 B
pkg-b install ｛｛MODULE_NAME｝｝

# 生态 C
pkg-c get ｛｛MODULE_NAME｝｝
\`\`\`

### 从源码构建

\`\`\`bash
git clone ｛｛REPO_URL｝｝
cd ｛｛REPO_PATH｝｝
｛｛INSTALL_DEPENDENCIES_COMMAND｝｝
｛｛BUILD_COMMAND｝｝
\`\`\`

## 快速开始

\`\`\`
import { ｛｛EXPORTED_FUNCTION｝｝ } from "｛｛MODULE_NAME｝｝";

const result = ｛｛EXPORTED_FUNCTION｝｝(｛｛SAMPLE_INPUT｝｝);
console.log(result); // ｛｛SAMPLE_OUTPUT｝｝
\`\`\`

## API 文档

### ｛｛FUNCTION_NAME｝｝

\`\`\`
｛｛FUNCTION_NAME｝｝(｛｛PARAM｝｝: ｛｛PARAM_TYPE｝｝) -> ｛｛RETURN_TYPE｝｝
\`\`\`

｛｛FUNCTION_DESCRIPTION｝｝

**参数**：

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| ｛｛PARAM｝｝ | ｛｛PARAM_TYPE｝｝ | 是 | - | ｛｛PARAM_DESCRIPTION｝｝ |
| ｛｛OPTIONAL_PARAM｝｝ | ｛｛OPTIONAL_PARAM_TYPE｝｝ | 否 | ｛｛DEFAULT_VALUE｝｝ | ｛｛OPTIONAL_PARAM_DESCRIPTION｝｝ |

**返回值**：`｛｛RETURN_TYPE｝｝` — ｛｛RETURN_DESCRIPTION｝｝

**示例**：

\`\`\`
｛｛USAGE_EXAMPLE｝｝
\`\`\`

---

### ｛｛ANOTHER_FUNCTION_NAME｝｝

\`\`\`
｛｛ANOTHER_FUNCTION_NAME｝｝(｛｛PARAM｝｝: ｛｛PARAM_TYPE｝｝) -> ｛｛RETURN_TYPE｝｝
\`\`\`

｛｛ANOTHER_FUNCTION_DESCRIPTION｝｝

（参数表、返回值、示例同上格式）

---

## 高级用法

### ｛｛ADVANCED_TOPIC_1｝｝

｛｛ADVANCED_DESCRIPTION_1｝｝

\`\`\`
｛｛ADVANCED_EXAMPLE_1｝｝
\`\`\`

### ｛｛ADVANCED_TOPIC_2｝｝

｛｛ADVANCED_DESCRIPTION_2｝｝

\`\`\`
｛｛ADVANCED_EXAMPLE_2｝｝
\`\`\`

## 相关模块

| 模块 | 说明 |
|------|------|
| [@｛｛SCOPE｝｝/｛｛RELATED_MODULE_A｝｝](｛｛URL_A｝｝) | ｛｛DESCRIPTION_A｝｝ |
| [@｛｛SCOPE｝｝/｛｛RELATED_MODULE_B｝｝](｛｛URL_B｝｝) | ｛｛DESCRIPTION_B｝｝ |

## 贡献指南

欢迎贡献！请阅读 [贡献指南](｛｛CONTRIBUTING_URL｝｝) 了解详情。

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/｛｛FEATURE_NAME｝｝`
3. 提交变更：`git commit -m "｛｛CONVENTIONAL_COMMIT_MESSAGE｝｝"`
4. 推送分支：`git push origin feature/｛｛FEATURE_NAME｝｝`
5. 提交 Pull Request

## 变更日志

请参阅 [CHANGELOG.md](./CHANGELOG.md) 了解各版本变更详情。

## 许可证

[｛｛LICENSE｝｝](｛｛LICENSE_FILE｝｝) @ ｛｛AUTHOR｝｝
```

---

## 章节说明

| 章节 | 必填 | 说明 |
|------|------|------|
| 标题 + 描述 | 是 | 模块名称和一句话描述 |
| 徽章 | 否 | 构建状态、覆盖率、许可证等状态标识 |
| 特性 | 是 | 核心功能列表，3-5 条 |
| 安装 | 是 | 多生态安装方式 |
| 快速开始 | 是 | 最小可运行示例 |
| API 文档 | 是 | 所有公开接口的详细说明 |
| 高级用法 | 否 | 复杂场景的使用示例 |
| 相关模块 | 否 | 关联模块的链接和说明 |
| 贡献指南 | 否 | 如何参与贡献 |
| 变更日志 | 是 | 指向 CHANGELOG.md 的链接 |
| 许可证 | 是 | 许可证类型和文件链接 |

---

## 徽章参考

| 徽章类型 | 说明 | 示例 |
|----------|------|------|
| 构建状态 | CI/CD 构建是否通过 | `build: passing` |
| 测试覆盖率 | 代码覆盖率百分比 | `coverage: 95%` |
| 许可证 | 许可证类型 | `license: MIT` |
| 版本 | 最新发布版本 | `version: 1.0.0` |
| 下载量 | 包管理器下载统计 | `downloads: 10k/month` |
