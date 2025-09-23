import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
 if (req.nextUrl.pathname.startsWith("/chat")) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
   const url = req.nextUrl.clone();
   url.pathname = "/auth";
   return NextResponse.redirect(url);
  }
 }
 return NextResponse.next();
}

export const config = {
 matcher: ["/chat/:path*"],
};