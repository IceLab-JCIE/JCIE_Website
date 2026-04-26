# JCIE GitHub 规范手册

> ## Changelog
>
> ### v1.2
>
> - 精简整体规范，移除 CI/CD 流水线配置（适用于非部署项目）
> - 移除 pre-commit 强制要求及代码规范工具链强制检查
> - 移除 Issue / PR 模板详细配置
> - 移除从零建立指南
> - 保留核心内容：目录结构、.gitignore、分支规范、Commit 格式、权限管理
>
> ### v1.0 (initial)
>
> - 初始版本发布

------

## 1. Organization 基本信息

| 项目              | 内容          |
| ----------------- | ------------- |
| Organization 名称 | `icelab-jcie` |
| 默认仓库可见性    | Private       |
| 成员默认权限      | Read          |

------

## 2. 仓库命名

格式：`jcie-{功能描述}`，全小写，用连字符，不超过 40 字符。

```
✅ jcie-netlist-parser
✅ jcie-lca-dashboard
```

------

## 3. 目录结构

参考以下结构，不需要的目录可以省略：

```
jcie-repo-name/
├── src/                  # 核心源代码
├── tests/                # 单元测试
├── docs/                 # 文档（说明、设计思路等）
├── notebooks/            # Jupyter 实验笔记本
├── scripts/              # 独立脚本（数据处理、工具等）
├── data/                 # 小型样本数据（禁止放原始数据集）
├── configs/              # 配置文件
├── requirements.txt      # 依赖
├── README.md             # 必须有
└── .gitignore            # 必须有
```

**要求：**

- `README.md` 必须存在，至少写清楚"这个项目是做什么的"和"怎么跑起来"

------

## 4. `.gitignore` 须包含的内容

```gitignore
# 模型与数据（体积太大，不入 Git）
*.pkl
*.h5
*.pt
*.ckpt
data/raw/
data/processed/

# 环境与密钥（绝对不能提交）
.env
.venv/
__pycache__/
*.pyc

# Notebook 输出（提交前清除）
.ipynb_checkpoints/

# 实验结果
outputs/
logs/
wandb/
mlruns/
```

------

## 5. 分支规范

| 分支              | 说明                                       | 保护                     |
| ----------------- | ------------------------------------------ | ------------------------ |
| `main` / `master` | 生产就绪，打 tag 发布                      | ✅ 强保护，需 2 人 review |
| `develop`         | 集成分支，所有功能合并入此                 | ✅ 需 1 人 review         |
| `others`          | 所有人的工作分支（feature/fix/experiment） | 无                       |

### 分支保护规则

**main 分支：**

- 禁止直接 push
- 需 2 名 Reviewer 审批
- 禁止 force push
- 只允许从 `develop` merge，不允许 `others/*` 直接 merge 到 `main`

**develop 分支：**

- 禁止直接 push
- 需 1 名 Reviewer 审批

**过期分支：** 合并后 7 天内由 branch owner 删除

## 6. 禁止提交的内容

- 任何 API Key 或密码
- 大型模型文件（`.pt` / `.pkl`，用 Git LFS 或外部存储）
- Notebook 带输出的版本（提交前手动清除，或用 `nbstripout`）

------

## 7. 权限结构

| 角色                        | 权限                |
| --------------------------- | ------------------- |
| Owner（President & Mentor） | 全部权限            |
| Maintainer（Leaders）       | 可合并 PR，管理标签 |
| Contributor（项目成员）     | 可创建分支与 PR     |
| Read-only（其他成员）       | 仅可查看            |

Teams 结构：

```
@icelab-jcie/maintainers   → Admin
@icelab-jcie/eda-core      → Write
@icelab-jcie/lca-core      → Write
@icelab-jcie/all-members   → Read
```

