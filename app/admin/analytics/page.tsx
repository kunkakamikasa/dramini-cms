'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar, Eye, Users, UserPlus, Play, TrendingUp, Activity } from 'lucide-react'

interface StatsData {
  pv: number
  uv: number
  registrations: number
  viewers: number
}

interface OverviewData {
  today: StatsData
  yesterday: StatsData
  week: StatsData
  month: StatsData
}

interface TimeSeriesData {
  date: string
  hour?: number
  pv: number
  uv: number
  registrations: number
  viewers: number
}

export default function AnalyticsPage() {
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null)
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([])
  const [loading, setLoading] = useState(true)
  const [granularity, setGranularity] = useState<'hour' | 'day' | 'month' | 'year'>('day')
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | '90d' | '1y'>('30d')

  // 获取概览数据
  const fetchOverviewData = async () => {
    try {
      const response = await fetch('/api/analytics/overview')
      const data = await response.json()
      
      if (data.success) {
        setOverviewData(data.data)
      }
    } catch (error) {
      console.error('Fetch overview data error:', error)
    }
  }

  // 获取时间序列数据
  const fetchTimeSeriesData = async () => {
    try {
      setLoading(true)
      
      const endDate = new Date()
      const startDate = new Date()
      
      // 根据选择的时间范围计算开始日期
      switch (dateRange) {
        case 'today':
          // 当天：开始和结束都是今天
          startDate.setHours(0, 0, 0, 0)
          endDate.setHours(23, 59, 59, 999)
          break
        case '7d':
          startDate.setDate(endDate.getDate() - 7)
          break
        case '30d':
          startDate.setDate(endDate.getDate() - 30)
          break
        case '90d':
          startDate.setDate(endDate.getDate() - 90)
          break
        case '1y':
          startDate.setFullYear(endDate.getFullYear() - 1)
          break
      }

      const params = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        granularity
      })

      const response = await fetch(`/api/analytics/stats?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setTimeSeriesData(data.data)
      }
    } catch (error) {
      console.error('Fetch time series data error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOverviewData()
    fetchTimeSeriesData()
  }, [])

  useEffect(() => {
    fetchTimeSeriesData()
  }, [granularity, dateRange])

  // 当选择"当天"时，自动设置为按小时统计
  useEffect(() => {
    if (dateRange === 'today' && granularity !== 'hour') {
      setGranularity('hour')
    }
  }, [dateRange, granularity])

  // 计算增长率
  const calculateGrowthRate = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
  }

  // 格式化数字
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-white">网站统计分析</h1>
        <p className="text-gray-400 mt-2">监控网站访问、用户注册和视频观看数据</p>
      </div>

      {/* 概览卡片 */}
      {overviewData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 今日PV */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">今日页面浏览量</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(overviewData.today.pv)}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500">
                      +{calculateGrowthRate(overviewData.today.pv, overviewData.yesterday.pv)}%
                    </Badge>
                  </div>
                </div>
                <Eye className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          {/* 今日UV */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">今日访客数</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(overviewData.today.uv)}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500">
                      +{calculateGrowthRate(overviewData.today.uv, overviewData.yesterday.uv)}%
                    </Badge>
                  </div>
                </div>
                <Users className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          {/* 今日注册 */}
      <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">今日注册用户</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(overviewData.today.registrations)}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500">
                      +{calculateGrowthRate(overviewData.today.registrations, overviewData.yesterday.registrations)}%
                    </Badge>
                  </div>
                </div>
                <UserPlus className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          {/* 今日观看 */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">今日观看用户</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(overviewData.today.viewers)}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500">
                      +{calculateGrowthRate(overviewData.today.viewers, overviewData.yesterday.viewers)}%
                    </Badge>
                  </div>
                </div>
                <Play className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 时间段选择 */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">数据筛选</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">时间范围</label>
              <Select value={dateRange} onValueChange={(value: any) => setDateRange(value)}>
                <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">当天</SelectItem>
                  <SelectItem value="7d">最近7天</SelectItem>
                  <SelectItem value="30d">最近30天</SelectItem>
                  <SelectItem value="90d">最近90天</SelectItem>
                  <SelectItem value="1y">最近1年</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">统计维度</label>
              <Select value={granularity} onValueChange={(value: any) => setGranularity(value)}>
                <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hour">按小时</SelectItem>
                  <SelectItem value="day">按天</SelectItem>
                  <SelectItem value="month">按月</SelectItem>
                  <SelectItem value="year">按年</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 数据表格 */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">
            详细数据
            {dateRange === 'today' && (
              <span className="text-sm font-normal text-gray-400 ml-2">
                （{new Date().toLocaleDateString('zh-CN')} 当天按小时统计）
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <Activity className="w-8 h-8 text-gray-400 mx-auto mb-4 animate-spin" />
              <p className="text-gray-400">加载数据中...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-4 text-gray-300">
                      {granularity === 'hour' ? '日期/小时' : '日期'}
                    </th>
                    <th className="text-right py-3 px-4 text-gray-300">页面浏览量</th>
                    <th className="text-right py-3 px-4 text-gray-300">访客数</th>
                    <th className="text-right py-3 px-4 text-gray-300">注册用户</th>
                    <th className="text-right py-3 px-4 text-gray-300">观看用户</th>
                  </tr>
                </thead>
                <tbody>
                  {timeSeriesData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-700 border-opacity-50">
                    <td className="py-3 px-4 text-white">
                      {dateRange === 'today' && item.hour !== undefined 
                        ? `${item.hour}:00`
                        : new Date(item.date).toLocaleDateString('zh-CN') + (item.hour !== undefined ? ` ${item.hour}:00` : '')
                      }
                    </td>
                      <td className="py-3 px-4 text-right text-blue-400">
                        {formatNumber(item.pv)}
                      </td>
                      <td className="py-3 px-4 text-right text-purple-400">
                        {formatNumber(item.uv)}
                      </td>
                      <td className="py-3 px-4 text-right text-orange-400">
                        {formatNumber(item.registrations)}
                      </td>
                      <td className="py-3 px-4 text-right text-red-400">
                        {formatNumber(item.viewers)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 周期汇总 */}
      {overviewData && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">周期汇总</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">{formatNumber(overviewData.week.pv)}</div>
                <div className="text-sm text-gray-400">本周页面浏览量</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">{formatNumber(overviewData.week.uv)}</div>
                <div className="text-sm text-gray-400">本周访客数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 mb-2">{formatNumber(overviewData.month.registrations)}</div>
                <div className="text-sm text-gray-400">本月注册用户</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400 mb-2">{formatNumber(overviewData.month.viewers)}</div>
                <div className="text-sm text-gray-400">本月观看用户</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
