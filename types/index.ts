import { User, Role, Permission } from '@prisma/client'

export interface UserWithRoles extends User {
  roles: Array<{
    role: Role & {
      permissions: Array<{
        permission: Permission
      }>
    }
  }>
}

export interface SessionUser {
  id: string
  email: string
  name?: string
  image?: string
  roles: Role[]
  permissions: string[]
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// 分页参数
export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

// 搜索参数
export interface SearchParams extends PaginationParams {
  q?: string
  status?: string
  category?: string
  tag?: string
  dateFrom?: string
  dateTo?: string
}

// 标题相关类型
export interface TitleWithRelations {
  id: string
  slug: string
  name: string
  synopsis?: string
  coverImageId?: string
  status: string
  language: string
  createdById: string
  updatedById: string
  createdAt: Date
  updatedAt: Date
  releaseAt?: Date
  rating?: number
  featuredWeight: number
  category?: {
    id: string
    name: string
    slug: string
  }
  tags: Array<{
    tag: {
      id: string
      name: string
      slug: string
    }
  }>
  episodes: Array<{
    id: string
    epNumber: number
    name: string
    durationSec?: number
    isFreePreview: boolean
    lockType: string
    priceCents?: number
    status: string
  }>
  createdBy: {
    id: string
    name?: string
    email: string
  }
  updatedBy: {
    id: string
    name?: string
    email: string
  }
}

// 集数相关类型
export interface EpisodeWithRelations {
  id: string
  titleId: string
  epNumber: number
  name: string
  durationSec?: number
  videoId?: string
  isFreePreview: boolean
  lockType: string
  priceCents?: number
  status: string
  createdAt: Date
  updatedAt: Date
  title: {
    id: string
    name: string
    slug: string
  }
  video?: {
    id: string
    url: string
    cdnUrl?: string
    transcodeStatus: string
  }
}

// 集合相关类型
export interface CollectionWithRelations {
  id: string
  name: string
  slug: string
  type: string
  ruleJson?: any
  itemsOrderJson?: any
  createdAt: Date
  updatedAt: Date
  items: Array<{
    id: string
    order: number
    title: {
      id: string
      name: string
      slug: string
      coverImageId?: string
      status: string
    }
  }>
}

// 订单相关类型
export interface PurchaseWithRelations {
  id: string
  userId: string
  titleId: string
  episodeId?: string
  planId?: string
  amountCents: number
  currency: string
  provider: string
  status: string
  extRef?: string
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    name?: string
    email: string
  }
  title: {
    id: string
    name: string
    slug: string
  }
  episode?: {
    id: string
    epNumber: number
    name: string
  }
  plan?: {
    id: string
    type: string
    priceCents: number
  }
}

// 审计日志类型
export interface AuditLogWithRelations {
  id: string
  actorUserId: string
  action: string
  entity: string
  entityId: string
  beforeJson?: any
  afterJson?: any
  ip?: string
  createdAt: Date
  actor: {
    id: string
    name?: string
    email: string
  }
}

// 仪表板数据类型
export interface DashboardMetrics {
  totalTitles: number
  publishedTitles: number
  draftTitles: number
  totalEpisodes: number
  totalUsers: number
  totalPurchases: number
  totalRevenue: number
  pendingTranscodes: number
  pendingReports: number
  recentActivity: Array<{
    id: string
    type: string
    message: string
    createdAt: Date
    user?: {
      name?: string
      email: string
    }
  }>
}

// 图表数据类型
export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }>
}

// 文件上传类型
export interface UploadResponse {
  success: boolean
  data?: {
    id: string
    url: string
    storageKey: string
    width?: number
    height?: number
    format?: string
  }
  error?: string
}

// 转码任务类型
export interface TranscodeJobWithRelations {
  id: string
  assetVideoId: string
  provider: string
  status: string
  detailJson?: any
  createdAt: Date
  updatedAt: Date
  assetVideo: {
    id: string
    url: string
    cdnUrl?: string
    transcodeStatus: string
  }
}
