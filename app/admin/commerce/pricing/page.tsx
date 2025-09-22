'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Coins, Edit, Save, Settings
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Title {
  id: string
  name: string
  slug: string
  freeUntilEpisode?: number
  bundlePriceCoins?: number  // 改为金币价格
  episodes: Episode[]
}

interface Episode {
  id: string
  epNumber: number
  name: string
  isFree: boolean
  episodePriceCoins?: number  // 改为金币价格
}

export default function PricingManagementPage() {
  const [titles, setTitles] = useState<Title[]>([])
  const [loading, setLoading] = useState(true)
  const [editingTitle, setEditingTitle] = useState<string | null>(null)
  const [pricingForm, setPricingForm] = useState({
    freeUntilEpisode: '',
    bundlePriceCoins: '',  // 改为金币
    episodePriceCoins: '100'  // 默认100金币/集
  })

  useEffect(() => {
    fetchTitles()
  }, [])

  const fetchTitles = async () => {
    try {
      const response = await fetch('/api/movie-library')
      const data = await response.json()
      setTitles(data)
    } catch (error) {
      toast.error('获取影片列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleEditPricing = (title: Title) => {
    setEditingTitle(title.id)
    setPricingForm({
      freeUntilEpisode: title.freeUntilEpisode?.toString() || '',
      bundlePriceCoins: title.bundlePriceCoins?.toString() || '',
      episodePriceCoins: '100'
    })
  }

  const handleSavePricing = async () => {
    if (!editingTitle) return

    try {
      const response = await fetch(`/api/movie-library/${editingTitle}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freeUntilEpisode: pricingForm.freeUntilEpisode ? parseInt(pricingForm.freeUntilEpisode) : null,
          bundlePriceCoins: pricingForm.bundlePriceCoins ? parseInt(pricingForm.bundlePriceCoins) : null
        })
      })

      if (response.ok) {
        toast.success('收费策略更新成功')
        setEditingTitle(null)
        fetchTitles()
      } else {
        throw new Error('更新失败')
      }
    } catch (error) {
      toast.error('更新收费策略失败')
    }
  }

  const calculateSeriesPrice = (episodeCount: number) => {
    // 按剧长自动计算推荐价格
    if (episodeCount <= 20) return 1200
    if (episodeCount <= 40) return 2000
    return 2800
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">收费策略管理</h1>
          <p className="text-gray-600">设置影片的金币收费规则</p>
        </div>
      </div>

      {/* 收费规则说明 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 mb-2">收费规则说明</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <strong>单集收费:</strong> 固定100金币/集
            </div>
            <div>
              <strong>整部剧收费:</strong>
              <ul className="ml-4 mt-1">
                <li>• 20集内: 1200金币 (约$10)</li>
                <li>• 40集内: 2000金币 (约$16)</li>
                <li>• 60集内: 2800金币 (约$22)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {titles.map((title) => (
          <Card key={title.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{title.name}</span>
                  <Badge variant="outline">{title.episodes.length} 集</Badge>
                  <Badge variant="secondary">
                    推荐: {calculateSeriesPrice(title.episodes.length)} 金币
                  </Badge>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleEditPricing(title)}
                  disabled={editingTitle === title.id}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  设置收费
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingTitle === title.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">免费到第几集</label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="3 (前3集免费)"
                        value={pricingForm.freeUntilEpisode}
                        onChange={(e) => setPricingForm(prev => ({ 
                          ...prev, 
                          freeUntilEpisode: e.target.value 
                        }))}
                      />
                      <p className="text-xs text-gray-500 mt-1">0表示无免费集数</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">整部剧价格（金币）</label>
                      <Input
                        type="number"
                        min="0"
                        placeholder={calculateSeriesPrice(title.episodes.length).toString()}
                        value={pricingForm.bundlePriceCoins}
                        onChange={(e) => setPricingForm(prev => ({ 
                          ...prev, 
                          bundlePriceCoins: e.target.value 
                        }))}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        推荐: {calculateSeriesPrice(title.episodes.length)} 金币
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSavePricing}>
                      <Save className="w-4 h-4 mr-2" />
                      保存设置
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setEditingTitle(null)}
                    >
                      取消
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">免费集数:</span>
                      <p className="font-medium flex items-center gap-1">
                        {title.freeUntilEpisode ? `前${title.freeUntilEpisode}集免费` : '无免费集数'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">整部剧价格:</span>
                      <p className="font-medium flex items-center gap-1">
                        <Coins className="w-3 h-3 text-yellow-500" />
                        {title.bundlePriceCoins || calculateSeriesPrice(title.episodes.length)} 金币
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">单集价格:</span>
                      <p className="font-medium flex items-center gap-1">
                        <Coins className="w-3 h-3 text-yellow-500" />
                        100 金币
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium mb-2">收费策略预览</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• 前{title.freeUntilEpisode || 0}集: 免费观看</p>
                      <p>• 第{(title.freeUntilEpisode || 0) + 1}集起: 100金币/集</p>
                      <p>• 整部剧购买: {title.bundlePriceCoins || calculateSeriesPrice(title.episodes.length)}金币 (节省{Math.max(0, title.episodes.length * 100 - (title.bundlePriceCoins || calculateSeriesPrice(title.episodes.length)))}金币)</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
