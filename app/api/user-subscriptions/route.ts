import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

// 获取所有用户订阅
export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany({
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
    
    const subscription = await prisma.subscription.create({
      data: {
        id: crypto.randomUUID(),
        userId: data.userId,
        planId: data.planId,
        status: data.status || 'ACTIVE',
        currentPeriodEnd: new Date(data.expiresAt || data.endDate),
        updatedAt: new Date()
      }
    })
    
    return NextResponse.json(subscription)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}


