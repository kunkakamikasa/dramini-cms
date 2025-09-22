# Dramini CMS - 短剧平台管理后台

一个专注于管理后台的短剧平台内容管理系统，提供内容管理、用户权限、商务运营等功能。**不直接服务前台用户，前台数据通过 content-api 获取。**

## 🚀 功能特性

### 核心功能
- **内容管理**: 标题创建、集数管理、分类标签
- **权限系统**: 基于角色的访问控制 (RBAC)
- **商务管理**: 定价计划、促销活动、订单管理
- **运营工具**: 转码队列、举报处理、审计日志
- **数据分析**: 仪表板、统计报表

### 系统定位
- **纯管理后台**: 不直接服务前台用户
- **数据写入**: 所有变更写入共享 PostgreSQL 数据库
- **前台数据**: 通过 content-api 获取，确保数据一致性

### 技术特性
- **现代化技术栈**: Next.js 14 + TypeScript + Prisma
- **响应式设计**: 支持桌面和移动端
- **类型安全**: 完整的 TypeScript 类型定义
- **权限控制**: 细粒度的权限管理
- **审计追踪**: 完整的操作日志记录

## 🛠️ 技术栈

- **前端**: Next.js 14 (App Router), React 18, TypeScript
- **UI 组件**: shadcn/ui, Tailwind CSS
- **数据表格**: TanStack Table
- **图表**: Chart.js
- **认证**: NextAuth.js
- **数据库**: PostgreSQL + Prisma ORM
- **表单验证**: Zod
- **状态管理**: TanStack Query

## 📦 安装和运行

### 环境要求
- Node.js 18+
- PostgreSQL 12+
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd DraminiCMS
```

2. **安装依赖**
```bash
npm install
```

3. **环境配置**
```bash
cp env.example .env.local
```

编辑 `.env.local` 文件，配置数据库连接和其他环境变量：

```env
# 数据库
DATABASE_URL="postgres://user:pass@localhost:5432/dramini_cms"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3001"

# 其他配置...
```

4. **数据库设置**
```bash
# 推送数据库模式
npm run db:push

# 运行种子数据
npm run db:seed
```

5. **启动开发服务器**
```bash
npm run dev
```

访问 http://localhost:3001 查看应用。

### 默认账户
- 邮箱: `admin@dramini.com`
- 密码: `admin123`

## 📁 项目结构

```
├── app/                    # Next.js App Router
│   ├── admin/             # 管理后台页面
│   ├── api/               # API 路由
│   ├── auth/              # 认证页面
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── admin/             # 管理后台组件
│   └── ui/                # 基础 UI 组件
├── lib/                   # 工具库
│   ├── auth.ts            # 认证配置
│   ├── prisma.ts          # 数据库客户端
│   ├── permissions.ts     # 权限管理
│   └── utils.ts           # 工具函数
├── prisma/                # 数据库相关
│   ├── schema.prisma      # 数据模型
│   └── seed.ts            # 种子数据
├── types/                 # TypeScript 类型定义
└── middleware.ts          # Next.js 中间件
```

## 🔐 权限系统

系统采用基于角色的访问控制 (RBAC)：

### 角色定义
- **Admin**: 系统管理员，拥有所有权限
- **Editor**: 内容编辑，可创建和编辑内容
- **Producer**: 制作人，负责媒体上传和转码
- **Finance**: 财务，管理定价和订单
- **Viewer**: 只读用户，仅能查看数据

### 权限列表
- `admin:all` - 管理员全权限
- `content:create` - 创建内容
- `content:edit` - 编辑内容
- `content:publish` - 发布内容
- `media:upload` - 上传媒体
- `finance:view` - 查看财务
- `finance:manage` - 管理财务
- `user:manage` - 用户管理
- `system:settings` - 系统设置

## 📊 数据模型

### 核心实体
- **User**: 用户信息
- **Title**: 短剧标题
- **Episode**: 集数信息
- **Category**: 分类
- **Tag**: 标签
- **AssetImage/AssetVideo**: 媒体资源
- **Purchase**: 购买记录
- **Subscription**: 订阅信息
- **AuditLog**: 审计日志

详细的数据模型请查看 `prisma/schema.prisma` 文件。

## 🚀 部署

### Vercel 部署 (推荐)

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 连接 PostgreSQL 数据库
5. 部署

### Docker 部署

```bash
# 构建镜像
docker build -t dramini-cms .

# 运行容器
docker run -p 3001:3001 dramini-cms
```

### 传统服务器部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 🔧 开发指南

### 添加新功能

1. **创建数据模型**: 在 `prisma/schema.prisma` 中定义
2. **生成迁移**: `npm run db:migrate`
3. **创建 API 路由**: 在 `app/api/` 下添加
4. **创建页面组件**: 在 `app/admin/` 下添加
5. **添加权限控制**: 在相关 API 和组件中检查权限

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 组件使用函数式组件 + Hooks
- API 路由使用 Route Handlers
- 数据库操作使用 Prisma

### 测试

```bash
# 运行类型检查
npm run type-check

# 运行代码检查
npm run lint
```

## 📝 API 文档

### 认证相关
- `POST /api/auth/signin` - 用户登录
- `POST /api/auth/signout` - 用户登出

### 管理后台 API
- `GET /api/admin/dashboard/metrics` - 仪表板数据
- `GET /api/admin/titles` - 获取标题列表
- `POST /api/admin/titles` - 创建标题
- `GET /api/admin/titles/:id` - 获取标题详情
- `PATCH /api/admin/titles/:id` - 更新标题
- `DELETE /api/admin/titles/:id` - 删除标题

更多 API 详情请查看 `app/api/` 目录下的实现。

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持

如果您遇到问题或有任何疑问，请：

1. 查看 [Issues](../../issues) 中是否有类似问题
2. 创建新的 Issue 描述您的问题
3. 联系开发团队

## 🔮 未来计划

- [ ] 国际化支持
- [ ] 移动端 App
- [ ] 高级数据分析
- [ ] 工作流自动化
- [ ] 第三方集成
- [ ] 性能优化

---

**Dramini CMS** - 让短剧内容管理更简单 🎬
