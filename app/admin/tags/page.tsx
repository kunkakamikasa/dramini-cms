'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Tag } from 'lucide-react'

export default function TagsPage() {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch('/api/tags')
        if (response.ok) {
          const data = await response.json()
          setTags(data)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchTags()
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
          <h1 className="text-2xl font-bold text-gray-900">标签管理</h1>
          <p className="text-gray-600">管理短剧标签</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          创建标签
        </Button>
      </div>

      {tags.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无标签</h3>
              <p className="text-gray-500 mb-4">创建您的第一个标签</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                创建标签
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tags.map((tag) => (
            <Card key={tag.id}>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900">{tag.name}</h3>
                <p className="text-sm text-gray-600">别名: {tag.slug}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}