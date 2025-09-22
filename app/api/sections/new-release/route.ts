import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const items = await prisma.sectionContent.findMany({
      where: { section: 'new_release' },
      include: {
        title: {
          include: {
            category: { select: { name: true } }
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
        id: item.title.id,
        name: item.title.name,
        mainTitle: item.title.mainTitle,
        subTitle: item.title.subTitle,
        coverUrl: item.title.coverUrl,
        category: item.title.category
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
        section: 'new_release',
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