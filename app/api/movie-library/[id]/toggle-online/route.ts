import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const movie = await prisma.title.update({
      where: { id: params.id },
      data: { isOnline: data.isOnline }
    })
    return NextResponse.json(movie)
  } catch (error) {
    console.error('Failed to toggle online status:', error)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}
