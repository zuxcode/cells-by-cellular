import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Separator } from "@/features/auth/components/separator";
import { SignInForm } from "@/features/auth/sign-in";
import { OAuthButtons } from "@/features/auth/components/o-auth-button";

export default function SingInPage() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl text-foreground font-bold">
          Welcome Back to Cells
        </h3>
        <p className="text-sm">Sign in your account</p>
      </div>
      <div className="flex flex-col gap-5">
        <SignInForm />
        <Separator />
        <OAuthButtons />
        <div className="flex justify-center items-center gap-0">
          <p>Don&apos;t have an account?</p>
          <Link href="/sign-up" passHref>
            <Button variant="link" className="text-blue-600">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
