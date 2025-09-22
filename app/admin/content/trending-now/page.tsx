'use client'

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, Search, Trash2, MoreHorizontal, TrendingUp, MoveUp, MoveDown
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
  coverUrl?: string
  jumpUrl?: string
  category?: { name: string }
}

interface SectionItem {
  id: string
  movieId: string
  order: number
  movie: Movie
  createdAt: string
}

export default function TrendingNowPage() {
  const [items, setItems] = useState<SectionItem[]>([])
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [isSelecting, setIsSelecting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchSectionItems()
    fetchAvailableMovies()
  }, [])

  const fetchSectionItems = async () => {
    try {
      const response = await fetch('/api/sections/trending-now')
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error('Failed to fetch section items:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAvailableMovies = async () => {
    try {
      const response = await fetch('/api/movie-library?online=true')
      if (response.ok) {
        const data = await response.json()
        setMovies(data)
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    }
  }

  const handleAddToSection = async (movieId: string) => {
    try {
      const response = await fetch('/api/sections/trending-now', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          movieId,
          order: items.length + 1
        })
      })

      if (response.ok) {
        toast.success('已添加到Trending Now')
        setIsSelecting(false)
        fetchSectionItems()
        fetchAvailableMovies()
      } else {
        toast.error('添加失败')
      }
    } catch (error) {
      toast.error('添加失败')
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('确定要从Trending Now中移除这部影片吗？')) return

    try {
      const response = await fetch(`/api/sections/trending-now/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('已移除')
        fetchSectionItems()
        fetchAvailableMovies()
      } else {
        toast.error('移除失败')
      }
    } catch (error) {
      toast.error('移除失败')
    }
  }

  const moveOrder = async (id: string, direction: 'up' | 'down') => {
    try {
      const response = await fetch(`/api/sections/trending-now/${id}/move`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction })
      })

      if (response.ok) {
        toast.success('顺序已调整')
        fetchSectionItems()
      } else {
        toast.error('调整失败')
      }
    } catch (error) {
      toast.error('调整失败')
    }
  }

  const filteredAvailableMovies = movies.filter(movie =>
    !items.some(item => item.movieId === movie.id) &&
    (movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     movie.mainTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     movie.subTitle?.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <h1 className="text-2xl font-bold text-gray-900">Trending Now 管理</h1>
          <p className="text-gray-600">手动配置Trending Now板块显示的影片</p>
        </div>
        <Button onClick={() => setIsSelecting(true)} disabled={filteredAvailableMovies.length === 0}>
          <Plus className="h-4 w-4 mr-2" />
          添加影片
        </Button>
      </div>

      {/* 影片选择器 - 与New Release相同的逻辑 */}
      {isSelecting && (
        <Card>
          <CardHeader>
            <CardTitle>选择影片</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索影片..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {filteredAvailableMovies.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">没有可用的影片</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {filteredAvailableMovies.map((movie) => (
                  <div key={movie.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-18 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        {movie.coverUrl && (
                          <img 
                            src={movie.coverUrl} 
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
                        {movie.category && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            {movie.category.name}
                          </Badge>
                        )}
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleAddToSection(movie.id)}
                      >
                        添加
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsSelecting(false)}>
                取消
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trending Now 影片列表 */}
      {items.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无影片</h3>
              <p className="text-gray-500 mb-4">选择影片添加到Trending Now板块</p>
              <Button onClick={() => setIsSelecting(true)} disabled={filteredAvailableMovies.length === 0}>
                <Plus className="h-4 w-4 mr-2" />
                添加影片
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            当前共 {items.length} 部影片，按顺序显示在前台Trending Now板块
          </div>
          {items.map((item, index) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  {/* 封面图 */}
                  <div className="w-16 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {item.movie.coverUrl && (
                      <img 
                        src={item.movie.coverUrl} 
                        alt={item.movie.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* 影片信息 */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.movie.name}
                      </h3>
                      <Badge variant="outline">第 {item.order} 位</Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      {item.movie.mainTitle && (
                        <div><span className="font-medium">主标题:</span> {item.movie.mainTitle}</div>
                      )}
                      {item.movie.category && (
                        <div><span className="font-medium">分类:</span> {item.movie.category.name}</div>
                      )}
                      <div><span className="font-medium">跳转:</span> {item.movie.jumpUrl}</div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-col space-y-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveOrder(item.id, 'up')}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveOrder(item.id, 'down')}
                        disabled={index === items.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(item.id)}
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


