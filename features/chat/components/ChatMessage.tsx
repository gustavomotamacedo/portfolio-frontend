"use client";

import { Message } from "../types";
import { marked } from "marked";
import { useEffect, useRef } from "react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bubbleRef.current && message.role === "ai") {
      bubbleRef.current.innerHTML = marked.parse(message.content) as string;
    }
  }, [message]);

  return (
    <div className={`message-row ${message.role}`}>
      {message.role === "ai" && (
        <img src="/profile.jpg" alt="AI" className="chat-avatar" />
      )}
      <div className="bubble" ref={message.role === "ai" ? bubbleRef : null}>
        {message.role === "user" && message.content}
      </div>
    </div>
  );
}
