import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 获取所有用户金币信息
export async function GET() {
  try {
    const userCoins = await prisma.userCoin.findMany({
      include: {
        users: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { amount: 'desc' }
    })
    return NextResponse.json(userCoins)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user coins' }, { status: 500 })
  }
}


