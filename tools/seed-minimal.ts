import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function main() {
  try {
    // 创建分类
    const cat = await db.category.upsert({
      where: { slug: 'romance' }, 
      update: {}, 
      create: { 
        name: 'Romance', 
        slug: 'romance',
        order: 1
      }
    })

    // 创建管理员用户
    const adminUser = await db.user.upsert({
      where: { email: 'admin@dramini.com' },
      update: {},
      create: {
        email: 'admin@dramini.com',
        name: '系统管理员',
        provider: 'email'
      }
    })

    // 创建测试标题
    const t = await db.title.upsert({
      where: { slug: 'test-love' }, 
      update: {}, 
      create: {
        name: 'Test Love', 
        slug: 'test-love',
        synopsis: 'Minimal E2E title',
        previewImage: 'https://picsum.photos/1200/600?random=2',
        categoryId: cat.id,
        createdById: adminUser.id,
        updatedById: adminUser.id,
        status: 'PUBLISHED'
      }
    })

    // 创建集数
    await db.episode.upsert({
      where: { titleId_epNumber: { titleId: t.id, epNumber: 1 } }, 
      update: {},
      create: { 
        titleId: t.id, 
        epNumber: 1, 
        name: 'Ep1', 
        isFreePreview: true,
        status: 'PUBLISHED'
      }
    })

    await db.episode.upsert({
      where: { titleId_epNumber: { titleId: t.id, epNumber: 2 } }, 
      update: {},
      create: { 
        titleId: t.id, 
        epNumber: 2, 
        name: 'Ep2', 
        isFreePreview: true,
        status: 'PUBLISHED'
      }
    })

    console.log('✅ OK seed-minimal')
  } catch (error) {
    console.error('❌ 种子数据创建失败:', error.message)
  }
}

main().finally(() => process.exit(0))
