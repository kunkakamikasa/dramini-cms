'use client'

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, Search, Eye, Edit, Trash2, MoreHorizontal, Film
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Movie {
  id: string
  name: string
  slug: string
  synopsis?: string
  status: string
  rating?: number
  category?: { name: string }
  episodes: Array<{ id: string }>
  createdAt: string
  createdBy: { name: string }
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/titles')
      if (response.ok) {
        const data = await response.json()
        setMovies(data)
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || movie.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || movie.category?.name === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'bg-green-100 text-green-800'
      case 'DRAFT': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return '已发布'
      case 'DRAFT': return '草稿'
      default: return status
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg">加载中...</div>
    </div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">影片库</h1>
          <p className="text-gray-600">管理所有短剧影片内容</p>
        </div>
        <Link href="/admin/content/movies/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            新建影片
          </Button>
        </Link>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索影片名称..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">所有状态</option>
                <option value="PUBLISHED">已发布</option>
                <option value="DRAFT">草稿</option>
              </select>
            </div>
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">所有分类</option>
                <option value="浪漫爱情">浪漫爱情</option>
                <option value="都市情感">都市情感</option>
                <option value="奇幻玄幻">奇幻玄幻</option>
                <option value="喜剧搞笑">喜剧搞笑</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 影片列表 */}
      {filteredMovies.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Film className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无影片</h3>
              <p className="text-gray-500 mb-4">创建您的第一部短剧影片</p>
              <Link href="/admin/content/movies/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  新建影片
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredMovies.map((movie) => (
            <Card key={movie.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {movie.name}
                      </h3>
                      <Badge className={getStatusColor(movie.status)}>
                        {getStatusText(movie.status)}
                      </Badge>
                      {movie.rating && (
                        <div className="flex items-center text-sm text-gray-600">
                          ⭐ {movie.rating}
                        </div>
                      )}
                    </div>
                    
                    {movie.synopsis && (
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {movie.synopsis}
                      </p>
                    )}

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {movie.category && (
                        <div className="flex items-center space-x-1">
                          <span>分类:</span>
                          <Badge variant="outline">{movie.category.name}</Badge>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <span>集数:</span>
                        <span>{movie.episodes.length}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>创建:</span>
                        <span>{new Date(movie.createdAt).toLocaleDateString('zh-CN')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link href={`/admin/content/movies/${movie.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        查看
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


