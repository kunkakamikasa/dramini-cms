import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

export interface Permission {
  id: string
  key: string
  name: string
  description?: string
}

export interface Role {
  id: string
  name: string
  description?: string
}

export interface UserWithPermissions {
  id: string
  email: string
  name?: string
  roles: Role[]
  permissions: string[]
}

// 权限检查函数
export async function checkPermission(permission: string): Promise<boolean> {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return false
  }

  const user = session.user as any
  return user.permissions?.includes(permission) || user.permissions?.includes('admin:all')
}

// 角色检查函数
export async function checkRole(roleName: string): Promise<boolean> {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return false
  }

  const user = session.user as any
  return user.roles?.some((role: any) => role.name === roleName) || user.permissions?.includes('admin:all')
}

// 权限中间件
export async function requirePermission(permission: string) {
  const hasPermission = await checkPermission(permission)
  
  if (!hasPermission) {
    throw new Error('权限不足')
  }
}

// 角色中间件
export async function requireRole(roleName: string) {
  const hasRole = await checkRole(roleName)
  
  if (!hasRole) {
    throw new Error('角色权限不足')
  }
}

// 获取当前用户
export async function getCurrentUser(): Promise<UserWithPermissions | null> {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return null
  }

  return session.user as any
}

// 权限常量
export const PERMISSIONS = {
  ADMIN_ALL: 'admin:all',
  CONTENT_CREATE: 'content:create',
  CONTENT_EDIT: 'content:edit',
  CONTENT_PUBLISH: 'content:publish',
  MEDIA_UPLOAD: 'media:upload',
  FINANCE_VIEW: 'finance:view',
  FINANCE_MANAGE: 'finance:manage',
  USER_MANAGE: 'user:manage',
  SYSTEM_SETTINGS: 'system:settings',
} as const

export const ROLES = {
  ADMIN: 'Admin',
  EDITOR: 'Editor',
  PRODUCER: 'Producer',
  FINANCE: 'Finance',
  VIEWER: 'Viewer',
} as const
