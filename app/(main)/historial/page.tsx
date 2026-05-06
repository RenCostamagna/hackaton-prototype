import { HistoryHeader } from "@/components/features/history-header";
import { HistoryList } from "@/components/features/history-list";
import { mockInvestments } from "@/lib/mock-data";

export default function HistorialPage() {
  return (
    <div className="flex flex-col">
      <HistoryHeader />
      <HistoryList investments={mockInvestments} />
    </div>
  );
}
