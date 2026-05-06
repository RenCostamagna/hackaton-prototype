"use client";

import { useState } from "react";
import { Send, TrendingUp, DollarSign, HelpCircle } from "lucide-react";
import type { ChipOption } from "@/types";

interface ChatInputProps {
  onSend: (message: string) => void;
  onChipSelect: (value: string) => void;
  chips: ChipOption[];
  disabled?: boolean;
}

// Iconos para los chips de accion rapida
const chipIcons: Record<string, React.ReactNode> = {
  "ver-inversiones": <TrendingUp className="w-4 h-4" />,
  "quiero-invertir": <DollarSign className="w-4 h-4" />,
  "como-empiezo": <HelpCircle className="w-4 h-4" />,
};

export function ChatInput({
  onSend,
  onChipSelect,
  chips,
  disabled,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="bg-white border-t border-grey-2 px-4 py-3 pb-safe">
      {/* Chips de accion rapida con iconos */}
      {chips.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
          {chips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => onChipSelect(chip.value)}
              disabled={disabled}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-grey-6 text-b2-semibold border border-grey-2 hover:border-primary hover:text-primary transition-all disabled:opacity-50 active:scale-95"
            >
              {chipIcons[chip.id] || null}
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input de texto con boton de enviar */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribi tu consulta..."
            disabled={disabled}
            className="w-full px-4 py-3 rounded-full bg-grey-1 border border-grey-2 text-text-primary text-b1-regular placeholder:text-grey-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center disabled:bg-red-light disabled:cursor-not-allowed transition-colors active:scale-95 shadow-card"
          aria-label="Enviar mensaje"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
