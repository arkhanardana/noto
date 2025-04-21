"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function SignInPage() {
  const signin = async () => {
    try {
      const result = await authClient.signIn.social({
        provider: "google",
      });

      console.log(result);
    } catch (err) {
      console.error("Sign in error:", err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="text-6xl font-bold tracking-tight relative">
          <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Noto
          </span>
          <div className="absolute -top-1 -right-3 w-2 h-2 md:w-3 md:h-3 bg-main rounded-full" />
        </div>
        <p className="text-sm text-slate-500 mt-1">Manage your daily task</p>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Sign in to your account
          </CardTitle>
          <CardDescription className="text-base text-slate-500 text-center">
            Please Sign in first to access{" "}
            <Link
              href={"/"}
              className="underline font-semibold hover:text-main"
            >
              Noto.
            </Link>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button
            onClick={signin}
            className="relative h-12 w-full justify-center"
          >
            <div className="absolute left-4 flex h-8 w-8 items-center justify-center">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>
            <span className="text-black font-bold">Sign in with Google</span>
          </Button>
          <div className="mt-4 text-center text-xs text-slate-500">
            <p>
              By creating an account, you agree to our{" "}
              <Link href={"#"} className="underline hover:text-main">
                Terms
              </Link>{" "}
              and have read and acknowledge the {""}
              <Link href={"#"} className="underline hover:text-main">
                Privacy Policy
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
