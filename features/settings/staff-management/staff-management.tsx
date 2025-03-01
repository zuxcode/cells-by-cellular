import { Separator } from "@/components/ui/separator";
import { InteractiveHeader } from "./components/interactive-header";

function StaffManagement() {
  return (
    <div className="space-y-3">
      <div>
        <h5 className="text-neutral-600 font-bold text-2xl">
          Staff Management
        </h5>
        <span className="text-xs text-[#303030] font-normal">
          Manage your team members and their account permission here
        </span>
      </div>
      <Separator />
      <InteractiveHeader />
      <Separator />
      {/* <ChangePassword /> */}
      <Separator />
      {/* <TwoStepAuth /> */}
    </div>
  );
}

export { StaffManagement };
