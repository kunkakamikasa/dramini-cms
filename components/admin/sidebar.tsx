'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Film,
  Video,
  FolderOpen,
  Tag,
  ShoppingCart,
  CreditCard,
  Users,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  TrendingUp,
  Sparkles,
  DollarSign,
  Coins,
  BarChart3,
  Activity
} from 'lucide-react'

const navigation = [
  {
    name: '仪表板',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: '内容管理',
    children: [
      {
        name: '影片库',
        href: '/admin/content/movie-library',
        icon: Film,
      },
      {
        name: '剧集管理', 
        href: '/admin/content/episodes',
        icon: Video,
      },
      {
        name: '轮播图管理',
        href: '/admin/content/hero-banners',
        icon: ImageIcon,
      },
      {
        name: 'Trending Now',
        href: '/admin/content/trending-now',
        icon: TrendingUp,
      },
      {
        name: 'New Release',
        href: '/admin/content/new-release',
        icon: Sparkles,
      },
    ],
  },
  {
    name: '分类标签',
    children: [
      {
        name: '分类管理',
        href: '/admin/categories',
        icon: FolderOpen,
      },
      {
        name: '标签管理',
        href: '/admin/tags',
        icon: Tag,
      },
    ],
  },
  {
    name: '商务管理',
    children: [
      {
        name: '收费策略',
        href: '/admin/commerce/pricing',
        icon: DollarSign,
      },
      {
        name: '充值套餐',
        href: '/admin/commerce/payment-packages',
        icon: Coins,
      },
      {
        name: '订单管理',
        href: '/admin/commerce/purchases',
        icon: ShoppingCart,
      },
      {
        name: '订阅管理',
        href: '/admin/commerce/subscriptions',
        icon: CreditCard,
      },
    ],
  },
  {
    name: '数据分析',
    children: [
      {
        name: '网站统计',
        href: '/admin/analytics',
        icon: Activity,
      },
    ],
  },
  {
    name: '系统管理',
    children: [
      {
        name: '用户管理',
        href: '/admin/users/list',
        icon: Users,
      },
      {
        name: '审计日志',
        href: '/admin/operations/audit-logs',
        icon: BarChart3,
      },
    ],
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <div className={cn(
      'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-all duration-300',
      collapsed && 'w-16',
      className
    )}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-900">Dramini CMS</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            if (item.children) {
              return (
                <div key={item.name}>
                  {!collapsed && (
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {item.name}
                    </div>
                  )}
                  <div className="space-y-1">
                    {item.children.map((child) => {
                      const Icon = child.icon
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                            isActive(child.href)
                              ? 'bg-blue-100 text-blue-700'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          )}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          {!collapsed && (
                            <span className="ml-3">{child.name}</span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            }

            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-3">{item.name}</span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}