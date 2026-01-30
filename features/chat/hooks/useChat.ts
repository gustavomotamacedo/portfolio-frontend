"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Message } from "../types";
import { ChatService } from "../services/chatService";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Carregar session_id da URL
  useEffect(() => {
    const urlSessionId = searchParams.get("session_id");
    console.log("[useChat] URL session_id:", urlSessionId);

    if (urlSessionId) {
      setSessionId(urlSessionId);
      loadHistory(urlSessionId);
    }
  }, [searchParams]);

  const loadHistory = async (sid: string) => {
    console.log("[useChat] Carregando histórico para session:", sid);
    try {
      const data = await ChatService.loadHistory(sid);
      console.log("[useChat] Histórico recebido:", data);

      if (data.history && data.history.length > 0) {
        setMessages(data.history);
        console.log("[useChat] Mensagens carregadas:", data.history.length);
      } else {
        console.log("[useChat] Nenhuma mensagem no histórico");
      }
    } catch (error) {
      console.error("[useChat] Falha ao carregar histórico:", error);
    }
  };

  // Atualizar URL com novo session_id
  const updateUrlWithSessionId = (sid: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("session_id", sid);
    router.push(`?${params.toString()}`);
  };

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      // Adicionar mensagem do usuário
      const userMessage: Message = { role: "user", content: text };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const payload: { message: string; session_id?: string } = {
          message: text,
        };
        if (sessionId) {
          payload.session_id = sessionId;
        }

        const data = await ChatService.sendMessage(payload);

        if (data.error) {
          const errorMessage: Message = {
            role: "ai",
            content: `Erro: ${data.error}`,
          };
          setMessages((prev) => [...prev, errorMessage]);
        } else {
          const aiMessage: Message = { role: "ai", content: data.response };
          setMessages((prev) => [...prev, aiMessage]);

          // Atualizar session_id na URL se for novo
          if (data.session_id && data.session_id !== sessionId) {
            setSessionId(data.session_id);
            updateUrlWithSessionId(data.session_id);
          }
        }
      } catch (error) {
        const errorMessage: Message = {
          role: "ai",
          content: "Erro de conexão.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, searchParams, router],
  );

  return {
    messages,
    isLoading,
    sendMessage,
    sessionId, // Exportar sessionId para uso externo se necessário
  };
}
