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
    <div className="fixed inset-0 flex flex-col bg-grey-1 max-w-md mx-auto">
      {/* Header fijo */}
      <header className="flex-shrink-0 bg-gradient-red px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard" 
            className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          
          {/* Avatar AI */}
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-primary text-b1-bold">AI</span>
          </div>
          
          <div>
            <h1 className="text-h3-bold text-white">Asistente IA</h1>
            <p className="text-b3-regular text-white/80">
              Siempre disponible
            </p>
          </div>
        </div>
      </header>

      {/* Messages - area scrolleable */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              products={
                message.productIds
                  ? mockProducts.filter((p) => message.productIds?.includes(p.id))
                  : message.productId
                  ? [mockProducts.find((p) => p.id === message.productId)!].filter(Boolean)
                  : undefined
              }
              onSelectChip={selectChip}
              isLastWithChips={message.id === lastMessageWithChips?.id}
            />
          ))}

          {isLoading && (
            <div className="flex items-start gap-2">
              {/* Avatar AI */}
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-white text-b4-medium">AI</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-card">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-grey-4 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-grey-4 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <span className="w-2 h-2 bg-grey-4 rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input fijo arriba del bottom nav */}
      <div className="flex-shrink-0 mb-20">
        <ChatInput
          onSend={sendMessage}
          onChipSelect={selectChip}
          chips={currentChips}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
