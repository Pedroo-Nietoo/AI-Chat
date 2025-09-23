import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

declare module "next-auth" {
 interface Session {
  user: {
   id: string;
   name?: string | null;
   email?: string | null;
   image?: string | null;
  };
 }
}

const handler = NextAuth({
 providers: [
  GitHubProvider({
   clientId: process.env.GITHUB_CLIENT_ID!,
   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
 ],
 pages: {
  signIn: "/",
 },
 callbacks: {
  async session({ session, token }) {
   session.user.id = token.sub!;
   return session;
  },
 },
 session: {
  maxAge: 60 * 60,
  updateAge: 60 * 60,
 },
 secret: process.env.NEXTAUTH_SECRET,
});

export const GET = handler;
export const POST = handler;
