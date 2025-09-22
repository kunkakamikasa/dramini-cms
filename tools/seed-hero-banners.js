const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    // 创建示例轮播图
    const banners = [
      {
        title: 'Miss You After Goodbye',
        tagline: 'New season out now',
        backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop',
        href: '/title/miss-you-after-goodbye',
        order: 1,
        isActive: true
      },
      {
        title: 'Love in the City',
        tagline: 'Romance drama series',
        backdrop: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=600&fit=crop',
        href: '/title/love-in-the-city',
        order: 2,
        isActive: true
      },
      {
        title: 'Time Travel Romance',
        tagline: 'Fantasy meets love',
        backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop',
        href: '/title/time-travel-romance',
        order: 3,
        isActive: true
      }
    ]

    for (const bannerData of banners) {
      await prisma.heroBanner.upsert({
        where: { 
          title_order: { 
            title: bannerData.title, 
            order: bannerData.order 
          } 
        },
        update: {},
        create: bannerData
      })
    }

    console.log('✅ 轮播图示例数据创建成功')
  } catch (error) {
    console.error('❌ 创建轮播图数据失败:', error.message)
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())


