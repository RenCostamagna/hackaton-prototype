import { Suspense } from "react";
import { InvestmentSuccess } from "@/components/features/investment-success";

export default function ExitoPage() {
  return (
    <Suspense fallback={<div className="p-4">Cargando...</div>}>
      <InvestmentSuccess />
    </Suspense>
  );
}
