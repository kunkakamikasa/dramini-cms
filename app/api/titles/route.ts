import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const titles = await prisma.title.findMany({
      include: {
        category: {
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
        createdBy: {
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
