import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        user: { select: { name: true, email: true } },
        title: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(purchases)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}
