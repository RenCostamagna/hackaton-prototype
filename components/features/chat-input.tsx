"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onQuickAction: (action: string) => void;
  quickActions: string[];
  disabled?: boolean;
}

export function ChatInput({
  onSend,
  onQuickAction,
  quickActions,
  disabled,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="bg-surface border-t border-border px-4 py-3 pb-safe">
      {/* Quick action chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
        {quickActions.map((action) => (
          <button
            key={action}
            onClick={() => onQuickAction(action)}
            disabled={disabled}
            className="flex-shrink-0 px-3 py-1.5 rounded-full bg-surface-muted text-text-secondary text-b2-semibold border border-border hover:bg-grey-2 transition-colors disabled:opacity-50"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribí tu mensaje..."
          disabled={disabled}
          className="flex-1 px-4 py-3 rounded-full bg-surface-muted text-text-primary text-b1-regular placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="w-12 h-12 rounded-full bg-primary text-text-inverse flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          aria-label="Enviar mensaje"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
