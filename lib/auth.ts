import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from './prisma'
import { compare } from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
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

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            roles: {
              include: {
                role: {
                  include: {
                    permissions: {
                      include: {
                        permission: true
                      }
                    }
                  }
                }
              }
            }
          }
        })

        if (!user) {
          return null
        }

        // 对于演示目的，我们使用简单的密码验证
        // 在生产环境中，应该使用哈希密码
        if (credentials.password === 'admin123' && user.email === 'admin@dramini.com') {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.avatar,
            roles: user.roles?.map((ur: any) => ur.role.name) || [],
            permissions: user.roles?.flatMap((ur: any) => 
              ur.role.permissions?.map((rp: any) => rp.permission.key) || []
            ) || []
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
        token.roles = (user as any).roles
        token.permissions = (user as any).permissions
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.roles = (token as any).roles || []
        session.user.permissions = (token as any).permissions || []
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}
