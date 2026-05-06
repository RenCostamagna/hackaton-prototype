import { Suspense } from "react";
import { InvestmentSuccess } from "@/components/features/investment-success";
import { LoadingScreen } from "@/components/ui/spinner";

export default function ExitoPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <InvestmentSuccess />
    </Suspense>
  );
}
