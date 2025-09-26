import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { direction } = await request.json()
    
    const currentItem = await prisma.sectionContent.findUnique({
      where: { id: params.id }
    })
    
    if (!currentItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    
    const newOrder = direction === 'up' ? currentItem.orderIndex - 1 : currentItem.orderIndex + 1
    
    // 交换顺序
    await prisma.$transaction([
      prisma.sectionContent.updateMany({
        where: { 
          sectionType: 'trending',
          orderIndex: newOrder
        },
        data: { orderIndex: currentItem.orderIndex }
      }),
      prisma.sectionContent.update({
        where: { id: params.id },
        data: { orderIndex: newOrder }
      })
    ])
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to move' }, { status: 500 })
  }
}