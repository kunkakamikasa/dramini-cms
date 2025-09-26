import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 暂时注释掉，因为PricingPlan模型字段不匹配
/*
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
    
    return NextResponse.json(paymentPackage)
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
        name: data.name,
        priceUsd: Math.round(parseFloat(data.priceUsd) * 100),
        baseCoins: parseInt(data.baseCoins),
        bonusCoins: parseInt(data.bonusCoins) || 0,
        isFirstTime: data.isFirstTime || false,
        description: data.description || null,
        order: parseInt(data.order) || 0
      }
    })
    
    return NextResponse.json(paymentPackage)
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
*/

// 临时返回错误
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}