import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/features/header";

export default async function Layout({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider >
    <AppSidebar />
    <SidebarInset>
      <Header />
      <div>{children}</div>
    </SidebarInset>
  </SidebarProvider>
  );
}