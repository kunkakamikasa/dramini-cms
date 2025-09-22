import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const titles = await prisma.titles.findMany({
      include: {
        categories: {
          select: { name: true }
        },
        tags: {
          include: {
            tag: {
              select: { name: true }
            }
          }
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

    return NextResponse.json(titles)
  } catch (error) {
    console.error('Failed to fetch titles:', error)
    return NextResponse.json([], { status: 500 })
  }
}


