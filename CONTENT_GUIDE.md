# JCIE 网站内容维护指南（Hugo）

本仓库已切换为 Hugo 静态站点。日常维护基本只需要修改 `data/*.yaml` 与 `content/**/*.md`。

## 内容改动对应文件

### 1) 全站基础信息（站点名 / 邮箱 / GitHub / SEO 文案）

编辑：`data/site.yaml`

常见字段：
- `contactEmail`：加入页的 `{{contactEmail}}` 会自动替换为这里的邮箱
- `githubUrl`：页脚 GitHub 链接
- `meta.title/meta.description/meta.tagline`：中英 SEO 文案

### 2) 首页文案（Hero / Overview / Research 等）

编辑：
- 中文：`content/_index.zh.md`
- 英文：`content/_index.en.md`

首页采用 frontmatter（`---` 包裹部分）驱动，不需要改模板。

### 3) 加入页面（Join）

编辑：
- 中文：`content/join/_index.zh.md`
- 英文：`content/join/_index.en.md`

说明：
- 正文里可以写 `{{contactEmail}}`，构建时会替换成 `data/site.yaml` 的 `contactEmail`
- 邮件按钮文案/标题模板在 frontmatter：`email_subject_template`、`email_button_label`

### 4) 人员页面（People）

编辑（每个人 2 个文件，中英各一份）：
- `content/people/<id>.zh.md`
- `content/people/<id>.en.md`

头像资源：
- 放到：`static/people/xxx.png`
- 在 frontmatter 写：`photo: /people/xxx.png`

示例（`content/people/wei.zh.md`）：

```md
---
id: wei
role: wei   # wei / member
name: 邢炜
title: 导师
photo: /people/wei.png
github: https://github.com/xxx   # 可选
email: someone@example.com       # 可选
researchArea: AI for EDA         # 可选
year: 2024                       # 可选
---

这里写简介正文（Markdown）。
```

### 5) 新闻动态（News）

编辑（每条新闻 2 个文件，中英各一份）：
- `content/news/YYYY-MM-DD-slug.zh.md`
- `content/news/YYYY-MM-DD-slug.en.md`

示例：

```md
---
title: 网站上线
date: 2026-04-24
summary: 一句话摘要（列表页会显示）
---

正文（Markdown）。
```

### 6) 项目页面（Projects，单文件维护）

编辑：`data/projects.yaml`

每个项目在 `projects:` 下新增一段，支持 `zh/en` 双语：

```yaml
projects:
  - id: "proj-10"
    area: "EDA"      # EDA / LCA
    status: "ongoing"
    github: "#"
    lead:
      zh: "张三"
      en: "San Zhang"
    title:
      zh: "项目中文名"
      en: "Project Title"
    summary:
      zh: "中文简介"
      en: "English summary"
```

### 7) 论文页面（Publications，单文件维护）

编辑：`data/publications.yaml`

结构：

```yaml
publications:
  - id: iccad-2023-opt
    title: 'Design Space Folding: A "Free-lunch" ...'
    authors:
      - Alice
      - Bob
    venue: ICCAD
    year: 2023
    area: EDA
    link: https://...
```

## 常见坑（很重要）

1. YAML/Frontmatter 里如果值包含 `:` 或包含双引号，务必加引号。
   - 最稳妥：用单引号包起来，例如：
     - `mission_body: "People look beyond GPA: project experience ..."`
     - `title: 'A "Free-lunch" Add-on ...'`
2. 文件名区分中英：`.zh.md` / `.en.md`。只改中文就改 `.zh.md`，但建议两边同步维护。

