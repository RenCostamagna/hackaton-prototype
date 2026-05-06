import { Card } from "@/components/ui/card";
import { LayoutGrid, Bot, ChevronRight } from "lucide-react";
import Link from "next/link";

const quickAccessItems = [
  {
    href: "/catalogo",
    icon: LayoutGrid,
    title: "Inversiones",
    description: "Explora productos de inversion",
    color: "bg-primary/10 text-primary",
  },
  {
    href: "/chatbot",
    icon: Bot,
    title: "AIKO",
    description: "Inverti con asistencia",
    color: "bg-success/10 text-success",
  },
];

export function QuickAccessCards() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-h3-semibold text-text-primary">Acceso rápido</h2>
      <div className="grid grid-cols-2 gap-3">
        {quickAccessItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Card className="p-4 h-full hover:shadow-lg transition-shadow">
                <div
                  className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mb-3`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-b1-bold text-text-primary mb-1">
                  {item.title}
                </h3>
                <p className="text-b3-bold text-text-muted">{item.description}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
