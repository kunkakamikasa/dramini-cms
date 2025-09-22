export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 获取所有充值套餐
export async function GET() {
  try {
    const packages = await prisma.paymentPackage.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(packages)
  } catch (error) {
    console.error('Fetch packages error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch packages',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// 创建充值套餐
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const paymentPackage = await prisma.paymentPackage.create({
      data: {
        name: data.name,
        priceUsd: Math.round(parseFloat(data.priceUsd) * 100), // 转换为美分
        baseCoins: data.baseCoins,
        bonusCoins: data.bonusCoins || 0,
        isFirstTime: data.isFirstTime || false,
        description: data.description || null,
        order: data.order || 0
      }
    })
    
    return NextResponse.json(paymentPackage)
  } catch (error) {
    console.error('Create package error:', error)
    return NextResponse.json({ 
      error: 'Failed to create package',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}