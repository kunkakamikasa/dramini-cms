import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 开始种子数据...')

  // 创建权限
  const permissions = await Promise.all([
    prisma.permission.upsert({
      where: { key: 'admin:all' },
      update: {},
      create: {
        key: 'admin:all',
        name: '管理员全权限',
        description: '拥有所有权限'
      }
    }),
    prisma.permission.upsert({
      where: { key: 'content:create' },
      update: {},
      create: {
        key: 'content:create',
        name: '创建内容',
        description: '创建标题和集数'
      }
    }),
    prisma.permission.upsert({
      where: { key: 'content:edit' },
      update: {},
      create: {
        key: 'content:edit',
        name: '编辑内容',
        description: '编辑标题和集数'
      }
    }),
    prisma.permission.upsert({
      where: { key: 'content:publish' },
      update: {},
      create: {
        key: 'content:publish',
        name: '发布内容',
        description: '发布和审核内容'
      }
    }),
    prisma.permission.upsert({
      where: { key: 'media:upload' },
      update: {},
      create: {
        key: 'media:upload',
        name: '上传媒体',
        description: '上传图片和视频'
      }
    }),
    prisma.permission.upsert({
      where: { key: 'finance:view' },
      update: {},
      create: {
        key: 'finance:view',
        name: '查看财务',
        description: '查看订单和订阅'
      }
    }),
    prisma.permission.upsert({
      where: { key: 'finance:manage' },
      update: {},
      create: {
        key: 'finance:manage',
        name: '管理财务',
        description: '管理定价和促销'
      }
    }),
    prisma.permission.upsert({
      where: { key: 'user:manage' },
      update: {},
      create: {
        key: 'user:manage',
        name: '用户管理',
        description: '管理用户和权限'
      }
    }),
    prisma.permission.upsert({
      where: { key: 'system:settings' },
      update: {},
      create: {
        key: 'system:settings',
        name: '系统设置',
        description: '管理系统设置'
      }
    })
  ])

  // 创建角色
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: '系统管理员'
    }
  })

  const editorRole = await prisma.role.upsert({
    where: { name: 'Editor' },
    update: {},
    create: {
      name: 'Editor',
      description: '内容编辑'
    }
  })

  const producerRole = await prisma.role.upsert({
    where: { name: 'Producer' },
    update: {},
    create: {
      name: 'Producer',
      description: '制作人'
    }
  })

  const financeRole = await prisma.role.upsert({
    where: { name: 'Finance' },
    update: {},
    create: {
      name: 'Finance',
      description: '财务'
    }
  })

  const viewerRole = await prisma.role.upsert({
    where: { name: 'Viewer' },
    update: {},
    create: {
      name: 'Viewer',
      description: '只读用户'
    }
  })

  // 分配权限给角色
  await Promise.all([
    // Admin 拥有所有权限
    ...permissions.map(p => 
      prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: adminRole.id, permissionId: p.id } },
        update: {},
        create: {
          roleId: adminRole.id,
          permissionId: p.id
        }
      })
    ),
    // Editor 权限
    prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: editorRole.id, permissionId: permissions[1].id } },
      update: {},
      create: { roleId: editorRole.id, permissionId: permissions[1].id }
    }),
    prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: editorRole.id, permissionId: permissions[2].id } },
      update: {},
      create: { roleId: editorRole.id, permissionId: permissions[2].id }
    }),
    prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: editorRole.id, permissionId: permissions[3].id } },
      update: {},
      create: { roleId: editorRole.id, permissionId: permissions[3].id }
    }),
    // Producer 权限
    prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: producerRole.id, permissionId: permissions[4].id } },
      update: {},
      create: { roleId: producerRole.id, permissionId: permissions[4].id }
    }),
    // Finance 权限
    prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: financeRole.id, permissionId: permissions[5].id } },
      update: {},
      create: { roleId: financeRole.id, permissionId: permissions[5].id }
    }),
    prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: financeRole.id, permissionId: permissions[6].id } },
      update: {},
      create: { roleId: financeRole.id, permissionId: permissions[6].id }
    })
  ])

  // 创建管理员用户
  const adminUser = await prisma.users.upsert({
    where: { email: 'admin@dramini.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      email: 'admin@dramini.com',
      name: '系统管理员',
      provider: 'email',
      updatedAt: new Date()
    }
  })

  // 分配管理员角色
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: adminUser.id, roleId: adminRole.id } },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id
    }
  })

  // 创建分类
  const categories = await Promise.all([
    prisma.categories.upsert({
      where: { slug: 'romance' },
      update: {},
      create: {
        id: crypto.randomUUID(),
        slug: 'romance',
        name: '浪漫爱情',
        order: 1,
        updatedAt: new Date()
      }
    }),
    prisma.categories.upsert({
      where: { slug: 'drama' },
      update: {},
      create: {
        id: crypto.randomUUID(),
        slug: 'drama',
        name: '都市情感',
        order: 2,
        updatedAt: new Date()
      }
    }),
    prisma.categories.upsert({
      where: { slug: 'fantasy' },
      update: {},
      create: {
        id: crypto.randomUUID(),
        slug: 'fantasy',
        name: '奇幻玄幻',
        order: 3,
        updatedAt: new Date()
      }
    }),
    prisma.categories.upsert({
      where: { slug: 'comedy' },
      update: {},
      create: {
        id: crypto.randomUUID(),
        slug: 'comedy',
        name: '喜剧搞笑',
        order: 4,
        updatedAt: new Date()
      }
    })
  ])

  // 创建标签
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'sweet-love' },
      update: {},
      create: {
        slug: 'sweet-love',
        name: '甜宠'
      }
    }),
    prisma.tag.upsert({
      where: { slug: 'ceo-romance' },
      update: {},
      create: {
        slug: 'ceo-romance',
        name: '总裁文'
      }
    }),
    prisma.tag.upsert({
      where: { slug: 'time-travel' },
      update: {},
      create: {
        slug: 'time-travel',
        name: '穿越'
      }
    }),
    prisma.tag.upsert({
      where: { slug: 'rebirth' },
      update: {},
      create: {
        slug: 'rebirth',
        name: '重生'
      }
    })
  ])

  // 创建示例标题
  const title1 = await prisma.titles.create({
    data: {
      id: crypto.randomUUID(),
      slug: 'ceo-sweet-wife',
      name: '总裁的甜心小娇妻',
      synopsis: '一场意外让普通女孩苏晚晚成为了霸道总裁顾景深的妻子，从此开始了甜蜜的婚后生活...',
      status: 'PUBLISHED',
      language: 'zh',
      createdById: adminUser.id,
      updatedById: adminUser.id,
      categoryId: categories[0].id,
      rating: 4.8,
      featuredWeight: 100,
      releaseAt: new Date(),
      updatedAt: new Date()
    }
  })

  const title2 = await prisma.titles.create({
    data: {
      id: crypto.randomUUID(),
      slug: 'time-travel-princess',
      name: '穿越之公主驾到',
      synopsis: '现代女孩意外穿越到古代成为公主，凭借现代知识在古代宫廷中闯出一片天地...',
      status: 'PUBLISHED',
      language: 'zh',
      createdById: adminUser.id,
      updatedById: adminUser.id,
      categoryId: categories[2].id,
      rating: 4.6,
      featuredWeight: 90,
      releaseAt: new Date(),
      updatedAt: new Date()
    }
  })

  // 关联标签
  await Promise.all([
    prisma.titleTag.create({
      data: {
        titleId: title1.id,
        tagId: tags[0].id
      }
    }),
    prisma.titleTag.create({
      data: {
        titleId: title1.id,
        tagId: tags[1].id
      }
    }),
    prisma.titleTag.create({
      data: {
        titleId: title2.id,
        tagId: tags[2].id
      }
    })
  ])

  // 创建示例集数
  const episodes1 = await Promise.all([
    prisma.episodes.create({
      data: {
        id: crypto.randomUUID(),
        titleId: title1.id,
        epNumber: 1,
        name: '意外相遇',
        durationSec: 300,
        isFreePreview: true,
        lockType: 'PAID_PER_EPISODE',
        priceCents: 100,
        status: 'PUBLISHED',
        updatedAt: new Date()
      }
    }),
    prisma.episodes.create({
      data: {
        id: require('crypto').randomUUID(),
        titleId: title1.id,
        epNumber: 2,
        name: '契约婚姻',
        durationSec: 320,
        isFreePreview: true,
        lockType: 'PAID_PER_EPISODE',
        priceCents: 100,
        status: 'PUBLISHED',
        updatedAt: new Date()
      }
    }),
    prisma.episodes.create({
      data: {
        id: require('crypto').randomUUID(),
        titleId: title1.id,
        epNumber: 3,
        name: '甜蜜日常',
        durationSec: 310,
        isFreePreview: true,
        lockType: 'PAID_PER_EPISODE',
        priceCents: 100,
        status: 'PUBLISHED',
        updatedAt: new Date()
      }
    }),
    prisma.episodes.create({
      data: {
        id: require('crypto').randomUUID(),
        titleId: title1.id,
        epNumber: 4,
        name: '醋意大发',
        durationSec: 330,
        isFreePreview: false,
        lockType: 'PAID_PER_EPISODE',
        priceCents: 100,
        status: 'PUBLISHED',
        updatedAt: new Date()
      }
    }),
    prisma.episodes.create({
      data: {
        id: require('crypto').randomUUID(),
        titleId: title1.id,
        epNumber: 5,
        name: '真心告白',
        durationSec: 340,
        isFreePreview: false,
        lockType: 'PAID_PER_EPISODE',
        priceCents: 100,
        status: 'PUBLISHED',
        updatedAt: new Date()
      }
    })
  ])

  const episodes2 = await Promise.all([
    prisma.episodes.create({
      data: {
        id: require('crypto').randomUUID(),
        titleId: title2.id,
        epNumber: 1,
        name: '穿越重生',
        durationSec: 350,
        isFreePreview: true,
        lockType: 'PAID_PER_EPISODE',
        priceCents: 100,
        status: 'PUBLISHED',
        updatedAt: new Date()
      }
    }),
    prisma.episodes.create({
      data: {
        id: require('crypto').randomUUID(),
        titleId: title2.id,
        epNumber: 2,
        name: '宫廷初入',
        durationSec: 360,
        isFreePreview: true,
        lockType: 'PAID_PER_EPISODE',
        priceCents: 100,
        status: 'PUBLISHED',
        updatedAt: new Date()
      }
    }),
    prisma.episodes.create({
      data: {
        id: require('crypto').randomUUID(),
        titleId: title2.id,
        epNumber: 3,
        name: '智斗恶人',
        durationSec: 340,
        isFreePreview: true,
        lockType: 'PAID_PER_EPISODE',
        priceCents: 100,
        status: 'PUBLISHED',
        updatedAt: new Date()
      }
    })
  ])

  // 创建定价计划
  const pricingPlans = await Promise.all([
    prisma.pricingPlan.create({
      data: {
        type: 'SINGLE_EP',
        priceCents: 100,
        currency: 'CNY',
        benefitsJson: JSON.stringify({ description: '单集购买' })
      }
    }),
    prisma.pricingPlan.create({
      data: {
        type: 'SEASON',
        priceCents: 800,
        currency: 'CNY',
        benefitsJson: JSON.stringify({ description: '整季购买，享受8折优惠' })
      }
    }),
    prisma.pricingPlan.create({
      data: {
        type: 'VIP_MONTHLY',
        priceCents: 2000,
        currency: 'CNY',
        benefitsJson: JSON.stringify({ description: '月度VIP，无限观看' })
      }
    }),
    prisma.pricingPlan.create({
      data: {
        type: 'VIP_YEARLY',
        priceCents: 20000,
        currency: 'CNY',
        benefitsJson: JSON.stringify({ description: '年度VIP，无限观看，享受8折优惠' })
      }
    })
  ])

  // 创建集合
  const trendingCollection = await prisma.collection.create({
    data: {
      name: '热门推荐',
      slug: 'trending',
      type: 'MANUAL',
      itemsOrderJson: JSON.stringify([title1.id, title2.id])
    }
  })

  // 添加集合项目
  await Promise.all([
    prisma.collectionItem.create({
      data: {
        collectionId: trendingCollection.id,
        titleId: title1.id,
        order: 1
      }
    }),
    prisma.collectionItem.create({
      data: {
        collectionId: trendingCollection.id,
        titleId: title2.id,
        order: 2
      }
    })
  ])

  // 创建特色位 (暂时注释掉，因为模型未完整实现)
  // await prisma.featureSlot.create({
  //   data: {
  //     slot: 'HOME_HERO',
  //     titleId: title1.id,
  //     order: 1,
  //     startsAt: new Date(),
  //     endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30天后
  //   }
  // })

  // await prisma.featureSlot.create({
  //   data: {
  //     slot: 'HOME_ROW_1',
  //     collectionId: trendingCollection.id,
  //     order: 1,
  //     startsAt: new Date(),
  //     endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  //   }
  // })

  // 创建促销活动
  await prisma.promotion.create({
    data: {
      code: 'WELCOME20',
      type: 'PERCENT',
      value: 20,
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7天后
      usageLimit: 1000
    }
  })

  // 创建系统设置
  await Promise.all([
    prisma.setting.create({
      data: {
        key: 'site_name',
        valueJson: JSON.stringify({ value: 'Dramini CMS' })
      }
    }),
    prisma.setting.create({
      data: {
        key: 'default_currency',
        valueJson: JSON.stringify({ value: 'CNY' })
      }
    }),
    prisma.setting.create({
      data: {
        key: 'free_preview_episodes',
        valueJson: JSON.stringify({ value: 3 })
      }
    }),
    prisma.setting.create({
      data: {
        key: 'drm_enabled',
        valueJson: JSON.stringify({ value: false })
      }
    })
  ])

  // 创建语言
  await Promise.all([
    prisma.locale.create({
      data: {
        code: 'zh',
        name: '中文'
      }
    }),
    prisma.locale.create({
      data: {
        code: 'en',
        name: 'English'
      }
    })
  ])

  console.log('✅ 种子数据创建完成!')
  console.log(`👤 管理员账户: admin@dramini.com`)
  console.log(`📚 创建了 ${categories.length} 个分类`)
  console.log(`🏷️ 创建了 ${tags.length} 个标签`)
  console.log(`📖 创建了 2 个示例标题`)
  console.log(`🎬 创建了 ${episodes1.length + episodes2.length} 个集数`)
  console.log(`💰 创建了 ${pricingPlans.length} 个定价计划`)
}

main()
  .catch((e) => {
    console.error('❌ 种子数据创建失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
