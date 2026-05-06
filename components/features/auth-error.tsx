"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { authErrors } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { BottomBar } from "@/components/ui/bottom-bar";
import { XCircle, Clock, Lock } from "lucide-react";
import type { AuthErrorType } from "@/types";

const errorIcons: Record<AuthErrorType, React.ReactNode> = {
  "invalid-credentials": <XCircle className="w-10 h-10 text-danger" />,
  "session-expired": <Clock className="w-10 h-10 text-warning" />,
  "account-blocked": <Lock className="w-10 h-10 text-danger" />,
};

export function AuthError() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const errorType = searchParams.get("type") as AuthErrorType;
  const error = authErrors[errorType];

  if (!error) {
    router.push("/login");
    return null;
  }

  const handleCta = () => {
    router.push(error.ctaAction);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto pb-24">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Error icon */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
            errorType === "session-expired" ? "bg-warning-bg" : "bg-danger-bg"
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
      <BottomBar>
        <Button size="lg" fullWidth onClick={handleCta}>
          {error.ctaLabel}
        </Button>
      </BottomBar>
    </div>
  );
}
