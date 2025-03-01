import {
  ActionIndicator,
  ActionTrigger,
  ActionLabel,
} from "@/components/button";
import {
  SearchField,
  SearchIcon,
  SearchLabel,
  SearchProvider,
} from "@/components/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function RoomHeader() {
  return (
    <header className="bg-inherit">
      <div
        className={cn(
          "flex",
          "flex-col gap-4", // Small screen
          "md:flex-row md:justify-between md:items-center" // Medium screen
        )}
      >
        <div className={cn("flex items-center gap-4 min-w-0")}>
          <h4
            className={cn(
              "text-[1.2rem] font-bold text-gray-800 tracking-wide break-words"
            )}
          >
            Reservation
          </h4>
        </div>

        <div className={cn("flex items-center gap-4 min-w-0")}>
          <SearchProvider
            variant="secondary"
            className="min-w-[217px] flex-1 basis-[217px]"
          >
            <SearchLabel className="sr-only">Search</SearchLabel>
            <SearchIcon clickable className="text-black" />
            <SearchField
              placeholder="Search Rooms Types, etc"
              className="text-black placeholder:text-black"
            />
          </SearchProvider>

          <Select>
            <SelectTrigger className="min-w-[140px] max-w-full text-[12px] rounded-md bg-white gap-2 hover:shadow-md">
              <SelectValue placeholder="Popular" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="min-w-[100px] max-w-full text-[12px] rounded-md bg-white gap-2 hover:shadow-md">
              <SelectValue placeholder="All Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="double">Double</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
            </SelectContent>
          </Select>

          <ActionTrigger asChild>
            <div className="flex items-center gap-2 justify-center">
              <ActionIndicator />
              <ActionLabel>Create Room</ActionLabel>
            </div>
          </ActionTrigger>
        </div>
      </div>
    </header>
  );
}

export { RoomHeader };
