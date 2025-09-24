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

export default function CreateMoviePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    name: '',           // 影片名称 *
    mainTitle: '',      // 主标题 *
    subTitle: '',       // 副标题 *
    slug: '',
    synopsis: '',
    coverUrl: '',       // 9:16封面图 *
    bannerUrl: '',      // 16:9轮播图 (可选)
    categoryId: '',     // 分类 *
    language: 'zh',
    status: 'DRAFT',
    isOnline: false
  })

  useEffect(() => {
    fetchCategories()
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // 自动生成 slug
    if (field === 'name' && value) {
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
    
    // 验证必填字段
    if (!formData.name.trim()) {
      toast.error('请填写影片名称')
      return
    }
    if (!formData.mainTitle.trim()) {
      toast.error('请填写主标题')
      return
    }
    if (!formData.subTitle.trim()) {
      toast.error('请填写副标题')
      return
    }
    if (!formData.coverUrl.trim()) {
      toast.error('请上传9:16封面图')
      return
    }
    if (!formData.categoryId) {
      toast.error('请选择分类')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/movie-library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('影片添加成功')
        router.push('/admin/content/movie-library')
      } else {
        const error = await response.text()
        toast.error('创建失败: ' + error)
      }
    } catch (error) {
      toast.error('网络错误')
    } finally {
      setIsLoading(false)
    }
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
          <h1 className="text-2xl font-bold text-gray-900">添加影片</h1>
          <p className="text-gray-600">添加新影片到影片库</p>
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
                  影片名称 * <span className="text-red-500">必填</span>
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="重生之你动我一下试试"
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
                  主标题 * <span className="text-red-500">必填</span>
                </label>
                <Input
                  value={formData.mainTitle}
                  onChange={(e) => handleInputChange('mainTitle', e.target.value)}
                  placeholder="重生之你动我一下试试"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  副标题 * <span className="text-red-500">必填</span>
                </label>
                <Input
                  value={formData.subTitle}
                  onChange={(e) => handleInputChange('subTitle', e.target.value)}
                  placeholder="重生之你真敢动我?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分类 * <span className="text-red-500">必填</span>
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange('categoryId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">请选择分类</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {categories.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">
                    请先在分类管理中创建分类
                  </p>
                )}
              </div>

            </div>

            {/* 图片上传 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 9:16封面图 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  9:16封面图 * <span className="text-red-500">必填</span>
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
                          删除
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
                      <p className="text-xs text-gray-500 mt-2">
                        9:16比例，推荐540x960像素
                      </p>
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
                          删除
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
                      <p className="text-xs text-gray-500 mt-2">
                        16:9比例，推荐1920x1080像素<br/>
                        只有上传了轮播图的影片才能设置为轮播图
                      </p>
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

            {/* 表单验证状态 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">表单完成状态:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                <div className={formData.name.trim() ? 'text-green-600' : 'text-red-600'}>
                  影片名称: {formData.name.trim() ? '✅' : '❌'}
                </div>
                <div className={formData.mainTitle.trim() ? 'text-green-600' : 'text-red-600'}>
                  主标题: {formData.mainTitle.trim() ? '✅' : '❌'}
                </div>
                <div className={formData.subTitle.trim() ? 'text-green-600' : 'text-red-600'}>
                  副标题: {formData.subTitle.trim() ? '✅' : '❌'}
                </div>
                <div className={formData.coverUrl.trim() ? 'text-green-600' : 'text-red-600'}>
                  封面图: {formData.coverUrl.trim() ? '✅' : '❌'}
                </div>
                <div className={formData.categoryId ? 'text-green-600' : 'text-red-600'}>
                  分类: {formData.categoryId ? '✅' : '❌'}
                </div>
                <div className={formData.bannerUrl.trim() ? 'text-blue-600' : 'text-gray-500'}>
                  轮播图: {formData.bannerUrl.trim() ? '✅ 可用于轮播' : '无 (可选)'}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                type="submit" 
                disabled={isLoading || !formData.name.trim() || !formData.mainTitle.trim() || 
                         !formData.subTitle.trim() || !formData.coverUrl.trim() || 
                         !formData.categoryId}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                添加到影片库
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
