import { notFound } from "next/navigation";
import { mockInvestments } from "@/lib/mock-data";
import { InvestmentDetailView } from "@/components/features/investment-detail-view";

interface InvestmentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function InvestmentDetailPage({
  params,
}: InvestmentDetailPageProps) {
  const { id } = await params;
  const investment = mockInvestments.find((inv) => inv.id === id);

  if (!investment) {
    notFound();
  }

  return <InvestmentDetailView investment={investment} />;
}
