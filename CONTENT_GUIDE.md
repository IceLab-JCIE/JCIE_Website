# JCIE 网站内容维护指南（Hugo + 1 个 XLSX 驱动）

## 一句话
- 日常只需要修改 `xlsx/site.xlsx`，push 到 GitHub 后会在 CI 中自动解析并生成 `data/*.yaml`，再由 Hugo 构建部署。
- `News` / `Join` / 首页文案仍然用 `content/**/*.md` 手写维护。

## 哪些内容改哪里
- 全站基础信息（站点名、联系邮箱、SEO 等）：`data/site.yaml`（手写）
- 首页文案（Hero/Overview/Research 等）：`content/_index.zh.md`、`content/_index.en.md`
- Join 页面：`content/join/_index.zh.md`、`content/join/_index.en.md`（正文可写 `{{contactEmail}}`，构建时会替换成 `data/site.yaml` 的值）
- News：`content/news/*.md`（每条新闻一个 Markdown 文件）
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
- `id`、`area`、`status`、`github`
- `lead_en`、`lead_zh`
- `title_en`、`title_zh`
- `summary_en`、`summary_zh`
- `start_year`（开始年份；整数或留空）

规则：
- `area` 只允许 `EDA` / `LCA`
- `status` 只允许 `ongoing` / `completed`

## 本地可选操作（一般不需要）
如需在本地预览前先生成 YAML（CI 中会自动做）：
- `python scripts/import_xlsx.py xlsx/site.xlsx --root .`

