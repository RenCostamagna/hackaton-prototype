"use client";

import { useState, useCallback } from "react";
import type { ChatMessage, InvestorProfile } from "@/types";
import { mockProducts, onboardingQuestions, defaultInvestorProfile } from "@/lib/mock-data";

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  investorProfile: InvestorProfile;
  sendMessage: (content: string) => void;
  selectQuickAction: (action: string) => void;
  answerOnboarding: (questionId: string, value: string) => void;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Hola, soy tu asistente de inversiones. Puedo ayudarte a encontrar el producto ideal para vos y completar tu inversión sin salir del chat. ¿En qué puedo ayudarte?",
  contentType: "text",
  timestamp: new Date().toISOString(),
};

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [investorProfile, setInvestorProfile] = useState<InvestorProfile>(defaultInvestorProfile);
  const [onboardingStep, setOnboardingStep] = useState<number | null>(null);

  const addMessage = useCallback((message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  }, []);

  const simulateResponse = useCallback(
    async (userMessage: string) => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));

      const lowerMessage = userMessage.toLowerCase();

      // Check for product recommendations
      if (
        lowerMessage.includes("invertir") ||
        lowerMessage.includes("producto") ||
        lowerMessage.includes("opciones") ||
        lowerMessage.includes("recomendar")
      ) {
        // Recommend based on profile
        const recommendedProducts = mockProducts.filter((p) => {
          if (investorProfile.risk === "conservador") return p.risk === "bajo";
          if (investorProfile.risk === "moderado") return p.risk !== "alto";
          return true;
        });

        addMessage({
          role: "assistant",
          content: `Basándome en tu perfil ${investorProfile.risk}, te recomiendo estos productos:`,
          contentType: "text",
        });

        // Add product cards
        await new Promise((resolve) => setTimeout(resolve, 300));
        recommendedProducts.slice(0, 2).forEach((product) => {
          addMessage({
            role: "assistant",
            content: "",
            contentType: "product-card",
            productId: product.id,
          });
        });
      } else if (
        lowerMessage.includes("perfil") ||
        lowerMessage.includes("riesgo") ||
        lowerMessage.includes("cambiar")
      ) {
        addMessage({
          role: "assistant",
          content: "Vamos a actualizar tu perfil de inversor. Respondé estas preguntas:",
          contentType: "text",
        });
        setOnboardingStep(0);
        await new Promise((resolve) => setTimeout(resolve, 300));
        addMessage({
          role: "assistant",
          content: onboardingQuestions[0].question,
          contentType: "onboarding-question",
        });
      } else if (
        lowerMessage.includes("plazo fijo") ||
        lowerMessage.includes("plazofijo")
      ) {
        const plazoFijos = mockProducts.filter((p) => p.type === "plazo-fijo");
        addMessage({
          role: "assistant",
          content: "Tenemos estas opciones de plazo fijo disponibles:",
          contentType: "text",
        });
        await new Promise((resolve) => setTimeout(resolve, 300));
        plazoFijos.forEach((product) => {
          addMessage({
            role: "assistant",
            content: "",
            contentType: "product-card",
            productId: product.id,
          });
        });
      } else if (lowerMessage.includes("fci") || lowerMessage.includes("fondo")) {
        const fcis = mockProducts.filter((p) => p.type === "fci");
        addMessage({
          role: "assistant",
          content: "Este es nuestro fondo común de inversión:",
          contentType: "text",
        });
        await new Promise((resolve) => setTimeout(resolve, 300));
        fcis.forEach((product) => {
          addMessage({
            role: "assistant",
            content: "",
            contentType: "product-card",
            productId: product.id,
          });
        });
      } else if (lowerMessage.includes("bono")) {
        const bonos = mockProducts.filter((p) => p.type === "bono");
        addMessage({
          role: "assistant",
          content: "Estos son los bonos disponibles:",
          contentType: "text",
        });
        await new Promise((resolve) => setTimeout(resolve, 300));
        bonos.forEach((product) => {
          addMessage({
            role: "assistant",
            content: "",
            contentType: "product-card",
            productId: product.id,
          });
        });
      } else if (lowerMessage.includes("accion") || lowerMessage.includes("acciones")) {
        const acciones = mockProducts.filter((p) => p.type === "accion");
        addMessage({
          role: "assistant",
          content: "Esta es nuestra opción en acciones:",
          contentType: "text",
        });
        await new Promise((resolve) => setTimeout(resolve, 300));
        acciones.forEach((product) => {
          addMessage({
            role: "assistant",
            content: "",
            contentType: "product-card",
            productId: product.id,
          });
        });
      } else if (lowerMessage.includes("hola") || lowerMessage.includes("buenos")) {
        addMessage({
          role: "assistant",
          content: "¡Hola! ¿En qué puedo ayudarte hoy? Puedo mostrarte productos de inversión, actualizar tu perfil o ayudarte a invertir.",
          contentType: "text",
        });
      } else {
        addMessage({
          role: "assistant",
          content: "Puedo ayudarte a encontrar el producto ideal. ¿Querés ver opciones de plazo fijo, fondos, bonos o acciones? También podés decirme tu objetivo y te recomiendo según tu perfil.",
          contentType: "text",
        });
      }

      setIsLoading(false);
    },
    [addMessage, investorProfile]
  );

  const sendMessage = useCallback(
    (content: string) => {
      addMessage({
        role: "user",
        content,
        contentType: "text",
      });
      simulateResponse(content);
    },
    [addMessage, simulateResponse]
  );

  const selectQuickAction = useCallback(
    (action: string) => {
      sendMessage(action);
    },
    [sendMessage]
  );

  const answerOnboarding = useCallback(
    (questionId: string, value: string) => {
      const question = onboardingQuestions.find((q) => q.id === questionId);
      if (!question) return;

      // Add user answer
      const selectedOption = question.options.find((o) => o.value === value);
      addMessage({
        role: "user",
        content: selectedOption?.label || value,
        contentType: "text",
      });

      // Update profile
      setInvestorProfile((prev) => ({
        ...prev,
        [question.field]: value,
      }));

      // Move to next question or finish
      const currentIndex = onboardingQuestions.findIndex((q) => q.id === questionId);
      if (currentIndex < onboardingQuestions.length - 1) {
        setOnboardingStep(currentIndex + 1);
        setTimeout(() => {
          addMessage({
            role: "assistant",
            content: onboardingQuestions[currentIndex + 1].question,
            contentType: "onboarding-question",
          });
        }, 500);
      } else {
        setOnboardingStep(null);
        setInvestorProfile((prev) => ({ ...prev, isComplete: true }));
        setTimeout(() => {
          addMessage({
            role: "assistant",
            content: "¡Perfecto! Tu perfil está actualizado. Ahora puedo recomendarte productos más acordes a tus preferencias. ¿Querés ver algunas opciones?",
            contentType: "text",
          });
        }, 500);
      }
    },
    [addMessage]
  );

  return {
    messages,
    isLoading,
    investorProfile,
    sendMessage,
    selectQuickAction,
    answerOnboarding,
  };
}
