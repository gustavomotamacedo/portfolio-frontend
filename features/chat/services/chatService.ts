import { ChatRequest, ChatResponse, ChatHistoryResponse } from "../types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export class ChatService {
  static async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar mensagem");
    }

    return response.json();
  }

  static async loadHistory(sessionId: string): Promise<ChatHistoryResponse> {
    const response = await fetch(
      `${API_BASE_URL}/api/chat/history?session_id=${sessionId}`,
    );

    if (!response.ok) {
      throw new Error("Erro ao carregar histórico");
    }

    return response.json();
  }
}
