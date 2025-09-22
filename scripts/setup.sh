#!/bin/bash

# Dramini CMS 快速设置脚本
# 用于快速部署和配置开发环境

set -e

echo "🚀 开始设置 Dramini CMS..."

# 检查 Node.js 版本
echo "📋 检查环境..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 版本过低，需要 18+，当前版本: $(node -v)"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"

# 检查 PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL 未安装，请先安装 PostgreSQL"
    echo "   Ubuntu/Debian: sudo apt install postgresql postgresql-contrib"
    echo "   macOS: brew install postgresql"
    echo "   CentOS/RHEL: sudo yum install postgresql-server postgresql-contrib"
fi

# 安装依赖
echo "📦 安装依赖包..."
npm install

# 检查环境变量文件
if [ ! -f ".env.local" ]; then
    echo "📝 创建环境变量文件..."
    cp env.example .env.local
    echo "✅ 已创建 .env.local 文件"
    echo "⚠️  请编辑 .env.local 文件，配置数据库连接和其他环境变量"
else
    echo "✅ 环境变量文件已存在"
fi

# 检查数据库连接
echo "🔍 检查数据库连接..."
if command -v psql &> /dev/null; then
    # 尝试连接数据库
    if psql -d "$DATABASE_URL" -c "SELECT 1;" &> /dev/null; then
        echo "✅ 数据库连接正常"
    else
        echo "⚠️  数据库连接失败，请检查 DATABASE_URL 配置"
        echo "   示例: postgres://user:password@localhost:5432/dramini_cms"
    fi
else
    echo "⚠️  PostgreSQL 客户端未安装，跳过数据库检查"
fi

# 生成 Prisma 客户端
echo "🔧 生成 Prisma 客户端..."
npx prisma generate

# 推送数据库模式
echo "🗄️  推送数据库模式..."
if npx prisma db push --accept-data-loss; then
    echo "✅ 数据库模式推送成功"
else
    echo "❌ 数据库模式推送失败"
    echo "   请检查数据库连接和权限"
fi

# 运行种子数据
echo "🌱 运行种子数据..."
if npx tsx prisma/seed.ts; then
    echo "✅ 种子数据创建成功"
else
    echo "❌ 种子数据创建失败"
fi

# 构建项目
echo "🏗️  构建项目..."
if npm run build; then
    echo "✅ 项目构建成功"
else
    echo "❌ 项目构建失败"
fi

echo ""
echo "🎉 Dramini CMS 设置完成！"
echo ""
echo "📋 下一步操作："
echo "   1. 编辑 .env.local 文件，配置环境变量"
echo "   2. 确保数据库服务正在运行"
echo "   3. 运行 'npm run dev' 启动开发服务器"
echo "   4. 访问 http://localhost:3001 查看应用"
echo ""
echo "🔑 默认登录信息："
echo "   邮箱: admin@dramini.com"
echo "   密码: admin123"
echo ""
echo "📚 更多信息请查看 README.md 文件"
