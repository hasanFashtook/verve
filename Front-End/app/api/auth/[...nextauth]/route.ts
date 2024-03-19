
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user name" },
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log(credentials)
        const res = await fetch("https://verve-avnv.onrender.com/api/auth/local/register", {
          method: 'POST',
          body: JSON.stringify({
            username: credentials?.username,
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" }
        })
        const { data: user } = await res.json();

        if (res.ok && user) {
          return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/register',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any;
      return session
    },
  }
})

export { handler as GET, handler as POST }