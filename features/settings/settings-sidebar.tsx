"use client";

import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { useLink } from "@/hooks/use-link";
import { cn } from "@/lib/utils";
import { generateUrl } from "@/utils/generate-url";
import { keyExtractor } from "@/utils/key-extractor";
import Image from "next/image";
import Link from "next/link";

const BASE_URL = "/dashboard/settings";

type NavItem = {
  icon: string;
  title: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    icon: "/svg/user.svg",
    title: "User Profile",
  },
  {
    icon: "/svg/user-groups.svg",
    title: "Organization",
  },
  {
    icon: "/svg/security.svg",
    title: "Email & Password",
  },
  {
    icon: "/svg/notification.svg",
    title: "Notifications",
  },
  {
    icon: "/svg/user-management.svg",
    title: "Staff Management",
  },
];

/**
 * Settings sidebar navigation component with dynamic active state tracking
 *
 * @example
 * <SettingSideBar />
 *
 * @remarks
 * - Uses Next.js navigation for client-side transitions
 * - Automatically highlights active route
 * - Responsive and accessible navigation structure
 */
function SettingSideBar() {
  const { checkActiveLink } = useLink();
  return (
    <nav aria-label="Settings navigation">
      <CardTitle className="text-xl mb-4">User Profile Management</CardTitle>

      <ul className="space-y-1">
        {NAV_ITEMS.map((item, index) => {
          const urlPath = generateUrl(item.title);
          const path = `${BASE_URL}/${urlPath}`;
          const active = checkActiveLink(path);

          return (
            <li key={keyExtractor(item.title, index)}>
              <Link href={path} passHref>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    active
                      ? "border-r-2 border-primary bg-accent font-semibold"
                      : "border-r-transparent"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.icon}
                      alt=""
                      aria-hidden="true"
                      className="h-5 w-5 text-muted-foreground"
                      width={20}
                      height={20}
                    />
                    <span>{item.title}</span>
                  </div>
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
export { SettingSideBar };
