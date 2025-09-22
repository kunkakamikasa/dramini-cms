# Dramini CMS 开发指南

本指南将帮助开发者了解项目结构、开发流程和最佳实践。

## 📁 项目结构

```
DraminiCMS/
├── app/                          # Next.js App Router
│   ├── admin/                    # 管理后台页面
│   │   ├── dashboard/           # 仪表板
│   │   ├── titles/              # 标题管理
│   │   ├── categories/          # 分类管理
│   │   ├── tags/                # 标签管理
│   │   ├── commerce/            # 商务管理
│   │   ├── promotions/          # 促销管理
│   │   └── operations/          # 运营管理
│   ├── api/                     # API 路由
│   │   ├── auth/                # 认证相关
│   │   └── admin/                # 管理后台 API
│   ├── auth/                    # 认证页面
│   ├── globals.css              # 全局样式
│   ├── layout.tsx               # 根布局
│   ├── page.tsx                 # 首页
│   └── providers.tsx            # 全局提供者
├── components/                   # React 组件
│   ├── admin/                   # 管理后台组件
│   │   ├── sidebar.tsx          # 侧边栏
│   │   └── header.tsx           # 头部
│   └── ui/                      # 基础 UI 组件
│       ├── button.tsx           # 按钮
│       ├── input.tsx            # 输入框
│       ├── card.tsx             # 卡片
│       ├── badge.tsx            # 徽章
│       ├── avatar.tsx            # 头像
│       └── dropdown-menu.tsx     # 下拉菜单
├── lib/                         # 工具库
│   ├── auth.ts                  # 认证配置
│   ├── prisma.ts                # 数据库客户端
│   ├── permissions.ts           # 权限管理
│   └── utils.ts                 # 工具函数
├── prisma/                      # 数据库相关
│   ├── schema.prisma            # 数据模型
│   └── seed.ts                  # 种子数据
├── types/                       # TypeScript 类型
│   └── index.ts                 # 类型定义
├── scripts/                     # 脚本文件
│   └── setup.sh                 # 快速设置脚本
├── middleware.ts                # Next.js 中间件
├── next.config.js              # Next.js 配置
├── tailwind.config.js          # Tailwind CSS 配置
├── tsconfig.json               # TypeScript 配置
├── package.json                # 项目依赖
├── README.md                   # 项目说明
├── DEPLOYMENT.md               # 部署指南
└── DEVELOPMENT.md              # 开发指南
```

## 🛠️ 开发环境设置

### 1. 环境要求
- Node.js 18+
- PostgreSQL 12+
- npm 或 yarn

### 2. 快速开始
```bash
# 克隆项目
git clone <repository-url>
cd DraminiCMS

# 运行快速设置脚本
chmod +x scripts/setup.sh
./scripts/setup.sh

# 或手动设置
npm install
cp env.example .env.local
# 编辑 .env.local 文件
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

### 3. 开发服务器
```bash
# 启动开发服务器
npm run dev

# 访问应用
open http://localhost:3001
```

## 🏗️ 架构设计

### 1. 技术栈
- **前端**: Next.js 14 (App Router) + React 18 + TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **状态管理**: TanStack Query
- **表单**: React Hook Form + Zod
- **表格**: TanStack Table
- **图表**: Chart.js
- **认证**: NextAuth.js
- **数据库**: PostgreSQL + Prisma ORM

### 2. 设计模式
- **组件化**: 可复用的 UI 组件
- **类型安全**: 完整的 TypeScript 类型定义
- **权限控制**: 基于角色的访问控制 (RBAC)
- **API 设计**: RESTful API 设计
- **数据验证**: Zod 模式验证

### 3. 目录约定
- `app/` - Next.js App Router 页面和 API
- `components/` - React 组件
- `lib/` - 工具函数和配置
- `types/` - TypeScript 类型定义
- `prisma/` - 数据库相关文件

## 🔧 开发工作流

### 1. 创建新功能
```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 开发功能
# - 创建数据模型 (prisma/schema.prisma)
# - 生成迁移 (npx prisma migrate dev)
# - 创建 API 路由 (app/api/)
# - 创建页面组件 (app/admin/)
# - 添加类型定义 (types/)

