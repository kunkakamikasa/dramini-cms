'use client'

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Gift } from 'lucide-react'

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPromotions() {
      try {
        const response = await fetch('/api/promotions')
        if (response.ok) {
          const data = await response.json()
          setPromotions(data)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchPromotions()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg">加载中...</div>
    </div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">促销管理</h1>
          <p className="text-gray-600">创建和管理促销活动</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          创建促销
        </Button>
      </div>

      {promotions.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无促销活动</h3>
              <p className="text-gray-500 mb-4">创建您的第一个促销活动</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                创建促销
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {promotions.map((promotion) => (
            <Card key={promotion.id}>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900">{promotion.code}</h3>
                <p className="text-sm text-gray-600">类型: {promotion.type}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}