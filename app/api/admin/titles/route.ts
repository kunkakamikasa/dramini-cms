import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { requirePermission } from '@/lib/permissions'
import { z } from 'zod'

const createTitleSchema = z.object({
  name: z.string().min(1, '标题名称不能为空'),
  slug: z.string().min(1, 'URL别名不能为空'),
  synopsis: z.string().optional(),
  coverImageId: z.string().optional(),
  categoryId: z.string().optional(),
  language: z.string().default('zh'),
  tagIds: z.array(z.string()).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await requirePermission('content:create')

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const q = searchParams.get('q') || ''
    const status = searchParams.get('status') || ''
    const category = searchParams.get('category') || ''
    const tag = searchParams.get('tag') || ''

    const skip = (page - 1) * limit

    // 构建查询条件
    const where: any = {}
    
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { synopsis: { contains: q, mode: 'insensitive' } }
      ]
    }
    
    if (status) {
      where.status = status
    }
    
    if (category) {
      where.categoryId = category
    }
    
    if (tag) {
      where.tags = {
        some: {
          tagId: tag
        }
      }
    }

    const [titles, total] = await Promise.all([
      prisma.titles.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          categories: true,
          tags: {
            include: {
              tag: true
            }
          },
          episodes: {
            select: {
              id: true,
              epNumber: true,
              name: true,
              status: true
            }
          },
          users_titles_createdByIdTousers: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          users_titles_updatedByIdTousers: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.titles.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: titles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get titles error:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: '获取标题列表失败' } },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await requirePermission('content:create')

    const body = await request.json()
    const validatedData = createTitleSchema.parse(body)

    // 检查 slug 是否已存在
    const existingTitle = await prisma.titles.findUnique({
      where: { slug: validatedData.slug }
    })

    if (existingTitle) {
      return NextResponse.json(
        { error: { code: 'DUPLICATE_SLUG', message: 'URL别名已存在' } },
        { status: 400 }
      )
    }

    const userId = (session.user as any).id

    // 创建标题
    const title = await prisma.titles.create({
      data: {
        id: require('crypto').randomUUID(),
        name: validatedData.name,
        slug: validatedData.slug,
        synopsis: validatedData.synopsis,
        coverImageId: validatedData.coverImageId,
        categoryId: validatedData.categoryId,
        language: validatedData.language,
        createdById: userId,
        updatedById: userId,
        updatedAt: new Date(),
        tags: validatedData.tagIds ? {
          create: validatedData.tagIds.map(tagId => ({
            id: require('crypto').randomUUID(),
            tagId
          }))
        } : undefined
      },
      include: {
        categories: true,
        tags: {
          include: {
            tag: true
          }
        },
        users_titles_createdByIdTousers: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        users_titles_updatedByIdTousers: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    // 记录审计日志
    await prisma.auditLog.create({
      data: {
        actorUserId: userId,
        action: 'CREATE',
        entity: 'Title',
        entityId: title.id,
        afterJson: JSON.stringify(title),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
      }
    })

    return NextResponse.json({
      success: true,
      data: title
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } },
        { status: 400 }
      )
    }

    console.error('Create title error:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: '创建标题失败' } },
      { status: 500 }
    )
  }
}
