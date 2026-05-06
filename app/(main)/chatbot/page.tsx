import { ChatInterface } from "@/components/features/chat-interface";

export default function ChatbotPage() {
  // El ChatInterface maneja su propio layout fijo
  // No necesita el padding del layout principal
  return <ChatInterface />;
}
