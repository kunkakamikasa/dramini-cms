import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 获取单个充值套餐
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const paymentPackage = await prisma.paymentPackage.findUnique({
      where: { id: params.id }
    })
    
    if (!paymentPackage) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }
    
    return NextResponse.json(paymentPackage)
  } catch (error) {
    console.error('Fetch payment package error:', error)
    return NextResponse.json({ error: 'Failed to fetch payment package' }, { status: 500 })
  }
}

// 更新充值套餐
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    
    const paymentPackage = await prisma.paymentPackage.update({
      where: { id: params.id },
      data: {
        name: data.name,
        priceUsd: Math.round(parseFloat(data.priceUsd) * 100),
        baseCoins: parseInt(data.baseCoins),
        bonusCoins: parseInt(data.bonusCoins) || 0,
        isFirstTime: data.isFirstTime || false,
        isActive: data.isActive !== false,
        order: parseInt(data.order) || 0,
        description: data.description || null,
        updatedAt: new Date()
      }
    })
    
    return NextResponse.json(paymentPackage)
  } catch (error) {
    console.error('Update payment package error:', error)
    return NextResponse.json({ error: 'Failed to update payment package' }, { status: 500 })
  }
}

// 删除充值套餐
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.paymentPackage.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete payment package error:', error)
    return NextResponse.json({ error: 'Failed to delete payment package' }, { status: 500 })
  }
}
