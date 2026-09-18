# ChatGPT no Windows — plugin local (skills)

A URL MCP sozinha **não** instala as skills. No app do ChatGPT:

## Só o servidor (OAuth)

Settings → **MCP servers** → Add server → Streamable HTTP → `https://api.azzoempresarial.com.br/mcp` → Authenticate.

## Pacote com skills (marketplace pessoal)

1. Clone https://github.com/wtibes/equipeintegrada-mcp
2. Crie `%USERPROFILE%\.agents\plugins\marketplace.json`:

```json
{
  "name": "equipe-integrada-dev",
  "interface": {
    "displayName": "Equipe Integrada (dev)"
  },
  "plugins": [
    {
      "name": "equipe-integrada",
      "source": {
        "source": "local",
        "path": "./equipe-integrada"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Productivity"
    }
  ]
}
```

3. Copie o clone para `%USERPROFILE%\.agents\plugins\equipe-integrada` (mesmo nível do `marketplace.json`; o `path` é relativo à pasta do marketplace).
4. Reinicie o ChatGPT → Plugins Directory → fonte local → instale Equipe Integrada → Authenticate.

## Diretório público

Não use marketplace local no envio. Portal: [submissão OpenAI](https://developers.openai.com/plugins/deploy/submission), tipo **With MCP**, URL universal `https://api.azzoempresarial.com.br/mcp`. Cole o texto de `listing-copy.md` e os casos de `openai-test-cases.md`.
