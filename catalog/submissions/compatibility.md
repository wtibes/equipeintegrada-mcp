# Compatibilidade dos clientes

O servidor MCP é o mesmo: `https://api.azzoempresarial.com.br/mcp` (OAuth 2.1 + PKCE, scopes `mcp:read` e `mcp:write-pending`). Este pacote não contém o código do servidor.

| Cliente | O que testar | Status (2026-09-17) |
| --- | --- | --- |
| Cursor (app) | Deeplink ou plugin local `equipe-integrada` + Authenticate | **OK** — OAuth e sessão autenticada |
| Cursor (MCP autenticado) | Roteiro OpenAI 5+3 + HITL + recusa SQL/tenant | **OK** — 17/09/2026; ver `openai-validation-run.md` |
| ChatGPT (app Windows) | Plugin via marketplace pessoal **ou** Settings → MCP servers, Streamable HTTP | Pendente — pacote e evidência prontos; listing ainda `null` |
| Codex | Mesmo plugin/diretório do ChatGPT | Pendente |
| Claude | Conector custom (link pré-preenchido) | Não retestado nesta data |
| Grok | Conector custom | Não retestado nesta data |

Instalar só a URL MCP **não** carrega as duas skills. Skills entram com o plugin (Cursor local/Marketplace, ChatGPT plugin, ou pasta com `skills/`).
