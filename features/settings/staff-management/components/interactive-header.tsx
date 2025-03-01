import {
  ActionIndicator,
  ActionLabel,
  ActionTrigger,
} from "@/components/button";
import {
  SearchField,
  SearchIcon,
  SearchLabel,
  SearchProvider,
} from "@/components/search";

function InteractiveHeader() {
  return (
    <div className="grid grid-cols-2">
      <div className="inline-flex items-end">
        <p className="text-black font-semibold text-sm">All users 12</p>
      </div>

      <div className="flex items-center gap-4">
        <SearchProvider variant="secondary">
          <SearchIcon />
          <SearchLabel />
          <SearchField placeholder="Search" />
        </SearchProvider>

        <ActionTrigger className="px-4">
          <ActionIndicator />
          <ActionLabel className="text-xs">Add User</ActionLabel>
        </ActionTrigger>
      </div>
    </div>
  );
}

export { InteractiveHeader };
