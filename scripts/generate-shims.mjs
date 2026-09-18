import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
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

function argValue (name) {
  const prefix = `${name}=`
  const exact = process.argv.includes(name)
  const withValue = process.argv.find((item) => item.startsWith(prefix))
  if (withValue) return withValue.slice(prefix.length)
  if (exact) return ''
  return null
}

const plugin = readJson('plugin.json')
const mcp = readJson('mcp.json')
const links = readJson('catalog/install-links.json')
const server = mcp.mcpServers['equipe-integrada']
if (!server?.url) {
  throw new Error('mcp.json must declare mcpServers.equipe-integrada.url')
}

const openaiInterface = plugin.extensions?.['com.openai']?.interface
if (!openaiInterface?.websiteURL || !openaiInterface?.privacyPolicyURL || !openaiInterface?.termsOfServiceURL) {
  throw new Error('plugin.json extensions.com.openai.interface needs website, privacy and terms URLs')
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
  author: plugin.author,
  homepage: plugin.homepage,
  repository: plugin.repository,
  license: plugin.license,
  keywords: plugin.keywords,
  logo: 'assets/logo.png',
  interface: openaiInterface
})

const clientOrder = ['claude', 'chatgpt', 'cursor', 'codex', 'grok']
function clientLine (id) {
  const client = links.clients[id]
  const href = client.listing || client.href
  const viaCatalog = Boolean(client.listing)
  const kind = viaCatalog ? 'catálogo' : 'conexão'
  return `- **${client.label}** (${kind}): [${client.cta}](${href})`
}
const buttons = clientOrder.map(clientLine).join('\n')

const readme = `# Equipe Integrada — Agent Plugin

Plugin no padrão [Agent Plugins 1.0](https://agent-plugins.org): skills + MCP remoto com OAuth. O servidor de dados continua em \`${links.mcpUrl}\`. Código: ${plugin.repository || ''}.

Há três camadas distintas:

1. **Conexão MCP** — login OAuth no servidor. Não instala as skills deste repositório.
2. **Pacote (skills + manifesto)** — esta pasta: Cursor local, marketplace pessoal do ChatGPT, ou Git.
3. **Catálogo aprovado** — só depois que \`listing\` em \`catalog/install-links.json\` deixar de ser \`null\`.

Depois de autorizar, pergunte: *quais atividades estão atrasadas?*

## Conectar o MCP (enquanto o catálogo não existir)

${buttons}

### Cursor

O deeplink acima só registra o servidor HTTP. Para as **duas skills**, copie este repositório para \`~/.cursor/plugins/local/equipe-integrada\` (o nome da pasta vira o título) e recarregue a janela (\`Ctrl+Shift+P\` → Reload Window). Authenticate no MCP. O selo “Local” some no Marketplace oficial.

### ChatGPT (app no Windows) e Codex

1. Settings → **MCP servers** → Add server → Streamable HTTP → \`${links.mcpUrl}\` → Authenticate.
2. Para instalar **skills**, adicione um marketplace pessoal (\`%USERPROFILE%\\.agents\\plugins\\marketplace.json\`) apontando para o clone deste repo. Modelo em \`catalog/submissions/chatgpt-desktop.md\`.
3. Envio ao diretório público: portal OpenAI, tipo **With MCP**. Material em \`catalog/submissions/\`.

Conta **Team/Enterprise no Claude:** o administrador precisa [adicionar o conector para a empresa](${links.clients.claude.adminHref}).

Quem já usa o produto encontra os botões em **Aplicativos → Equipe Integrada MCP**.

## O que o assistente pode fazer

- Consultar CRM, contatos, atividades, agenda, financeiro e fiscal — só o que a sua permissão já permite.
- Propor criação de atividade ou Kanban. Nada é gravado até você confirmar.
- Não existe escrita autônoma.

## Manutenção deste repositório

Edite só a fonte:

- \`plugin.json\` — identidade + \`extensions.com.openai\` (listing ChatGPT/Codex)
- \`mcp.json\` — URL do MCP (quase nunca muda)
- \`skills/*/SKILL.md\` — instruções para o modelo
- \`catalog/install-links.json\` — botões de instalação

Quando um marketplace **aprovar** o listing, preencha \`clients.<id>.listing\` e rode \`npm run prepare-release\`. O manifesto Cursor (\`.cursor-plugin/plugin.json\`) continua gerado à parte e não usa \`extensions.com.openai\`.

\`\`\`bash
npm run prepare-release
\`\`\`

Isso regenera os shims e este README. **Não** copia arquivos para o vue-eq. Para atualizar o app:

\`\`\`bash
npm run sync-vue
\`\`\`

## Avançado

URL do servidor: \`${links.mcpUrl}\`

Não preencha Client ID nem Client Secret: o servidor registra o cliente sozinho no OAuth.

Claude Code:

\`\`\`bash
claude mcp add --transport http --scope user equipe-integrada ${links.mcpUrl}
\`\`\`

Cursor (\`mcp.json\` do usuário — só o servidor, sem skills):

\`\`\`json
{
  "mcpServers": {
    "equipe-integrada": {
      "url": "${links.mcpUrl}"
    }
  }
}
\`\`\`

Privacidade: ${openaiInterface.privacyPolicyURL}  
Termos: ${openaiInterface.termsOfServiceURL}  
Suporte: ${openaiInterface.supportURL}

## Licença

MIT
`

writeFileSync(join(root, 'README.md'), readme)

const syncVue = argValue('--sync-vue')
if (syncVue !== null) {
  const vueCandidates = syncVue
    ? [syncVue]
    : [
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
  if (!vueCopy) {
    throw new Error('sync-vue: arquivo de destino não encontrado. Passe --sync-vue=CAMINHO')
  }
  console.log('Updated', vueCopy)
}

console.log('Generated shims and README.md')
