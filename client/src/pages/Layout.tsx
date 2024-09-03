import { ThemeProvider } from "@/utils/theme-provider";
import React from "react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={cn("min-h-screen")}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div>
          <div className="mb-2 lg:col-span-6 md:col-span-3  md:h-2/3 mx-6">
            {children}
          </div>
        </div>
        <Toaster />
      </ThemeProvider>
    </div>
  );
};

export default Layout;
