export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.categories.findMany({
      include: {
        _count: {
          select: { titles: true }
        }
      },
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // 检查slug是否已存在
    const existing = await prisma.categories.findUnique({
      where: { slug: data.slug }
    })
    
    if (existing) {
      return NextResponse.json({ error: 'URL别名已存在' }, { status: 400 })
    }

    const category = await prisma.categories.create({
      data: {
        id: require('crypto').randomUUID(),
        name: data.name,
        slug: data.slug,
        order: data.order,
        updatedAt: new Date()
      }
    })
    
    return NextResponse.json(category)
  } catch (error) {
    console.error('Failed to create category:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
