"use client";

import { useLanguage } from "../i18n/LanguageContext";

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "pt-BR" ? "en-US" : "pt-BR");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="language-switch"
      aria-label="Trocar idioma / Switch language"
      title={
        language === "pt-BR" ? "Switch to English" : "Mudar para Português"
      }
    >
      <span className="language-option-container">
        <span
          className={`language-option ${language === "pt-BR" ? "active" : ""}`}
        >
          <span className="language-flag">🇧🇷</span>
          <span className="language-code">PT</span>
        </span>
        <span
          className={`language-option ${language === "en-US" ? "active" : ""}`}
        >
          <span className="language-flag">🇺🇸</span>
          <span className="language-code">EN</span>
        </span>
      </span>
    </button>
  );
}
