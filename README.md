# Equipe Integrada — Agent Plugin

Plugin no padrão [Agent Plugins 1.0](https://agent-plugins.org): skills + MCP remoto com OAuth. Um repositório atende Cursor, ChatGPT, Codex, Claude Code e Grok Build. O servidor de dados continua em `https://api.azzoempresarial.com.br/mcp`. Código: https://github.com/wtibes/equipeintegrada-mcp.

## Instalar (um clique)

Use o assistente em que você já conversa. Depois do botão, faça login na **Equipe Integrada** (mesmo usuário do sistema) e pergunte: *quais atividades estão atrasadas?*

- **Claude:** [Conectar no Claude](https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=Equipe%20Integrada&connectorUrl=https%3A%2F%2Fapi.azzoempresarial.com.br%2Fmcp)
- **ChatGPT:** [Abrir o ChatGPT](https://chatgpt.com/)
- **Cursor:** [Adicionar ao Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=equipe-integrada&config=eyJ1cmwiOiJodHRwczovL2FwaS5henpvZW1wcmVzYXJpYWwuY29tLmJyL21jcCJ9)
- **Codex:** [Abrir o Codex](https://chatgpt.com/codex)
- **Grok:** [Abrir conectores do Grok](https://grok.com/connectors)

Conta **Team/Enterprise no Claude:** o administrador precisa [adicionar o conector para a empresa](https://claude.ai/admin-settings/connectors?modal=add-custom-connector&connectorName=Equipe%20Integrada&connectorUrl=https%3A%2F%2Fapi.azzoempresarial.com.br%2Fmcp).

Quem já usa o produto encontra os mesmos botões em **Aplicativos → Equipe Integrada MCP**.

## Testar no Cursor (local)

A pasta em `~/.cursor/plugins/local` **precisa se chamar** `equipe-integrada` (com hífen). O Cursor usa o nome da pasta como título: `equipeintegrada-mcp` vira “Equipeintegrada Mcp”.

Copie o conteúdo do repositório para `~/.cursor/plugins/local/equipe-integrada` e recarregue a janela (`Ctrl+Shift+P` → Reload Window). O selo “Local” é do Cursor; no Marketplace o subtítulo passa a ser o autor (**Equipe Integrada**).

## O que o assistente pode fazer

- Consultar CRM, contatos, atividades, agenda, financeiro e fiscal — só o que a sua permissão já permite.
- Propor criação de atividade ou Kanban. Nada é gravado até você confirmar.
- Não existe escrita autônoma.

## Manutenção deste repositório

Edite só a fonte:

- `plugin.json` — identidade do plugin
- `mcp.json` — URL do MCP (quase nunca muda)
- `skills/*/SKILL.md` — instruções para o modelo
- `catalog/install-links.json` — botões de instalação

Quando um marketplace **aprovar** o listing, preencha o campo `listing` daquele cliente em `catalog/install-links.json` (o app e o README passam a usar essa URL). Veja `catalog/submissions/README.md`.

Depois de editar:

```bash
npm run prepare-release
```

Isso regenera `.claude-plugin/`, `.cursor-plugin/`, `.mcp.json`, `.codex-plugin/` e este README. Não edite os arquivos gerados à mão.

## Avançado

URL do servidor: `https://api.azzoempresarial.com.br/mcp`

Não preencha Client ID nem Client Secret: o servidor registra o cliente sozinho no OAuth.

Claude Code:

```bash
claude mcp add --transport http --scope user equipe-integrada https://api.azzoempresarial.com.br/mcp
```

Cursor (JSON):

```json
{
  "mcpServers": {
    "equipe-integrada": {
      "url": "https://api.azzoempresarial.com.br/mcp"
    }
  }
}
```

## Licença

MIT
