"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatCurrency, getRiskLabel } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardInlineProps {
  product: Product;
}

export function ProductCardInline({ product }: ProductCardInlineProps) {
  const router = useRouter();

  const handleViewProduct = () => {
    router.push(`/catalogo/${product.id}`);
  };

  // Formatear la tasa de retorno
  const formatRate = () => {
    if (product.type === "plazo-fijo") {
      return `TNA ${(product.returnRate * 100).toFixed(0)}%`;
    }
    return `+${(product.returnRate * 100).toFixed(0)}% anual`;
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-card border border-grey-2">
      {/* Header con nombre y tasa */}
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-b1-bold text-text-primary">{product.name}</h3>
        <span className="text-primary text-b1-bold">{formatRate()}</span>
      </div>

      {/* Info secundaria */}
      <p className="text-b2-regular text-grey-5 mb-4">
        {getRiskLabel(product.risk)} {" \u2022 "} Desde {formatCurrency(product.minAmount, product.currency)}
      </p>

      {/* Boton de accion */}
      <Button 
        onClick={handleViewProduct}
        className="w-full"
        size="md"
      >
        Ver producto
      </Button>
    </div>
  );
}
