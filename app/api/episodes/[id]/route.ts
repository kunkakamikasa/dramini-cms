import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 获取单个剧集
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const episode = await prisma.episodes.findUnique({
      where: { id: params.id },
      include: {
        titles: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })

    if (!episode) {
      return NextResponse.json({ error: 'Episode not found' }, { status: 404 })
    }

    // 映射数据库字段到前端友好字段
    const mappedEpisode = {
      ...episode,
      episodeNum: episode.epNumber,
      duration: episode.durationSec,
      videoUrl: episode.videoId,
      isOnline: episode.isFreePreview,
      // 保留原字段以防需要
      epNumber: episode.epNumber,
      durationSec: episode.durationSec,
      videoId: episode.videoId,
      isFreePreview: episode.isFreePreview
    }

    return NextResponse.json(mappedEpisode)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch episode' }, { status: 500 })
  }
}

// 更新剧集
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    
    // 映射前端字段到数据库字段
    const updateData: any = {}
    if (data.episodeNum !== undefined) updateData.epNumber = data.episodeNum
    if (data.name !== undefined) updateData.name = data.name
    if (data.duration !== undefined) updateData.durationSec = data.duration
    if (data.videoUrl !== undefined) updateData.videoId = data.videoUrl
    if (data.isOnline !== undefined) updateData.isFreePreview = data.isOnline
    if (data.isFreePreview !== undefined) updateData.isFreePreview = data.isFreePreview
    if (data.isFree !== undefined) updateData.isFree = data.isFree
    if (data.episodePrice !== undefined) updateData.episodePrice = data.episodePrice ? Math.round(parseFloat(data.episodePrice) * 100) : null
    if (data.priceCurrency !== undefined) updateData.priceCurrency = data.priceCurrency
    if (data.status !== undefined) updateData.status = data.status
    
    const episode = await prisma.episodes.update({
      where: { id: params.id },
      data: updateData,
      include: {
        titles: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })

    return NextResponse.json(episode)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update episode' }, { status: 500 })
  }
}

// 删除剧集
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.episodes.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete episode' }, { status: 500 })
  }
}
