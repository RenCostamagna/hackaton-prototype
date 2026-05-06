import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/mock-data";
import { ProductDetailView } from "@/components/features/product-detail-view";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
