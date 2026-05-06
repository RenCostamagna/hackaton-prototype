"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Delete } from "lucide-react";

const CORRECT_PIN = "1234";

export function PinAuth() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const productId = searchParams.get("productId");
  const amount = searchParams.get("amount");

  const handleKeyPress = (key: string) => {
    if (pin.length < 4) {
      const newPin = pin + key;
      setPin(newPin);
      setError("");

      if (newPin.length === 4) {
        handleSubmit(newPin);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError("");
  };

  const handleSubmit = async (pinValue: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (pinValue === CORRECT_PIN) {
      const random = Math.random();
      if (random < 0.05) {
        router.push("/invertir/error?type=market-error");
      } else if (random < 0.1) {
        router.push("/invertir/error?type=timeout");
      } else {
        router.push(`/invertir/exito?productId=${productId}&amount=${amount}`);
      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        router.push("/error-auth?type=account-blocked");
      } else {
        setError(`PIN incorrecto. ${3 - newAttempts} intentos restantes.`);
        setPin("");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title="Autenticacion" 
        backHref={`/invertir/resumen?productId=${productId}&amount=${amount}`} 
      />

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <p className="text-b1-regular text-text-secondary mb-2">
            Ingresa tu PIN de seguridad
          </p>
          <p className="text-b2-regular text-text-muted">
            PIN de prueba: 1234
          </p>
        </div>

        {/* PIN dots */}
        <div className="flex gap-4 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-colors ${
                pin.length > i ? "bg-primary" : "bg-grey-3"
              }`}
            />
          ))}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-b2-bold text-danger mb-4 text-center">{error}</p>
        )}

        {/* Custom keypad */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "delete"].map((key, index) => (
            <button
              key={index}
              onClick={() => {
                if (key === "delete") {
                  handleDelete();
                } else if (key !== null) {
                  handleKeyPress(String(key));
                }
              }}
              disabled={key === null}
              className={`h-16 rounded-xl flex items-center justify-center transition-colors ${
                key === null
                  ? ""
                  : key === "delete"
                  ? "bg-surface-muted hover:bg-grey-2 active:bg-grey-3"
                  : "bg-surface-muted hover:bg-grey-2 active:bg-grey-3"
              }`}
            >
              {key === "delete" ? (
                <Delete className="w-6 h-6 text-text-secondary" />
              ) : key !== null ? (
                <span className="text-h2-bold text-text-primary">{key}</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
