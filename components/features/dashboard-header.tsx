"use client";

import { User, Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { User as UserType } from "@/types";

interface DashboardHeaderProps {
  user: UserType;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="bg-gradient-red px-4 pt-8 pb-8 text-text-inverse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <p className="text-b2-regular opacity-90">Hola,</p>
            <h1 className="text-h2-bold">{user.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Notificaciones"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Perfil"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
