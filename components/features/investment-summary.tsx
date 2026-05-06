"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { mockProducts, mockUser } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import { BottomBar } from "@/components/ui/bottom-bar";
import { PageHeader } from "@/components/ui/page-header";
import {
  formatCurrency,
  formatPercentage,
  getProductTypeLabel,
  getRiskLabel,
  calculateProjectedReturn,
} from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export function InvestmentSummary() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get("productId");
  const amount = parseFloat(searchParams.get("amount") || "0");

  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="p-4 text-center">
        <p className="text-b1-regular text-text-muted">Producto no encontrado</p>
        <Link href="/catalogo" className="text-b1-bold text-primary mt-2 block">
          Volver a Inversiones
        </Link>
      </div>
    );
  }

  const commission = amount * 0.005;
  const projectedReturn = calculateProjectedReturn(
    amount,
    product.returnRate,
    product.term
  );
  const totalAtMaturity = amount + projectedReturn;

  const hasInsufficientFunds = amount > mockUser.availableBalance;

  const handleConfirm = () => {
    if (hasInsufficientFunds) {
      router.push("/invertir/error?type=insufficient-funds");
    } else {
      router.push(`/invertir/exito?productId=${product.id}&amount=${amount}`);
    }
  };

  return (
    <div className="flex flex-col pb-24">
      <PageHeader title="Resumen de inversion" backHref={`/catalogo/${product.id}`} />

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Product info */}
        <Card className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-h3-bold text-text-primary">{product.name}</h2>
              <div className="flex items-center gap-2 mt-1">
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
            <span className="text-h3-bold text-success">
              {formatPercentage(product.returnRate)} TNA
            </span>
          </div>
        </Card>

        {/* Amount details */}
        <Card className="p-4">
          <h3 className="text-b1-bold text-text-primary mb-4">Detalle de la operacion</h3>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="text-b1-regular text-text-muted">Monto a invertir</span>
              <span className="text-b1-bold text-text-primary">
                {formatCurrency(amount, product.currency)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-b1-regular text-text-muted">Comision (0.5%)</span>
              <span className="text-b1-regular text-text-secondary">
                -{formatCurrency(commission, product.currency)}
              </span>
            </div>

            {product.term && (
              <div className="flex justify-between">
                <span className="text-b1-regular text-text-muted">Plazo</span>
                <span className="text-b1-regular text-text-secondary">
                  {product.term} dias
                </span>
              </div>
            )}

            <div className="h-px bg-border my-1" />

            <div className="flex justify-between">
              <span className="text-b1-regular text-text-muted">
                Intereses estimados
              </span>
              <span className="text-b1-bold text-success">
                +{formatCurrency(projectedReturn, product.currency)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-b1-bold text-text-primary">
                Total al vencimiento
              </span>
              <span className="text-h3-bold text-primary">
                {formatCurrency(totalAtMaturity, product.currency)}
              </span>
            </div>
          </div>
        </Card>

        {/* Balance info */}
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-b1-regular text-text-muted">Tu saldo disponible</span>
            <span
              className={`text-b1-bold ${
                hasInsufficientFunds ? "text-danger" : "text-text-primary"
              }`}
            >
              {formatCurrency(mockUser.availableBalance)}
            </span>
          </div>

          {hasInsufficientFunds && (
            <div className="flex items-center gap-2 mt-3 p-3 bg-danger-bg rounded-lg">
              <AlertCircle className="w-4 h-4 text-danger flex-shrink-0" />
              <span className="text-b2-regular text-danger">
                No tenes saldo suficiente para esta operacion
              </span>
            </div>
          )}
        </Card>
      </div>

      {/* Bottom CTA */}
      <BottomBar>
        <Button
          size="lg"
          fullWidth
          onClick={handleConfirm}
          disabled={hasInsufficientFunds}
        >
          Confirmar inversion
        </Button>
      </BottomBar>
    </div>
  );
}
