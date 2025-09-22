'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, Search, Edit, Trash2, MoreHorizontal, Image as ImageIcon, Eye, EyeOff, MoveUp, MoveDown
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
  bannerUrl?: string
  jumpUrl?: string
  isOnline: boolean
}

interface HeroBanner {
  id: string
  movieId: string
  order: number
  isActive: boolean
  movie: Movie
  createdAt: string
}

export default function HeroBannersPage() {
  const [banners, setBanners] = useState<HeroBanner[]>([])
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [isSelecting, setIsSelecting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchBanners()
    fetchMoviesWithBanner()
  }, [])

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/hero-banners')
      if (response.ok) {
        const data = await response.json()
        setBanners(data)
      }
    } catch (error) {
      console.error('Failed to fetch banners:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMoviesWithBanner = async () => {
    try {
      const response = await fetch('/api/movie-library?hasBanner=true&online=true')
      if (response.ok) {
        const data = await response.json()
        setMovies(data)
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    }
  }

  const handleAddToBanner = async (movieId: string) => {
    try {
      const response = await fetch('/api/hero-banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          movieId,
          order: banners.length + 1
        })
      })

      if (response.ok) {
        toast.success('已添加到轮播图')
        setIsSelecting(false)
        fetchBanners()
        fetchMoviesWithBanner()
      } else {
        toast.error('添加失败')
      }
    } catch (error) {
      toast.error('添加失败')
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('确定要从轮播图中移除这部影片吗？')) return

    try {
      const response = await fetch(`/api/hero-banners/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('已从轮播图中移除')
        fetchBanners()
        fetchMoviesWithBanner()
      } else {
        toast.error('移除失败')
      }
    } catch (error) {
      toast.error('移除失败')
    }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/hero-banners/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (response.ok) {
        toast.success(isActive ? '已禁用' : '已启用')
        fetchBanners()
      }
    } catch (error) {
      toast.error('操作失败')
    }
  }

  const moveOrder = async (id: string, direction: 'up' | 'down') => {
    try {
      const response = await fetch(`/api/hero-banners/${id}/move`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction })
      })

      if (response.ok) {
        toast.success('顺序已调整')
        fetchBanners()
      } else {
        toast.error('调整失败')
      }
    } catch (error) {
      toast.error('调整失败')
    }
  }

  const filteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.mainTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.subTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 过滤掉已经在轮播图中的影片
  const availableMovies = filteredMovies.filter(movie => 
    !banners.some(banner => banner.movieId === movie.id)
  )

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg">加载中...</div>
    </div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">轮播图管理</h1>
          <p className="text-gray-600">从影片库选择影片设置为轮播图</p>
        </div>
        <Button onClick={() => setIsSelecting(true)} disabled={availableMovies.length === 0}>
          <Plus className="h-4 w-4 mr-2" />
          添加轮播图
        </Button>
      </div>

      {/* 影片选择器 */}
      {isSelecting && (
        <Card>
          <CardHeader>
            <CardTitle>选择影片</CardTitle>
            <p className="text-sm text-gray-600">只显示已上线且有16:9轮播图的影片</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索影片名称、主标题、副标题..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {availableMovies.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  没有可用的影片。请确保影片已上线且上传了16:9轮播图。
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {availableMovies.map((movie) => (
                  <div key={movie.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className="w-16 h-9 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        {movie.bannerUrl && (
                          <img 
                            src={movie.bannerUrl} 
                            alt={movie.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{movie.name}</h4>
                        {movie.mainTitle && (
                          <p className="text-sm text-gray-600">{movie.mainTitle}</p>
                        )}
                        {movie.subTitle && (
                          <p className="text-xs text-gray-500">{movie.subTitle}</p>
                        )}
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleAddToBanner(movie.id)}
                      >
                        选择
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsSelecting(false)}>
                取消
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 轮播图列表 */}
      {banners.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无轮播图</h3>
              <p className="text-gray-500 mb-4">从影片库选择影片设置为轮播图</p>
              <Button onClick={() => setIsSelecting(true)} disabled={availableMovies.length === 0}>
                <Plus className="h-4 w-4 mr-2" />
                添加轮播图
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {banners.map((banner, index) => (
            <Card key={banner.id}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  {/* 轮播图预览 */}
                  <div className="w-32 h-18 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {banner.movie.bannerUrl && (
                      <img 
                        src={banner.movie.bannerUrl} 
                        alt={banner.movie.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* 影片信息 */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {banner.movie.name}
                      </h3>
                      <Badge variant={banner.isActive ? "default" : "secondary"}>
                        {banner.isActive ? '启用' : '禁用'}
                      </Badge>
                      <Badge variant="outline">排序: {banner.order}</Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      {banner.movie.mainTitle && (
                        <div><span className="font-medium">主标题:</span> {banner.movie.mainTitle}</div>
                      )}
                      {banner.movie.subTitle && (
                        <div><span className="font-medium">副标题:</span> {banner.movie.subTitle}</div>
                      )}
                      <div><span className="font-medium">跳转:</span> {banner.movie.jumpUrl}</div>
                      <div><span className="font-medium">添加时间:</span> {new Date(banner.createdAt).toLocaleDateString('zh-CN')}</div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-col space-y-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveOrder(banner.id, 'up')}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveOrder(banner.id, 'down')}
                        disabled={index === banners.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(banner.id, banner.isActive)}
                    >
                      {banner.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(banner.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          移除
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