import { Suspense } from "react";
import { OperationError } from "@/components/features/operation-error";
import { LoadingScreen } from "@/components/ui/spinner";

export default function ErrorPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <OperationError />
    </Suspense>
  );
}
