"use client";

import { cn } from "@/lib/utils";
import { ProductCardInline } from "@/components/features/product-card-inline";
import { OnboardingOptions } from "@/components/features/onboarding-options";
import type { ChatMessage as ChatMessageType, Product, OnboardingQuestion } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
  product?: Product;
  onboardingQuestion?: OnboardingQuestion;
  onAnswerOnboarding?: (questionId: string, value: string) => void;
}

export function ChatMessage({
  message,
  product,
  onboardingQuestion,
  onAnswerOnboarding,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  if (message.contentType === "product-card" && product) {
    return (
      <div className="max-w-[85%]">
        <ProductCardInline product={product} />
      </div>
    );
  }

  if (message.contentType === "onboarding-question" && onboardingQuestion) {
    return (
      <div className="max-w-[85%]">
        <div className="bg-surface-muted rounded-2xl rounded-tl-none px-4 py-3 mb-2">
          <p className="text-b1-regular text-text-primary">{message.content}</p>
        </div>
        <OnboardingOptions
          question={onboardingQuestion}
          onSelect={(value) => onAnswerOnboarding?.(onboardingQuestion.id, value)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "max-w-[85%]",
        isUser ? "self-end" : "self-start"
      )}
    >
      <div
        className={cn(
          "rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary text-text-inverse rounded-br-none"
            : "bg-surface-muted text-text-primary rounded-tl-none"
        )}
      >
        <p className="text-b1-regular">{message.content}</p>
      </div>
    </div>
  );
}
