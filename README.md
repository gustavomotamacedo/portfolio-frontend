# ThinkAI - Chat Frontend

Este é um projeto React Next.js com arquitetura **feature-first** e design **mobile-first**, replicando a interface e funcionalidades do chat HTML original.

## 🏗️ Arquitetura

O projeto segue uma **arquitetura feature-first**, onde cada funcionalidade é organizada em módulos independentes:

```
frontend/
├── features/
│   └── chat/                    # Feature de Chat
│       ├── components/          # Componentes React
│       │   ├── ChatContainer.tsx
│       │   ├── ChatHeader.tsx
│       │   ├── ChatWindow.tsx
│       │   ├── ChatMessage.tsx
│       │   ├── ChatInput.tsx
│       │   ├── EmptyState.tsx
│       │   └── TypingIndicator.tsx
│       ├── hooks/              # Custom hooks
│       │   └── useChat.ts
│       ├── services/           # Serviços de API
│       │   └── chatService.ts
│       ├── types/              # Tipos TypeScript
│       │   └── index.ts
│       └── index.ts            # Exportações públicas
├── app/                        # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
└── public/                     # Assets estáticos
    └── profile.jpg
```

## 🎨 Design

- **Mobile-First**: Interface otimizada para dispositivos móveis (max-width: 600px)
- **UI Moderna**: Cores suaves, animações suaves e micro-interações
- **Mesma Estética**: Replicação fiel do design original em HTML
- **Markdown Support**: Renderização de markdown nas respostas da IA usando `marked`

## 🔧 Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Marked** - Renderização de markdown
- **CSS Vanilla** - Estilização (sem TailwindCSS usado)
- **App Router** - Roteamento do Next.js

## 🚀 Instalação e Execução

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000)

### 4. Build de produção

```bash
npm run build
npm start
```

## 📡 API

O frontend se comunica com a API Flask através de dois endpoints:

### POST `/api/chat`

Enviar mensagem para o chat

**Request:**

```json
{
  "message": "string",
  "session_id": "string (opcional)"
}
```

**Response:**

```json
{
  "response": "string",
  "session_id": "string",
  "error": "string (opcional)"
}
```

### GET `/api/chat/history?session_id={id}`

Carregar histórico de conversas

**Response:**

```json
{
  "history": [
    {
      "role": "user" | "ai",
      "content": "string"
    }
  ]
}
```

## 📝 Funcionalidades

- ✅ Chat em tempo real com IA
- ✅ Histórico de conversas persistente (localStorage)
- ✅ Sugestões de prompts iniciais
- ✅ Indicador de digitação animado
- ✅ Renderização de markdown nas respostas
- ✅ Scroll automático para novas mensagens
- ✅ Estado vazio com sugestões
- ✅ Design responsivo mobile-first

## 🎯 Estrutura Feature-First

Cada feature é auto-contida e exporta apenas o necessário:

```typescript
// Importar feature de chat
import { ChatContainer, useChat, ChatService } from '@/features/chat';

// Usar componente
<ChatContainer />

// Usar hook customizado
const { messages, isLoading, sendMessage } = useChat();

// Usar serviço diretamente
await ChatService.sendMessage({ message: 'Olá!' });
```

## 🔄 Gerenciamento de Estado

- **Hook useChat**: Gerencia estado local do chat, sessões e comunicação com API
- **LocalStorage**: Persistência de session_id para recuperar histórico
- **React State**: Gerenciamento de mensagens e loading

## 🎨 Customização

### Cores

Edite as variáveis CSS em `app/globals.css`:

```css
:root {
  --bg-color: #f2f4f2;
  --surface-color: #ffffff;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --accent-color: #10b981;
}
```

### Sugestões Iniciais

Edite o array `suggestions` em `features/chat/components/EmptyState.tsx`

## 📦 Scripts Disponíveis

```bash
npm run dev      # Executar em desenvolvimento
npm run build    # Build de produção
npm start        # Executar build de produção
npm run lint     # Executar linter ESLint
```

## 🐛 Troubleshooting

### Erro de conexão com API

Verifique se:

1. A API Flask está rodando em `http://localhost:5000`
2. O arquivo `.env.local` está configurado corretamente
3. CORS está habilitado na API Flask

### Imagem de perfil não carrega

Certifique-se de que `public/profile.jpg` existe. Se não, copie:

```bash
cp ../api/static/profile.jpg ./public/profile.jpg
```

## 📄 Licença

Este projeto foi criado como parte do modelo_ia.
