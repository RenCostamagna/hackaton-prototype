"use client";

import { useSearchParams } from "next/navigation";
import { mockProducts } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomBar } from "@/components/ui/bottom-bar";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export function InvestmentSuccess() {
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId");
  const amount = parseFloat(searchParams.get("amount") || "0");

  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="p-4 text-center">
        <p className="text-b1-regular text-text-muted">
          Error al cargar la operación
        </p>
        <Link href="/dashboard" className="text-b1-bold text-primary mt-2 block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-success-bg flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>

        <h1 className="text-h1-bold text-text-primary text-center mb-2">
          Inversión exitosa
        </h1>
        <p className="text-b1-regular text-text-muted text-center mb-8">
          Tu operación se procesó correctamente
        </p>

        {/* Operation details */}
        <Card className="w-full p-4">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="text-b1-regular text-text-muted">Producto</span>
              <span className="text-b1-bold text-text-primary">
                {product.name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-b1-regular text-text-muted">
                Monto invertido
              </span>
              <span className="text-b1-bold text-text-primary">
                {formatCurrency(amount, product.currency)}
              </span>
            </div>

            {product.term && (
              <div className="flex justify-between">
                <span className="text-b1-regular text-text-muted">Plazo</span>
                <span className="text-b1-regular text-text-secondary">
                  {product.term} días
                </span>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Bottom CTA */}
      <BottomBar>
        <Link href="/dashboard">
          <Button size="lg" fullWidth>
            Volver al Dashboard
          </Button>
        </Link>
      </BottomBar>
    </div>
  );
}
