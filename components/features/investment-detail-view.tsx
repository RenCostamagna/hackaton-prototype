"use client";

import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import { BottomBar } from "@/components/ui/bottom-bar";
import {
  formatCurrency,
  formatDate,
  formatPercentage,
  getProductTypeLabel,
  getRiskLabel,
} from "@/lib/utils";
import type { Investment, OperationStatus } from "@/types";
import { ArrowLeft, TrendingUp, Calendar, FileText, Copy } from "lucide-react";
import Link from "next/link";

interface InvestmentDetailViewProps {
  investment: Investment;
}

const statusConfig: Record<
  OperationStatus,
  { label: string; variant: "success" | "warning" | "danger" | "neutral" }
> = {
  activa: { label: "Activa", variant: "success" },
  finalizada: { label: "Finalizada", variant: "neutral" },
  cancelada: { label: "Cancelada", variant: "danger" },
  pendiente: { label: "Pendiente", variant: "warning" },
};

export function InvestmentDetailView({ investment }: InvestmentDetailViewProps) {
  const { product } = investment;
  const totalValue = investment.amount + investment.currentReturn;
  const returnPercentage =
    (investment.currentReturn / investment.amount) * 100;

  // Show early redemption button only for cancelable products that are active
  const showRedemption =
    product.isCancelable && investment.status === "activa";

  const handleCopyOperationNumber = () => {
    navigator.clipboard.writeText(investment.operationNumber);
  };

  return (
    <div className="flex flex-col pb-24">
      {/* Header */}
      <header className="px-4 pt-12 pb-4 bg-background">
        <div className="flex items-center gap-3">
          <Link
            href="/historial"
            className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center"
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </Link>
          <div className="flex-1">
            <h1 className="text-h2-bold text-text-primary">{product.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Pill variant="neutral">{getProductTypeLabel(product.type)}</Pill>
              <Pill variant={statusConfig[investment.status].variant}>
                {statusConfig[investment.status].label}
              </Pill>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 flex flex-col gap-4">
        {/* Current value card */}
        <Card className="p-5 bg-gradient-red text-text-inverse">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-b2-regular opacity-90">Valor actual</span>
          </div>
          <p className="text-h1-bold">
            {formatCurrency(totalValue, product.currency)}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-b2-regular opacity-90">Rendimiento:</span>
            <span className="text-b1-bold">
              +{formatCurrency(investment.currentReturn, product.currency)} (
              {formatPercentage(returnPercentage)})
            </span>
          </div>
        </Card>

        {/* Operation details */}
        <Card className="p-4">
          <h2 className="text-h3-semibold text-text-primary mb-4">
            Detalle de la operación
          </h2>

          <div className="flex flex-col gap-3">
            <DetailRow
              icon={<FileText className="w-4 h-4" />}
              label="N° de operación"
              value={
                <div className="flex items-center gap-2">
                  <span className="font-mono">{investment.operationNumber}</span>
                  <button
                    onClick={handleCopyOperationNumber}
                    className="p-1 hover:bg-surface-muted rounded"
                    aria-label="Copiar número de operación"
                  >
                    <Copy className="w-4 h-4 text-text-muted" />
                  </button>
                </div>
              }
            />

            <DetailRow
              icon={<Calendar className="w-4 h-4" />}
              label="Fecha de inversión"
              value={formatDate(investment.investedAt)}
            />

            {investment.expiresAt && (
              <DetailRow
                icon={<Calendar className="w-4 h-4" />}
                label="Fecha de vencimiento"
                value={formatDate(investment.expiresAt)}
              />
            )}

            <div className="h-px bg-border my-1" />

            <div className="flex justify-between">
              <span className="text-b1-regular text-text-muted">
                Capital invertido
              </span>
              <span className="text-b1-bold text-text-primary">
                {formatCurrency(investment.amount, product.currency)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-b1-regular text-text-muted">
                Intereses ganados
              </span>
              <span className="text-b1-bold text-success">
                +{formatCurrency(investment.currentReturn, product.currency)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-b1-regular text-text-muted">TNA</span>
              <span className="text-b1-regular text-text-secondary">
                {formatPercentage(product.returnRate)}
              </span>
            </div>
          </div>
        </Card>

        {/* Product info */}
        <Card className="p-4">
          <h2 className="text-h3-semibold text-text-primary mb-4">
            Información del producto
          </h2>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="text-b1-regular text-text-muted">Tipo</span>
              <span className="text-b1-regular text-text-secondary">
                {getProductTypeLabel(product.type)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-b1-regular text-text-muted">Riesgo</span>
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

            <div className="flex justify-between">
              <span className="text-b1-regular text-text-muted">Moneda</span>
              <span className="text-b1-regular text-text-secondary">
                {product.currency}
              </span>
            </div>

            {product.term && (
              <div className="flex justify-between">
                <span className="text-b1-regular text-text-muted">Plazo</span>
                <span className="text-b1-regular text-text-secondary">
                  {product.term} días
                </span>
              </div>
            )}

            {!product.isCancelable && (
              <div className="mt-2 p-3 bg-warning-bg rounded-lg">
                <p className="text-b2-semibold text-warning">
                  Este producto no permite rescate anticipado
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Bottom actions */}
      {showRedemption && (
        <BottomBar className="flex flex-col gap-2">
          <Button size="lg" fullWidth variant="danger">
            Rescatar inversión
          </Button>
          <p className="text-b3-bold text-text-muted text-center">
            El rescate se acreditará en 24-48hs
          </p>
        </BottomBar>
      )}
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
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="text-text-muted mt-0.5">{icon}</div>
      <div className="flex-1 flex justify-between items-start">
        <p className="text-b1-regular text-text-muted">{label}</p>
        <div className="text-b1-regular text-text-primary text-right">
          {value}
        </div>
      </div>
    </div>
  );
}
