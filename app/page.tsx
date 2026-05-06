import Image from "next/image";
import Link from "next/link";
import {
  PiggyBank,
  CreditCard,
  TrendingUp,
  UserCog,
  Wallet,
  Building2,
  MessageCircle,
  Gift,
  HelpCircle,
  MapPin,
  Phone,
  Menu,
  ChevronRight,
} from "lucide-react";

const quickActions = [
  {
    icon: PiggyBank,
    label: "Abrir tu caja de ahorro",
    href: "#",
    disabled: true,
  },
  {
    icon: CreditCard,
    label: "Solicitar tarjeta de credito",
    href: "#",
    disabled: true,
  },
  {
    icon: TrendingUp,
    label: "Invertir",
    href: "/login",
    disabled: false,
  },
  {
    icon: UserCog,
    label: "Actualizar tus datos",
    href: "#",
    disabled: true,
  },
  {
    icon: Wallet,
    label: "Gestiones de tarjeta de debito",
    href: "#",
    disabled: true,
  },
  {
    icon: Building2,
    label: "Ingresar a Munibanking",
    href: "#",
    disabled: true,
  },
];

const bottomLinks = [
  {
    icon: HelpCircle,
    label: "Preguntas frecuentes",
    href: "#",
  },
  {
    icon: MapPin,
    label: "Cajeros cercanos",
    href: "#",
  },
  {
    icon: Phone,
    label: "Telefonos utiles",
    href: "#",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="bg-gradient-red px-4 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Image
            src="/logo.svg"
            alt="Banco Municipal"
            width={160}
            height={28}
            className="brightness-0 invert"
          />
          <button className="p-2 text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <h1 className="text-h2-bold text-white">
          Hola! <span className="inline-block">👋</span> Que necesitas?
        </h1>
      </header>

      {/* Quick Actions Grid */}
      <div className="px-4 -mt-0 pt-6">
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action, index) => 
            action.disabled ? (
              <div
                key={index}
                className="bg-surface rounded-xl p-4 flex flex-col items-center text-center shadow-sm border border-border opacity-50 cursor-not-allowed"
              >
                <div className="w-10 h-10 rounded-full bg-grey-2 flex items-center justify-center mb-2">
                  <action.icon className="w-5 h-5 text-text-muted" />
                </div>
                <span className="text-b3-regular text-text-muted leading-tight">
                  {action.label}
                </span>
              </div>
            ) : (
              <Link
                key={index}
                href={action.href}
                className="bg-surface rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow border border-border active:scale-95"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <action.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-b3-regular text-text-primary leading-tight">
                  {action.label}
                </span>
              </Link>
            )
          )}
        </div>
      </div>

      {/* WhatsApp Banner */}
      <div className="px-4 mt-6">
        <Link
          href="#"
          className="bg-[#3a3a3a] rounded-2xl p-4 flex items-center gap-4 text-white"
        >
          <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-b1-bold">Chatea con Ami</p>
            <p className="text-b3-regular text-white/70">
              Escribinos tu consulta por WhatsApp.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-white/50" />
        </Link>
      </div>

      {/* Referral Card */}
      <div className="px-4 mt-4">
        <div className="bg-[#fde8e8] rounded-2xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-h3-bold text-text-primary mb-1">
                Referi y gana
              </h3>
              <p className="text-b2-regular text-text-muted mb-4">
                Recomenda a un amigo y recibi{" "}
                <span className="text-text-primary font-semibold">$70.000</span>{" "}
                de regalo
              </p>
              <button className="bg-primary text-white px-5 py-2 rounded-full text-b2-bold">
                Referir ahora
              </button>
            </div>
            <div className="flex-shrink-0">
              <Gift className="w-16 h-16 text-primary/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Links */}
      <div className="px-4 py-6 mt-4 border-t border-border">
        <div className="flex justify-around">
          {bottomLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <link.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-b3-regular text-text-muted max-w-[80px]">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
