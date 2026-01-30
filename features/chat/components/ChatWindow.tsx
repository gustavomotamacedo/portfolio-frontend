"use client";

import { useEffect, useRef } from "react";
import { Message } from "../types";
import { ChatMessage } from "./ChatMessage";
import { EmptyState } from "./EmptyState";

interface ChatWindowProps {
  messages: Message[];
  onSendSuggestion: (text: string) => void;
}

export function ChatWindow({ messages, onSendSuggestion }: ChatWindowProps) {
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll para o final quando messages mudar
    const scrollToBottom = () => {
      if (chatWindowRef.current) {
        const scrollElement = chatWindowRef.current;
        scrollElement.scrollTo({
          top: scrollElement.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    // Timeout pequeno para garantir que o DOM foi atualizado
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
  }, [messages]);

  return (
    <div id="chat-window" ref={chatWindowRef}>
      {messages.length === 0 ? (
        <EmptyState onSendSuggestion={onSendSuggestion} />
      ) : (
        messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))
      )}
    </div>
  );
}
