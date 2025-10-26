import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "./prisma_client";

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma as any),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT || 587),
        auth: { user: process.env.EMAIL_SERVER_USER!, pass: process.env.EMAIL_SERVER_PASSWORD! },
      },
      from: process.env.EMAIL_FROM
    }),
  ],
  session: { strategy: "database" },
  pages: { signIn: "/login" },
});
