export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 获取所有充值套餐
export async function GET() {
  try {
    const packages = await prisma.pricingPlan.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    // 转换为前端期望的格式
    const formattedPackages = packages.map(pkg => {
      const benefits = pkg.benefitsJson ? JSON.parse(pkg.benefitsJson) : {}
      return {
        id: pkg.id,
        name: pkg.type,
        priceUsd: pkg.priceCents, // 直接显示美分，不除以100
        baseCoins: benefits.baseCoins || 0, // 从benefitsJson中获取独立的基础金币
        bonusCoins: benefits.bonusCoins || 0,
        isFirstTime: benefits.isFirstTime || false,
        isActive: true,
        order: 0,
        description: benefits.description || '',
        createdAt: pkg.createdAt.toISOString(),
        updatedAt: pkg.updatedAt.toISOString()
      }
    })
    
    return NextResponse.json(formattedPackages)
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
    
    const paymentPackage = await prisma.pricingPlan.create({
      data: {
        type: data.name,
        priceCents: parseInt(data.priceUsd), // 前端传入多少就存多少，不转换
        currency: 'USD',
        benefitsJson: JSON.stringify({ 
          description: data.description || '',
          baseCoins: parseInt(data.baseCoins) || 0,
          bonusCoins: parseInt(data.bonusCoins) || 0,
          isFirstTime: data.isFirstTime || false
        })
      }
    })
    
    // 返回前端期望的格式
    const benefits = paymentPackage.benefitsJson ? JSON.parse(paymentPackage.benefitsJson) : {}
    const formattedPackage = {
      id: paymentPackage.id,
      name: paymentPackage.type,
      priceUsd: paymentPackage.priceCents, // 直接返回，不转换
      baseCoins: benefits.baseCoins || 0, // 从benefitsJson中获取独立的基础金币
      bonusCoins: benefits.bonusCoins || 0,
      isFirstTime: benefits.isFirstTime || false,
      isActive: true,
      order: 0,
      description: benefits.description || '',
      createdAt: paymentPackage.createdAt.toISOString(),
      updatedAt: paymentPackage.updatedAt.toISOString()
    }
    
    return NextResponse.json(formattedPackage)
  } catch (error) {
    console.error('Create package error:', error)
    return NextResponse.json({ 
      error: 'Failed to create package',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}