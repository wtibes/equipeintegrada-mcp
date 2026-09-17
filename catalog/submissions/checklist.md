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

- [ ] Mesmo `plugin.json` + `mcp.json` + `skills/`
- [ ] Seguir https://learn.chatgpt.com/docs/build-plugins (diretório universal)
- [ ] Após aprovação: `clients.chatgpt.listing` e `clients.codex.listing` (pode ser a mesma URL do plugin)

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
