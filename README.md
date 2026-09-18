# Equipe Integrada — Agent Plugin

Plugin no padrão [Agent Plugins 1.0](https://agent-plugins.org): skills + MCP remoto com OAuth. O servidor de dados continua em `https://api.azzoempresarial.com.br/mcp`. Código: https://github.com/wtibes/equipeintegrada-mcp.

Há três camadas distintas:

1. **Conexão MCP** — login OAuth no servidor. Não instala as skills deste repositório.
2. **Pacote (skills + manifesto)** — esta pasta: Cursor local, marketplace pessoal do ChatGPT, ou Git.
3. **Catálogo aprovado** — só depois que `listing` em `catalog/install-links.json` deixar de ser `null`.

Depois de autorizar, pergunte: *quais atividades estão atrasadas?*

## Conectar o MCP (enquanto o catálogo não existir)

- **Claude** (conexão): [Conectar no Claude](https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=Equipe%20Integrada&connectorUrl=https%3A%2F%2Fapi.azzoempresarial.com.br%2Fmcp)
- **ChatGPT** (conexão): [Abrir o ChatGPT](https://chatgpt.com/)
- **Cursor** (conexão): [Adicionar ao Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=equipe-integrada&config=eyJ1cmwiOiJodHRwczovL2FwaS5henpvZW1wcmVzYXJpYWwuY29tLmJyL21jcCJ9)
- **Codex** (conexão): [Abrir o Codex](https://chatgpt.com/codex)
- **Grok** (conexão): [Abrir conectores do Grok](https://grok.com/connectors)

### Cursor

O deeplink acima só registra o servidor HTTP. Para as **duas skills**, copie este repositório para `~/.cursor/plugins/local/equipe-integrada` (o nome da pasta vira o título) e recarregue a janela (`Ctrl+Shift+P` → Reload Window). Authenticate no MCP. O selo “Local” some no Marketplace oficial.

### ChatGPT (app no Windows) e Codex

1. Settings → **MCP servers** → Add server → Streamable HTTP → `https://api.azzoempresarial.com.br/mcp` → Authenticate.
2. Para instalar **skills**, adicione um marketplace pessoal (`%USERPROFILE%\.agents\plugins\marketplace.json`) apontando para o clone deste repo. Modelo em `catalog/submissions/chatgpt-desktop.md`.
3. Envio ao diretório público: portal OpenAI, tipo **With MCP**. Material em `catalog/submissions/`.

Conta **Team/Enterprise no Claude:** o administrador precisa [adicionar o conector para a empresa](https://claude.ai/admin-settings/connectors?modal=add-custom-connector&connectorName=Equipe%20Integrada&connectorUrl=https%3A%2F%2Fapi.azzoempresarial.com.br%2Fmcp).

Quem já usa o produto encontra os botões em **Aplicativos → Equipe Integrada MCP**.

## O que o assistente pode fazer

- Consultar CRM, contatos, atividades, agenda, financeiro e fiscal — só o que a sua permissão já permite.
- Propor criação de atividade ou Kanban. Nada é gravado até você confirmar.
- Não existe escrita autônoma.

## Manutenção deste repositório

Edite só a fonte:

- `plugin.json` — identidade + `extensions.com.openai` (listing ChatGPT/Codex)
- `mcp.json` — URL do MCP (quase nunca muda)
- `skills/*/SKILL.md` — instruções para o modelo
- `catalog/install-links.json` — botões de instalação

Quando um marketplace **aprovar** o listing, preencha `clients.<id>.listing` e rode `npm run prepare-release`. O manifesto Cursor (`.cursor-plugin/plugin.json`) continua gerado à parte e não usa `extensions.com.openai`.

```bash
npm run prepare-release
```

Isso regenera os shims e este README. **Não** copia arquivos para o vue-eq. Para atualizar o app:

```bash
npm run sync-vue
```

## Avançado

URL do servidor: `https://api.azzoempresarial.com.br/mcp`

Não preencha Client ID nem Client Secret: o servidor registra o cliente sozinho no OAuth.

Claude Code:

```bash
claude mcp add --transport http --scope user equipe-integrada https://api.azzoempresarial.com.br/mcp
```

Cursor (`mcp.json` do usuário — só o servidor, sem skills):

```json
{
  "mcpServers": {
    "equipe-integrada": {
      "url": "https://api.azzoempresarial.com.br/mcp"
    }
  }
}
```

Privacidade: https://equipeintegrada.com/privacidade/  
Termos: https://equipeintegrada.com/termos/  
Suporte: https://equipeintegrada.com

## Licença

MIT
