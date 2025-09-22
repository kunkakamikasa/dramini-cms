'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit, Trash2, Save, X, DollarSign, Coins } from 'lucide-react'
import toast from 'react-hot-toast'

interface PaymentPackage {
  id: string
  name: string
  priceUsd: number // 美分
  baseCoins: number
  bonusCoins: number
  isFirstTime: boolean
  isActive: boolean
  order: number
  description?: string
  createdAt: string
  updatedAt: string
}

export default function PaymentPackagesPage() {
  const [packages, setPackages] = useState<PaymentPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPackage, setEditingPackage] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [packageForm, setPackageForm] = useState({
    name: '',
    priceUsd: '',
    baseCoins: '',
    bonusCoins: '',
    isFirstTime: false,
    isActive: true,
    order: '',
    description: ''
  })

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/payment-packages')
      const data = await response.json()
      setPackages(data)
    } catch (error) {
      toast.error('获取充值套餐失败')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/payment-packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packageForm)
      })

      if (response.ok) {
        toast.success('充值套餐创建成功')
        setShowCreateModal(false)
        resetForm()
        fetchPackages()
      } else {
        throw new Error('创建失败')
      }
    } catch (error) {
      toast.error('创建充值套餐失败')
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch(`/api/payment-packages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packageForm)
      })

      if (response.ok) {
        toast.success('充值套餐更新成功')
        setEditingPackage(null)
        resetForm()
        fetchPackages()
      } else {
        throw new Error('更新失败')
      }
    } catch (error) {
      toast.error('更新充值套餐失败')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个充值套餐吗？')) return

    try {
      const response = await fetch(`/api/payment-packages/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('充值套餐删除成功')
        fetchPackages()
      } else {
        throw new Error('删除失败')
      }
    } catch (error) {
      toast.error('删除充值套餐失败')
    }
  }

  const startEdit = (pkg: PaymentPackage) => {
    setEditingPackage(pkg.id)
    setPackageForm({
      name: pkg.name,
      priceUsd: (pkg.priceUsd / 100).toString(),
      baseCoins: pkg.baseCoins.toString(),
      bonusCoins: pkg.bonusCoins.toString(),
      isFirstTime: pkg.isFirstTime,
      isActive: pkg.isActive,
      order: pkg.order.toString(),
      description: pkg.description || ''
    })
  }

  const resetForm = () => {
    setPackageForm({
      name: '',
      priceUsd: '',
      baseCoins: '',
      bonusCoins: '',
      isFirstTime: false,
      isActive: true,
      order: '',
      description: ''
    })
  }

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`
  const calculateTotal = (base: number, bonus: number) => base + bonus
  const calculateUnitPrice = (totalCoins: number, priceUsd: number) => 
    `$${(priceUsd / 100 / totalCoins).toFixed(4)}/金币`

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
          <h1 className="text-2xl font-bold text-gray-900">充值套餐管理</h1>
          <p className="text-gray-600">管理金币充值套餐，设置价格和奖励</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          新增套餐
        </Button>
      </div>

      {/* 套餐列表 */}
      <div className="grid gap-4">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={!pkg.isActive ? 'opacity-60' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span>{pkg.name}</span>
                  <Badge variant={pkg.isFirstTime ? "default" : "secondary"}>
                    {pkg.isFirstTime ? '首充套餐' : '常规套餐'}
                  </Badge>
                  {!pkg.isActive && <Badge variant="outline">已停用</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(pkg)}
                    disabled={editingPackage === pkg.id}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(pkg.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingPackage === pkg.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">套餐名称</label>
                      <Input
                        value={packageForm.name}
                        onChange={(e) => setPackageForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">价格 (USD)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={packageForm.priceUsd}
                        onChange={(e) => setPackageForm(prev => ({ ...prev, priceUsd: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">基础金币</label>
                      <Input
                        type="number"
                        value={packageForm.baseCoins}
                        onChange={(e) => setPackageForm(prev => ({ ...prev, baseCoins: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">赠送金币</label>
                      <Input
                        type="number"
                        value={packageForm.bonusCoins}
                        onChange={(e) => setPackageForm(prev => ({ ...prev, bonusCoins: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">显示顺序</label>
                      <Input
                        type="number"
                        value={packageForm.order}
                        onChange={(e) => setPackageForm(prev => ({ ...prev, order: e.target.value }))}
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={packageForm.isFirstTime}
                          onChange={(e) => setPackageForm(prev => ({ ...prev, isFirstTime: e.target.checked }))}
                          className="mr-2"
                        />
                        首充套餐
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={packageForm.isActive}
                          onChange={(e) => setPackageForm(prev => ({ ...prev, isActive: e.target.checked }))}
                          className="mr-2"
                        />
                        启用
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">描述</label>
                    <Textarea
                      value={packageForm.description}
                      onChange={(e) => setPackageForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="套餐描述..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleUpdate(pkg.id)}>
                      <Save className="w-4 h-4 mr-2" />
                      保存
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditingPackage(null)
                        resetForm()
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      取消
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{formatPrice(pkg.priceUsd)}</div>
                    <div className="text-sm text-gray-500">售价</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      <Coins className="w-5 h-5 inline mr-1" />
                      {pkg.baseCoins}
                    </div>
                    <div className="text-sm text-gray-500">基础金币</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      +{pkg.bonusCoins}
                    </div>
                    <div className="text-sm text-gray-500">赠送金币</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">
                      {calculateTotal(pkg.baseCoins, pkg.bonusCoins)}
                    </div>
                    <div className="text-sm text-gray-500">实际到账</div>
                    <div className="text-xs text-gray-400">
                      {calculateUnitPrice(calculateTotal(pkg.baseCoins, pkg.bonusCoins), pkg.priceUsd)}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 创建套餐弹窗 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>创建充值套餐</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">套餐名称 *</label>
                  <Input
                    value={packageForm.name}
                    onChange={(e) => setPackageForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="例如：入门档"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">价格 (USD) *</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={packageForm.priceUsd}
                    onChange={(e) => setPackageForm(prev => ({ ...prev, priceUsd: e.target.value }))}
                    placeholder="4.99"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">基础金币 *</label>
                  <Input
                    type="number"
                    value={packageForm.baseCoins}
                    onChange={(e) => setPackageForm(prev => ({ ...prev, baseCoins: e.target.value }))}
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">赠送金币</label>
                  <Input
                    type="number"
                    value={packageForm.bonusCoins}
                    onChange={(e) => setPackageForm(prev => ({ ...prev, bonusCoins: e.target.value }))}
                    placeholder="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">显示顺序</label>
                  <Input
                    type="number"
                    value={packageForm.order}
                    onChange={(e) => setPackageForm(prev => ({ ...prev, order: e.target.value }))}
                    placeholder="1"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={packageForm.isFirstTime}
                      onChange={(e) => setPackageForm(prev => ({ ...prev, isFirstTime: e.target.checked }))}
                      className="mr-2"
                    />
                    首充套餐
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={packageForm.isActive}
                      onChange={(e) => setPackageForm(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="mr-2"
                    />
                    启用
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">描述</label>
                <Textarea
                  value={packageForm.description}
                  onChange={(e) => setPackageForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="套餐描述..."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreate} className="flex-1">
                  创建套餐
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowCreateModal(false)
                    resetForm()
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
