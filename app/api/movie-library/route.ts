import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const hasBanner = searchParams.get('hasBanner')
    const online = searchParams.get('online')

    let where: any = {}
    
    if (hasBanner === 'true') {
      where.bannerUrl = { not: null }
    }
    
    if (online === 'true') {
      where.isOnline = true
    }

    const movies = await prisma.title.findMany({
      where,
      include: {
        category: {
          select: { id: true, name: true }
        },
        episodes: {
          select: { id: true }
        },
        createdBy: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(movies)
  } catch (error) {
    console.error('Failed to fetch movies:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Creating movie with data:', data)
    
    // 确保必需字段存在
    if (!data.name || !data.slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 })
    }

    const movie = await prisma.title.create({
      data: {
        name: data.name,
        mainTitle: data.mainTitle || null,
        subTitle: data.subTitle || null,
        slug: data.slug,
        synopsis: data.synopsis || null,
        coverUrl: data.coverUrl || null,
        bannerUrl: data.bannerUrl || null,
        categoryId: data.categoryId || null,
        language: data.language || 'zh',
        status: data.status || 'DRAFT',
        isOnline: data.isOnline || false,
        freeUntilEpisode: data.freeUntilEpisode ? parseInt(data.freeUntilEpisode) : null,
        bundlePrice: data.bundlePrice ? Math.round(parseFloat(data.bundlePrice) * 100) : null, // 转换为分
        bundlePriceCurrency: data.bundlePriceCurrency || 'CNY',
        bundlePriceCoins: data.bundlePriceCoins ? parseInt(data.bundlePriceCoins) : null,
        createdById: 'system',
        updatedById: 'system'
      }
    })
    
    return NextResponse.json(movie)
  } catch (error) {
    console.error('Failed to create movie:', error)
    return NextResponse.json({ 
      error: 'Failed to create movie', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
