# JCIE 网站内容维护指南

## 编辑者怎么使用 Agent

在已连接本仓库、具备相应 GitHub 权限的 Codex 中，直接描述要新增、修改、删除或预览的内容。可明确调用 `$jcie-site-editor`。例如：

> 用 `$jcie-site-editor` 在内容专区新增视频《AI 赋能科研画图》，日期 2026-06-17，B 站链接……；生成中英文页面、检查构建，并发布到线上。

> 用 `$jcie-site-editor` 将某成员的职务和照片更新为附件中的内容，先给我看改动，暂不发布。

> `$jcie-site-editor` 可以帮我更新网站的哪些内容？需要我提供什么？

Agent 会根据任务编辑真实来源文件。编辑者无需记住代码路径，但应提供准确的标题、日期、人物与机构名称、链接、图片或正文，以及“发布到线上”还是“先预览”。缺少关键事实时，Agent 应询问；若英文稿由 Agent 翻译，应在交付时标明，供编辑者核对。“先预览”默认指本地构建并检查生成页面或改动，不会自动生成可分享的线上预览链接。

## 可以做什么

| 任务 | 资料来源 | 编辑者至少提供 |
| --- | --- | --- |
| 新增、修改、删除内容专区的视频、新闻、活动回顾 | `src/content/news/zh/` 与 `src/content/news/en/` 下成对的 Markdown 文件 | 标题、日期、正文或简介；视频还需公开的 B 站链接；有封面时提供图片 |
| 更新成员、导师及成员卡片 | `xlsx/site.xlsx` 的 `people` sheet；照片放在 `public/people/` | 姓名、身份、要修改的字段、可使用的照片 |
| 更新论文 | `xlsx/site.xlsx` 的 `publications` sheet | 论文题名、作者、年份、发表信息和链接 |
| 更新项目 | `xlsx/site.xlsx` 的 `projects` sheet；封面放在 `public/projects/` | 项目名称、负责人、领域、状态、双语简介及相关链接 |
| 更新优秀成员详情页 | `src/content/alumni/zh/` 与 `src/content/alumni/en/` | 人名、去向、成果与可核实的链接 |
| 修改首页、加入页面、站点联系信息 | `src/content/home/`、`src/content/join/`、`data/site.yaml` | 需要替换的准确文案或信息 |
| 预览、构建、发布和线上核对 | GitHub Actions 与 GitHub Pages | 明确是预览还是上线；上线需仓库写入权限 |

问“Agent 能做什么”时，可直接根据上表和下方边界回答，无需修改文件。

## 工作边界

- Agent 只有收到编辑请求才工作；目前没有监控共享文件夹或自动读取任意新资料的服务。`master` 收到提交后，GitHub Actions 才会自动构建并部署。
- Agent 可以整理编辑者提供的材料，但不会把无法核实的身份、论文成果、活动日期或视频内容写成确定事实。图片、视频等公开素材需由编辑者确认可发布。
- 添加内容前，Agent 会检查是否已有相同标题或 B 站 BV 号。已发布的内容会先核对线上页面；只有需要改动时才更新原条目，避免重复页面。单独一个视频链接不足以确定网站想显示的标题和日期。
- 网站嵌入已有 B 站视频链接，不负责上传视频到 B 站。构建成功证明页面生成，不保证每位访客的嵌入播放器都能播放；详情页保留直达 B 站的链接。
- 删除内容会使旧详情页链接返回 404。若已有外部引用，可单独要求保留页面或设计跳转；当前流程不会自动创建跳转。
- 页面改版、新功能、CMS、共享文件夹同步和批量解析 PDF/Word 属于开发任务，可以另行委托 Agent，不属于常规内容发布流程。
- Skill 规定工作流程，不授予 GitHub 权限，也不代替构建、部署和线上结果核对。

## 当前发布方式

成员、论文和项目由 `xlsx/site.xlsx` 驱动；视频、新闻、优秀成员详情、首页与加入页面保存在对应的 Markdown 文件中。Agent 会修改正确的来源，运行构建，检查受影响页面。明确要求上线时，提交并推送到 `master`；[部署工作流](.github/workflows/deploy.yml)随后构建 `dist/` 并发布到 GitHub Pages。编辑者也可以只要求本地修改或预览。

## 哪些内容改哪里
- 全站基础信息（站点名、联系邮箱、SEO 等）：`data/site.yaml`（手写）
- 首页文案（Hero/Overview/Research 等）：`src/content/home/zh.md`、`src/content/home/en.md`
- Join 页面：`src/content/join/zh.md`、`src/content/join/en.md`（正文可写 `{{contactEmail}}`，构建时会替换成 `data/site.yaml` 的值）
- 内容专区：`src/content/news/<lang>/*.md`（每条内容每种语言各一个 Markdown 文件；视频使用 `kind: video`、`bilibili_bvid` 和 `bilibili_url`）
- 优秀成员详情：`src/content/alumni/<lang>/*.md`
- People / Publications / Projects：只改 `xlsx/site.xlsx`（不要直接改 `data/people.yaml`、`data/publications.yaml`、`data/projects.yaml`）

## XLSX 规范（`xlsx/site.xlsx`）
包含 3 个 sheet：`people` / `publications` / `projects`。按列名解析，列可以调整顺序，但列名必须一致。

### Sheet: `people`
必填列：
- `id`（唯一）
- `role`（只允许：`mentor` / `member` / `alumni`）
- `name_en`、`name_zh`

推荐列：
- `title_en`、`title_zh`
- `join_year`（加入年份；整数或留空）
- `photo`（例如：`/people/xxx.png`）
- `bio_en`、`bio_zh`（Markdown 字符串）
- `is_outstanding`（空=FALSE；支持 TRUE/FALSE 或 1/0）
- `outstanding_order`（整数；可留空，导入时会自动补齐）
- `destination_en`、`destination_zh`（优秀学生去向；可留空）
- `pub_ids`（分号分隔的 publication id 列表；可留空）
- `domain`（`EDA` / `LCA`，可用分号组合）
- `homepage_url`、`scholar_url`、`github_url`（可留空）

说明：
- `pub_ids` 留空时，导入脚本会尝试根据 `publications.authors` 自动推断该成员的论文列表并填入 YAML（便于首页展示）。

### Sheet: `publications`
必填列：
- `id`、`title`、`venue`、`year`、`area`、`authors`、`link`

可选列：
- `type`、`note`

规则：
- `area` 只允许 `EDA` / `LCA`
- `authors` 用 `;` 分隔，允许混用 `people.id` 与外部作者姓名；命中 `people.id` 时导出为该人的 `name_en`

### Sheet: `projects`
必填列：
- `id`、`area`、`status`
- `github`、`start_year`（列名必须存在，单元格可以留空；`github` 留空时当前导入器写入 `#`）
- `lead_en`、`lead_zh`
- `title_en`、`title_zh`
- `summary_en`、`summary_zh`

可选列：
- `cover`（例如 `/projects/proj-1.jpg`）
- `body_en`、`body_zh`（项目详情正文）

规则：
- `area` 只允许 `EDA` / `LCA`
- `status` 只允许 `ongoing` / `completed`

## 本地可选操作（一般不需要）
如需在本地预览前先生成 YAML（CI 中会自动做）：
- `python scripts/import_xlsx.py xlsx/site.xlsx --root .`
