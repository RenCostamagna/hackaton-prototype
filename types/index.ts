// Product types
export type ProductType = "plazo-fijo" | "fci" | "bono" | "accion";
export type RiskLevel = "bajo" | "moderado" | "alto";
export type Currency = "ARS" | "USD";

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  risk: RiskLevel;
  currency: Currency;
  returnRate: number; // Percentage
  minAmount: number;
  maxAmount?: number;
  term?: number; // Days (for plazo fijo)
  description: string;
  isCancelable: boolean;
}

// Investment / Operation types
export type OperationStatus = "activa" | "finalizada" | "cancelada" | "pendiente";

export interface Investment {
  id: string;
  operationNumber: string;
  productId: string;
  product: Product;
  amount: number;
  investedAt: string; // ISO date
  expiresAt?: string; // ISO date
  currentReturn: number;
  status: OperationStatus;
}

// User profile types
export type RiskProfile = "conservador" | "moderado" | "agresivo";
export type InvestmentHorizon = "corto" | "mediano" | "largo";
export type InvestmentObjective = "preservar" | "crecer" | "renta";

export interface InvestorProfile {
  risk: RiskProfile;
  horizon: InvestmentHorizon;
  objective: InvestmentObjective;
  isComplete: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  totalPortfolio: number;
  availableBalance: number;
  investorProfile: InvestorProfile;
}

// AIKO Chat types
export type MessageRole = "user" | "assistant";
export type MessageContentType = 
  | "text" 
  | "product-card" 
  | "onboarding-question"
  | "chips"
  | "profile-selection"
  | "profile-confirmation";

export type AikoFlowState = 
  | "welcome"
  | "awaiting-path-selection"
  | "self-declare-profile"
  | "ask-refine-questions"
  | "onboarding-risk"
  | "onboarding-horizon"
  | "onboarding-objective"
  | "profile-inferred"
  | "profile-contradiction"
  | "show-suggestions"
  | "conversation"
  | "explain-aiko"
  | "catalog-redirect";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  contentType: MessageContentType;
  productId?: string;
  productIds?: string[];
  chips?: ChipOption[];
  timestamp: string;
}

export interface ChipOption {
  id: string;
  label: string;
  value: string;
}

export interface OnboardingQuestion {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
  }[];
  field: keyof InvestorProfile;
}

// AIKO Profile tracking
export interface AikoProfileState {
  declaredProfile: RiskProfile | null;
  inferredProfile: RiskProfile | null;
  riskAnswer: string | null;
  horizonAnswer: string | null;
  objectiveAnswer: string | null;
  finalProfile: RiskProfile | null;
}

// Error types
export type AuthErrorType = "invalid-credentials" | "session-expired" | "account-blocked";
export type OperationErrorType = "insufficient-funds" | "market-error" | "timeout";

export interface AppError {
  type: AuthErrorType | OperationErrorType;
  title: string;
  message: string;
  ctaLabel: string;
  ctaAction: string;
}
