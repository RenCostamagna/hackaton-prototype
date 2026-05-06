import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BottomBarProps {
  children: ReactNode;
  className?: string;
}

export function BottomBar({ children, className }: BottomBarProps) {
  return (
    <div
      className={cn(
        "fixed bottom-20 left-0 right-0 bg-surface border-t border-border",
        "px-4 py-3",
        "max-w-md mx-auto z-40",
        className
      )}
    >
      {children}
    </div>
  );
}
