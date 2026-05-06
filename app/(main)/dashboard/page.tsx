import { DashboardHeader } from "@/components/features/dashboard-header";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { QuickAccessCards } from "@/components/features/quick-access-cards";
import { ActiveInvestments } from "@/components/features/active-investments";
import { mockUser, mockInvestments } from "@/lib/mock-data";

export default function DashboardPage() {
  const activeInvestments = mockInvestments.filter(
    (inv) => inv.status === "activa"
  );

  return (
    <div className="flex flex-col">
      <DashboardHeader user={mockUser} />
      
      <div className="px-4 -mt-6 flex flex-col gap-4">
        <PortfolioCard
          totalPortfolio={mockUser.totalPortfolio}
          availableBalance={mockUser.availableBalance}
        />
        
        <QuickAccessCards />
        
        <ActiveInvestments investments={activeInvestments} />
      </div>
    </div>
  );
}
