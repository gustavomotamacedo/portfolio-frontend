"use client";

import { useLanguage } from "@/features/i18n";

interface EmptyStateProps {
  onSendSuggestion: (text: string) => void;
}

export function EmptyState({ onSendSuggestion }: EmptyStateProps) {
  const { t } = useLanguage();

  const suggestions = [
    {
      title: t("suggestionProfessional"),
      description: t("suggestionProfessionalDesc"),
      prompt: t("suggestionProfessionalPrompt"),
    },
    {
      title: t("suggestionTCC"),
      description: t("suggestionTCCDesc"),
      prompt: t("suggestionTCCPrompt"),
    },
    {
      title: t("suggestionIC"),
      description: t("suggestionICDesc"),
      prompt: t("suggestionICPrompt"),
    },
    {
      title: t("suggestionTech"),
      description: t("suggestionTechDesc"),
      prompt: t("suggestionTechPrompt"),
    },
    {
      title: t("suggestionBudget"),
      description: t("suggestionBudgetDesc"),
      prompt: t("suggestionBudgetPrompt"),
    },
  ];

  return (
    <div id="empty-state" className="empty-state">
      <img src="/profile.jpg" alt="Gustavo" className="empty-avatar" />
      <h2>
        {t("emptyGreeting")}
        <br />
        {t("emptyQuestion")}
      </h2>
      <p>{t("emptySubtitle")}</p>

      <div className="suggestions-row">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="suggestion-pill"
            onClick={() => onSendSuggestion(suggestion.prompt)}
          >
            <strong>{suggestion.title}</strong>
            <br />
            {suggestion.description}
          </div>
        ))}
      </div>
    </div>
  );
}
