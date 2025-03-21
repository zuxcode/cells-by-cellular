import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";

import { Footer } from "@/components/footer";
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
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Specify font weights (e.g., regular & bold)
  style: ["normal", "italic"],
  display: "swap",
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
          <main className="h-svh">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
