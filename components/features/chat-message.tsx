"use client";

import { cn } from "@/lib/utils";
import { ProductCardInline } from "@/components/features/product-card-inline";
import type { ChatMessage as ChatMessageType, Product, ChipOption } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
  product?: Product;
  onSelectChip?: (value: string) => void;
  isLastWithChips?: boolean;
}

export function ChatMessage({
  message,
  product,
  onSelectChip,
  isLastWithChips,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  // Renderizar tarjeta de producto
  if (message.contentType === "product-card" && product) {
    return (
      <div className="max-w-[90%] self-start">
        <ProductCardInline product={product} />
        {message.content && (
          <p className="text-b2-regular text-text-muted mt-2 px-1">
            {message.content}
          </p>
        )}
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
      {/* Bubble del mensaje */}
      <div
        className={cn(
          "rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary text-text-inverse rounded-br-none"
            : "bg-surface-muted text-text-primary rounded-tl-none"
        )}
      >
        <p className="text-b1-regular whitespace-pre-line">{message.content}</p>
      </div>

      {/* Chips - solo mostrar en el ultimo mensaje que los tiene */}
      {isLastWithChips && message.chips && message.chips.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {message.chips.map((chip: ChipOption) => (
            <button
              key={chip.id}
              onClick={() => onSelectChip?.(chip.value)}
              className="px-4 py-2 rounded-full bg-surface border border-border text-text-secondary text-b2-semibold hover:bg-surface-muted hover:border-primary hover:text-primary transition-all active:scale-95"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
