'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Save, Loader2, Upload, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'

interface FormData {
  name: string
  slug: string
  synopsis: string
  categoryId: string
  language: string
  status: string
  coverImageId: string
  previewImage: string
}

export default function CreateTitlePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    synopsis: '',
    categoryId: '',
    language: 'zh',
    status: 'DRAFT',
    coverImageId: '',
    previewImage: ''
  })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = async (file: File, type: 'cover' | 'preview') => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      
      if (type === 'cover') {
        setFormData(prev => ({ ...prev, coverImageId: result.imageUrl }))
      } else {
        setFormData(prev => ({ ...prev, previewImage: result.imageUrl }))
      }
      
      toast.success('图片上传成功！')
    } catch (error) {
      toast.error('图片上传失败')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/movie-library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create title')
      }

      toast.success('剧目创建成功！')
      router.push('/admin/content/movie-library')
    } catch (error) {
      toast.error('创建失败')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">创建新剧目</h1>
        <p className="text-gray-600">填写剧目信息并上传相关图片</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 主要内容 */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">剧目名称 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="请输入剧目名称"
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">URL 别名 *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="url-friendly-name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="synopsis">剧情简介</Label>
                <Textarea
                  id="synopsis"
                  value={formData.synopsis}
                  onChange={(e) => handleInputChange('synopsis', e.target.value)}
                  placeholder="请输入剧情简介"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="categoryId">分类</Label>
                <Select value={formData.categoryId} onValueChange={(value) => handleInputChange('categoryId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="df80afd2-1f19-4b86-9b84-a1012103668e">11</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">语言</Label>
                <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">状态</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">草稿</SelectItem>
                    <SelectItem value="PUBLISHED">已发布</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>图片设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>封面图片</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={formData.coverImageId}
                    onChange={(e) => handleInputChange('coverImageId', e.target.value)}
                    placeholder="封面图片URL"
                    type="url"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file, 'cover')
                    }}
                    className="hidden"
                    id="cover-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('cover-upload')?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    上传
                  </Button>
                </div>
                {formData.coverImageId && (
                  <div className="mt-2">
                    <img src={formData.coverImageId} alt="封面预览" className="w-32 h-20 object-cover rounded" />
                  </div>
                )}
              </div>

              <div>
                <Label>首页预览图</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={formData.previewImage}
                    onChange={(e) => handleInputChange('previewImage', e.target.value)}
                    placeholder="首页预览图URL"
                    type="url"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file, 'preview')
                    }}
                    className="hidden"
                    id="preview-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('preview-upload')?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    上传
                  </Button>
                </div>
                {formData.previewImage && (
                  <div className="mt-2">
                    <img src={formData.previewImage} alt="预览图" className="w-32 h-20 object-cover rounded" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>操作</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  创建剧目
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.back()}
                >
                  取消
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
