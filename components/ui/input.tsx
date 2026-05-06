"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-b2-semibold text-text-secondary"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full px-4 py-3 rounded-lg border bg-surface text-text-primary",
          "text-b1-regular placeholder:text-text-disabled",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          "transition-all min-h-[48px]",
          error ? "border-danger" : "border-border",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-b3-bold text-danger">{error}</span>
      )}
    </div>
  );
}
