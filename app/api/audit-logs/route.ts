import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const logs = await prisma.auditLog.findMany({
      include: {
        actor: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    })
    return NextResponse.json(logs)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}
