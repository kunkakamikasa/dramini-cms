export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
        status: true,
        slug: true
      }
    })
    
    // 创建影片ID到影片信息的映射
    const movieMap = new Map(movies.map(movie => [movie.id, movie]))
    
    // 映射数据到前端期望的格式
    const mappedBanners = banners.map(banner => {
      const movie = movieMap.get(banner.contentId)
      return {
        id: banner.id,
        slug: movie?.slug || 'default',
        title: movie?.name || 'Default Title',
        tagline: movie?.synopsis || 'Default tagline',
        backdrop: movie?.coverImageId || 'https://images.unsplash.com/photo-1748091301969-578c45de4dea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920'
      }
    })
    
    return NextResponse.json({
      ok: true,
      data: mappedBanners
    })
  } catch (error) {
    console.error('Failed to fetch hero banners:', error)
    return NextResponse.json({
      ok: false,
      data: []
    }, { status: 500 })
  }
}
