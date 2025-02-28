import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Footer } from "@/components/footer";
import { Header } from "@/features/header";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Cells",
  description: "Hospitality management system",
};

const poppins = Poppins({
  subsets: ["latin"], // Choose subsets based on your language needs
  weight: ["400", "500", "600", "700", "800"], // Specify font weights (e.g., regular & bold)
  style: ["normal", "italic"], // Optional: Specify styles
  display: "swap", // Improve loading performance
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Todo: change to system
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider >
            <AppSidebar />
            <SidebarInset>
              <Header />
              <main>{children}</main>
            </SidebarInset>
          </SidebarProvider>
          <Footer />
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
