# Evidência de validação autenticada (OpenAI)

Data: 17/09/2026. Cliente: Cursor com MCP `https://api.azzoempresarial.com.br/mcp`.

**Conta desta corrida:** sessão OAuth já autenticada no Cursor (conta operacional / usuário interno `5303`). Não é a sandbox.

**Conta para o revisor OpenAI:** credenciais só no formulário do portal (fora deste Git). Sem PII de clientes nesta evidência: só artefatos cujo nome começa com `TESTE MCP OpenAI`.

O revisor do portal pode repetir os prompts de `openai-test-cases.md` depois do login. Esta corrida prova o servidor, não só o texto das skills.

## Positivos

| # | Caso | Resultado |
|---|---|---|
| 1 | Atividades atrasadas | `buscar_atividades` (`bucket=atrasadas`) devolveu lista do tenant autenticado (`ok: true`, total > 0). Sem parâmetro de tenant. |
| 2 | Agenda de hoje | `consultar_dados` domínio `agenda`, período `hoje` (2026-09-17): quantidade 0 — vazio real, não inventado. |
| 3 | Capacidades / CRM | `descrever_capacidades` listou crm, financeiro, fiscal, atividades, agenda, contatos. `consultar_dados` CRM (`quantidade_negocios` + `valor_negocios`, `status_negocio`, `mes_atual`) agregou o funil da conta. |
| 4 | Proposta sem gravar | `propor_criar_atividade` criou ação pendente. `buscar_atividades` com o nome de teste: **0** registros. `listar_acoes_pendentes` mostrou a proposta. |
| 5 | Confirmar uma vez | `confirmar_acao` uma vez. A atividade de teste passou a existir no Kanban `TESTE MCP OpenAI`. Ação saiu da lista pendente. |

A proposta de escrita usou um **Kanban descartável** (`propor_criar_kanban` → confirmar) porque painéis só visíveis na busca de atividades (sem participação) foram recusados na proposta — alinhado à permissão de criação.

## Negativos

| # | Caso | Resultado |
|---|---|---|
| 1 | SQL / outro tenant | `consultar_dados` com `filtros.sql` e `filtros.id_tenant` → MCP `-32602` (*Additional object properties are not allowed*). Tools não aceitam SQL nem tenant. |
| 2 | Confirmar de novo | Segunda `confirmar_acao` na mesma ação → `conflict` / “Ação já foi processada”. Sem segundo Kanban nem segunda atividade. |
| 3 | Escrita sem confirmação | Entre propor e confirmar a atividade de teste **não** existia. Cancelar outra proposta (`cancelar_acao`) deixou `buscar_atividades` em 0 para aquele nome e lista pendente vazia. |

## Isolamento entre empresas

Nesta sessão só havia **um** login OAuth. Prova complementar no servidor (`api.azzo`, não neste Git):

- `tests/Unit/McpContactLookupTest.php` — contato de outro tenant não retorna.
- `tests/Unit/McpPendingActionTest.php` — confirmar ação de outro `id_tenant` → 404; outro usuário no mesmo tenant não confirma; repetição → 409.

Para o revisor humano com duas contas: autenticar empresa A, anotar um dado; autenticar empresa B; o dado de A não pode aparecer.

## Fora do aceite OpenAI deste pacote

- **Expiração de proposta:** ações pendentes não têm TTL próprio. Access token OAuth expira (~60 min); refresh é outro fluxo.
- **`userinfo` / `openid` / restrição de domínio de workspace:** fora deste envio (login PKCE no Cursor ok).
- **Anotações MCP `readOnlyHint` / `destructiveHint`:** conferir no `tools/list` autenticado no cliente; o pacote não versiona o schema das tools.
- **Pusher 10 KB:** a confirmação da atividade gravou o card; a resposta da tool ainda reportou falha ao publicar evento Pusher. Não impede a revisão HITL. Pode-se apagar o painel `TESTE MCP OpenAI` no produto depois da submissão.
