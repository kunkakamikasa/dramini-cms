import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const movie = await prisma.titles.update({
      where: { id: params.id },
      data: { 
        status: data.isOnline ? 'PUBLISHED' : 'DRAFT',
        updatedAt: new Date()
      }
    })
    return NextResponse.json(movie)
  } catch (error) {
    console.error('Failed to toggle online status:', error)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}


