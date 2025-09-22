import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // 获取统计数据
    const [
      totalTitles,
      publishedTitles,
      draftTitles,
      totalEpisodes,
      totalUsers,
      totalPurchases,
      totalRevenue,
      pendingReports
    ] = await Promise.all([
      prisma.title.count(),
      prisma.title.count({ where: { status: 'PUBLISHED' } }),
      prisma.title.count({ where: { status: 'DRAFT' } }),
      prisma.episode.count(),
      prisma.user.count(),
      prisma.purchase.count({ where: { status: 'COMPLETED' } }),
      prisma.purchase.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amountCents: true }
      }),
      prisma.flagReport.count({ where: { status: 'PENDING' } })
    ])

    // 获取最近活动
    const recentActivity = await prisma.auditLog.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: {
        actor: {
          select: { name: true, email: true }
        }
      }
    })

    const metrics = {
      totalTitles,
      publishedTitles,
      draftTitles,
      totalEpisodes,
      totalUsers,
      totalPurchases,
      totalRevenue: totalRevenue._sum.amountCents || 0,
      pendingTranscodes: 0,
      pendingReports
    }

    const formattedActivity = recentActivity.map(log => ({
      id: log.id,
      type: log.action.toLowerCase(),
      message: `${log.entity} ${log.action}`,
      createdAt: log.createdAt,
      user: log.actor
    }))

    return NextResponse.json({
      metrics,
      recentActivity: formattedActivity
    })

  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
