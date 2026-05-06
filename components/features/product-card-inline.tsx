"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import {
  formatPercentage,
  formatCurrency,
  getProductTypeLabel,
  getRiskLabel,
} from "@/lib/utils";
import type { Product } from "@/types";
import { TrendingUp } from "lucide-react";

interface ProductCardInlineProps {
  product: Product;
}

export function ProductCardInline({ product }: ProductCardInlineProps) {
  const router = useRouter();

  const handleInvest = () => {
    router.push(`/invertir/resumen?productId=${product.id}&amount=${product.minAmount}`);
  };

  const handleViewDetail = () => {
    router.push(`/catalogo/${product.id}`);
  };

  return (
    <Card className="p-4 border border-border">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-b1-bold text-text-primary mb-1">{product.name}</h3>
          <div className="flex items-center gap-2">
            <Pill variant="neutral">{getProductTypeLabel(product.type)}</Pill>
            <Pill
              variant={
                product.risk === "bajo"
                  ? "success"
                  : product.risk === "moderado"
                  ? "warning"
                  : "danger"
              }
            >
              {getRiskLabel(product.risk)}
            </Pill>
          </div>
        </div>
        <div className="flex items-center gap-1 text-success">
          <TrendingUp className="w-4 h-4" />
          <span className="text-b1-bold">{formatPercentage(product.returnRate)}</span>
        </div>
      </div>

      <p className="text-b2-regular text-text-muted mb-3 line-clamp-2">
        {product.description}
      </p>

      <div className="flex items-center gap-2 text-b3-bold text-text-muted mb-4">
        <span>Mínimo: {formatCurrency(product.minAmount, product.currency)}</span>
        {product.term && <span>| {product.term} días</span>}
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="flex-1"
          onClick={handleViewDetail}
        >
          Ver detalle
        </Button>
        <Button size="sm" className="flex-1" onClick={handleInvest}>
          Invertir ahora
        </Button>
      </div>
    </Card>
  );
}
