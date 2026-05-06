"use client";

import { useRef, useEffect, useState } from "react";
import { useChat } from "@/lib/hooks/use-chat";
import { ChatMessage } from "@/components/features/chat-message";
import { ChatInput } from "@/components/features/chat-input";
import { mockProducts, onboardingQuestions } from "@/lib/mock-data";

const quickActions = [
  "Ver productos",
  "Plazo fijo",
  "Fondos",
  "Actualizar perfil",
];

export function ChatInterface() {
  const {
    messages,
    isLoading,
    investorProfile,
    sendMessage,
    selectQuickAction,
    answerOnboarding,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentOnboardingQuestion, setCurrentOnboardingQuestion] = useState<number>(0);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Track onboarding progress
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.contentType === "onboarding-question") {
      const questionIndex = onboardingQuestions.findIndex(
        (q) => q.question === lastMessage.content
      );
      if (questionIndex !== -1) {
        setCurrentOnboardingQuestion(questionIndex);
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
      {/* Header */}
      <header className="px-4 pt-12 pb-4 bg-background border-b border-border">
        <h1 className="text-h2-bold text-text-primary">Chatbot</h1>
        <p className="text-b2-regular text-text-muted">
          Tu asistente de inversiones
        </p>
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
              onboardingQuestion={
                message.contentType === "onboarding-question"
                  ? onboardingQuestions[currentOnboardingQuestion]
                  : undefined
              }
              onAnswerOnboarding={answerOnboarding}
            />
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-grey-4 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-grey-4 rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-2 h-2 bg-grey-4 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput
        onSend={sendMessage}
        onQuickAction={selectQuickAction}
        quickActions={quickActions}
        disabled={isLoading}
      />
    </div>
  );
}
