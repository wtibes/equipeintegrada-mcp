import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function readJson (relative) {
  return JSON.parse(readFileSync(join(root, relative), 'utf8'))
}

function writeJson (relative, value) {
  const target = join(root, relative)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`)
}

const plugin = readJson('plugin.json')
const mcp = readJson('mcp.json')
const links = readJson('catalog/install-links.json')
const server = mcp.mcpServers['equipe-integrada']
if (!server?.url) {
  throw new Error('mcp.json must declare mcpServers.equipe-integrada.url')
}

writeJson('.claude-plugin/plugin.json', {
  name: plugin.name,
  description: plugin.description,
  version: plugin.version,
  author: plugin.author
})

writeJson('.cursor-plugin/plugin.json', {
  name: plugin.name,
  displayName: 'Equipe Integrada',
  title: 'Equipe Integrada',
  description: plugin.description,
  version: plugin.version,
  author: {
    name: 'Equipe Integrada',
    url: plugin.author?.url
  },
  homepage: plugin.homepage,
  repository: plugin.repository,
  license: plugin.license,
  keywords: plugin.keywords,
  logo: 'assets/logo.png'
})

writeJson('.mcp.json', {
  mcpServers: {
    'equipe-integrada': {
      type: 'http',
      url: server.url
    }
  }
})

writeJson('.codex-plugin/plugin.json', {
  name: plugin.name,
  version: plugin.version,
  description: plugin.description,
  author: plugin.author
})

const clientOrder = ['claude', 'chatgpt', 'cursor', 'codex', 'grok']
const buttons = clientOrder.map((id) => {
  const client = links.clients[id]
  const href = client.listing || client.href
  return `- **${client.label}:** [${client.cta}](${href})`
}).join('\n')

const readme = `# Equipe Integrada — Agent Plugin

Plugin no padrão [Agent Plugins 1.0](https://agent-plugins.org): skills + MCP remoto com OAuth. Um repositório atende Cursor, ChatGPT, Codex, Claude Code e Grok Build. O servidor de dados continua em \`${links.mcpUrl}\`. Código: ${plugin.repository || ''}.

## Instalar (um clique)

Use o assistente em que você já conversa. Depois do botão, faça login na **Equipe Integrada** (mesmo usuário do sistema) e pergunte: *quais atividades estão atrasadas?*

${buttons}

Conta **Team/Enterprise no Claude:** o administrador precisa [adicionar o conector para a empresa](${links.clients.claude.adminHref}).

Quem já usa o produto encontra os mesmos botões em **Aplicativos → Equipe Integrada MCP**.

## Testar no Cursor (local)

A pasta em \`~/.cursor/plugins/local\` **precisa se chamar** \`equipe-integrada\` (com hífen). O Cursor usa o nome da pasta como título: \`equipeintegrada-mcp\` vira “Equipeintegrada Mcp”.

Copie o conteúdo do repositório para \`~/.cursor/plugins/local/equipe-integrada\` e recarregue a janela (\`Ctrl+Shift+P\` → Reload Window). O selo “Local” é do Cursor; no Marketplace o subtítulo passa a ser o autor (**Equipe Integrada**).

## O que o assistente pode fazer

- Consultar CRM, contatos, atividades, agenda, financeiro e fiscal — só o que a sua permissão já permite.
- Propor criação de atividade ou Kanban. Nada é gravado até você confirmar.
- Não existe escrita autônoma.

## Manutenção deste repositório

Edite só a fonte:

- \`plugin.json\` — identidade do plugin
- \`mcp.json\` — URL do MCP (quase nunca muda)
- \`skills/*/SKILL.md\` — instruções para o modelo
- \`catalog/install-links.json\` — botões de instalação

Quando um marketplace **aprovar** o listing, preencha o campo \`listing\` daquele cliente em \`catalog/install-links.json\` (o app e o README passam a usar essa URL). Veja \`catalog/submissions/README.md\`.

Depois de editar:

\`\`\`bash
npm run prepare-release
\`\`\`

Isso regenera \`.claude-plugin/\`, \`.cursor-plugin/\`, \`.mcp.json\`, \`.codex-plugin/\` e este README. Não edite os arquivos gerados à mão.

## Avançado

URL do servidor: \`${links.mcpUrl}\`

Não preencha Client ID nem Client Secret: o servidor registra o cliente sozinho no OAuth.

Claude Code:

\`\`\`bash
claude mcp add --transport http --scope user equipe-integrada ${links.mcpUrl}
\`\`\`

Cursor (JSON):

\`\`\`json
{
  "mcpServers": {
    "equipe-integrada": {
      "url": "${links.mcpUrl}"
    }
  }
}
\`\`\`

## Licença

MIT
`

writeFileSync(join(root, 'README.md'), readme)

const vueCandidates = [
  join(root, '../vue-eq/src/components/aplicativos/apps/mcp-install-links.json'),
  join(process.env.USERPROFILE || '', 'Documents/vue-eq/src/components/aplicativos/apps/mcp-install-links.json')
]
const vueCopy = vueCandidates.find((path) => {
  try {
    writeFileSync(path, `${JSON.stringify(links, null, 2)}\n`)
    return true
  } catch {
    return false
  }
})
if (vueCopy) console.log('Updated vue-eq mcp-install-links.json')
else console.log('vue-eq copy skipped (path not found)')

console.log('Generated shims and README.md')
