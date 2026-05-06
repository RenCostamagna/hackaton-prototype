"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@/lib/hooks/use-chat";
import { ChatMessage } from "@/components/features/chat-message";
import { ChatInput } from "@/components/features/chat-input";
import { mockProducts } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ChatInterface() {
  const {
    messages,
    isLoading,
    sendMessage,
    selectChip,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Obtener el ultimo mensaje con chips
  const lastMessageWithChips = [...messages].reverse().find(m => m.chips && m.chips.length > 0);
  const currentChips = lastMessageWithChips?.chips || [];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
      {/* Header */}
      <header className="px-4 pt-12 pb-4 bg-background border-b border-border">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 -ml-2 hover:bg-surface-muted rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-text-secondary" />
          </Link>
          <div>
            <h1 className="text-h2-bold text-text-primary">AIKO</h1>
            <p className="text-b2-regular text-text-muted">
              Tu asistente de inversiones
            </p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              product={
                message.productId
                  ? mockProducts.find((p) => p.id === message.productId)
                  : undefined
              }
              onSelectChip={selectChip}
              isLastWithChips={message.id === lastMessageWithChips?.id}
            />
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
              <span className="text-b2-regular text-text-muted">AIKO esta escribiendo...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput
        onSend={sendMessage}
        onChipSelect={selectChip}
        chips={currentChips}
        disabled={isLoading}
      />
    </div>
  );
}
