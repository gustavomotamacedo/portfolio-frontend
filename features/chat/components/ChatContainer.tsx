"use client";

import { useChat } from "../hooks/useChat";
import { ChatHeader } from "./ChatHeader";
import { ChatWindow } from "./ChatWindow";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";

export function ChatContainer() {
  const { messages, isLoading, sendMessage } = useChat();

  const handleSendMessage = (text: string) => {
    sendMessage(text);
  };

  return (
    <>
      <ChatHeader />
      <div className="main-container">
        <ChatWindow messages={messages} onSendSuggestion={handleSendMessage} />
        {isLoading && <TypingIndicator />}
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </>
  );
}
