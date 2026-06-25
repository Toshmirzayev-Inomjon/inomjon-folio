"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { VisitTracker } from "@/components/VisitTracker";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/inomjon0751" || pathname.startsWith("/inomjon0751/");

  return (
    <>
      {!isAdminRoute && (
        <>
          <Navbar />
          <VisitTracker />
        </>
      )}
      {children}
    </>
  );
}