# 3. 测试功能
npm run type-check
npm run lint

# 4. 提交代码
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 5. 创建 Pull Request
```

### 2. 数据库开发
```bash
# 修改数据模型
vim prisma/schema.prisma

# 生成迁移
npx prisma migrate dev --name add_new_table

# 更新 Prisma 客户端
npx prisma generate

# 查看数据库
npx prisma studio
```

### 3. API 开发
```typescript
// app/api/admin/example/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { requirePermission } from '@/lib/permissions'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await requirePermission('admin:all')

    // 业务逻辑
    const data = await prisma.example.findMany()

    return NextResponse.json({
      success: true,
      data
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: '操作失败' } },
      { status: 500 }
    )
  }
}
```

### 4. 组件开发
```typescript
// components/admin/example-component.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ExampleComponentProps {
  title: string
  onAction?: () => void
}

export function ExampleComponent({ title, onAction }: ExampleComponentProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = async () => {
    setIsLoading(true)
    try {
      await onAction?.()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleAction} disabled={isLoading}>
          {isLoading ? '处理中...' : '执行操作'}
        </Button>
      </CardContent>
    </Card>
  )
}
```

## 🎨 UI 开发指南

### 1. 使用 shadcn/ui 组件
```typescript
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// 使用组件
<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
  </CardHeader>
  <CardContent>
    <Input placeholder="输入内容" />
    <Button>提交</Button>
  </CardContent>
</Card>
```

### 2. 样式约定
```typescript
// 使用 Tailwind CSS 类名
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
  <h2 className="text-lg font-semibold text-gray-900">标题</h2>
  <Button variant="outline" size="sm">操作</Button>
</div>

// 使用 cn 工具函数合并类名
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className
)}>
  内容
</div>
```

### 3. 响应式设计
```typescript
// 使用 Tailwind 响应式前缀
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="col-span-1 md:col-span-2 lg:col-span-1">
    内容
  </div>
</div>
```

## 🔐 权限系统

### 1. 权限检查
```typescript
import { requirePermission, checkPermission } from '@/lib/permissions'

// 在 API 路由中
export async function POST(request: NextRequest) {
  await requirePermission('content:create')
  // 业务逻辑
}

// 在组件中
const hasPermission = await checkPermission('content:edit')
if (!hasPermission) {
  return <div>权限不足</div>
}
```

### 2. 角色管理
```typescript
// 检查用户角色
import { checkRole } from '@/lib/permissions'

const isAdmin = await checkRole('Admin')
const isEditor = await checkRole('Editor')
```

### 3. 权限常量
```typescript
import { PERMISSIONS, ROLES } from '@/lib/permissions'

// 使用权限常量
await requirePermission(PERMISSIONS.CONTENT_CREATE)
await checkRole(ROLES.ADMIN)
```

## 📊 数据管理

### 1. Prisma 查询
```typescript
import { prisma } from '@/lib/prisma'

// 简单查询
const titles = await prisma.title.findMany({
  where: { status: 'PUBLISHED' },
  include: {
    category: true,
    tags: {
      include: {
        tag: true
      }
    }
  }
})

// 分页查询
const titles = await prisma.title.findMany({
  skip: (page - 1) * limit,
  take: limit,
  orderBy: { createdAt: 'desc' }
})

// 聚合查询
const stats = await prisma.title.aggregate({
  _count: { id: true },
  where: { status: 'PUBLISHED' }
})
```

### 2. 数据验证
```typescript
import { z } from 'zod'

const createTitleSchema = z.object({
  name: z.string().min(1, '标题名称不能为空'),
  slug: z.string().min(1, 'URL别名不能为空'),
  synopsis: z.string().optional(),
  categoryId: z.string().optional()
})

