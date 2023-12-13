import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/prisma/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { compare } from "bcrypt";
import { z } from "zod";

const signInInput = z.object({
  username: z.string().min(1).max(20),
  password: z.string().min(6).max(20),
});
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const parsedInput = signInInput.safeParse(credentials);

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!existingUser) {
          return null;
        }

        if (existingUser.password) {
          const passwordMatch = await compare(
            credentials?.password,
            existingUser.password
          );

          if (!passwordMatch) {
            return null;
          }
        }
        console.log("USER", existingUser);
        return {
          id: `${existingUser.id}`,
          username: existingUser?.username,
          email: existingUser.email,
          isAdmin: existingUser.isAdmin,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("asdhasjdn", user);
        return {
          ...token,

          isAdmin: user.isAdmin,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("sessions", token);
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          isAdmin: token.isAdmin,
        },
      };
    },
  },
};
