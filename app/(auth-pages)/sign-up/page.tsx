import { Button } from "@/components/ui/button";
import { Separator } from "@/features/auth/components/separator";
import { SignUpForm } from "@/features/auth/sign-up/sign-up";
import { OAuthButtons } from "@/features/auth/components/o-auth-button";
import Link from "next/link";

export default async function Signup() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl text-foreground font-bold">
          Welcome to Dove
        </h3>
        <p className="text-sm">Sign up your account</p>
      </div>
      <div className="flex flex-col gap-5">
        <SignUpForm />
        <Separator />
        <OAuthButtons />
        <div className="flex justify-center items-center gap-0">
          <p>Already have an account?</p>
          <Link href="/sign-in" passHref>
            <Button variant="link" className="text-blue-600">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
