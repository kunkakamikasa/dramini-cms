import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.sectionContent.findMany({
      where: { sectionType: 'new_release' },
      include: {
        titles: {
          include: {
            categories: { select: { name: true } }
          }
        }
      },
      orderBy: { orderIndex: 'asc' }
    })
    
    const formatted = items.map(item => ({
      id: item.id,
      movieId: item.titleId,
      order: item.orderIndex,
      movie: {
        id: item.titles.id,
        name: item.titles.name,
        mainTitle: item.titles.mainTitle,
        subTitle: item.titles.subTitle,
        coverUrl: item.titles.coverUrl,
        category: item.titles.categories
      },
      createdAt: item.createdAt
    }))
    
    return NextResponse.json(formatted)
  } catch (error) {
    console.error('Failed to fetch new release items:', error)
    return NextResponse.json([], { status: 500 })
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