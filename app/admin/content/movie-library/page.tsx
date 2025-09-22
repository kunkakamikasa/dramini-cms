'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, Search, Eye, Edit, Trash2, MoreHorizontal, Film, Power, PowerOff
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import toast from 'react-hot-toast'

interface Movie {
  id: string
  name: string
  mainTitle?: string
  subTitle?: string
  slug: string
  synopsis?: string
  coverUrl?: string
  bannerUrl?: string
  jumpUrl?: string
  status: string
  isOnline: boolean
  rating?: number
  category?: { name: string; id: string }
  episodes: Array<{ id: string }>
  createdAt: string
  createdBy: { name: string }
}

export default function MovieLibraryPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [onlineFilter, setOnlineFilter] = useState('all')

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movie-library')
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

  const toggleOnlineStatus = async (movieId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/movie-library/${movieId}/toggle-online`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isOnline: !currentStatus })
      })

      if (response.ok) {
        toast.success(currentStatus ? '影片已下线' : '影片已上线')
        fetchMovies()
      } else {
        toast.error('操作失败')
      }
    } catch (error) {
      toast.error('操作失败')
    }
  }

  const handleDelete = async (movieId: string) => {
    if (!window.confirm('确定要删除这部影片吗？此操作不可恢复！')) return

    try {
      const response = await fetch(`/api/movie-library/${movieId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('影片删除成功')
        fetchMovies()
      } else {
        toast.error('删除失败')
      }
    } catch (error) {
      toast.error('删除失败')
    }
  }

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.mainTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.subTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || movie.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || movie.category?.name === categoryFilter
    const matchesOnline = onlineFilter === 'all' || 
                         (onlineFilter === 'online' && movie.isOnline) ||
                         (onlineFilter === 'offline' && !movie.isOnline)
    return matchesSearch && matchesStatus && matchesCategory && matchesOnline
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
          <p className="text-gray-600">管理所有短剧影片，设置上下线状态</p>
        </div>
        <Link href="/admin/content/movie-library/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            添加影片
          </Button>
        </Link>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{movies.length}</div>
              <div className="text-sm text-gray-600">总影片数</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {movies.filter(m => m.isOnline).length}
              </div>
              <div className="text-sm text-gray-600">已上线</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {movies.filter(m => !m.isOnline).length}
              </div>
              <div className="text-sm text-gray-600">已下线</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {movies.filter(m => m.bannerUrl).length}
              </div>
              <div className="text-sm text-gray-600">有轮播图</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索影片名称、主标题、副标题..."
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
                value={onlineFilter}
                onChange={(e) => setOnlineFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">上下线状态</option>
                <option value="online">已上线</option>
                <option value="offline">已下线</option>
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
              <p className="text-gray-500 mb-4">添加您的第一部影片到影片库</p>
              <Link href="/admin/content/movie-library/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  添加影片
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
                <div className="flex items-start space-x-4">
                  {/* 封面图预览 */}
                  <div className="w-16 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {movie.coverUrl ? (
                      <img 
                        src={movie.coverUrl} 
                        alt={movie.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Film className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  {/* 影片信息 */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {movie.name}
                      </h3>
                      <Badge className={getStatusColor(movie.status)}>
                        {getStatusText(movie.status)}
                      </Badge>
                      <Badge variant={movie.isOnline ? "default" : "secondary"}>
                        {movie.isOnline ? '已上线' : '已下线'}
                      </Badge>
                      {movie.bannerUrl && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          有轮播图
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      {movie.mainTitle && (
                        <div><span className="font-medium">主标题:</span> {movie.mainTitle}</div>
                      )}
                      {movie.subTitle && (
                        <div><span className="font-medium">副标题:</span> {movie.subTitle}</div>
                      )}
                      {movie.category && (
                        <div><span className="font-medium">分类:</span> {movie.category.name}</div>
                      )}
                      <div><span className="font-medium">集数:</span> {movie.episodes.length}</div>
                      {movie.jumpUrl && (
                        <div><span className="font-medium">跳转:</span> {movie.jumpUrl}</div>
                      )}
                    </div>

                    {movie.synopsis && (
                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                        {movie.synopsis}
                      </p>
                    )}

                    <div className="text-xs text-gray-500">
                      创建: {new Date(movie.createdAt).toLocaleDateString('zh-CN')} | 
                      创建者: {movie.createdBy.name}
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleOnlineStatus(movie.id, movie.isOnline)}
                    >
                      {movie.isOnline ? (
                        <PowerOff className="h-4 w-4 mr-1" />
                      ) : (
                        <Power className="h-4 w-4 mr-1" />
                      )}
                      {movie.isOnline ? '下线' : '上线'}
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={`/admin/content/movie-library/${movie.id}`} className="flex items-center w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            查看详情
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(movie.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除影片
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
