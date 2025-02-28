"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { MainSidebar } from "./main-sidebar";
import { SideBarHeader } from "./sidebar-header";
import { NavUser } from "./nav-user";

const BASE_URL = "/dashboard";

function CustomAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar  collapsible="icon" {...props}>
      <SidebarHeader>
        <SideBarHeader />
      </SidebarHeader>
      <SidebarContent>
        <MainSidebar basePath={BASE_URL} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

const AppSidebar = React.memo(CustomAppSidebar);

export { AppSidebar };
