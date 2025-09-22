'use client'

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, Edit, Save, Plus, Trash2, MoveUp, MoveDown,
  Play, Clock, Eye, EyeOff
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'

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
}

interface Title {
  id: string
  slug: string
  name: string
  mainTitle?: string
  subTitle?: string
  synopsis?: string
  coverUrl: string
  bannerUrl?: string
  rating?: number
  status: string
  isOnline: boolean
  isFreePreview: boolean
  category?: {
    id: string
    name: string
  }
  episodes: Episode[]
}

export default function TitleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const titleId = params.id as string
  
  const [title, setTitle] = useState<Title | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('info')
  
  // 剧集表单状态
  const [showEpisodeModal, setShowEpisodeModal] = useState(false)
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null)
  const [episodeForm, setEpisodeForm] = useState({
    episodeNum: 1,
    name: '',
    description: '',
    videoUrl: '',
    duration: '',
    thumbnail: ''
  })

  useEffect(() => {
    fetchTitleDetail()
    fetchEpisodes()
  }, [titleId])

  const fetchTitleDetail = async () => {
    try {
      const response = await fetch(`/api/movie-library/${titleId}`)
      const data = await response.json()
      setTitle(data)
    } catch (error) {
      toast.error('获取剧目详情失败')
    }
  }

  const fetchEpisodes = async () => {
    try {
      const response = await fetch(`/api/episodes?titleId=${titleId}`)
      const data = await response.json()
      setEpisodes(data.sort((a: Episode, b: Episode) => a.episodeNum - b.episodeNum))
    } catch (error) {
      toast.error('获取剧集列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEpisode = async () => {
    if (!episodeForm.videoUrl) {
      toast.error('请填写视频地址')
      return
    }

    try {
      const response = await fetch('/api/episodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleId,
          ...episodeForm,
          duration: episodeForm.duration ? parseInt(episodeForm.duration) : null
        })
      })

      if (response.ok) {
        toast.success('剧集创建成功')
        setShowEpisodeModal(false)
        resetEpisodeForm()
        fetchEpisodes()
      } else {
        throw new Error('创建失败')
      }
    } catch (error) {
      toast.error('创建剧集失败')
    }
  }

  const handleEditEpisode = async () => {
    if (!editingEpisode || !episodeForm.videoUrl) {
      toast.error('请填写必要信息')
      return
    }

    try {
      const response = await fetch(`/api/episodes/${editingEpisode.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...episodeForm,
          duration: episodeForm.duration ? parseInt(episodeForm.duration) : null
        })
      })

      if (response.ok) {
        toast.success('剧集更新成功')
        setShowEpisodeModal(false)
        setEditingEpisode(null)
        resetEpisodeForm()
        fetchEpisodes()
      } else {
        throw new Error('更新失败')
      }
    } catch (error) {
      toast.error('更新剧集失败')
    }
  }

  const handleDeleteEpisode = async (episodeId: string) => {
    if (!confirm('确定要删除这个剧集吗？')) return

    try {
      const response = await fetch(`/api/episodes/${episodeId}`, {
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

  const toggleEpisodeStatus = async (episodeId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/episodes/${episodeId}`, {
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

  const openEpisodeModal = (episode?: Episode) => {
    if (episode) {
      setEditingEpisode(episode)
      setEpisodeForm({
        episodeNum: episode.episodeNum,
        name: episode.name || '',
        description: episode.description || '',
        videoUrl: episode.videoUrl,
        duration: episode.duration?.toString() || '',
        thumbnail: episode.thumbnail || ''
      })
    } else {
      setEditingEpisode(null)
      const nextEpisodeNum = episodes.length > 0 
        ? Math.max(...episodes.map(e => e.episodeNum)) + 1 
        : 1
      setEpisodeForm({
        episodeNum: nextEpisodeNum,
        name: '',
        description: '',
        videoUrl: '',
        duration: '',
        thumbnail: ''
      })
    }
    setShowEpisodeModal(true)
  }

  const resetEpisodeForm = () => {
    setEpisodeForm({
      episodeNum: 1,
      name: '',
      description: '',
      videoUrl: '',
      duration: '',
      thumbnail: ''
    })
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '--'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">加载中...</div>
        </div>
      </div>
    )
  }

  if (!title) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">剧目不存在</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center gap-4">
        <Link href="/admin/content/movie-library">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回影片库
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{title.name}</h1>
          <p className="text-gray-600">{title.mainTitle || title.subTitle}</p>
        </div>
      </div>

      {/* Tab导航 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="info">剧目信息</TabsTrigger>
          <TabsTrigger value="episodes">剧集管理</TabsTrigger>
        </TabsList>

        {/* 剧目信息Tab */}
        <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                剧目详情
                <Link href={`/admin/content/movie-library/${title.id}/edit`}>
                  <Button size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    编辑剧目
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <Image
                      src={title.coverUrl}
                      alt={title.name}
                      width={200}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Badge variant={title.isOnline ? "default" : "secondary"}>
                      {title.isOnline ? '已上线' : '已下线'}
                    </Badge>
                    <Badge variant="outline">
                      {title.status === 'PUBLISHED' ? '已发布' : '草稿'}
                    </Badge>
                    {title.category && (
                      <Badge variant="outline">{title.category.name}</Badge>
                    )}
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">基本信息</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">剧目名称:</span>
                        <p className="font-medium">{title.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">主标题:</span>
                        <p className="font-medium">{title.mainTitle || '--'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">副标题:</span>
                        <p className="font-medium">{title.subTitle || '--'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">评分:</span>
                        <p className="font-medium">{title.rating || '--'}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">URL别名:</span>
                        <p className="font-medium">{title.slug}</p>
                      </div>
                    </div>
                  </div>
                  
                  {title.synopsis && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2">剧情简介</h3>
                      <p className="text-gray-700 leading-relaxed">{title.synopsis}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">统计信息</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-blue-600">{episodes.length}</p>
                        <p className="text-gray-600">总集数</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {episodes.filter(e => e.isFreePreview).length}
                        </p>
                        <p className="text-gray-600">已上线</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-gray-600">
                          {episodes.filter(e => !e.isFreePreview).length}
                        </p>
                        <p className="text-gray-600">已下线</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 剧集管理Tab */}
        <TabsContent value="episodes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                剧集管理
                <Button onClick={() => openEpisodeModal()}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加剧集
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {episodes.length === 0 ? (
                <div className="text-center py-8">
                  <Play className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 mb-4">该剧目暂无剧集</p>
                  <Button onClick={() => openEpisodeModal()}>
                    <Plus className="w-4 h-4 mr-2" />
                    添加第一集
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {episodes.map((episode) => (
                    <div
                      key={episode.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600">
                          {episode.episodeNum}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">
                            第{episode.episodeNum}集
                            {episode.name && ` - ${episode.name}`}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
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
                          {episode.description && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {episode.description}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant={episode.isFreePreview ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleEpisodeStatus(episode.id, episode.isFreePreview)}
                        >
                          {episode.isFreePreview ? (
                            <>
                              <EyeOff className="w-3 h-3 mr-1" />
                              下线
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3 mr-1" />
                              上线
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEpisodeModal(episode)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          编辑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEpisode(episode.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          删除
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 剧集创建/编辑弹窗 */}
      {showEpisodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader>
              <CardTitle>
                {editingEpisode ? '编辑剧集' : '添加剧集'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">集数编号 *</label>
                <Input
                  type="number"
                  min="1"
                  value={episodeForm.episodeNum}
                  onChange={(e) => setEpisodeForm(prev => ({ 
                    ...prev, 
                    episodeNum: parseInt(e.target.value) || 1 
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">集数名称</label>
                <Input
                  placeholder="例如：初次相遇"
                  value={episodeForm.name}
                  onChange={(e) => setEpisodeForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">视频地址 *</label>
                <Input
                  placeholder="视频文件URL或播放页面URL"
                  value={episodeForm.videoUrl}
                  onChange={(e) => setEpisodeForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">时长（秒）</label>
                <Input
                  type="number"
                  placeholder="例如：3600"
                  value={episodeForm.duration}
                  onChange={(e) => setEpisodeForm(prev => ({ ...prev, duration: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">缩略图URL</label>
                <Input
                  placeholder="剧集缩略图地址"
                  value={episodeForm.thumbnail}
                  onChange={(e) => setEpisodeForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">剧集描述</label>
                <textarea
                  className="w-full p-2 border rounded-md resize-none"
                  rows={3}
                  placeholder="剧集简介..."
                  value={episodeForm.description}
                  onChange={(e) => setEpisodeForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={editingEpisode ? handleEditEpisode : handleCreateEpisode}
                  className="flex-1"
                >
                  {editingEpisode ? '更新剧集' : '创建剧集'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowEpisodeModal(false)
                    setEditingEpisode(null)
                    resetEpisodeForm()
                  }}
                  className="flex-1"
                >
                  取消
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
