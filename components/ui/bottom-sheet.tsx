"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
}: BottomSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sheet */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl",
          "transform transition-transform duration-300 ease-out",
          "max-h-[85vh] overflow-hidden flex flex-col",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-grey-3 rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
            <h2 className="text-h3-bold text-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 hover:bg-surface-muted rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
