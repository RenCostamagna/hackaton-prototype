"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold transition-all",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "active:scale-95 active:opacity-90",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-primary hover:bg-primary/90 focus:ring-primary active:bg-primary/80":
            variant === "primary",
          "bg-surface border border-border text-text-primary hover:bg-surface-muted focus:ring-grey-3 active:bg-grey-2":
            variant === "secondary",
          "bg-transparent text-text-primary hover:bg-surface-muted focus:ring-grey-3 active:bg-grey-2":
            variant === "ghost",
          "bg-danger hover:bg-danger/90 focus:ring-danger active:bg-danger/80":
            variant === "danger",
        },
        (variant === "primary" || variant === "danger") && "!text-white",
        {
          "px-3 py-2 text-b2-semibold min-h-[36px]": size === "sm",
          "px-4 py-3 text-b1-bold min-h-[44px]": size === "md",
          "px-6 py-4 text-h3-bold min-h-[48px]": size === "lg",
        },
        fullWidth && "w-full",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
