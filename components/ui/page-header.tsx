"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  backHref?: string;
  rightAction?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHeader({ title, backHref, rightAction, children }: PageHeaderProps) {
  return (
    <header className="bg-gradient-red text-text-inverse sticky top-0 z-10">
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          {backHref ? (
            <Link
              href={backHref}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Volver"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          ) : (
            <div className="w-10" />
          )}
          
          <h1 className="text-h3-semibold text-center flex-1">{title}</h1>
          
          {rightAction ? (
            <div className="w-10 flex items-center justify-center">
              {rightAction}
            </div>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>
      
      {children}
    </header>
  );
}
