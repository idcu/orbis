# A-S06 README模板（精简版）

> **模板编号**: A-S06
> **模板名称**: README模板
> **版本**: v1.0
> **分类**: A-模块开发
> **层级**: 精简版

---

## 模板说明

README 是模块的门面文档，帮助使用者快速了解模块用途并上手使用。
以下为精简版 README 模板，包含最核心的信息。

---

## 模板内容

```markdown
# {{MODULE_NAME}}

{{ONE_LINE_DESCRIPTION}}

## 安装

\`\`\`bash
# 使用包管理器安装
{{PACKAGE_MANAGER_INSTALL_COMMAND}}
\`\`\`

## 基本用法

\`\`\`
{{BASIC_USAGE_EXAMPLE}}
\`\`\`

## 许可证

{{LICENSE}}
```

---

## 使用示例

```markdown
# @myorg/string-utils

通用字符串处理工具集

## 安装

\`\`\`bash
# 使用包管理器安装
package-manager add @myorg/string-utils
\`\`\`

## 基本用法

\`\`\`
import { reverse, capitalize } from "@myorg/string-utils";

reverse("hello");     // "olleh"
capitalize("world");  // "World"
\`\`\`

## 许可证

MIT
```
