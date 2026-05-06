import { BottomNav } from "@/components/features/bottom-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <main className="pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
