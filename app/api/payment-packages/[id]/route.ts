import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 获取单个充值套餐
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const paymentPackage = await prisma.pricingPlan.findUnique({
      where: { id: params.id }
    })
    
    if (!paymentPackage) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }
    
    // 转换为前端期望的格式
    const formattedPackage = {
      id: paymentPackage.id,
      name: paymentPackage.type,
      priceUsd: paymentPackage.priceCents,
      baseCoins: paymentPackage.priceCents,
      bonusCoins: 0,
      isFirstTime: false,
      isActive: true,
      order: 0,
      description: paymentPackage.benefitsJson ? JSON.parse(paymentPackage.benefitsJson).description : '',
      createdAt: paymentPackage.createdAt.toISOString(),
      updatedAt: paymentPackage.updatedAt.toISOString()
    }
    
    return NextResponse.json(formattedPackage)
  } catch (error) {
    console.error('Fetch payment package error:', error)
    return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 })
  }
}

// 更新充值套餐
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    
    const paymentPackage = await prisma.pricingPlan.update({
      where: { id: params.id },
      data: {
        type: data.name,
        priceCents: parseInt(data.priceUsd),
        currency: 'CNY',
        benefitsJson: JSON.stringify({ 
          description: data.description || '',
          baseCoins: parseInt(data.baseCoins) || 0,
          bonusCoins: parseInt(data.bonusCoins) || 0,
          isFirstTime: data.isFirstTime || false
        })
      }
    })
    
    // 返回前端期望的格式
    const formattedPackage = {
      id: paymentPackage.id,
      name: paymentPackage.type,
      priceUsd: paymentPackage.priceCents,
      baseCoins: paymentPackage.priceCents,
      bonusCoins: 0,
      isFirstTime: false,
      isActive: true,
      order: 0,
      description: paymentPackage.benefitsJson ? JSON.parse(paymentPackage.benefitsJson).description : '',
      createdAt: paymentPackage.createdAt.toISOString(),
      updatedAt: paymentPackage.updatedAt.toISOString()
    }
    
    return NextResponse.json(formattedPackage)
  } catch (error) {
    console.error('Update package error:', error)
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 })
  }
}

// 删除充值套餐
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.pricingPlan.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete package error:', error)
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 })
  }
}