export const translations = {
  "pt-BR": {
    // Header
    headerTitle: "Gustavo Macedo AI",
    ctaPrimary: "Vamos construir seu projeto? 🚀",
    ctaFloating: "Converse comigo",

    // Empty State
    emptyGreeting: "Olá, tudo bem?",
    emptyQuestion: "Como posso te ajudar hoje?",
    emptySubtitle:
      "Escolha uma sugestão abaixo ou escreva sua própria mensagem para começar a conversar.",

    // Suggestions
    suggestionProfessional: "Experiência Prof.",
    suggestionProfessionalDesc: "Onde trabalhei e o que fiz.",
    suggestionProfessionalPrompt: "Conte sobre sua experiência profissional",

    suggestionTCC: "Projeto TCC",
    suggestionTCCDesc: "Detalhes da monografia.",
    suggestionTCCPrompt: "Sobre o que foi seu TCC?",

    suggestionIC: "Pesquisa IC",
    suggestionICDesc: "Pesquisa hidrodinâmica.",
    suggestionICPrompt: "Me explique o Potencial Hidrodinâmico (IC)",

    suggestionTech: "Habilidades Técnicas",
    suggestionTechDesc: "Stack e ferramentas.",
    suggestionTechPrompt: "Quais são suas principais habilidades técnicas?",

    suggestionBudget: "Orçamento de Software",
    suggestionBudgetDesc: "Informações de orçamento.",
    suggestionBudgetPrompt:
      "Quanto custa fazer um SAAS com você?",

    suggestionContact: "Contato direto",
    suggestionContactDesc: "Informações de contrato.",
    suggestionContactPrompt: "Como posso entrar em contato com você?",

    // Input
    inputPlaceholder: "Como posso te ajudar hoje?",
    disclaimer: "Verifique novamente respostas importantes.",

    // WhatsApp
    whatsappMessagePrimary: "Olá! Gostaria de conversar sobre um projeto.",
    whatsappMessageFloating: "Olá! Vim pelo chat e gostaria de conversar.",

    // Contact Info
    contactTitle: "Entre em Contato",
    contactEmail: "Email",
    contactLinkedIn: "LinkedIn",
    contactGitHub: "GitHub",
  },
  "en-US": {
    // Header
    headerTitle: "Gustavo Macedo AI",
    ctaPrimary: "Let's build your project? 🚀",
    ctaFloating: "Talk to me",

    // Empty State
    emptyGreeting: "Hello, how are you?",
    emptyQuestion: "How can I help you today?",
    emptySubtitle: "Choose a prompt below or write your own to start chatting.",

    // Suggestions
    suggestionProfessional: "Professional Exp.",
    suggestionProfessionalDesc: "Where I worked and what I did.",
    suggestionProfessionalPrompt: "Tell me about your professional experience",

    suggestionTCC: "TCC Project",
    suggestionTCCDesc: "Thesis details.",
    suggestionTCCPrompt: "What was your thesis about?",

    suggestionIC: "IC Research",
    suggestionICDesc: "Hydrodynamic research.",
    suggestionICPrompt: "Explain the Hydrodynamic Potential (IC)",

    suggestionTech: "Tech Skills",
    suggestionTechDesc: "Stack & tools.",
    suggestionTechPrompt: "What are your main technical skills?",

    suggestionBudget: "Software Budget",
    suggestionBudgetDesc: "Budget information.",
    suggestionBudgetPrompt:
      "How much does it cost to make a simple SAAS with you?",

    suggestionContact: "Direct Contact",
    suggestionContactDesc: "Contact information.",
    suggestionContactPrompt: "How can I get in touch with you?",

    // Input
    inputPlaceholder: "How can I help you today?",
    disclaimer: "Please double-check important responses.",

    // WhatsApp
    whatsappMessagePrimary: "Hello! I'd like to talk about a project.",
    whatsappMessageFloating:
      "Hello! I came from the chat and would like to talk.",

    // Contact Info
    contactTitle: "Get in Touch",
    contactEmail: "Email",
    contactLinkedIn: "LinkedIn",
    contactGitHub: "GitHub",
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)["pt-BR"];
