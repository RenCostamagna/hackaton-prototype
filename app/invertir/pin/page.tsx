import { Suspense } from "react";
import { PinAuth } from "@/components/features/pin-auth";

export default function PinPage() {
  return (
    <Suspense fallback={<div className="p-4">Cargando...</div>}>
      <PinAuth />
    </Suspense>
  );
}
