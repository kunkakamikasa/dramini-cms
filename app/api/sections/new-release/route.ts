import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.sectionContent.findMany({
      where: { sectionType: 'new_release' },
      orderBy: { orderIndex: 'asc' }
    })
    
    // 获取所有相关的titles
    const contentIds = items.map(item => item.contentId)
    const titles = await prisma.titles.findMany({
      where: { id: { in: contentIds } },
      include: {
        categories: { select: { name: true } }
      }
    })
    
    const titleMap = new Map(titles.map(title => [title.id, title]))
    
    const formatted = items.map(item => {
      const title = titleMap.get(item.contentId)
      return {
        id: item.id,
        movieId: item.contentId,
        order: item.orderIndex,
        movie: title ? {
          id: title.id,
          name: title.name,
          mainTitle: title.name,
          subTitle: title.synopsis,
          coverUrl: title.coverImageId,
          category: title.categories
        } : null,
        createdAt: item.createdAt
      }
    })
    
    return NextResponse.json(formatted)
  } catch (error) {
    console.error('Failed to fetch new release items:', error)
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const item = await prisma.sectionContent.create({
      data: {
        sectionType: 'new_release',
        contentId: data.movieId,
        orderIndex: data.order
      }
    })
    
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create new release item:', error)
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 })
  }
}