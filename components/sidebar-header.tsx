import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Image from "next/image";

function SideBarHeader() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="hover:bg-transparent focus-visible:ring-green-forest rounded-none"
        asChild
      >
        <Link
          href="/dashboard"
          aria-label="Return to dashboard home"
          className="h-[100px] flex w-full items-center justify-center"
        >
          <Image
            alt="Cells logo"
            src="/images/cells.png"
            width={61}
            height={83}
            quality={100}
            priority
            className="object-contain"
          />
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
export { SideBarHeader };
