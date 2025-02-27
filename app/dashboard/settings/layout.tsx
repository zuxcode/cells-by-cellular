import React from "react";

import { SettingSideBar } from "@/features/settings/settings-sidebar";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function PageLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full pl-4 md:pl-11 pr-4 pt-4 flex flex-col gap-4 bg-canvas-cool">
      <Card className="flex">
        <CardHeader className="w-[22%] border-r border-border">
          <SettingSideBar />
        </CardHeader>

        <CardContent className={cn("w-[78%]")}>{children}</CardContent>
      </Card>
    </div>
  );
}

export default PageLayout;
