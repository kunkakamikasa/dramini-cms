import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { direction } = await request.json()
    
    const currentItem = await prisma.sectionContent.findUnique({
      where: { id: params.id }
    })
    
    if (!currentItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    
    const newOrder = direction === 'up' ? currentItem.order - 1 : currentItem.order + 1
    
    // 交换顺序
    await prisma.$transaction([
      prisma.sectionContent.updateMany({
        where: { 
          section: 'new_release',
          order: newOrder
        },
        data: { order: currentItem.order }
      }),
      prisma.sectionContent.update({
        where: { id: params.id },
        data: { order: newOrder }
      })
    ])
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to move' }, { status: 500 })
  }
}