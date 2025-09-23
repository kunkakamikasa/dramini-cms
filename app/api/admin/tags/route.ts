export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
// import { requirePermission } from '@/lib/permissions'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

const createTagSchema = z.object({
  name: z.string().min(1, '标签名称不能为空'),
  slug: z.string().min(1, 'URL别名不能为空'),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // await requirePermission('content:edit')

    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') || ''

    const where = q ? {
      OR: [
        { name: { contains: q, mode: Prisma.QueryMode.insensitive } },
        { slug: { contains: q, mode: Prisma.QueryMode.insensitive } }
      ]
    } : {}

    const tags = await prisma.tag.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            titles: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: tags
    })
  } catch (error) {
    console.error('Get tags error:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: '获取标签列表失败' } },
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

    // await requirePermission('content:edit')

    const body = await request.json()
    const validatedData = createTagSchema.parse(body)

    // 检查 slug 是否已存在
    const existingTag = await prisma.tag.findUnique({
      where: { slug: validatedData.slug }
    })

    if (existingTag) {
      return NextResponse.json(
        { error: { code: 'DUPLICATE_SLUG', message: 'URL别名已存在' } },
        { status: 400 }
      )
    }

    const tag = await prisma.tag.create({
      data: {
        name: validatedData.name,
        slug: validatedData.slug
      }
    })

    // 记录审计日志
    await prisma.auditLog.create({
      data: {
        actorAdminId: (session.user as any).id,
        action: 'CREATE',
        entity: 'Tag',
        entityId: tag.id,
        afterJson: JSON.stringify(tag),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
      }
    })

    return NextResponse.json({
      success: true,
      data: tag
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } },
        { status: 400 }
      )
    }

    console.error('Create tag error:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: '创建标签失败' } },
      { status: 500 }
    )
  }
}
