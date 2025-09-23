import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Chat - Nietu AI",
  description: "AI chat built using Vercel SDK, GitHub OAuth and OpenAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Nietu AI</title>
        <link rel="icon" href="https://github.com/google-gemini.png" />
        <meta name="description" content="AI chat built using Vercel SDK, GitHub OAuth and OpenAI" />
        <meta name="author" content="Pedroo-Nietoo" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen bg-slate-50 items-center justify-center`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
