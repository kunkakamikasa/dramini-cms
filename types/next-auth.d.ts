import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      roles?: string[]
      permissions?: string[]
    }
  }

  interface User {
    id: string
    roles?: string[]
    permissions?: string[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: string[]
    permissions?: string[]
  }
}
