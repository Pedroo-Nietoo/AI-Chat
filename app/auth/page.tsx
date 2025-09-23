"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Loader2 } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AccessPage() {
 const [loadingRegister, setLoadingRegister] = useState(false);

 async function handleGitHubLogin() {
  setLoadingRegister(true);
  try {
   await signIn("github", { callbackUrl: "/chat" });
  } catch (error) {
   console.error(error);
  } finally {
   setLoadingRegister(false);
  }
 }

 return (
  <Card className="max-w-[600px]">
   <CardHeader>
    <CardTitle>Register</CardTitle>
    <CardDescription>Use your GitHub account o access the chat</CardDescription>
   </CardHeader>

   <CardContent>
    <p className="text-slate-500 text-[14px] mb-4">This application does not store any personal data. It only uses your GitHub account to authenticate you.</p>
    <p className="text-slate-500 text-[14px]">The AI response may take some time as it uses a free model.</p>

    <Button
     type="button"
     variant="outline"
     className="w-full mt-6"
     onClick={handleGitHubLogin}
     disabled={loadingRegister}
    >
     {loadingRegister ? (
      <Loader2 className="animate-spin h-4 mr-2" />
     ) : (
      <Github className="h-4 mr-2" />
     )}
     {loadingRegister ? "Loading..." : "Access with GitHub"}
    </Button>
   </CardContent>
  </Card>
 );
}