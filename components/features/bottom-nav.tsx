"use client";

import { cn } from "@/lib/utils";
import { Home, LayoutGrid, MessageCircle, History } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Inicio", icon: Home },
  { href: "/catalogo", label: "Inversiones", icon: LayoutGrid },
  { href: "/chatbot", label: "Chatbot", icon: MessageCircle },
  { href: "/historial", label: "Historial", icon: History },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border max-w-md mx-auto">
      <div className="flex items-center justify-around py-2 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 min-w-[64px]",
                "transition-colors"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6",
                  isActive ? "text-primary" : "text-text-muted"
                )}
              />
              <span
                className={cn(
                  "text-b4-medium",
                  isActive ? "text-primary" : "text-text-muted"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
