# ✅ Checklist de Verificação - Projeto Next.js

## 📋 Antes de Testar

### 1. Verificar API Flask

```bash
# A API deve estar rodando em:
http://localhost:5000

# Endpoints necessários:
✓ POST /api/chat
✓ GET /api/chat/history
```

### 2. Verificar Variáveis de Ambiente

```bash
# Arquivo: .env.local
✓ NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### 3. Verificar Dependências

```bash
✓ marked instalado
✓ @types/marked instalado
✓ node_modules completo
```

## 🧪 Testes a Realizar

### 1. **Página Carrega**

- [ ] Acessar http://localhost:3000
- [ ] Ver header "ThinkAI"
- [ ] Ver estado vazio com avatar
- [ ] Ver mensagem "Good evening, User"
- [ ] Ver 4 sugestões de prompts

### 2. **Sugestões Funcionam**

- [ ] Clicar em "Professional Exp."
- [ ] Input é preenchido automaticamente
- [ ] Mensagem é enviada
- [ ] Resposta da IA aparece

### 3. **Input Manual**

- [ ] Digitar mensagem no input
- [ ] Pressionar Enter ou clicar em enviar
- [ ] Mensagem do usuário aparece (bolha branca à direita)
- [ ] Indicador de digitação aparece (3 pontos)
- [ ] Resposta da IA aparece (bolha branca à esquerda com avatar)

### 4. **Markdown Funciona**

- [ ] Perguntar algo que retorne markdown (ex: "liste 3 itens")
- [ ] Verificar formatação (negrito, listas, etc.)

### 5. **Scroll Automático**

- [ ] Enviar várias mensagens
- [ ] Scroll deve ir automaticamente para baixo
- [ ] Deve ser suave (smooth scroll)

### 6. **Persistência de Sessão**

- [ ] Enviar mensagens
- [ ] Recarregar página (F5)
- [ ] Histórico deve ser recuperado
- [ ] Mensagens anteriores devem aparecer

### 7. **Responsividade**

- [ ] Redimensionar janela
- [ ] Layout deve se ajustar (max-width: 600px)
- [ ] Mobile-first funcionando

### 8. **Estados de Erro**

- [ ] Parar API Flask
- [ ] Enviar mensagem
- [ ] Deve mostrar "Erro de conexão"

## 🔍 Console do Navegador

### Erros que NÃO devem aparecer:

- ❌ "You're importing a component that needs useState"
- ❌ "This React Hook only works in a Client Component"
- ❌ Erros de compilação TypeScript
- ❌ Erros 500 do Next.js

### Logs esperados:

- ℹ️ Requisições fetch para /api/chat
- ℹ️ Session ID sendo salvo no localStorage

## 🎨 Verificação Visual

### Header

```
[☰]  ThinkAI  [M]
```

### Estado Vazio

```
    [Avatar circular]

Good evening, User
Can I help you with anything?

Choose a prompt below...

[Professional] [TCC]
[IC Research] [Tech Skills]
```

### Chat Ativo

```
[Avatar] Olá! Como posso...         (esquerda, bolha branca)

                     Oi! (direita, bolha branca)

[Avatar] [● ● ●] (indicador de digitação)
```

### Input

```
┌─────────────────────────────────┐
│ How can I help you...    📎 📷 [→]│
└─────────────────────────────────┘
  Please double-check responses.
```

## 📊 Arquivos a Verificar

### Componentes (todos com 'use client'):

- [x] ChatContainer.tsx
- [x] ChatHeader.tsx
- [x] ChatWindow.tsx
- [x] ChatMessage.tsx
- [x] ChatInput.tsx
- [x] EmptyState.tsx
- [x] TypingIndicator.tsx
- [x] useChat.ts

### Configuração:

- [x] .env.local existe
- [x] profile.jpg em /public
- [x] globals.css com estilos
- [x] package.json com dependências

## 🐛 Troubleshooting

### Problema: Página em branco

**Solução**: Verificar console do navegador para erros

### Problema: "Failed to fetch"

**Solução**:

1. Verificar se API Flask está rodando
2. Verificar URL em .env.local
3. Verificar CORS na API Flask

### Problema: Imagem não carrega

**Solução**:

```bash
cp ../api/static/profile.jpg ./public/profile.jpg
```

### Problema: Markdown não renderiza

**Solução**:

```bash
npm install marked @types/marked
```

### Problema: Erros de "use client"

**Solução**: Já corrigido! Todos os componentes têm a diretiva.

## ✨ Resultado Esperado

Após todas as verificações:

- ✅ Interface idêntica ao HTML original
- ✅ Todas as funcionalidades funcionando
- ✅ Sem erros no console
- ✅ Comunicação com API funcionando
- ✅ Histórico persistindo
- ✅ Markdown renderizando
- ✅ Animações suaves

---

**Status**: ✅ PROJETO PRONTO PARA TESTES
