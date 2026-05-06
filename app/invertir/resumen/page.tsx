import { Suspense } from "react";
import { InvestmentSummary } from "@/components/features/investment-summary";
import { LoadingScreen } from "@/components/ui/spinner";

export default function ResumenPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <InvestmentSummary />
    </Suspense>
  );
}
