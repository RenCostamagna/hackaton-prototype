"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type { ChipOption } from "@/types";

interface ChatInputProps {
  onSend: (message: string) => void;
  onChipSelect: (value: string) => void;
  chips: ChipOption[];
  disabled?: boolean;
}

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
    <div className="bg-surface border-t border-border px-4 py-3 pb-safe">
      {/* Chips de accion rapida - scroll horizontal */}
      {chips.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
          {chips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => onChipSelect(chip.value)}
              disabled={disabled}
              className="flex-shrink-0 px-4 py-2 rounded-full bg-surface-muted text-text-secondary text-b2-semibold border border-border hover:bg-primary/10 hover:border-primary hover:text-primary transition-all disabled:opacity-50 active:scale-95"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      {/* Input de texto */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribi tu mensaje..."
          disabled={disabled}
          className="flex-1 px-4 py-3 rounded-full bg-surface-muted text-text-primary text-b1-regular placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="w-12 h-12 rounded-full bg-primary text-text-inverse flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity active:scale-95"
          aria-label="Enviar mensaje"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
