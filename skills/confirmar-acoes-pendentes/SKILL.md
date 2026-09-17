---
name: confirmar-acoes-pendentes
description: >
  Use when creating or changing Equipe Integrada records through MCP
  (activities, kanbans, custom fields). Mutations are proposals until the
  user confirms. Never treat a proposal as done.
---

# Confirmar ações na Equipe Integrada

Write tools only create a **pending** action. Nothing is saved until the same user confirms.

## Flow

1. Call the `propor_*` tool that matches the request.
2. Show the proposal in plain language (what will be created or changed). Do not dump raw IDs unless the user needs them.
3. Ask them to confirm or cancel.
4. On confirm, call `confirmar_acao` once with that pending action. On cancel, call `cancelar_acao`.
5. Never retry `confirmar_acao` after success. A processed action cannot run again.

## Rules

- There is no autonomous write. If a tool is missing, the user may only have read access — do not pretend you created the record.
- Re-validate with the tools; do not reuse stale IDs from chat history if the proposal expired.
- Use `listar_acoes_pendentes` when they ask what is waiting.
- Stay in the user's language (usually Portuguese).
