import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Wallet, TrendingUp } from "lucide-react";

interface PortfolioCardProps {
  totalPortfolio: number;
  availableBalance: number;
}

export function PortfolioCard({
  totalPortfolio,
  availableBalance,
}: PortfolioCardProps) {
  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-text-muted" />
            <span className="text-b2-regular text-text-muted">
              Total de cartera
            </span>
          </div>
          <p className="text-h1-bold text-text-primary">
            {formatCurrency(totalPortfolio)}
          </p>
        </div>

        <div className="h-px bg-border" />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="w-4 h-4 text-text-muted" />
            <span className="text-b2-regular text-text-muted">
              Saldo disponible
            </span>
          </div>
          <p className="text-h3-bold text-success">
            {formatCurrency(availableBalance)}
          </p>
        </div>
      </div>
    </Card>
  );
}
