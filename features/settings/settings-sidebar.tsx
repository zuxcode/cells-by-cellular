import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const BASE_URL = "/dashboard/system";

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
  return (
    <>
      <CardTitle className="text-small">User Profile Management</CardTitle>

      {delta.map((item, index) => (
        <Link
          href={`${BASE_URL}/${item.title.replace(/ /g, "-").toLowerCase()}`}
          passHref
          legacyBehavior
          key={index}
        >
          <Button asChild variant="ghost" className="w-full justify-start">
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
      ))}
    </>
  );
}

export { SettingSideBar };
