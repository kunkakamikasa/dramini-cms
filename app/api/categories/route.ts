import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
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
    const existing = await prisma.category.findUnique({
      where: { slug: data.slug }
    })
    
    if (existing) {
      return NextResponse.json({ error: 'URL别名已存在' }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        order: data.order
      }
    })
    
    return NextResponse.json(category)
  } catch (error) {
    console.error('Failed to create category:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
