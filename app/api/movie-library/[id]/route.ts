import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const title = await prisma.titles.findUnique({
      where: { id: params.id },
      include: {
        categories: {
          select: {
            id: true,
            name: true
          }
        },
        episodes: {
          orderBy: { epNumber: 'asc' }
        }
      }
    })

    if (!title) {
      return NextResponse.json({ error: 'Title not found' }, { status: 404 })
    }

    return NextResponse.json(title)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch title' }, { status: 500 })
  }
}

// 更新影片信息
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    
    const updatedTitle = await prisma.titles.update({
      where: { id: params.id },
      data: {
        name: data.name,
        mainTitle: data.mainTitle,
        subTitle: data.subTitle,
        synopsis: data.synopsis,
        coverUrl: data.coverUrl,
        bannerUrl: data.bannerUrl,
        categoryId: data.categoryId,
        status: data.status,
        isOnline: data.isOnline,
        rating: data.rating ? parseFloat(data.rating) : null,
        freeUntilEpisode: data.freeUntilEpisode ? parseInt(data.freeUntilEpisode) : null,
        bundlePrice: data.bundlePrice ? Math.round(parseFloat(data.bundlePrice) * 100) : null, // 转换为分
        bundlePriceCurrency: data.bundlePriceCurrency || 'CNY',
        bundlePriceCoins: data.bundlePriceCoins ? parseInt(data.bundlePriceCoins) : null,
        updatedAt: new Date()
      },
      include: {
        categories: {
          select: {
            id: true,
            name: true
          }
        },
        episodes: {
          orderBy: { epNumber: 'asc' }
        }
      }
    })

    return NextResponse.json(updatedTitle)
  } catch (error) {
    console.error('Update title error:', error)
    return NextResponse.json({ 
      error: 'Failed to update title',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// 删除影片
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.titles.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete title error:', error)
    return NextResponse.json({ error: 'Failed to delete title' }, { status: 500 })
  }
}