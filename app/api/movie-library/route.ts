export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const online = searchParams.get('online')

    let where: any = {}
    
    if (online === 'true') {
      where.status = 'PUBLISHED' // 使用status字段而不是isOnline
    }

    const movies = await prisma.titles.findMany({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        synopsis: true,
        coverImageId: true,
        bannerUrl: true, // 添加bannerUrl字段
        status: true,
        language: true,
        categoryId: true,
        rating: true,
        createdAt: true,
        updatedAt: true,
        categories: {
          select: { id: true, name: true }
        },
        episodes: {
          select: { id: true }
        },
        users_titles_createdByIdTousers: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    // 转换数据结构以匹配前端期望
    const moviesWithCreatedBy = movies.map(movie => ({
      ...movie,
      createdBy: movie.users_titles_createdByIdTousers,
      isOnline: movie.status === 'PUBLISHED', // 修正：status判断上线状态
      // 添加前端期望的字段映射
      mainTitle: movie.name, // name → mainTitle
      subTitle: movie.synopsis, // synopsis → subTitle
      coverUrl: movie.coverImageId, // coverImageId → coverUrl
      bannerUrl: movie.bannerUrl // 使用数据库中的bannerUrl字段
    }))
    
    return NextResponse.json(moviesWithCreatedBy)
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

    const movie = await prisma.titles.create({
      data: {
        id: crypto.randomUUID(),
        name: data.name,
        slug: data.slug,
        synopsis: data.synopsis || null,
        coverImageId: data.coverImageId || null,
        bannerUrl: data.bannerUrl || null, // 添加bannerUrl字段
        categoryId: data.categoryId || null,
        language: data.language || 'zh',
        status: data.status || 'DRAFT',
        createdById: 'admin-1', // 使用存在的用户ID
        updatedById: 'admin-1', // 使用存在的用户ID
        updatedAt: new Date()
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
