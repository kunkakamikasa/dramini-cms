import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.sectionContent.findMany({
      where: { section: 'trending' },
      include: {
        titles: {
          include: {
            categories: { select: { name: true } }
          }
        }
      },
      orderBy: { order: 'asc' }
    })
    
    const formatted = items.map(item => ({
      id: item.id,
      movieId: item.titleId,
      order: item.order,
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
        section: 'trending',
        titleId: data.movieId,
        order: data.order
      }
    })
    
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create new release item:', error)
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 })
  }
}