import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const items = await prisma.sectionContent.findMany({
      where: { 
        section: 'hero',
        isActive: true
      },
      include: {
        title: {
          select: {
            id: true, name: true, mainTitle: true, subTitle: true,
            bannerUrl: true, slug: true, isOnline: true
          }
        }
      },
      orderBy: { order: 'asc' }
    })
    
    const formatted = items
      .filter(item => item.title.isOnline && item.title.bannerUrl)
      .map(item => ({
        id: item.id,
        movieId: item.titleId,
        order: item.order,
        isActive: item.isActive,
        movie: {
          id: item.title.id,
          name: item.title.name,
          mainTitle: item.title.mainTitle,
          subTitle: item.title.subTitle,
          bannerUrl: item.title.bannerUrl,
          slug: item.title.slug,
          isOnline: item.title.isOnline
        },
        createdAt: item.createdAt
      }))
    
    return NextResponse.json(formatted)
  } catch (error) {
    console.error('Failed to fetch hero banners:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const item = await prisma.sectionContent.create({
      data: {
        section: 'hero',
        titleId: data.movieId,
        order: data.order
      }
    })
    
    return NextResponse.json(item)
  } catch (error) {
    console.error('Failed to create hero banner:', error)
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 })
  }
}