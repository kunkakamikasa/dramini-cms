import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 获取所有剧集
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const titleId = searchParams.get('titleId')
    
    const whereClause = titleId ? { titleId } : {}
    
    const episodes = await prisma.episode.findMany({
      where: whereClause,
      include: {
        title: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: [
        { title: { name: 'asc' } },
        { epNumber: 'asc' }
      ]
    })

    // 映射数据库字段到前端友好字段
    const mappedEpisodes = episodes.map(episode => ({
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
    }))

    return NextResponse.json(mappedEpisodes)
  } catch (error) {
    console.error('Fetch episodes error:', error)
    return NextResponse.json({ error: 'Failed to fetch episodes' }, { status: 500 })
  }
}

// 创建新剧集
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log('Creating episode with data:', data)
    
    // 验证必填字段
    if (!data.titleId || !data.videoUrl) {
      return NextResponse.json(
        { error: '剧目ID和视频地址是必填字段' },
        { status: 400 }
      )
    }
    
    // 调试：显示将要保存的数据
    const episodeData = {
      titleId: data.titleId,
      epNumber: data.episodeNum || 1,
      name: data.name || `第${data.episodeNum || 1}集`,
      durationSec: data.duration ? parseInt(data.duration) : null,
      videoId: data.videoUrl || null,
      isFreePreview: data.isOnline || false,
      isFree: data.isFree || false,
      episodePrice: data.episodePrice ? Math.round(parseFloat(data.episodePrice) * 100) : null, // 转换为分
      priceCurrency: data.priceCurrency || 'CNY',
      lockType: 'PAID_PER_EPISODE',
      status: data.status || 'DRAFT'
    }
    console.log('Mapped episode data for database:', episodeData)
    
    // 检查该剧目下是否已存在相同集数
    const existingEpisode = await prisma.episode.findFirst({
      where: {
        titleId: data.titleId,
        epNumber: data.episodeNum || 1
      }
    })
    
    if (existingEpisode) {
      return NextResponse.json(
        { error: '该集数已存在' },
        { status: 400 }
      )
    }
    
    const episode = await prisma.episode.create({
      data: episodeData,
      include: {
        title: {
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
    console.error('Create episode error:', error)
    return NextResponse.json({ 
      error: 'Failed to create episode',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}