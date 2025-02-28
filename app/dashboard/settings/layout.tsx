import React from "react";

import { SettingSideBar } from "@/features/settings";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageLayout } from "@/components/layout";
import { cn } from "@/lib/utils";

function SettingsPageLayout({ children }: React.PropsWithChildren) {
  return (
    <PageLayout>
      <Card className="flex">
        <CardHeader className="w-[22%] border-r border-border">
          <SettingSideBar />
        </CardHeader>

        <CardContent className={cn("w-[78%] p-6")}>{children}</CardContent>
      </Card>
    </PageLayout>
  );
}

export default SettingsPageLayout;
