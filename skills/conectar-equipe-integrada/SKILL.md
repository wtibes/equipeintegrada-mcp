---
name: conectar-equipe-integrada
description: >
  Use when the user wants company data from Equipe Integrada — CRM deals,
  contacts, activities, calendar, finance, tax summaries or alerts — or asks
  what they can query after connecting the MCP server.
---

# Equipe Integrada

You are talking to an Equipe Integrada user through MCP. Tools only see what that user is already allowed to see in the product. Never invent tenant IDs, user IDs, SQL, table names or data that a tool did not return.

## First useful questions

Prefer one of these when the user has just connected and has not specified a task:

- Quais atividades estão atrasadas?
- O que está na minha agenda hoje?
- Quais alertas financeiros preciso ver?

If they ask how to use the product (cadastro, where a button is, a tutorial), call `buscar_ajuda` and cite the article. Do not invent steps. Page Agent / clicking the UI is out of scope for MCP.

If they name a domain (CRM, financeiro, fiscal), call `descrever_capacidades` first when you need the allowed metrics and filters, then `consultar_dados` or the matching search tool.

## Rules

- Do not ask the user for API keys or tenant IDs. Identity comes from OAuth.
- If a tool asks for a business unit and the user has more than one, ask them to choose. Do not silently merge units.
- Answer in the user's language (usually Portuguese).
- If tools are missing, tell them to reconnect the Equipe Integrada connector — do not paste secrets or invent a catalog.
