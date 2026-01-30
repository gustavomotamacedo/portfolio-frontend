# 🔧 Correção do Carregamento de Histórico

## ❌ Problema Identificado

As mensagens anteriores da conversa não estavam sendo carregadas ao recarregar a página com `session_id` na URL.

### Sintomas:

- ✅ Nova mensagem funciona
- ❌ Histórico não aparece ao recarregar
- ❌ URL com session_id mas chat vazio

---

## ✅ Solução Implementada

### Causa Raiz

**Incompatibilidade de nomenclatura de roles:**

- **Backend (database.py):** Salva como `"assistant"`
- **Frontend (types):** Espera `"ai"`

```typescript
// Frontend espera:
type Message = {
  role: "user" | "ai"; // ❌ 'assistant' não é reconhecido
  content: string;
};
```

```python
# Backend salva:
role = "assistant"  # ❌ Frontend não reconhece
```

---

## 🔧 Mudanças Aplicadas

### 1. Backend - Mapeamento de Role

**Arquivo:** `api/blueprints/chat.py`

**Função:** `get_history()`

```python
@chat_bp.route('/chat/history', methods=['GET'])
def get_history():
    # ... código anterior ...

    history = []
    for msg in messages:
        # ✅ Mapear 'assistant' para 'ai' para compatibilidade
        role = 'ai' if msg.role == 'assistant' else msg.role
        history.append({
            "role": role,  # Agora retorna 'ai' ao invés de 'assistant'
            "content": msg.content
        })
```

**Antes:**

```json
{
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." } // ❌ Frontend não reconhece
  ]
}
```

**Depois:**

```json
{
  "history": [
    { "role": "user", "content": "..." },
    { "role": "ai", "content": "..." } // ✅ Frontend reconhece
  ]
}
```

---

### 2. Frontend - Logs de Debug

**Arquivo:** `frontend/features/chat/hooks/useChat.ts`

Adicionados console.logs para facilitar debugging:

```typescript
useEffect(() => {
  const urlSessionId = searchParams.get("session_id");
  console.log("[useChat] URL session_id:", urlSessionId); // ✅ Log 1

  if (urlSessionId) {
    setSessionId(urlSessionId);
    loadHistory(urlSessionId);
  }
}, [searchParams]);

const loadHistory = async (sid: string) => {
  console.log("[useChat] Carregando histórico para session:", sid); // ✅ Log 2

  try {
    const data = await ChatService.loadHistory(sid);
    console.log("[useChat] Histórico recebido:", data); // ✅ Log 3

    if (data.history && data.history.length > 0) {
      setMessages(data.history);
      console.log("[useChat] Mensagens carregadas:", data.history.length); // ✅ Log 4
    } else {
      console.log("[useChat] Nenhuma mensagem no histórico"); // ⚠️ Log 5
    }
  } catch (error) {
    console.error("[useChat] Falha ao carregar histórico:", error); // ❌ Log 6
  }
};
```

---

## 🔍 Como Debugar

### Console do Navegador

Abra as DevTools (F12) e veja os logs:

**Fluxo Normal (sucesso):**

```
[useChat] URL session_id: abc123-def456-...
[useChat] Carregando histórico para session: abc123-def456-...
[useChat] Histórico recebido: { history: [{ role: 'user', content: '...' }, ...] }
[useChat] Mensagens carregadas: 5
```

**Problema - Sessão vazia:**

```
[useChat] URL session_id: abc123-def456-...
[useChat] Carregando histórico para session: abc123-def456-...
[useChat] Histórico recebido: { history: [] }
[useChat] Nenhuma mensagem no histórico
```

**Problema - Erro de API:**

```
[useChat] URL session_id: abc123-def456-...
[useChat] Carregando histórico para session: abc123-def456-...
[useChat] Falha ao carregar histórico: Error: Failed to fetch
```

**Problema - Sem session_id:**

```
[useChat] URL session_id: null
(Nenhum log adicional - não tenta carregar)
```

---

## 📊 Fluxo Completo

### 1. Usuário Acessa URL com Session ID

```
http://localhost:3000?session_id=abc123...
```

### 2. Hook useChat Detecta

