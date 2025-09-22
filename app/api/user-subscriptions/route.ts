import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 获取所有用户订阅
export async function GET() {
  try {
    const subscriptions = await prisma.userSubscription.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(subscriptions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 })
  }
}

// 创建订阅
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const subscription = await prisma.userSubscription.create({
      data: {
        userId: data.userId,
        planType: data.planType,
        priceUsd: data.priceUsd,
        bonusCoins: data.bonusCoins || 0,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        paymentProvider: data.paymentProvider || null,
        paymentId: data.paymentId || null
      }
    })
    
    return NextResponse.json(subscription)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}
