import { Suspense } from "react";
import { PinAuth } from "@/components/features/pin-auth";
import { LoadingScreen } from "@/components/ui/spinner";

export default function PinPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PinAuth />
    </Suspense>
  );
}
