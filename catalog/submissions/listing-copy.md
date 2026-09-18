# Texto para listings

**Nome:** Equipe Integrada

**Slug:** equipe-integrada

**URL do MCP:** https://api.azzoempresarial.com.br/mcp

**Website:** https://equipeintegrada.com

**Repositório:** https://github.com/wtibes/equipeintegrada-mcp

**Suporte:** https://equipeintegrada.com · contato@equipeintegrada.com

**Privacidade:** https://equipeintegrada.com/privacidade/

**Termos:** https://equipeintegrada.com/termos/

**Logo:** `assets/logo.png`

## Descrição curta (≤ 160 caracteres)

Conecte o assistente de IA ao CRM, atividades, agenda e financeiro da Equipe Integrada. Alterações só acontecem depois da sua confirmação.

## Descrição longa

A Equipe Integrada é o sistema de CRM, atividades e financeiro da empresa. Este conector usa o Protocolo MCP com login OAuth 2.1: a pessoa entra com a mesma conta do produto, escolhe a empresa e o assistente só vê o que ela já pode ver no sistema.

Consultas cobrem negócios, contatos, atividades, agenda, financeiro, resumos fiscais e alertas. Ações de escrita (criar atividade, montar Kanban, preencher campos) nascem como proposta. Nada é gravado até o usuário confirmar no próprio chat. Não existe permissão de escrita autônoma.

Não é necessário informar API key, tenant ou Client Secret. O servidor registra o cliente OAuth automaticamente.

## Scopes

- `mcp:read` — consultas autorizadas
- `mcp:write-pending` — propostas, confirmação e cancelamento; não altera dados sozinho

Esta versão **não** anuncia `openid` / `email` nem `userinfo_endpoint`. Login OAuth básico (PKCE) funciona no Cursor. Restrição de domínio de workspace ChatGPT Team/Enterprise fica fora deste envio.

## Primeira pergunta sugerida

Quais atividades estão atrasadas?

## Política de dados

Tokens identificam um usuário em um tenant. Permissões são revalidadas a cada chamada. Auditoria das tools fica no servidor da Equipe Integrada. Sem SQL livre, sem IDs de outro tenant, sem exportar XML/PDF fiscal neste conector.

Casos de teste para o portal OpenAI: `openai-test-cases.md`. Evidência autenticada: `openai-validation-run.md`.

## Conta de demonstração (revisor OpenAI)

Não versionar e-mail nem senha neste repositório. Colar as credenciais **só no campo privado do portal** OpenAI. MCP: `https://api.azzoempresarial.com.br/mcp`. Primeira pergunta: *Quais atividades estão atrasadas?*
