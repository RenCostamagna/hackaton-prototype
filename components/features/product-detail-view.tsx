"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import { BottomBar } from "@/components/ui/bottom-bar";
import { PageHeader } from "@/components/ui/page-header";
import { Simulator } from "@/components/features/simulator";
import {
  formatCurrency,
  formatPercentage,
  getProductTypeLabel,
  getRiskLabel,
} from "@/lib/utils";
import type { Product } from "@/types";
import { Info, Calendar, Shield, TrendingUp } from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const [investAmount, setInvestAmount] = useState(product.minAmount);

  const handleInvest = () => {
    router.push(`/invertir/resumen?productId=${product.id}&amount=${investAmount}`);
  };

  return (
    <div className="flex flex-col pb-24">
      <PageHeader title={product.name} backHref="/catalogo" />

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Pills */}
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

        {/* Return card */}
        <Card className="p-5 bg-gradient-red text-text-inverse">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-b2-regular opacity-90">
              Rendimiento estimado
            </span>
          </div>
          <p className="text-h1-bold">{formatPercentage(product.returnRate)} TNA</p>
        </Card>

        {/* Details */}
        <Card className="p-4">
          <h2 className="text-h3-semibold text-text-primary mb-4">
            Detalles del producto
          </h2>

          <div className="flex flex-col gap-3">
            <DetailRow
              icon={<Info className="w-4 h-4" />}
              label="Descripcion"
              value={product.description}
            />

            <DetailRow
              icon={<Shield className="w-4 h-4" />}
              label="Monto minimo"
              value={formatCurrency(product.minAmount, product.currency)}
            />

            {product.term && (
              <DetailRow
                icon={<Calendar className="w-4 h-4" />}
                label="Plazo"
                value={`${product.term} dias`}
              />
            )}

            <DetailRow
              icon={<TrendingUp className="w-4 h-4" />}
              label="Moneda"
              value={product.currency}
            />

            {!product.isCancelable && (
              <div className="mt-2 p-3 bg-warning-bg rounded-lg">
                <p className="text-b2-semibold text-warning">
                  Este producto no permite rescate anticipado
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Simulator */}
        <Simulator
          product={product}
          amount={investAmount}
          onAmountChange={setInvestAmount}
        />
      </div>

      {/* Bottom CTA */}
      <BottomBar>
        <Button size="lg" fullWidth onClick={handleInvest}>
          Confirmar operacion
        </Button>
      </BottomBar>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="text-text-muted mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-b2-regular text-text-muted">{label}</p>
        <p className="text-b1-regular text-text-primary">{value}</p>
      </div>
    </div>
  );
}
