'use client'

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Video, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  Clock,
  CheckCircle
} from 'lucide-react'

interface DashboardMetrics {
  totalTitles: number
  publishedTitles: number
  draftTitles: number
  totalEpisodes: number
  totalUsers: number
  totalPurchases: number
  totalRevenue: number
  pendingTranscodes: number
  pendingReports: number
}

interface Activity {
  id: string
  type: string
  message: string
  createdAt: string
  user: { name: string; email: string }
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalTitles: 0,
    publishedTitles: 0,
    draftTitles: 0,
    totalEpisodes: 0,
    totalUsers: 0,
    totalPurchases: 0,
    totalRevenue: 0,
    pendingTranscodes: 0,
    pendingReports: 0,
  })
  const [recentActivity, setRecentActivity] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch('/api/dashboard/metrics')
        if (response.ok) {
          const data = await response.json()
          setMetrics(data.metrics)
          setRecentActivity(data.recentActivity)
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create':
      case 'publish':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'upload':
        return <Video className="h-4 w-4 text-blue-500" />
      case 'register':
        return <Users className="h-4 w-4 text-purple-500" />
      case 'purchase':
        return <DollarSign className="h-4 w-4 text-green-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getActivityText = (type: string) => {
    switch (type) {
      case 'create': return '创建'
      case 'publish': return '发布'
      case 'upload': return '上传'
      case 'register': return '注册'
      case 'purchase': return '购买'
      default: return '操作'
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg">加载中...</div>
    </div>
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
        <p className="text-gray-600">欢迎回来！这里是您的管理后台概览。</p>
      </div>

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总标题数</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalTitles}</div>
            <p className="text-xs text-muted-foreground">
              已发布 {metrics.publishedTitles} 个
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总集数</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalEpisodes}</div>
            <p className="text-xs text-muted-foreground">
              平均每标题 {metrics.totalTitles > 0 ? Math.round(metrics.totalEpisodes / metrics.totalTitles) : 0} 集
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总用户数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              注册用户数量
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总收入</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{(metrics.totalRevenue / 100).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              累计收入金额
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 状态概览 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>内容状态</CardTitle>
            <CardDescription>当前内容发布状态概览</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">已发布</span>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                {metrics.publishedTitles}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">草稿</span>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                {metrics.draftTitles}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm">待审核</span>
              </div>
              <Badge variant="destructive" className="bg-red-100 text-red-800">
                0
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>待处理任务</CardTitle>
            <CardDescription>需要关注的任务和问题</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Video className="h-4 w-4 text-blue-500" />
                <span className="text-sm">转码队列</span>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                {metrics.pendingTranscodes}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <span className="text-sm">用户举报</span>
              </div>
              <Badge variant="outline" className="bg-orange-100 text-orange-800">
                {metrics.pendingReports}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span className="text-sm">待审核内容</span>
              </div>
              <Badge variant="outline" className="bg-purple-100 text-purple-800">
                0
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近活动 */}
      <Card>
        <CardHeader>
          <CardTitle>最近活动</CardTitle>
          <CardDescription>系统最近的操作记录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      {activity.message}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {activity.user?.name || '系统'}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.createdAt).toLocaleString('zh-CN')}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {getActivityText(activity.type)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">暂无最近活动</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}