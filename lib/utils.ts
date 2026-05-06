import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ProductType, RiskLevel } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: "ARS" | "USD" = "ARS"): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "USD" ? 2 : 0,
    maximumFractionDigits: currency === "USD" ? 2 : 0,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));
}

export function formatDateTime(dateString: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export function getProductTypeLabel(type: ProductType): string {
  const labels: Record<ProductType, string> = {
    "plazo-fijo": "Plazo Fijo",
    fci: "FCI",
    bono: "Bono",
    accion: "Acción",
  };
  return labels[type];
}

export function getRiskLabel(risk: RiskLevel): string {
  const labels: Record<RiskLevel, string> = {
    bajo: "Bajo",
    moderado: "Moderado",
    alto: "Alto",
  };
  return labels[risk];
}

export function getRiskColor(risk: RiskLevel): string {
  const colors: Record<RiskLevel, string> = {
    bajo: "bg-success-bg text-success",
    moderado: "bg-warning-bg text-warning",
    alto: "bg-danger-bg text-danger",
  };
  return colors[risk];
}

export function calculateProjectedReturn(
  amount: number,
  returnRate: number,
  termDays?: number
): number {
  const days = termDays || 365;
  return (amount * (returnRate / 100) * days) / 365;
}

export function generateOperationNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `OP-${year}-${random}`;
}
