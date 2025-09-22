'use client'

export const dynamic = 'force-dynamic';

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Save,
  RefreshCw,
  Settings,
  Globe,
  DollarSign,
  Shield,
  Upload,
  Database,
  Mail,
  CreditCard
} from 'lucide-react'
import toast from 'react-hot-toast'

// 模拟设置数据
const mockSettings = {
  site_name: { value: 'Dramini CMS' },
  default_currency: { value: 'CNY' },
  free_preview_episodes: { value: 3 },
  drm_enabled: { value: false },
  cdn_base_url: { value: 'https://cdn.dramini.com' },
  max_file_size: { value: 100 }, // MB
  allowed_video_formats: { value: ['mp4', 'mov', 'avi'] },
  allowed_image_formats: { value: ['jpg', 'jpeg', 'png', 'webp'] },
  smtp_host: { value: 'smtp.example.com' },
  smtp_port: { value: 587 },
  stripe_secret_key: { value: 'sk_test_...' },
  paypal_client_id: { value: 'paypal_client_id' }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockSettings)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // 这里应该调用 API 保存设置
      await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟 API 调用
      toast.success('设置保存成功')
    } catch (error) {
      toast.error('保存设置失败')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSettings(mockSettings)
    toast.success('设置已重置')
  }

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: { value }
    }))
  }

  const settingSections = [
    {
      title: '基本设置',
      icon: Settings,
      settings: [
        {
          key: 'site_name',
          label: '网站名称',
          type: 'text',
          description: '显示在管理后台的网站名称'
        },
        {
          key: 'default_currency',
          label: '默认货币',
          type: 'select',
          options: [
            { value: 'CNY', label: '人民币 (CNY)' },
            { value: 'USD', label: '美元 (USD)' },
            { value: 'EUR', label: '欧元 (EUR)' }
          ],
          description: '系统默认使用的货币单位'
        },
        {
          key: 'free_preview_episodes',
          label: '免费预览集数',
          type: 'number',
          description: '每个标题默认免费预览的集数'
        }
      ]
    },
    {
      title: '媒体设置',
      icon: Upload,
      settings: [
        {
          key: 'max_file_size',
          label: '最大文件大小 (MB)',
          type: 'number',
          description: '上传文件的最大大小限制'
        },
        {
          key: 'allowed_video_formats',
          label: '允许的视频格式',
          type: 'text',
          description: '支持上传的视频格式，用逗号分隔'
        },
        {
          key: 'allowed_image_formats',
          label: '允许的图片格式',
          type: 'text',
          description: '支持上传的图片格式，用逗号分隔'
        },
        {
          key: 'cdn_base_url',
          label: 'CDN 基础 URL',
          type: 'text',
          description: '内容分发网络的基础 URL'
        }
      ]
    },
    {
      title: '安全设置',
      icon: Shield,
      settings: [
        {
          key: 'drm_enabled',
          label: '启用 DRM 保护',
          type: 'checkbox',
          description: '是否启用数字版权管理保护'
        }
      ]
    },
    {
      title: '邮件设置',
      icon: Mail,
      settings: [
        {
          key: 'smtp_host',
          label: 'SMTP 主机',
          type: 'text',
          description: '邮件服务器主机地址'
        },
        {
          key: 'smtp_port',
          label: 'SMTP 端口',
          type: 'number',
          description: '邮件服务器端口号'
        }
      ]
    },
    {
      title: '支付设置',
      icon: CreditCard,
      settings: [
        {
          key: 'stripe_secret_key',
          label: 'Stripe 密钥',
          type: 'password',
          description: 'Stripe 支付服务的密钥'
        },
        {
          key: 'paypal_client_id',
          label: 'PayPal 客户端 ID',
          type: 'text',
          description: 'PayPal 支付服务的客户端 ID'
        }
      ]
    }
  ]

  const renderSettingInput = (setting: any) => {
    const value = settings[setting.key]?.value

    switch (setting.type) {
      case 'text':
        return (
          <Input
            value={value || ''}
            onChange={(e) => updateSetting(setting.key, e.target.value)}
            placeholder={setting.description}
          />
        )
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => updateSetting(setting.key, parseInt(e.target.value) || 0)}
            placeholder={setting.description}
          />
        )
      case 'password':
        return (
          <Input
            type="password"
            value={value || ''}
            onChange={(e) => updateSetting(setting.key, e.target.value)}
            placeholder={setting.description}
          />
        )
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => updateSetting(setting.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {setting.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => updateSetting(setting.key, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              {value ? '已启用' : '已禁用'}
            </span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
          <p className="text-gray-600">配置系统参数和第三方服务</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            重置
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? '保存中...' : '保存设置'}
          </Button>
        </div>
      </div>

      {/* 设置分组 */}
      <div className="space-y-6">
        {settingSections.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon className="h-5 w-5" />
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.settings.map((setting) => (
                  <div key={setting.key} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {setting.label}
                      </label>
                      <p className="text-sm text-gray-600">
                        {setting.description}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      {renderSettingInput(setting)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 系统信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>系统信息</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">v1.0.0</div>
              <div className="text-sm text-gray-600">系统版本</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">PostgreSQL</div>
              <div className="text-sm text-gray-600">数据库</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Next.js 14</div>
              <div className="text-sm text-gray-600">框架版本</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">生产环境</div>
              <div className="text-sm text-gray-600">运行环境</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 操作日志 */}
      <Card>
        <CardHeader>
          <CardTitle>最近设置变更</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <div className="font-medium text-gray-900">更新默认货币</div>
                <div className="text-sm text-gray-600">管理员 • 2小时前</div>
              </div>
              <Badge variant="outline">更新</Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <div className="font-medium text-gray-900">启用 DRM 保护</div>
                <div className="text-sm text-gray-600">管理员 • 1天前</div>
              </div>
              <Badge variant="outline">更新</Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-gray-900">配置邮件服务</div>
                <div className="text-sm text-gray-600">管理员 • 3天前</div>
              </div>
              <Badge variant="outline">创建</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


