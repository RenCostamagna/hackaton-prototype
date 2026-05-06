import { Suspense } from "react";
import { OperationError } from "@/components/features/operation-error";

export default function ErrorPage() {
  return (
    <Suspense fallback={<div className="p-4">Cargando...</div>}>
      <OperationError />
    </Suspense>
  );
}
