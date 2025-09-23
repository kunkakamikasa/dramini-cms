export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
// import { requirePermission } from '@/lib/permissions'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 检查权限
    // await requirePermission('admin:all')

    // 获取统计数据
    const [
      totalTitles,
      publishedTitles,
      draftTitles,
      totalEpisodes,
      totalUsers,
      totalPurchases,
      totalRevenue,
      pendingTranscodes,
      pendingReports,
    ] = await Promise.all([
      prisma.titles.count(),
      prisma.titles.count({ where: { status: 'PUBLISHED' } }),
      prisma.titles.count({ where: { status: 'DRAFT' } }),
      prisma.episodes.count(),
      prisma.users.count(),
      prisma.purchase.count(),
      prisma.purchase.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amountCents: true }
      }),
      Promise.resolve(0), // transcodeJob 表暂未实现
      prisma.flagReport.count({ where: { status: 'PENDING' } }),
    ])

    // 获取最近活动
    const recentActivity = await prisma.auditLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        actor: {
          select: {
            name: true,
            email: true,
          }
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
      pendingTranscodes,
      pendingReports,
      recentActivity: recentActivity.map(log => ({
        id: log.id,
        type: log.action,
        message: `${log.action} ${log.entity}`,
        createdAt: log.createdAt,
        user: log.actor
      }))
    }

    return NextResponse.json({
      success: true,
      data: metrics
    })
  } catch (error) {
    console.error('Dashboard metrics error:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: '获取仪表板数据失败' } },
      { status: 500 }
    )
  }
}
