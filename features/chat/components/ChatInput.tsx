"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { useLanguage } from "@/features/i18n";
import { ContactInfo } from "./ContactInfo";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [inputValue]);

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue);
      setInputValue("");
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-wrapper">
      <div className="input-card">
        <div className="input-top">
          <textarea
            ref={textareaRef}
            id="user-input"
            rows={1}
            placeholder={t("inputPlaceholder")}
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="chat-textarea"
            tabIndex={0}
          />
        </div>
        <div className="input-actions">
          <ContactInfo
            className="mobile-contact-trigger"
            dropdownDirection="up"
          />
          <div
            className="icon-btn"
            id="send-btn"
            style={{
              background: "#111827",
              color: "white",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
            onClick={handleSend}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
        </div>
      </div>
      <div className="disclaimer">{t("disclaimer")}</div>
    </div>
  );
}