// 验证数据
const validatedData = createTitleSchema.parse(requestBody)
```

### 3. 审计日志
```typescript
// 记录操作日志
await prisma.auditLog.create({
  data: {
    actorUserId: session.user.id,
    action: 'CREATE',
    entity: 'Title',
    entityId: title.id,
    afterJson: title,
    ip: request.headers.get('x-forwarded-for') || 'unknown'
  }
})
```

## 🧪 测试指南

### 1. 类型检查
```bash
npm run type-check
```

### 2. 代码检查
```bash
npm run lint
```

### 3. 单元测试 (可选)
```typescript
// __tests__/utils.test.ts
import { formatCurrency, formatDate } from '@/lib/utils'

describe('Utils', () => {
  test('formatCurrency', () => {
    expect(formatCurrency(1000, 'CNY')).toBe('¥10.00')
  })

  test('formatDate', () => {
    const date = new Date('2024-01-01')
    expect(formatDate(date)).toContain('2024')
  })
})
```

## 🚀 性能优化

### 1. 数据库优化
```typescript
// 使用索引
CREATE INDEX CONCURRENTLY idx_titles_status ON titles(status);

// 批量操作
await prisma.title.createMany({
  data: titlesData
})

// 使用 select 减少数据传输
const titles = await prisma.title.findMany({
  select: {
    id: true,
    name: true,
    status: true
  }
})
```

### 2. 前端优化
```typescript
// 使用 React.memo
export const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data.name}</div>
})

// 使用 useMemo
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

// 使用 useCallback
const handleClick = useCallback(() => {
  onAction()
}, [onAction])
```

### 3. API 优化
```typescript
// 使用缓存
export const revalidate = 3600 // 1小时缓存

// 使用流式响应
export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      // 流式数据
    }
  })
  
  return new Response(stream)
}
```

## 🐛 调试指南

### 1. 开发工具
```bash
# 查看数据库
npx prisma studio

# 查看日志
npm run dev

# 调试模式
NODE_ENV=development npm run dev
```

### 2. 常见问题
- **数据库连接失败**: 检查 `DATABASE_URL` 配置
- **认证问题**: 检查 `NEXTAUTH_SECRET` 和 `NEXTAUTH_URL`
- **权限错误**: 检查用户角色和权限配置
- **构建失败**: 检查 TypeScript 类型错误

### 3. 日志记录
```typescript
// 使用 console.log (开发环境)
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data)
}

// 使用错误日志
console.error('Error:', error)
```

## 📝 代码规范

### 1. 命名约定
- **文件**: kebab-case (`user-profile.tsx`)
- **组件**: PascalCase (`UserProfile`)
- **函数**: camelCase (`getUserData`)
- **常量**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **类型**: PascalCase (`UserData`)

### 2. 代码组织
```typescript
// 1. 导入顺序
import React from 'react'
import { NextRequest, NextResponse } from 'next/server'

import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { requirePermission } from '@/lib/permissions'

// 2. 类型定义
interface ComponentProps {
  title: string
  onAction?: () => void
}

// 3. 组件定义
export function Component({ title, onAction }: ComponentProps) {
  // 4. 状态和钩子
  const [isLoading, setIsLoading] = useState(false)
  
  // 5. 事件处理函数
  const handleAction = async () => {
    // 处理逻辑
  }
  
  // 6. 渲染
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### 3. 注释规范
```typescript
/**
 * 创建新的标题
 * @param data 标题数据
 * @returns 创建的标题信息
 */
export async function createTitle(data: CreateTitleData): Promise<Title> {
  // 验证数据
  const validatedData = createTitleSchema.parse(data)
  
  // 创建标题
  const title = await prisma.title.create({
    data: validatedData
  })
  
  return title
}
```

## 🔄 版本控制

### 1. Git 工作流
```bash
# 功能开发
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 创建 Pull Request
# 代码审查
# 合并到主分支
```

### 2. 提交信息规范
```
feat: 新功能
fix: 修复问题
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建过程或辅助工具的变动
```

### 3. 分支策略
- `main` - 主分支，生产环境代码
- `develop` - 开发分支，集成测试
- `feature/*` - 功能分支
- `hotfix/*` - 热修复分支

---

## 📞 支持

如果在开发过程中遇到问题，请：

1. 查看本文档的相关章节
2. 检查 [GitHub Issues](../../issues)
3. 联系开发团队

祝您开发愉快！🎉


