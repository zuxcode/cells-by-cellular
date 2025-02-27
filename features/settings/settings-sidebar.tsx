"use client";

import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BASE_URL = "/dashboard/settings";

const delta = [
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

function SettingSideBar() {
  const pathname = usePathname();
  const isActive = (url: string) => pathname.includes(url);

  return (
    <>
      <CardTitle className="text-small">User Profile Management</CardTitle>

      {delta.map((item, index) => {
        const url = item.title.replace(/ /g, "-").toLowerCase();
        const active = isActive(url);
        return (
          <Link href={`${BASE_URL}/${url}`} passHref legacyBehavior key={index}>
            <Button
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start",
                active
                  ? "border-r-green-forest bg-green-pale"
                  : "border-r-transparent"
              )}
            >
              <a className="flex items-center gap-2">
                <Image
                  alt={item.title}
                  src={item.icon}
                  className="h-5 w-5"
                  width={20}
                  height={20}
                />
                <span>{item.title}</span>
              </a>
            </Button>
          </Link>
        );
      })}
    </>
  );
}

export { SettingSideBar };
