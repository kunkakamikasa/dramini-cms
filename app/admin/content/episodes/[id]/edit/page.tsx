'use client'

export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Episode {
  id: string
  titleId: string
  epNumber: number
  name?: string
  videoId?: string
  durationSec?: number
  status: string
  title: {
    name: string
  }
}

export default function EditEpisodePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    epNumber: 1,
    name: '',
    videoId: '',
    durationSec: '',
    status: 'DRAFT'
  })
  
  const [episode, setEpisode] = useState<Episode | null>(null)

  useEffect(() => {
    fetchEpisode()
  }, [])

  const fetchEpisode = async () => {
    try {
      const response = await fetch(`/api/episodes/${params.id}`)
      if (response.ok) {
        const data: Episode = await response.json()
        setEpisode(data)
        setFormData({
          epNumber: data.epNumber,
          name: data.name || '',
          videoId: data.videoId || '',
          durationSec: data.durationSec?.toString() || '',
          status: data.status
        })
      } else {
        toast.error('剧集不存在')
        router.push('/admin/content/episodes')
      }
    } catch (error) {
      toast.error('加载失败')
      router.push('/admin/content/episodes')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.videoId.trim()) {
      toast.error('请填写视频ID')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/episodes/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          durationSec: formData.durationSec ? parseInt(formData.durationSec) : null
        })
      })

      if (response.ok) {
        toast.success('剧集更新成功')
        router.push('/admin/content/episodes')
      } else {
        const error = await response.text()
        toast.error('更新失败: ' + error)
      }
    } catch (error) {
      toast.error('网络错误')
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg">加载中...</div>
    </div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/content/episodes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回剧集管理
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">编辑剧集</h1>
          <p className="text-gray-600">
            {episode?.title.name} - 第{episode?.epNumber}集
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>剧集信息</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  集数编号 *
                </label>
                <Input
                  type="number"
                  min="1"
                  value={formData.epNumber}
                  onChange={(e) => handleInputChange('epNumber', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  集数名称
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="例如：初次相遇"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  视频ID *
                </label>
                <Input
                  value={formData.videoId}
                  onChange={(e) => handleInputChange('videoId', e.target.value)}
                  placeholder="视频文件ID或URL"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  时长（秒）
                </label>
                <Input
                  type="number"
                  value={formData.durationSec}
                  onChange={(e) => handleInputChange('durationSec', e.target.value)}
                  placeholder="例如：3600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  状态
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="DRAFT">草稿</option>
                  <option value="PUBLISHED">已发布</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                保存修改
              </Button>
              <Link href="/admin/content/episodes">
                <Button variant="outline" type="button">
                  取消
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


