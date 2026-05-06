"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { CatalogHeader } from "@/components/features/catalog-header";
import {
  formatPercentage,
  getProductTypeLabel,
  getRiskLabel,
} from "@/lib/utils";
import type { Product, ProductType, RiskLevel, Currency } from "@/types";
import { ChevronRight, X } from "lucide-react";
import Link from "next/link";

interface CatalogListProps {
  products: Product[];
}

type FilterState = {
  type: ProductType | "todos";
  risk: RiskLevel | null;
  currency: Currency | null;
};

export function CatalogList({ products }: CatalogListProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    type: "todos",
    risk: null,
    currency: null,
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.type !== "todos" && product.type !== filters.type) return false;
      if (filters.risk && product.risk !== filters.risk) return false;
      if (filters.currency && product.currency !== filters.currency) return false;
      return true;
    });
  }, [products, filters]);

  const activeFiltersCount = 
    (filters.risk ? 1 : 0) + (filters.currency ? 1 : 0);

  const clearFilters = () => {
    setFilters({ type: filters.type, risk: null, currency: null });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header with type filters */}
      <CatalogHeader
        selectedType={filters.type}
        onTypeChange={(type) => setFilters((prev) => ({ ...prev, type }))}
        onOpenFilters={() => setIsFilterOpen(true)}
      />

      {/* Content */}
      <div className="flex-1 px-4 py-4">
        {/* Active filters indicator */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-b2-regular text-text-muted">
              {activeFiltersCount} filtro{activeFiltersCount > 1 ? "s" : ""} activo{activeFiltersCount > 1 ? "s" : ""}
            </span>
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-b2-semibold text-primary"
            >
              <X className="w-4 h-4" />
              Limpiar
            </button>
          </div>
        )}

        {/* Product list */}
        {filteredProducts.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-b1-regular text-text-muted">
              No hay productos que coincidan con los filtros
            </p>
            <button
              onClick={clearFilters}
              className="text-b1-bold text-primary mt-2"
            >
              Limpiar filtros
            </button>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Filter bottom sheet for risk and currency */}
      <BottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Filtros avanzados"
      >
        <div className="flex flex-col gap-6">
          {/* Risk filter */}
          <div>
            <h3 className="text-b1-bold text-text-primary mb-3">Riesgo</h3>
            <div className="flex flex-wrap gap-2">
              {(["bajo", "moderado", "alto"] as RiskLevel[]).map((risk) => (
                <FilterChip
                  key={risk}
                  label={getRiskLabel(risk)}
                  isActive={filters.risk === risk}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      risk: prev.risk === risk ? null : risk,
                    }))
                  }
                />
              ))}
            </div>
          </div>

          {/* Currency filter */}
          <div>
            <h3 className="text-b1-bold text-text-primary mb-3">Moneda</h3>
            <div className="flex flex-wrap gap-2">
              {(["ARS", "USD"] as Currency[]).map((currency) => (
                <FilterChip
                  key={currency}
                  label={currency}
                  isActive={filters.currency === currency}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      currency: prev.currency === currency ? null : currency,
                    }))
                  }
                />
              ))}
            </div>
          </div>

          <Button fullWidth onClick={() => setIsFilterOpen(false)}>
            Aplicar filtros
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/catalogo/${product.id}`}>
      <Card className="p-4 flex items-center justify-between hover:shadow-lg transition-shadow">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-b1-bold text-text-primary">{product.name}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Pill variant="neutral">{getProductTypeLabel(product.type)}</Pill>
            <Pill
              variant={
                product.risk === "bajo"
                  ? "success"
                  : product.risk === "moderado"
                  ? "warning"
                  : "danger"
              }
            >
              {getRiskLabel(product.risk)}
            </Pill>
            <Pill variant="neutral">{product.currency}</Pill>
          </div>
          <p className="text-h3-bold text-success">
            {formatPercentage(product.returnRate)} TNA
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-text-muted" />
      </Card>
    </Link>
  );
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-b2-semibold transition-colors ${
        isActive
          ? "bg-primary text-text-inverse"
          : "bg-surface-muted text-text-secondary border border-border"
      }`}
    >
      {label}
    </button>
  );
}
