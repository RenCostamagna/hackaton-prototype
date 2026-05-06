"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { operationErrors } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { BottomBar } from "@/components/ui/bottom-bar";
import { XCircle, AlertTriangle, Clock } from "lucide-react";
import Link from "next/link";
import type { OperationErrorType } from "@/types";

const errorIcons: Record<OperationErrorType, React.ReactNode> = {
  "insufficient-funds": <XCircle className="w-10 h-10 text-danger" />,
  "market-error": <AlertTriangle className="w-10 h-10 text-warning" />,
  timeout: <Clock className="w-10 h-10 text-text-muted" />,
};

export function OperationError() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const errorType = searchParams.get("type") as OperationErrorType;
  const error = operationErrors[errorType];

  if (!error) {
    return (
      <div className="p-4 text-center">
        <p className="text-b1-regular text-text-muted">Error desconocido</p>
        <Link href="/dashboard" className="text-b1-bold text-primary mt-2 block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const handleCta = () => {
    if (error.ctaAction === "retry") {
      router.back();
    } else {
      router.push(error.ctaAction);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Error icon */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
            errorType === "insufficient-funds"
              ? "bg-danger-bg"
              : errorType === "market-error"
              ? "bg-warning-bg"
              : "bg-surface-muted"
          }`}
        >
          {errorIcons[errorType]}
        </div>

        <h1 className="text-h1-bold text-text-primary text-center mb-2">
          {error.title}
        </h1>
        <p className="text-b1-regular text-text-muted text-center max-w-xs">
          {error.message}
        </p>
      </div>

      {/* Bottom CTA */}
      <BottomBar className="flex flex-col gap-2">
        <Button size="lg" fullWidth onClick={handleCta}>
          {error.ctaLabel}
        </Button>
        <Link href="/dashboard" className="w-full">
          <Button size="lg" fullWidth variant="ghost">
            Volver al inicio
          </Button>
        </Link>
      </BottomBar>
    </div>
  );
}
