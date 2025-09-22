import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from './prisma'
import { compare } from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // 暂时禁用adapter，使用JWT策略
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const admin = await prisma.admins.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            permissions: true
          }
        })

        if (!admin) {
          return null
        }

        // 验证密码
        if (!admin.password) {
          return null
        }
        
        const isValidPassword = await compare(credentials.password, admin.password)
        if (!isValidPassword) {
          return null
        }
        
        if (admin.status === 'ACTIVE') {
          return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            image: admin.avatar,
            role: admin.role,
            permissions: admin.permissions?.map((p: any) => p.permissionKey) || []
          } as any
        }

        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.permissions = (user as any).permissions
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        ;(session.user as any).id = token.sub!
        ;(session.user as any).role = (token as any).role || 'ADMIN'
        ;(session.user as any).permissions = (token as any).permissions || []
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}
