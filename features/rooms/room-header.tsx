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
import { RoomHeaderAction } from "./components/room-header-action";
import { roomType } from "@/types/global-type";
import { keyExtractor } from "@/utils/key-extractor";

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
            className="min-w-[217px] h-9 flex-1 basis-[217px]"
          >
            <SearchLabel className="sr-only">Search</SearchLabel>
            <SearchIcon clickable className="text-black" />
            <SearchField
              placeholder="Search Rooms Types, etc"
              className="text-black placeholder:text-black text-[.625rem]"
            />
          </SearchProvider>

          <Select>
            <SelectTrigger className="min-w-[140px] max-w-full text-[.625rem] rounded-md bg-white gap-2 hover:shadow-md">
              <SelectValue placeholder="Popular" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="min-w-[100px] max-w-full text-[.625rem] rounded-md bg-white gap-2 hover:shadow-md">
              <SelectValue placeholder="All Type" />
            </SelectTrigger>
            <SelectContent>
              {roomType.map((value, index) => (
                <SelectItem key={keyExtractor(value, index)} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <RoomHeaderAction />
        </div>
      </div>
    </header>
  );
}

export { RoomHeader };
