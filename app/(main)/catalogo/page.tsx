import { CatalogList } from "@/components/features/catalog-list";
import { mockProducts } from "@/lib/mock-data";

export default function CatalogoPage() {
  return <CatalogList products={mockProducts} />;
}
