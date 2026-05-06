import { cn } from "@/lib/utils";
import type { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-xl p-4 shadow-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
