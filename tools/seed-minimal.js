const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    // 创建分类
    const cat = await prisma.category.upsert({
      where: { slug: 'romance' },
      update: {},
      create: { 
        name: 'Romance', 
        slug: 'romance',
        order: 1
      }
    })

    // 创建管理员用户
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@dramini.com' },
      update: {},
      create: {
        email: 'admin@dramini.com',
        name: '系统管理员',
        provider: 'email'
      }
    })

    // 创建测试标题
    const title = await prisma.title.upsert({
      where: { slug: 'test-love' },
      update: {},
      create: {
        name: 'Test Love',
        slug: 'test-love',
        synopsis: 'Minimal test title for E2E',
        previewImage: 'https://picsum.photos/1200/600?random=2',
        categoryId: cat.id,
        createdById: adminUser.id,
        updatedById: adminUser.id,
        status: 'PUBLISHED'
      }
    })

    // 创建集数
    const e1 = await prisma.episode.upsert({
      where: { titleId_epNumber: { titleId: title.id, epNumber: 1 } },
      update: {},
      create: {
        titleId: title.id, 
        epNumber: 1, 
        name: 'Ep1', 
        isFreePreview: true,
        status: 'PUBLISHED'
      }
    })

    const e2 = await prisma.episode.upsert({
      where: { titleId_epNumber: { titleId: title.id, epNumber: 2 } },
      update: {},
      create: {
        titleId: title.id, 
        epNumber: 2, 
        name: 'Ep2', 
        isFreePreview: true,
        status: 'PUBLISHED'
      }
    })

    console.log('✅ 最小内容创建成功:', { 
      title: title.slug, 
      episodes: [e1.epNumber, e2.epNumber],
      previewImage: title.previewImage ? '已设置' : '未设置'
    })
  } catch (error) {
    console.error('❌ 创建失败:', error.message)
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())


