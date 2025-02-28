"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  SearchField,
  SearchIcon,
  SearchLabel,
  SearchProvider,
} from "@/components/search";
import { NotificationButton } from "./components/notification-bell";
import { AvatarEnhanced } from "@/components/avatar";

function Header() {
  return (
    <header className="flex h-16 w-full bg-background shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div
          className={cn(
            "h-12 w-full bg-green-050 flex items-center justify-between",
            "md:px-4 rounded-full " // median screen
          )}
        >
          <div>
            <SearchProvider>
              <SearchLabel>Search hotels</SearchLabel>
              <SearchIcon clickable aria-label="search" />
              <SearchField placeholder="Search Anything" />
            </SearchProvider>
          </div>
          <div className={cn("hidden md:flex items-center gap-2")}>
            <NotificationButton
              hasNotification
              // notificationCount={12} // todo: add notification count
              aria-label="Unread notifications"
            />
            <AvatarEnhanced />
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
