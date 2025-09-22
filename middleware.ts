import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    
    // 如果访问管理后台但没有认证，重定向到登录页
    if (isAdminRoute && !token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
    
    // 如果已认证但访问登录页，重定向到管理后台
    if (req.nextUrl.pathname === '/auth/signin' && token) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
        const isAuthRoute = req.nextUrl.pathname.startsWith('/auth')
        
        // 管理后台需要认证
        if (isAdminRoute) {
          return !!token
        }
        
        // 认证页面不需要认证
        if (isAuthRoute) {
          return true
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*', '/api/admin/:path*']
}
