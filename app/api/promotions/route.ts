import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const promotions = await prisma.promotion.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(promotions)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}


