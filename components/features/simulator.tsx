"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency, calculateProjectedReturn } from "@/lib/utils";
import type { Product } from "@/types";

interface SimulatorProps {
  product: Product;
  amount: number;
  onAmountChange: (amount: number) => void;
}

export function Simulator({ product, amount, onAmountChange }: SimulatorProps) {
  const projectedReturn = useMemo(() => {
    return calculateProjectedReturn(amount, product.returnRate, product.term);
  }, [amount, product.returnRate, product.term]);

  const totalAmount = amount + projectedReturn;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onAmountChange(Math.max(product.minAmount, value));
  };

  return (
    <Card className="p-4">
      <h2 className="text-h3-semibold text-text-primary mb-4">
        Simulador de inversión
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-b2-semibold text-text-secondary mb-1.5 block">
            Monto a invertir ({product.currency})
          </label>
          <input
            type="number"
            value={amount}
            onChange={handleInputChange}
            min={product.minAmount}
            max={product.maxAmount}
            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-text-primary text-h3-bold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <p className="text-b3-bold text-text-muted mt-1">
            Mínimo: {formatCurrency(product.minAmount, product.currency)}
          </p>
        </div>

        <div className="h-px bg-border" />

        {/* Projection results */}
        <div className="bg-surface-muted rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-b2-regular text-text-muted">
              Capital invertido
            </span>
            <span className="text-b1-bold text-text-primary">
              {formatCurrency(amount, product.currency)}
            </span>
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="text-b2-regular text-text-muted">
              Intereses estimados
              {product.term && ` (${product.term} días)`}
            </span>
            <span className="text-b1-bold text-success">
              +{formatCurrency(projectedReturn, product.currency)}
            </span>
          </div>

          <div className="h-px bg-border mb-3" />

          <div className="flex justify-between items-center">
            <span className="text-b1-bold text-text-primary">
              Total al vencimiento
            </span>
            <span className="text-h3-bold text-primary">
              {formatCurrency(totalAmount, product.currency)}
            </span>
          </div>
        </div>

        <p className="text-b3-bold text-text-muted text-center">
          Los rendimientos son estimados y pueden variar
        </p>
      </div>
    </Card>
  );
}
