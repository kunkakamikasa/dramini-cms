'use client'

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, Search, Play, Trash2, MoreHorizontal, Clock, Eye, EyeOff, ExternalLink } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface Episode {
  id: string
  titleId: string
  episodeNum: number
  name?: string
  description?: string
  videoUrl: string
  duration?: number
  thumbnail?: string
  status: string
  isFreePreview: boolean
  createdAt: string
  updatedAt: string
  title: {
    id: string
    name: string
    slug: string
  }
}

interface Title {
  id: string
  name: string
  slug: string
}

export default function GlobalEpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [titles, setTitles] = useState<Title[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTitle, setSelectedTitle] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchEpisodes()
    fetchTitles()
  }, [])

  const fetchEpisodes = async () => {
    try {
      const response = await fetch('/api/episodes')
      const data = await response.json()
      // 确保返回的是数组
      setEpisodes(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error('获取剧集列表失败')
    } finally {
      setLoading(false)
    }
  }

  const fetchTitles = async () => {
    try {
      const response = await fetch('/api/movie-library')
      const data = await response.json()
      // 确保返回的是数组并过滤在线剧目
      const titlesArray = Array.isArray(data) ? data : []
      setTitles(titlesArray.filter((title: any) => title.isOnline))
    } catch (error) {
      console.error('获取剧目列表失败:', error)
      setTitles([])
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个剧集吗？')) return

    try {
      const response = await fetch(`/api/episodes/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('剧集删除成功')
        fetchEpisodes()
      } else {
        throw new Error('删除失败')
      }
    } catch (error) {
      toast.error('删除剧集失败')
    }
  }

  const toggleOnlineStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/episodes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFreePreview: !currentStatus })
      })

      if (response.ok) {
        toast.success(`剧集已${!currentStatus ? '上线' : '下线'}`)
        fetchEpisodes()
      } else {
        throw new Error('更新失败')
      }
    } catch (error) {
      toast.error('更新剧集状态失败')
    }
  }

  const filteredEpisodes = Array.isArray(episodes) ? episodes.filter(episode => {
    const matchesSearch = episode.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         episode.title.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         episode.episodeNum.toString().includes(searchTerm)
    
    const matchesTitle = selectedTitle === 'all' || selectedTitle === '' || episode.titleId === selectedTitle
    
    const matchesStatus = statusFilter === 'all' || statusFilter === '' ||
                         (statusFilter === 'online' && episode.isFreePreview) ||
                         (statusFilter === 'offline' && !episode.isFreePreview) ||
                         (statusFilter === 'published' && episode.status === 'PUBLISHED') ||
                         (statusFilter === 'draft' && episode.status === 'DRAFT')
    
    return matchesSearch && matchesTitle && matchesStatus
  }) : []

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '--'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const groupedEpisodes = filteredEpisodes.reduce((acc, episode) => {
    const titleName = episode.title.name
    if (!acc[titleName]) {
      acc[titleName] = {
        title: episode.title,
        episodes: []
      }
    }
    acc[titleName].episodes.push(episode)
    return acc
  }, {} as Record<string, { title: { id: string, name: string, slug: string }, episodes: Episode[] }>)

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">加载中...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">剧集管理</h1>
          <p className="text-gray-600">管理所有剧目的剧集内容</p>
        </div>
        <div className="text-sm text-gray-500">
          共 {filteredEpisodes.length} 个剧集
        </div>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索剧集名称或剧目名称..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedTitle} onValueChange={setSelectedTitle}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择剧目" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部剧目</SelectItem>
                {titles.map((title) => (
                  <SelectItem key={title.id} value={title.id}>
                    {title.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="online">已上线</SelectItem>
                <SelectItem value="offline">已下线</SelectItem>
                <SelectItem value="published">已发布</SelectItem>
                <SelectItem value="draft">草稿</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 剧集列表 */}
      <div className="space-y-6">
        {Object.keys(groupedEpisodes).length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <div className="text-center">
                <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>暂无符合条件的剧集</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedEpisodes).map(([titleName, { title, episodes }]) => (
            <Card key={title.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    <span>{titleName}</span>
                    <Badge variant="outline" className="text-xs ml-2">
                      {episodes.length} 集
                    </Badge>
                  </CardTitle>
                  <Link href={`/admin/content/movie-library/${title.id}`}>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      剧目管理
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {episodes
                    .sort((a, b) => a.episodeNum - b.episodeNum)
                    .map((episode) => (
                    <div
                      key={episode.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-sm font-bold text-blue-600">
                          {episode.episodeNum}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">
                            第{episode.episodeNum}集
                            {episode.name && ` - ${episode.name}`}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDuration(episode.duration)}
                            </span>
                            <Badge variant={episode.isFreePreview ? "default" : "secondary"} className="text-xs">
                              {episode.isFreePreview ? '已上线' : '已下线'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {episode.status === 'PUBLISHED' ? '已发布' : '草稿'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant={episode.isFreePreview ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleOnlineStatus(episode.id, episode.isFreePreview)}
                        >
                          {episode.isFreePreview ? (
                            <>
                              <EyeOff className="w-3 h-3" />
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3" />
                            </>
                          )}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/content/episodes/${episode.id}/edit`}>
                                <Edit className="w-3 h-3 mr-2" />
                                编辑
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(episode.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-3 h-3 mr-2" />
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}