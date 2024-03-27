import credentials from "next-auth/providers/credentials";
import { instanceAxios } from "./utils/instanceAxios";
import { NextAuthConfig, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'

import "next-auth/jwt"
import { StrapiUser } from "./types/types";

declare module "next-auth" {
  interface User {
    jwt: string
    user: StrapiUser;
  }
  interface Session {
    credenialUser: StrapiUser;
    jwt:string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    jwt: string;
    user: StrapiUser;
  }
}


const backEndUrl = process.env.NEXT_PUBLIC_API_URL as string;


export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    credentials({
      name: 'Credentials',
      id: 'register',
      credentials: {
        username: { label: "User Name", type: "text", placeholder: "Your Name" },
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await instanceAxios.post(`${backEndUrl}/auth/local/register`, credentials)
          const { user: userData, jwt } = response.data
          const user = { ...userData, jwt }
          if (response.status == 200 && user) {
            return user
          }
          return null
        } catch (err) {
          return err
        }
      }
    }),
    credentials({
      name: 'Credentials',
      id: 'login',
      credentials: {
        identifier: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const response = await instanceAxios.post(`${backEndUrl}/auth/local`, credentials)
        const user = response.data
        if (response.status == 200 && user) {
          return user
        }
        return null
      }
    }),
  ],
} satisfies NextAuthConfig