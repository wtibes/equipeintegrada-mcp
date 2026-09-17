import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const errors = []

function fail (message) {
  errors.push(message)
}

function readJson (relative) {
  const path = join(root, relative)
  if (!existsSync(path)) {
    fail(`missing ${relative}`)
    return null
  }
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch (error) {
    fail(`${relative} is not valid JSON`)
    return null
  }
}

const plugin = readJson('plugin.json')
if (plugin) {
  if (plugin.$schema !== 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json') {
    fail('plugin.json $schema must be Agent Plugins 1.0.0')
  }
  const name = plugin.name || ''
  if (!/^[a-z0-9]([a-z0-9.-]{0,62}[a-z0-9])?$/.test(name) || name.includes('--') || name.includes('..')) {
    fail('plugin.json name must be lowercase kebab-case per Agent Plugins')
  }
  if (!plugin.description || !plugin.version) fail('plugin.json needs description and version')
}

const mcp = readJson('mcp.json')
if (mcp) {
  const keys = Object.keys(mcp).sort().join(',')
  if (keys !== '$schema,mcpServers') fail('mcp.json may only contain $schema and mcpServers')
  if (mcp.$schema !== 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json') {
    fail('mcp.json $schema must be Agent Plugins MCP 1.0.0')
  }
  const server = mcp.mcpServers?.['equipe-integrada']
  if (!server || server.type !== 'streamable-http') fail('mcp server must be streamable-http')
  if (server.url !== 'https://api.azzoempresarial.com.br/mcp') {
    fail('mcp url must stay the stable production endpoint')
  }
  if (server.headers) fail('do not put secrets or headers in mcp.json')
}

const links = readJson('catalog/install-links.json')
if (links) {
  if (links.mcpUrl !== mcp?.mcpServers?.['equipe-integrada']?.url) {
    fail('install-links.mcpUrl must match mcp.json')
  }
  for (const id of ['claude', 'chatgpt', 'cursor', 'codex', 'grok']) {
    const client = links.clients?.[id]
    if (!client?.href || !client.cta || !client.label) fail(`install-links.clients.${id} incomplete`)
  }
  if (!links.clients.claude.href.includes('modal=add-custom-connector')) {
    fail('claude href must prefill the custom connector dialog until listing exists')
  }
}

const skillsDir = join(root, 'skills')
const skillNames = existsSync(skillsDir)
  ? readdirSync(skillsDir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  : []
if (skillNames.length < 2) fail('expected at least two skills')
for (const name of skillNames) {
  const skillPath = join(skillsDir, name, 'SKILL.md')
  if (!existsSync(skillPath)) {
    fail(`skills/${name}/SKILL.md missing`)
    continue
  }
  const body = readFileSync(skillPath, 'utf8')
  if (!body.startsWith('---')) fail(`skills/${name}/SKILL.md needs YAML frontmatter`)
  if (!body.includes(`name: ${name}`)) fail(`skills/${name} frontmatter name must match folder`)
  if (!/description:\s*>?.+\S/s.test(body)) fail(`skills/${name} needs description`)
}

const generated = ['.claude-plugin/plugin.json', '.mcp.json', '.codex-plugin/plugin.json']
for (const relative of generated) {
  if (!existsSync(join(root, relative))) fail(`run npm run generate — missing ${relative}`)
}

const claudeMcp = readJson('.mcp.json')
if (claudeMcp && claudeMcp.mcpServers?.['equipe-integrada']?.url !== mcp?.mcpServers?.['equipe-integrada']?.url) {
  fail('.mcp.json url drifted from mcp.json — run npm run generate')
}

const vueCopy = [
  join(root, '../vue-eq/src/components/aplicativos/apps/mcp-install-links.json'),
  join(process.env.USERPROFILE || '', 'Documents/vue-eq/src/components/aplicativos/apps/mcp-install-links.json')
].find((path) => existsSync(path))
if (vueCopy) {
  const vueLinks = JSON.parse(readFileSync(vueCopy, 'utf8'))
  if (JSON.stringify(vueLinks) !== JSON.stringify(links)) {
    fail('vue-eq mcp-install-links.json is out of sync — run npm run generate')
  }
}

if (errors.length) {
  console.error(errors.map((item) => `x ${item}`).join('\n'))
  process.exit(1)
}

console.log('Plugin package is valid')
