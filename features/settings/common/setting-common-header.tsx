import { AvatarEnhanced } from "@/components/avatar";
import { ActionTrigger, ActionLabel } from "@/components/button";
import { Separator } from "@/components/ui/separator";

interface SettingCommonHeaderProps {
  title: string;
  actionLabel?: string;
  src?: string;
  isProcessing?: boolean;
}

function SettingCommonHeader({
  title,
  actionLabel = "Save Changes",
  isProcessing = false,
  src,
}: SettingCommonHeaderProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-black font-bold text-2xl">{title}</h4>
      <Separator />

      <div className="flex items-center justify-between">
        <AvatarEnhanced className="w-16 h-16 rounded-full" src={src} />

        <ActionTrigger isProcessing={isProcessing}>
          <ActionLabel>{actionLabel}</ActionLabel>
        </ActionTrigger>
      </div>
      <Separator />
    </div>
  );
}

export { SettingCommonHeader };
