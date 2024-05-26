import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./lib/data";
import { getProfilePhotoAction } from "./lib/s3";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth
} = NextAuth({
  pages: {
    signIn: '/',
    error: '/auth/error'
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

      const profilePhoto = await getProfilePhotoAction(user.image! || 'default.png');

      if (profilePhoto.success) {
        user.image = `${process.env.AWS_BUCKET_URL!}/${user.image}`;
      }

      return true;
    },
    async session({session, token}) {

      if (token) {
        session.user.id = token.sub!;
      }
      
      return session;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})