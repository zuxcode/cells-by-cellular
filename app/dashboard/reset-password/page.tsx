import { resetPasswordAction } from "@/features/auth/actions/actions";
import { ActionTrigger, ActionLabel } from "@/components/button/action-trigger";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword() {
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <Label htmlFor="password">New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <ActionTrigger formAction={resetPasswordAction}>
        <ActionLabel>Reset password</ActionLabel>
      </ActionTrigger>
    </form>
  );
}
