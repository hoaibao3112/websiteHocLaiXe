"use client";

import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { FloatingContactButtons } from "@/components/public/FloatingContactButtons";
import { usePathname } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main key={pathname} className="flex-1 animate-page-enter">
        {children}
      </main>
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}
