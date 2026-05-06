"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { BottomBar } from "@/components/ui/bottom-bar";
import { CatalogHeader } from "@/components/features/catalog-header";
import {
  formatPercentage,
  getProductTypeLabel,
  getRiskLabel,
} from "@/lib/utils";
import type { Product, ProductType, RiskLevel, Currency } from "@/types";
import { ChevronRight, X, Check } from "lucide-react";
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
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
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

  const handleConfirmOperation = () => {
    if (selectedProductId) {
      router.push(`/invertir/resumen?productId=${selectedProductId}&amount=100000`);
    }
  };

  const selectedProduct = selectedProductId 
    ? products.find(p => p.id === selectedProductId) 
    : null;

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
          <div className="flex flex-col gap-3 pb-24">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isSelected={selectedProductId === product.id}
                onSelect={() => setSelectedProductId(
                  selectedProductId === product.id ? null : product.id
                )}
              />
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

      {/* Fixed CTA Bottom Bar */}
      <BottomBar className="mb-20">
        <div className="flex flex-col gap-2">
          {selectedProduct && (
            <p className="text-b2-regular text-text-muted text-center">
              Seleccionado: <span className="text-text-primary font-semibold">{selectedProduct.name}</span>
            </p>
          )}
          <Button 
            fullWidth 
            onClick={handleConfirmOperation}
            disabled={!selectedProductId}
          >
            Confirmar operacion
          </Button>
        </div>
      </BottomBar>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
}

function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
  return (
    <Card 
      className={`p-4 flex items-center gap-3 cursor-pointer transition-all ${
        isSelected 
          ? "ring-2 ring-primary bg-primary/5" 
          : "hover:shadow-lg"
      }`}
      onClick={onSelect}
    >
      {/* Selection indicator */}
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
        isSelected 
          ? "bg-primary border-primary" 
          : "border-border"
      }`}>
        {isSelected && <Check className="w-4 h-4 text-white" />}
      </div>
      
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
      
      <Link 
        href={`/catalogo/${product.id}`}
        onClick={(e) => e.stopPropagation()}
        className="text-primary"
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </Card>
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
