import { ChangeEmail } from "./components/change-email";
import { ChangePassword } from "./components/change-password";
import { TwoStepAuth } from "./components/2-step-auth";
import { Separator } from "@/components/ui/separator";

function Security() {
  return (
    <div className="space-y-4">
      <h4 className="text-neutral-600 font-bold text-2xl">Security</h4>
      <Separator />
      <ChangeEmail />
      <Separator />
      <ChangePassword />
      <Separator />
      <TwoStepAuth />
    </div>
  );
}

export { Security };
