# Checklist de publicação

Repo deste plugin: https://github.com/wtibes/equipeintegrada-mcp (público, sem binários, LICENSE MIT).

## Cursor Marketplace

- [ ] Repo público com `plugin.json` na raiz (Agent Plugins)
- [ ] `npm run prepare-release` sem diff
- [ ] Logo em `assets/logo.png` e `logo` no `.cursor-plugin/plugin.json`
- [ ] README descreve instalação e OAuth
- [ ] Submeter em https://cursor.com/marketplace/publish
- [ ] Após aprovação: `clients.cursor.listing` = URL do marketplace Cursor

## ChatGPT + Codex

- [ ] Mesmo `plugin.json` + `mcp.json` + `skills/` (não alterar `mcp.json` streamable-http)
- [ ] `extensions.com.openai.interface` com website, privacidade, termos e suporte
- [ ] Identidade verificada no OpenAI Platform + Apps Management write
- [ ] Portal: tipo **With MCP**, URL `https://api.azzoempresarial.com.br/mcp` — https://developers.openai.com/plugins/deploy/submission
- [ ] Colar `listing-copy.md` e `openai-test-cases.md`; apontar `openai-validation-run.md`
- [ ] Credenciais da sandbox **só** no campo privado do portal OpenAI (não no GitHub)
- [ ] Após aprovação: `clients.chatgpt.listing` e `clients.codex.listing`

## Claude Connectors Directory

- [ ] Isto **não** é o GitHub. Formulário do directory + e-mail `mcp-review@anthropic.com`
- [ ] URL MCP, logo, copy de `listing-copy.md`, screenshots
- [ ] Enquanto não sair: o app usa o link pré-preenchido (`href`)
- [ ] Após aprovação: `clients.claude.listing` = `https://claude.ai/directory/connectors/{slug}`

## Grok

- [ ] Plugin/marketplace xAI **ou** conector em https://grok.com/connectors
- [ ] Grok Build já lê `.claude-plugin` + `.mcp.json` deste repo
- [ ] Após aprovação: `clients.grok.listing` = URL permanente do catálogo

## Depois de qualquer aprovação

```bash
# editar catalog/install-links.json (campo listing)
npm run prepare-release
```

Copiar `catalog/install-links.json` → `vue-eq/src/components/aplicativos/apps/mcp-install-links.json`.
