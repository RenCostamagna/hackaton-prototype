import { Suspense } from "react";
import { AuthError } from "@/components/features/auth-error";

export default function ErrorAuthPage() {
  return (
    <Suspense fallback={<div className="p-4">Cargando...</div>}>
      <AuthError />
    </Suspense>
  );
}
