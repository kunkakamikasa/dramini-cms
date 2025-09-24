'use client'

export const dynamic = 'force-dynamic';


import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, Loader2, Upload, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Category {
  id: string
  name: string
  slug: string
}

interface Movie {
  id: string
  name: string
  mainTitle?: string
  subTitle?: string
  slug: string
  synopsis?: string
  coverUrl?: string
  bannerUrl?: string
  categoryId?: string
  language: string
  status: string
  isOnline: boolean
}

export default function EditMoviePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    mainTitle: '',
    subTitle: '',
    slug: '',
    synopsis: '',
    coverUrl: '',
    bannerUrl: '',
    categoryId: '',
    language: 'zh',
    status: 'DRAFT',
    isOnline: false
  })

  useEffect(() => {
    fetchCategories()
    fetchMovie()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchMovie = async () => {
    try {
      const response = await fetch(`/api/movie-library/${params.id}`)
      if (response.ok) {
        const movie: Movie = await response.json()
        setFormData({
          name: movie.name,
          mainTitle: movie.mainTitle || '',
          subTitle: movie.subTitle || '',
          slug: movie.slug,
          synopsis: movie.synopsis || '',
          coverUrl: movie.coverUrl || '',
          bannerUrl: movie.bannerUrl || '',
          categoryId: movie.categoryId || '',
          language: movie.language,
          status: movie.status,
          isOnline: movie.isOnline
        })
      } else {
        toast.error('影片不存在')
        router.push('/admin/content/movie-library')
      }
    } catch (error) {
      toast.error('加载失败')
      router.push('/admin/content/movie-library')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // 自动生成 slug
    if (field === 'name' && typeof value === 'string' && value) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
      
      setFormData(prev => ({
        ...prev,
        slug
      }))
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'banner') => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('请选择图片文件')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('图片文件不能超过 5MB')
      return
    }

    const setUploading = type === 'cover' ? setUploadingCover : setUploadingBanner

    setUploading(true)

    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      formDataUpload.append('type', type)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      })

      if (response.ok) {
        const result = await response.json()
        setFormData(prev => ({ 
          ...prev, 
          [type === 'cover' ? 'coverImageId' : 'bannerUrl']: result.imageUrl 
        }))
        toast.success(`${type === 'cover' ? '封面图' : '轮播图'}上传成功`)
      } else {
        toast.error('图片上传失败')
      }
    } catch (error) {
      toast.error('上传失败')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('请填写影片名称')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/movie-library/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('影片更新成功')
        router.push('/admin/content/movie-library')
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
        <Link href="/admin/content/movie-library">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回影片库
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">编辑影片</h1>
          <p className="text-gray-600">修改影片信息</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>影片信息</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 基础信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  影片名称 *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="输入影片名称"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL别名
                </label>
                <Input
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="自动生成"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  主标题
                </label>
                <Input
                  value={formData.mainTitle}
                  onChange={(e) => handleInputChange('mainTitle', e.target.value)}
                  placeholder="主标题"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  副标题
                </label>
                <Input
                  value={formData.subTitle}
                  onChange={(e) => handleInputChange('subTitle', e.target.value)}
                  placeholder="副标题"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分类
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange('categoryId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择分类</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  发布状态
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  上线状态
                </label>
                <select
                  value={formData.isOnline ? 'true' : 'false'}
                  onChange={(e) => handleInputChange('isOnline', e.target.value === 'true')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="false">已下线</option>
                  <option value="true">已上线</option>
                </select>
              </div>
            </div>

            {/* 图片上传区域 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 9:16封面图 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  9:16封面图
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {formData.coverUrl ? (
                    <div className="space-y-4">
                      <div className="relative w-32 h-48 bg-gray-100 rounded-lg overflow-hidden mx-auto">
                        <img 
                          src={formData.coverUrl} 
                          alt="封面预览" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex justify-center space-x-2">
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm"
                          onClick={() => coverInputRef.current?.click()}
                          disabled={uploadingCover}
                        >
                          重新选择
                        </Button>
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, coverUrl: '' }))}
                        >
                          删除图片
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <Button 
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        disabled={uploadingCover}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadingCover ? '上传中...' : '选择封面图'}
                      </Button>
                    </div>
                  )}
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'cover')}
                    className="hidden"
                  />
                </div>
              </div>

              {/* 16:9轮播图 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  16:9轮播图 (可选)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {formData.bannerUrl ? (
                    <div className="space-y-4">
                      <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={formData.bannerUrl} 
                          alt="轮播图预览" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex justify-center space-x-2">
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm"
                          onClick={() => bannerInputRef.current?.click()}
                          disabled={uploadingBanner}
                        >
                          重新选择
                        </Button>
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, bannerUrl: '' }))}
                        >
                          删除图片
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => bannerInputRef.current?.click()}
                        disabled={uploadingBanner}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadingBanner ? '上传中...' : '选择轮播图'}
                      </Button>
                    </div>
                  )}
                  <input
                    ref={bannerInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'banner')}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* 剧情简介 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                剧情简介
              </label>
              <Textarea
                value={formData.synopsis}
                onChange={(e) => handleInputChange('synopsis', e.target.value)}
                placeholder="输入影片的剧情简介..."
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                保存修改
              </Button>
              <Link href="/admin/content/movie-library">
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
