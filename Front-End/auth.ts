import NextAuth from "next-auth";
import authConfig  from "./auth.config";
const secret = process.env.AUTH_SECRET

export const { auth, signIn, signOut,handlers:{GET,POST} } = NextAuth({
  ...authConfig,
  secret,
  pages: {
    signIn: '/login'
  },
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    async jwt({ token, user, account}) {
      if (account?.type == 'credentials') {
        token.jwt = user.jwt
        token.user = user.user
      }
      return token
    },
    async session({ session, token }) {
      session.credenialUser = token.user
      session.jwt = token.jwt
      return session
    },
  }
})
