import { Suspense } from "react";
import { InvestmentSummary } from "@/components/features/investment-summary";

export default function ResumenPage() {
  return (
    <Suspense fallback={<div className="p-4">Cargando...</div>}>
      <InvestmentSummary />
    </Suspense>
  );
}
