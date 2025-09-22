import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function main() {
  try {
    // 创建分类
    const cat = await db.categories.upsert({
      where: { slug: 'romance' }, 
      update: {}, 
      create: {
        id: require('crypto').randomUUID(),
        name: 'Romance',
        slug: 'romance',
        order: 1,
        updatedAt: new Date()
      }
    })

    // 创建管理员用户
    const adminUser = await db.users.upsert({
      where: { email: 'admin@dramini.com' },
      update: {},
      create: {
        id: require('crypto').randomUUID(),
        email: 'admin@dramini.com',
        name: '系统管理员',
        provider: 'email',
        updatedAt: new Date()
      }
    })

    // 创建测试标题
    const t = await db.titles.upsert({
      where: { slug: 'test-love' }, 
      update: {}, 
      create: {
        id: require('crypto').randomUUID(),
        name: 'Test Love',
        slug: 'test-love',
        synopsis: 'Minimal E2E title',
        categoryId: cat.id,
        createdById: adminUser.id,
        updatedById: adminUser.id,
        status: 'PUBLISHED',
        updatedAt: new Date()
      }
    })

    // 创建集数
    await db.episodes.upsert({
      where: { titleId_epNumber: { titleId: t.id, epNumber: 1 } }, 
      update: {},
      create: {
        id: require('crypto').randomUUID(),
        titleId: t.id,
        epNumber: 1,
        name: 'Ep1',
        isFreePreview: true,
        status: 'PUBLISHED',
        updatedAt: new Date()
      }
    })

    await db.episodes.upsert({
      where: { titleId_epNumber: { titleId: t.id, epNumber: 2 } }, 
      update: {},
      create: {
        id: require('crypto').randomUUID(),
        titleId: t.id,
        epNumber: 2,
        name: 'Ep2',
        isFreePreview: true,
        status: 'PUBLISHED',
        updatedAt: new Date()
      }
    })

    console.log('✅ OK seed-minimal')
  } catch (error) {
    console.error('❌ 种子数据创建失败:', error.message)
  }
}

main().finally(() => process.exit(0))


