export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function GET() {
  try {
    const banners = await prisma.sectionContent.findMany({
      where: { 
        sectionType: 'hero_banner',
        isActive: true 
      },
      orderBy: { orderIndex: 'asc' }
    })
    
    // 获取所有contentId对应的影片信息
    const contentIds = banners.map(banner => banner.contentId)
    const movies = await prisma.titles.findMany({
      where: { id: { in: contentIds } },
      select: {
        id: true,
        name: true,
        synopsis: true,
        coverImageId: true,
        status: true
      }
    })
    
    // 创建影片ID到影片信息的映射
    const movieMap = new Map(movies.map(movie => [movie.id, movie]))
    
    // 映射数据到前端期望的格式
    const mappedBanners = banners.map(banner => {
      const movie = movieMap.get(banner.contentId)
      return {
        id: banner.id,
        movieId: banner.contentId,
        order: banner.orderIndex,
        isActive: banner.isActive,
        createdAt: banner.createdAt,
        movie: movie ? {
          id: movie.id,
          name: movie.name,
          mainTitle: movie.name, // 映射name到mainTitle
          subTitle: movie.synopsis, // 映射synopsis到subTitle
          bannerUrl: movie.coverImageId, // 映射coverImageId到bannerUrl
          jumpUrl: banner.jumpUrl || null,
          isOnline: movie.status === 'PUBLISHED'
        } : null
      }
    })
    
    return NextResponse.json(mappedBanners)
  } catch (error) {
    console.error('Failed to fetch hero banners:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const banner = await prisma.sectionContent.create({
      data: {
        id: crypto.randomUUID(),
        sectionType: 'hero_banner',
        contentId: data.movieId,
        contentType: 'movie',
        orderIndex: data.order || 0,
        isActive: true
      }
    })
    
    return NextResponse.json(banner)
  } catch (error) {
    console.error('Failed to create hero banner:', error)
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 })
  }
}
