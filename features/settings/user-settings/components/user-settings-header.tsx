import { AvatarEnhanced } from "@/components/avatar";
import { ActionTrigger,  ActionLabel } from "@/components/button";
import { Separator } from "@/components/ui/separator";

function UserSettingsHeader() {
  return (
    <div className="space-y-2">
      <h4 className="text-black font-bold text-2xl">Personal Information</h4>
      <Separator />

      <div className="flex items-center justify-between">
        <AvatarEnhanced className="w-16 h-16 rounded-full" />

        <ActionTrigger isProcessing={false}>
          <ActionLabel>Save Changes</ActionLabel>
        </ActionTrigger>
      </div>
      <Separator />
    </div>
  );
}

export { UserSettingsHeader };
