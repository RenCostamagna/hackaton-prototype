import { CatalogHeader } from "@/components/features/catalog-header";
import { CatalogList } from "@/components/features/catalog-list";
import { mockProducts } from "@/lib/mock-data";

export default function CatalogoPage() {
  return (
    <div className="flex flex-col">
      <CatalogHeader />
      <CatalogList products={mockProducts} />
    </div>
  );
}
