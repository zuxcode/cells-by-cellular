import { usePathname } from "next/navigation";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
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

function MainSidebar({ basePath}: { basePath: string }) {
    const pathname = usePathname();
   

    const isActive = (url: string) => pathname.startsWith(url);
    return (
        <SidebarGroup className="px-0">
          <SidebarGroupContent className="flex flex-col gap-4">
            <SidebarMenu>
              {menuItems.map(({  title, url, iconPath }) => {
                  const active = isActive(url);
                 const mapURL= `${basePath}/${url}`

                return (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton
                      className={cn(
                        "rounded-none pl-8 h-[45px] border-r-[7px]",
                        "hover:border-r-green-forest focus-visible:ring-green-forest",
                        "hover:bg-green-pale transition-colors duration-200",
                        active
                          ? "border-r-green-forest bg-green-pale"
                          : "border-r-transparent"
                      )}
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
                          className="w-[18px] h-[18px] shrink-0"
                          width={18}
                          height={18}
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
        </SidebarGroup>)
}


export {MainSidebar}