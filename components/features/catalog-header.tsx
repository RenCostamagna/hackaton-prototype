"use client";

import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ProductType } from "@/types";

const PRODUCT_TYPES: { value: ProductType | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "plazo-fijo", label: "Plazo Fijo" },
  { value: "fci", label: "FCI" },
  { value: "bono", label: "Bonos" },
  { value: "accion", label: "Acciones" },
];

interface CatalogHeaderProps {
  selectedType: ProductType | "todos";
  onTypeChange: (type: ProductType | "todos") => void;
  onOpenFilters: () => void;
}

export function CatalogHeader({ 
  selectedType, 
  onTypeChange, 
  onOpenFilters 
}: CatalogHeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-gradient-to-r from-[#E31C19] to-[#B71518] pt-8 pb-4">
      {/* Top row */}
      <div className="flex items-center justify-between px-4 mb-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center text-white"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <h1 className="text-h3-bold text-white">Inversiones</h1>
        
        <button
          onClick={onOpenFilters}
          className="w-10 h-10 flex items-center justify-center text-white"
          aria-label="Filtros avanzados"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Filter pills row */}
      <div className="flex gap-2 px-4 overflow-x-auto scrollbar-hide pb-2">
        {PRODUCT_TYPES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onTypeChange(value)}
            className={`px-4 py-2 rounded-full text-b2-semibold whitespace-nowrap transition-colors ${
              selectedType === value
                ? "bg-white text-[#E31C19]"
                : "bg-transparent text-white border border-white/40"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}
