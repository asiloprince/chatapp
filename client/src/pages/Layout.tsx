import { ThemeProvider } from "@/utils/theme-provider";
import React from "react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={cn("min-h-screen")}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div>
          <div className="lg:col-span-1">
            <Header />
          </div>
          <div className="mb-2 lg:col-span-6 md:col-span-3  md:h-2/3 mx-6">
            {children}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
