import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import {
  formatCurrency,
  formatDate,
  getProductTypeLabel,
} from "@/lib/utils";
import type { Investment, OperationStatus } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface HistoryListProps {
  investments: Investment[];
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

export function HistoryList({ investments }: HistoryListProps) {
  if (investments.length === 0) {
    return (
      <div className="px-4">
        <Card className="p-6 text-center">
          <p className="text-b1-regular text-text-muted">
            Aún no tenés operaciones registradas
          </p>
          <Link
            href="/catalogo"
            className="text-b1-bold text-primary mt-2 inline-block"
          >
            Explorá el catálogo
          </Link>
        </Card>
      </div>
    );
  }

  // Group by date
  const sortedInvestments = [...investments].sort(
    (a, b) => new Date(b.investedAt).getTime() - new Date(a.investedAt).getTime()
  );

  return (
    <div className="px-4 pb-4 flex flex-col gap-3">
      {sortedInvestments.map((investment) => (
        <Link key={investment.id} href={`/historial/${investment.id}`}>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-b1-bold text-text-primary">
                    {investment.product.name}
                  </span>
                  <Pill variant={statusConfig[investment.status].variant}>
                    {statusConfig[investment.status].label}
                  </Pill>
                </div>

                <div className="flex items-center gap-2 text-b2-regular text-text-muted mb-2">
                  <span>{getProductTypeLabel(investment.product.type)}</span>
                  <span>|</span>
                  <span>{formatDate(investment.investedAt)}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-b1-regular text-text-secondary">
                    {formatCurrency(investment.amount, investment.product.currency)}
                  </span>
                  {investment.currentReturn > 0 && (
                    <span className="text-b2-bold text-success">
                      +{formatCurrency(investment.currentReturn, investment.product.currency)}
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted flex-shrink-0" />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
