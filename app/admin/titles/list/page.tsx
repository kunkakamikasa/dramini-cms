'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, Search, Eye, BookOpen
} from 'lucide-react'

export default function TitlesListPage() {
  const [titles, setTitles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchTitles() {
      try {
        const response = await fetch('/api/titles')
        if (response.ok) {
          const data = await response.json()
          setTitles(data)
        }
      } catch (error) {
        console.error('Failed to fetch titles:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTitles()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg">加载中...</div>
    </div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">标题管理</h1>
          <p className="text-gray-600">管理所有短剧标题和集数</p>
        </div>
        <Link href="/admin/titles/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            创建标题
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索标题名称..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {titles.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无标题</h3>
              <p className="text-gray-500 mb-4">开始创建您的第一个短剧标题</p>
              <Link href="/admin/titles/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  创建标题
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {titles.map((title) => (
            <Card key={title.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {title.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{title.synopsis}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    查看
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}