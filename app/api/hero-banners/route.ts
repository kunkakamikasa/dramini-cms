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
      include: {
        // 这里需要根据contentId关联到titles表
        // 暂时先返回基本信息
      },
      orderBy: { orderIndex: 'asc' }
    })
    
    return NextResponse.json(banners)
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