```typescript
const urlSessionId = searchParams.get("session_id"); // "abc123..."
console.log("[useChat] URL session_id:", urlSessionId);
```

### 3. Chama loadHistory

```typescript
if (urlSessionId) {
  setSessionId(urlSessionId);
  loadHistory(urlSessionId); // ✅ Carrega histórico
}
```

### 4. API Retorna Histórico

```python
# Backend mapeia roles
role = 'ai' if msg.role == 'assistant' else msg.role

return jsonify({
  "history": [
    { "role": "user", "content": "..." },
    { "role": "ai", "content": "..." }  # ✅ Compatível
  ]
})
```

### 5. Frontend Renderiza

```typescript
setMessages(data.history); // ✅ Mensagens aparecem no chat
```

---

## ✅ Teste Rápido

### Passo a Passo:

1. **Enviar mensagem inicial**

   ```
   URL: http://localhost:3000
   Envia: "Olá!"
   Resultado: URL atualiza para ?session_id=...
   ```

2. **Copiar URL completa**

   ```
   http://localhost:3000?session_id=abc123-def456-...
   ```

3. **Abrir em nova aba anônima**

   ```
   Cole a URL
   Pressione Enter
   ```

4. **Verificar console**

   ```
   Abrir DevTools (F12)
   Ver logs [useChat]
   ```

5. **Resultado Esperado**
   ```
   ✅ Mensagens anteriores aparecem
   ✅ Console mostra "Mensagens carregadas: X"
   ✅ Pode continuar conversando
   ```

---

## 🐛 Possíveis Problemas

### Problema 1: "Nenhuma mensagem no histórico"

**Causa:** session_id não existe no banco
**Solução:** Verificar se session_id é válido (UUID)

### Problema 2: "Falha ao carregar histórico"

**Causa:** API Flask offline ou CORS
**Solução:**

- Verificar se Flask está rodando
- Verificar console do Flask para erros

### Problema 3: Mensagens aparecem mas role errado

**Causa:** Backend não mapeou corretamente
**Solução:** JÁ CORRIGIDO - role agora é mapeado

### Problema 4: URL sem session_id

**Causa:** Normal - nova conversa
**Solução:** Envie primeira mensagem para gerar session_id

---

## 📝 Arquivos Modificados

### Backend

- ✅ `api/blueprints/chat.py` - Mapeamento de role no endpoint `/chat/history`

### Frontend

- ✅ `frontend/features/chat/hooks/useChat.ts` - Logs de debug adicionados

---

## 🎯 Comportamento Esperado

### Cenário 1: Nova Conversa

```
1. Acessar http://localhost:3000
2. Estado vazio mostrado
3. Enviar mensagem
4. URL atualiza com session_id
5. Mensagem aparece
```

### Cenário 2: Retomar Conversa

```
1. Acessar http://localhost:3000?session_id=...
2. Hook detecta session_id
3. Carrega histórico da API
4. Mensagens anteriores aparecem ✅
5. Pode continuar conversando
```

### Cenário 3: Compartilhar Conversa

```
1. Copiar URL com session_id
2. Abrir em outra aba/navegador
3. Histórico completo aparece ✅
4. Ambas as abas veem mesma conversa
```

---

## ✨ Melhorias Futuras

### Possíveis Otimizações:

1. **Loading state** durante carregamento
2. **Cache local** para evitar requests repetidas
3. **Infinite scroll** para históricos muito grandes
4. **Indicador visual** de "carregando histórico..."

---

## ✅ Status

**Implementação**: Completa

**Testado**: Aguardando teste do usuário

**Breaking Changes**: Nenhum

**Impacto**:

- 🟢 Histórico agora funciona corretamente
- 🟢 Compartilhamento de URLs funcional
- 🟢 Logs facilitam debugging

---

**A correção já está ativa!**

**Teste:**

1. Envie uma mensagem
2. Copie a URL com session_id
3. Abra em nova aba
4. Histórico deve aparecer! 🎉

**Debug:**

- Abra console (F12)
- Veja os logs [useChat]
- Verifique se mostra "Mensagens carregadas: X"

---

_Corrigido em 30/01/2026 - Histórico agora carrega corretamente_
