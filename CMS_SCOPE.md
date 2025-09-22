# Dramini CMS 职责范围说明

## 🎯 系统定位

Dramini CMS 是一个**纯管理后台系统**，专注于内容管理和运营管理，不直接服务前台用户。

## 📋 核心职责

### ✅ 保留功能
- **管理后台界面**: `/admin/*` 路由
- **管理 API**: `/api/admin/*` 接口
- **认证系统**: `/api/auth/*` 和 `/auth/*` 页面
- **健康检查**: `/api/health` 接口
- **数据库操作**: 所有 CRUD 操作写入共享 Postgres 数据库

### ❌ 移除功能
- **前台 API**: 不提供 `/api/public/*` 接口
- **前台页面**: 不提供用户端页面
- **直接数据服务**: 前台数据通过 content-api 获取

## 🏗️ 架构设计

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   前台应用       │    │   Content API   │    │   CMS 管理后台  │
│  (用户端)        │◄───┤   (数据服务)    │◄───┤   (内容管理)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              ▲
                              │
                       ┌─────────────────┐
                       │  共享数据库      │
                       │  (PostgreSQL)   │
                       └─────────────────┘
```

## 🔌 API 接口

### 管理后台 API (`/api/admin/*`)
- `GET /api/admin/dashboard/metrics` - 仪表板数据
- `GET /api/admin/titles` - 标题管理
- `POST /api/admin/titles` - 创建标题
- `GET /api/admin/categories` - 分类管理
- `GET /api/admin/tags` - 标签管理
- `GET /api/admin/commerce/purchases` - 订单管理
- `GET /api/admin/promotions` - 促销管理
- `GET /api/admin/operations/audit-logs` - 审计日志
- `GET /api/admin/operations/settings` - 系统设置

### 系统接口
- `GET /api/health` - 健康检查 (返回 `{ok: true}`)
- `POST /api/auth/signin` - 管理员登录
- `POST /api/auth/signout` - 管理员登出

## 🗄️ 数据库设计

### 共享数据库
- **数据库**: PostgreSQL
- **连接**: 通过 `DATABASE_URL` 环境变量
- **共享**: 与 content-api 使用同一数据库实例
- **Schema**: 保持与 content-api 一致

### 数据流向
1. **CMS 写入**: 管理员在 CMS 中创建/编辑内容
2. **数据库存储**: 数据写入共享 PostgreSQL
3. **Content API 读取**: 前台通过 content-api 获取数据
4. **前台展示**: 用户在前台看到最新内容

## 🔐 权限控制

### 访问控制
- **管理后台**: 需要管理员认证
- **API 接口**: 需要相应权限
- **健康检查**: 公开访问
- **认证接口**: 公开访问

### 权限矩阵
| 角色 | 内容管理 | 商务管理 | 运营管理 | 系统设置 |
|------|----------|----------|----------|----------|
| Admin | ✅ | ✅ | ✅ | ✅ |
| Editor | ✅ | ❌ | ❌ | ❌ |
| Producer | ✅ | ❌ | ✅ | ❌ |
| Finance | ❌ | ✅ | ❌ | ❌ |
| Viewer | 👁️ | 👁️ | 👁️ | ❌ |

## 🚀 部署配置

### 环境变量
```env
# 数据库 - 共享 Postgres 实例
DATABASE_URL="postgres://user:pass@host:5432/dramini_shared"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3001"

# 其他配置...
```

### 端口配置
- **CMS 管理后台**: 3001
- **Content API**: 3000 (或其他端口)
- **前台应用**: 3002 (或其他端口)

## 📊 监控与健康检查

### 健康检查
```bash
curl http://localhost:3001/api/health
# 返回: {"ok": true}
```

### 监控指标
- 服务可用性
- 数据库连接状态
- API 响应时间
- 错误率统计

## 🔄 数据同步

### 实时同步
- CMS 的所有数据变更都会立即写入数据库
- Content API 从数据库读取最新数据
- 前台用户看到的数据与 CMS 管理的数据保持一致

### 缓存策略
- CMS 不提供缓存层
- Content API 负责缓存策略
- 数据库作为唯一数据源

## 📝 开发指南

### 添加新功能
1. 在 CMS 中添加管理界面
2. 创建对应的 `/api/admin/*` 接口
3. 确保数据写入共享数据库
4. Content API 自动获取新数据

### 数据模型变更
1. 更新 Prisma schema
2. 运行数据库迁移
3. 更新 CMS 管理界面
4. Content API 自动支持新字段

## 🎯 总结

Dramini CMS 专注于：
- ✅ **内容管理**: 创建、编辑、发布内容
- ✅ **运营管理**: 用户、订单、促销管理
- ✅ **系统管理**: 权限、设置、审计
- ❌ **前台服务**: 不直接服务用户
- ❌ **数据 API**: 不提供前台数据接口

这种设计确保了：
- **职责清晰**: CMS 专注管理，Content API 专注服务
- **数据一致**: 单一数据源，避免同步问题
- **易于维护**: 各系统独立，便于扩展
- **性能优化**: 各系统可以独立优化
