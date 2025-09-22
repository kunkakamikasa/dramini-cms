export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.sectionContent.findMany({
      where: { 
        section: 'hero',
        isActive: true
      },
      include: {
        titles: {
          select: {
            id: true, name: true, mainTitle: true, subTitle: true,
            bannerUrl: true, slug: true, isOnline: true
          }
        }
      },
      orderBy: { order: 'asc' }
    })
    
    const formatted = items
      .filter(item => item.titles.isOnline && item.titles.bannerUrl)
      .map(item => ({
        id: item.id,
        movieId: item.titleId,
        order: item.order,
        isActive: item.isActive,
        movie: {
          id: item.titles.id,
          name: item.titles.name,
          mainTitle: item.titles.mainTitle,
          subTitle: item.titles.subTitle,
          bannerUrl: item.titles.bannerUrl,
          slug: item.titles.slug,
          isOnline: item.titles.isOnline
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