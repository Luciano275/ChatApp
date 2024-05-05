import { NextAuthConfig } from "next-auth";
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from "./lib/schemas";
import {getUserByEmail, getUserById} from "./lib/data";
import bcrypt from 'bcrypt-edge'
import {db} from "@/lib/db";

export default {
  pages: {
    signIn: '/',
    error: '/error'
  },
  events: {
    async linkAccount({user}) {
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {

      if (account?.provider !== 'credentials') return true;

      const existingUser = await getUserById(user.id!);

      if (!existingUser?.emailVerified) return false;

      return true;
    }
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials) {

        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const matchPassword = bcrypt.compareSync(password, user.password);

          if (matchPassword) {
            return user;
          }
        }

        return null;
      },
    })
  ]
} satisfies NextAuthConfig