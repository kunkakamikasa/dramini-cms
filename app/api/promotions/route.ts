import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
