# Submissões aos marketplaces

O Git público **não** publica sozinho em Claude, ChatGPT, Cursor ou Grok. Cada catálogo tem o próprio formulário. Este pacote é o texto e os arquivos para colar.

Quando um listing for aprovado:

1. Em `catalog/install-links.json`, preencha `clients.<id>.listing` com a URL permanente (não apague `href` — fica como fallback).
2. Rode `npm run prepare-release`.
3. Se o app Vue precisar dos botões novos: `npm run sync-vue` (não faz parte do prepare-release).
4. O app e o README passam a abrir o directory, não o conector custom.

## Arquivos

- `listing-copy.md` — nome, URLs legais, descrição, scopes, HITL
- `openai-test-cases.md` — 5 positivos e 3 negativos para o portal OpenAI
- `openai-validation-run.md` — evidência autenticada (sem PII de clientes)
- `chatgpt-desktop.md` — MCP servers + marketplace pessoal no Windows
- `compatibility.md` — o que já foi testado em cada cliente
- `checklist.md` — URLs dos formulários
- `../install-links.json` — botões
- `../../assets/logo.png` — ícone

Screenshots: capture o login OAuth e uma pergunta real (*quais atividades estão atrasadas?*) no cliente de cada marketplace. Não versionar dados de cliente.

## Contatos oficiais

- Cursor: https://cursor.com/marketplace/publish
- ChatGPT / Codex: https://developers.openai.com/plugins/deploy/submission
- Claude Connectors Directory: https://claude.com/docs/connectors/building/directory-vs-custom — revisão `mcp-review@anthropic.com`
- Grok: https://docs.x.ai/build/features/skills-plugins-marketplaces
