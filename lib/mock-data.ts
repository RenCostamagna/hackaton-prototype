import type {
  Product,
  Investment,
  User,
  InvestorProfile,
  OnboardingQuestion,
  AppError,
} from "@/types";

// Perfil inversor precargado (riesgo moderado, horizonte mediano plazo)
export const defaultInvestorProfile: InvestorProfile = {
  risk: "moderado",
  horizon: "mediano",
  objective: "crecer",
  isComplete: true,
};

// Usuario mock
export const mockUser: User = {
  id: "user-1",
  email: "juan.perez@email.com",
  name: "Juan Pérez",
  totalPortfolio: 2500000,
  availableBalance: 850000,
  investorProfile: defaultInvestorProfile,
};

// 6 productos mock (2 plazos fijos, 1 FCI, 2 bonos, 1 acción)
export const mockProducts: Product[] = [
  {
    id: "pf-1",
    name: "Plazo Fijo Tradicional",
    type: "plazo-fijo",
    risk: "bajo",
    currency: "ARS",
    returnRate: 85.5,
    minAmount: 10000,
    term: 30,
    description:
      "Plazo fijo tradicional a 30 días con tasa fija. Capital garantizado al vencimiento.",
    isCancelable: false,
  },
  {
    id: "pf-2",
    name: "Plazo Fijo UVA",
    type: "plazo-fijo",
    risk: "bajo",
    currency: "ARS",
    returnRate: 4.5,
    minAmount: 50000,
    term: 90,
    description:
      "Plazo fijo ajustado por inflación (UVA) a 90 días. Protege tu capital contra la inflación.",
    isCancelable: false,
  },
  {
    id: "fci-1",
    name: "FCI Renta Mixta",
    type: "fci",
    risk: "moderado",
    currency: "ARS",
    returnRate: 92.3,
    minAmount: 5000,
    description:
      "Fondo común de inversión diversificado en renta fija y variable. Rescate en 24hs.",
    isCancelable: true,
  },
  {
    id: "bono-1",
    name: "Bono AL30",
    type: "bono",
    risk: "moderado",
    currency: "USD",
    returnRate: 15.2,
    minAmount: 100,
    description:
      "Bono soberano en dólares con vencimiento 2030. Paga cupones semestrales.",
    isCancelable: true,
  },
  {
    id: "bono-2",
    name: "Bono TX26",
    type: "bono",
    risk: "moderado",
    currency: "ARS",
    returnRate: 78.5,
    minAmount: 10000,
    description:
      "Bono ajustado por CER con vencimiento 2026. Ideal para protección contra inflación.",
    isCancelable: true,
  },
  {
    id: "accion-1",
    name: "GGAL (Galicia)",
    type: "accion",
    risk: "alto",
    currency: "ARS",
    returnRate: 145.8,
    minAmount: 1000,
    description:
      "Acción del Grupo Financiero Galicia. Alta volatilidad, potencial de crecimiento.",
    isCancelable: true,
  },
];

// 3 operaciones pasadas en el historial
export const mockInvestments: Investment[] = [
  {
    id: "inv-1",
    operationNumber: "OP-2024-001542",
    productId: "pf-1",
    product: mockProducts[0],
    amount: 500000,
    investedAt: "2024-11-15T10:30:00Z",
    expiresAt: "2024-12-15T10:30:00Z",
    currentReturn: 35625,
    status: "activa",
  },
  {
    id: "inv-2",
    operationNumber: "OP-2024-001398",
    productId: "fci-1",
    product: mockProducts[2],
    amount: 250000,
    investedAt: "2024-10-20T14:15:00Z",
    currentReturn: 19230,
    status: "activa",
  },
  {
    id: "inv-3",
    operationNumber: "OP-2024-001201",
    productId: "bono-1",
    product: mockProducts[3],
    amount: 1500,
    investedAt: "2024-09-05T09:00:00Z",
    expiresAt: "2030-07-09T00:00:00Z",
    currentReturn: 95,
    status: "activa",
  },
];

// Preguntas de onboarding
export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: "q1",
    question: "¿Cuál es tu tolerancia al riesgo?",
    options: [
      { value: "conservador", label: "Conservador - Prefiero seguridad" },
      { value: "moderado", label: "Moderado - Balance entre riesgo y retorno" },
      { value: "agresivo", label: "Agresivo - Busco máximo rendimiento" },
    ],
    field: "risk",
  },
  {
    id: "q2",
    question: "¿Cuál es tu horizonte de inversión?",
    options: [
      { value: "corto", label: "Corto plazo - Menos de 1 año" },
      { value: "mediano", label: "Mediano plazo - 1 a 3 años" },
      { value: "largo", label: "Largo plazo - Más de 3 años" },
    ],
    field: "horizon",
  },
  {
    id: "q3",
    question: "¿Cuál es tu objetivo principal?",
    options: [
      { value: "preservar", label: "Preservar capital" },
      { value: "crecer", label: "Hacer crecer mi dinero" },
      { value: "renta", label: "Generar renta periódica" },
    ],
    field: "objective",
  },
];

// Errores de autenticación
export const authErrors: Record<string, AppError> = {
  "invalid-credentials": {
    type: "invalid-credentials",
    title: "Credenciales incorrectas",
    message: "El email o la contraseña ingresados no son válidos. Por favor, verificá tus datos.",
    ctaLabel: "Reintentar",
    ctaAction: "/login",
  },
  "session-expired": {
    type: "session-expired",
    title: "Sesión expirada",
    message: "Tu sesión ha expirado por seguridad. Por favor, volvé a iniciar sesión.",
    ctaLabel: "Iniciar sesión",
    ctaAction: "/login",
  },
  "account-blocked": {
    type: "account-blocked",
    title: "Cuenta bloqueada",
    message: "Tu cuenta ha sido bloqueada temporalmente por múltiples intentos fallidos. Contactá a soporte.",
    ctaLabel: "Contactar soporte",
    ctaAction: "/soporte",
  },
};

// Errores de operación
export const operationErrors: Record<string, AppError> = {
  "insufficient-funds": {
    type: "insufficient-funds",
    title: "Fondos insuficientes",
    message: "No tenés saldo suficiente para realizar esta operación. Podés depositar más fondos.",
    ctaLabel: "Depositar fondos",
    ctaAction: "/depositar",
  },
  "market-error": {
    type: "market-error",
    title: "Error de mercado",
    message: "No pudimos procesar tu operación debido a condiciones del mercado. Intentá nuevamente.",
    ctaLabel: "Reintentar",
    ctaAction: "retry",
  },
  "timeout": {
    type: "timeout",
    title: "Tiempo agotado",
    message: "La operación tardó demasiado en procesarse. Por favor, verificá tu historial antes de reintentar.",
    ctaLabel: "Ver historial",
    ctaAction: "/historial",
  },
};
