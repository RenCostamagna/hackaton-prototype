import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import {
  formatCurrency,
  formatPercentage,
  getProductTypeLabel,
  getRiskLabel,
} from "@/lib/utils";
import type { Investment } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ActiveInvestmentsProps {
  investments: Investment[];
}

export function ActiveInvestments({ investments }: ActiveInvestmentsProps) {
  if (investments.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-h3-semibold text-text-primary">Mis inversiones</h2>
        <Card className="p-6 text-center">
          <p className="text-b1-regular text-text-muted">
            Aun no tenes inversiones activas
          </p>
          <Link
            href="/catalogo"
            className="text-b1-bold text-primary mt-2 inline-block"
          >
            Explora Inversiones
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-h3-semibold text-text-primary">Mis inversiones</h2>
        <Link href="/historial" className="text-b2-semibold text-primary">
          Ver todo
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {investments.slice(0, 3).map((investment) => (
          <Link
            key={investment.id}
            href={`/historial/${investment.id}`}
          >
            <Card className="p-4 flex items-center justify-between hover:shadow-lg transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-b1-bold text-text-primary">
                    {investment.product.name}
                  </span>
                  <Pill
                    variant={
                      investment.product.risk === "bajo"
                        ? "success"
                        : investment.product.risk === "moderado"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {getRiskLabel(investment.product.risk)}
                  </Pill>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-b2-regular text-text-muted">
                    {formatCurrency(investment.amount, investment.product.currency)}
                  </span>
                  <span className="text-b2-bold text-success">
                    +{formatCurrency(investment.currentReturn, investment.product.currency)}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
