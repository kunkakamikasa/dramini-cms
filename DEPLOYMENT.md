# Dramini CMS 部署指南

本指南将帮助您部署 Dramini CMS 短剧平台管理后台到生产环境。

## 🚀 快速部署 (Vercel)

### 1. 准备代码仓库
```bash
# 将代码推送到 GitHub
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. 在 Vercel 中部署
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 导入您的 GitHub 仓库
4. 配置项目设置：
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. 配置环境变量
在 Vercel 项目设置中添加以下环境变量：

```env
# 数据库
DATABASE_URL="postgres://user:pass@host:5432/dramini_cms"

# NextAuth
NEXTAUTH_SECRET="your-production-secret-key"
NEXTAUTH_URL="https://your-domain.vercel.app"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# 文件存储
S3_ENDPOINT="your-s3-endpoint"
S3_BUCKET="your-s3-bucket"
S3_ACCESS_KEY="your-s3-access-key"
S3_SECRET_KEY="your-s3-secret-key"

# 支付服务
STRIPE_SECRET_KEY="sk_live_..."
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_SECRET="your-paypal-secret"

# CDN
CDN_BASE_URL="https://your-cdn-domain.com"
```

### 4. 部署
点击 "Deploy" 按钮，Vercel 将自动构建和部署您的应用。

## 🐳 Docker 部署

### 1. 创建 Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001

ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. 创建 docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/dramini_cms
      - NEXTAUTH_SECRET=your-secret-key
      - NEXTAUTH_URL=http://localhost:3001
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=dramini_cms
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

volumes:
  postgres_data:
```

### 3. 构建和运行
```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 运行数据库迁移
docker-compose exec app npm run db:push

# 运行种子数据
docker-compose exec app npm run db:seed
```

## 🖥️ 传统服务器部署

### 1. 服务器要求
- Ubuntu 20.04+ 或 CentOS 8+
- Node.js 18+
- PostgreSQL 12+
- Nginx (可选，用于反向代理)
- PM2 (进程管理)

### 2. 安装依赖
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm postgresql postgresql-contrib nginx

# CentOS/RHEL
sudo yum install nodejs npm postgresql-server postgresql-contrib nginx
```

### 3. 配置 PostgreSQL
```bash
# 创建数据库和用户
sudo -u postgres psql
CREATE DATABASE dramini_cms;
CREATE USER dramini_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE dramini_cms TO dramini_user;
\q
```

### 4. 部署应用
```bash
# 克隆代码
git clone <your-repo-url> /var/www/dramini-cms
cd /var/www/dramini-cms

# 安装依赖
npm install

# 配置环境变量
cp env.example .env.local
# 编辑 .env.local 文件

# 构建应用
npm run build

# 运行数据库迁移
npm run db:push
npm run db:seed
```

### 5. 配置 PM2
```bash
# 安装 PM2
npm install -g pm2

# 创建 PM2 配置文件
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'dramini-cms',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/dramini-cms',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
}
EOF

# 启动应用
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6. 配置 Nginx (可选)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔧 生产环境配置

### 1. 数据库优化
```sql
-- 创建索引优化查询性能
CREATE INDEX CONCURRENTLY idx_titles_status ON titles(status);
CREATE INDEX CONCURRENTLY idx_titles_category ON titles(category_id);
CREATE INDEX CONCURRENTLY idx_episodes_title ON episodes(title_id);
CREATE INDEX CONCURRENTLY idx_purchases_user ON purchases(user_id);
CREATE INDEX CONCURRENTLY idx_purchases_status ON purchases(status);
CREATE INDEX CONCURRENTLY idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX CONCURRENTLY idx_audit_logs_created ON audit_logs(created_at);
```

### 2. 环境变量检查清单
- [ ] `DATABASE_URL` - 生产数据库连接
- [ ] `NEXTAUTH_SECRET` - 强随机密钥
- [ ] `NEXTAUTH_URL` - 正确的域名
- [ ] OAuth 提供商配置
- [ ] 文件存储配置
- [ ] 支付服务配置
- [ ] CDN 配置

### 3. 安全配置
```bash
# 设置防火墙
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# 配置 SSL 证书 (使用 Let's Encrypt)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 4. 监控和日志
```bash
# 安装监控工具
npm install -g pm2-logrotate

# 配置日志轮转
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

## 📊 性能优化

### 1. 数据库连接池
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 2. 缓存配置
```typescript
// 使用 Redis 缓存 (可选)
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

export { redis }
```

### 3. CDN 配置
```typescript
// 配置静态资源 CDN
const CDN_BASE_URL = process.env.CDN_BASE_URL || ''

export function getCDNUrl(path: string) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${CDN_BASE_URL}/${path.replace(/^\//, '')}`
}
```

## 🔍 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查 `DATABASE_URL` 是否正确
   - 确认数据库服务是否运行
   - 检查网络连接和防火墙设置

2. **认证问题**
   - 确认 `NEXTAUTH_SECRET` 已设置
   - 检查 `NEXTAUTH_URL` 是否匹配域名
   - 验证 OAuth 提供商配置

3. **文件上传失败**
   - 检查 S3 配置和权限
   - 确认文件大小限制
   - 验证网络连接

4. **性能问题**
   - 检查数据库查询性能
   - 启用查询日志分析
   - 考虑添加缓存层

### 日志查看
```bash
# PM2 日志
pm2 logs dramini-cms

# Nginx 日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# 系统日志
sudo journalctl -u nginx -f
```

## 📈 扩展部署

### 水平扩展
```yaml
# docker-compose.yml 多实例配置
version: '3.8'

services:
  app1:
    build: .
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/dramini_cms
    depends_on:
      - db

  app2:
    build: .
    ports:
      - "3002:3001"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/dramini_cms
    depends_on:
      - db

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app1
      - app2
```

### 负载均衡配置
```nginx
upstream dramini_backend {
    server app1:3001;
    server app2:3001;
}

server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://dramini_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🚀 自动化部署

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/dramini-cms
            git pull origin main
            npm ci
            npm run build
            pm2 restart dramini-cms
```

---

## 📞 支持

如果在部署过程中遇到问题，请：

1. 查看本文档的故障排除部分
2. 检查 [GitHub Issues](../../issues)
3. 联系技术支持团队

祝您部署顺利！🎉
