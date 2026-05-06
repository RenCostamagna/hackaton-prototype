import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PillProps {
  variant?: "success" | "warning" | "danger" | "neutral";
  children: ReactNode;
  className?: string;
}

export function Pill({ variant = "neutral", children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-b4-medium",
        {
          "bg-success-bg text-success": variant === "success",
          "bg-warning-bg text-warning": variant === "warning",
          "bg-danger-bg text-danger": variant === "danger",
          "bg-surface-subtle text-text-secondary": variant === "neutral",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
