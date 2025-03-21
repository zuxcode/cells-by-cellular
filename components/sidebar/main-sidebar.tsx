"use client";

import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type MenuItem = {
  title: string;
  url: string;
  iconPath: string;
};
const menuItems: MenuItem[] = [
  {
    title: "Home",
    url: "/",
    iconPath: "/svg/cuida_home-outline.svg",
  },
  {
    title: "Guests",
    url: "/guests",
    iconPath: "/svg/users-round.svg",
  },
  {
    title: "Reservations",
    url: "/reservations",
    iconPath: "/svg/calendar-outline.svg",
  },
  {
    title: "Rooms",
    url: "/rooms",
    iconPath: "/svg/door.svg",
  },
  {
    title: "Restaurant",
    url: "/restaurant",
    iconPath: "/svg/restaurant-fine.svg",
  },
  {
    title: "Parking",
    url: "/parking",
    iconPath: "/svg/traffic-cone.svg",
  },
  {
    title: "Message",
    url: "/message",
    iconPath: "/svg/message.svg",
  },
  {
    title: "Settings",
    url: "/settings",
    iconPath: "/svg/settings.svg",
  },
];

function MainSidebar({ basePath }: { basePath: string }) {
  const pathname = usePathname();
  const normalizePath = (path: string) => path.replace(/\/+$/, ""); // Remove trailing slashes

  return (
    <SidebarGroup className="pr-0">
      <SidebarGroupContent className="flex flex-col gap-4">
        <SidebarMenu>
          {menuItems.map(({ title, url, iconPath }) => {
            const mapURL = `${basePath}${url}`;
            const normalizedPath = normalizePath(pathname);
            const normalizedMapURL = normalizePath(mapURL);
            const isHome = url === "/";
            const active = isHome
              ? normalizedPath === normalizedMapURL
              : normalizedPath.startsWith(normalizedMapURL);

            return (
              <SidebarMenuItem key={title}>
                <SidebarMenuButton
                  className={cn(
                    "rounded-none h-[45px] border-r-[3px]",
                    "hover:border-r-green-forest focus-visible:ring-green-forest", // Pseudo-class
                    "hover:bg-green-pale transition-colors duration-200",
                    active
                      ? "border-r-green-forest bg-green-pale"
                      : "border-r-transparent"
                  )}
                  size="lg"
                  asChild
                >
                  <Link
                    href={mapURL}
                    aria-label={`Navigate to ${title}`}
                    className="flex items-center gap-3 w-full px-4"
                  >
                    <Image
                      src={iconPath}
                      alt={title}
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0"
                      width={20}
                      height={20}
                    />
                    <span className="text-small font-medium text-black">
                      {title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export { MainSidebar };
