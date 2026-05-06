"use client";

import { cn } from "@/lib/utils";
import { ProductCardInline } from "@/components/features/product-card-inline";
import type { ChatMessage as ChatMessageType, Product, ChipOption } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
  products?: Product[];
  onSelectChip?: (value: string) => void;
  isLastWithChips?: boolean;
}

export function ChatMessage({
  message,
  products,
  onSelectChip,
  isLastWithChips,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  // Mensaje del usuario - alineado a la derecha, estilo boton rojo
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="bg-primary text-white rounded-full px-5 py-2.5 max-w-[80%]">
          <p className="text-b1-regular">{message.content}</p>
        </div>
      </div>
    );
  }

  // Mensaje del asistente
  return (
    <div className="flex flex-col gap-3">
      {/* Mensaje de texto con avatar */}
      {message.content && (
        <div className="flex items-start gap-2">
          {/* Avatar AI */}
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white text-b4-medium">AI</span>
          </div>
          
          {/* Burbuja del mensaje */}
          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-card max-w-[85%]">
            <p className="text-b1-regular text-text-primary whitespace-pre-line">
              {message.content}
            </p>
          </div>
        </div>
      )}

      {/* Tarjetas de productos - sin avatar, con margen izquierdo para alinear */}
      {products && products.length > 0 && (
        <div className="flex flex-col gap-3 ml-9">
          {products.map((product) => (
            <ProductCardInline key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Chips - solo mostrar en el ultimo mensaje que los tiene */}
      {isLastWithChips && message.chips && message.chips.length > 0 && (
        <div className="flex flex-wrap gap-2 ml-9 mt-1">
          {message.chips.map((chip: ChipOption) => (
            <button
              key={chip.id}
              onClick={() => onSelectChip?.(chip.value)}
              className="px-4 py-2 rounded-full bg-white text-text-secondary text-b2-semibold border border-grey-2 hover:border-primary hover:text-primary transition-all active:scale-95 shadow-sm"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
