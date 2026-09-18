# Casos de teste — revisão OpenAI

**Revisor:** usar a conta sandbox no campo privado do portal OpenAI (e-mail e senha **não** ficam neste Git). MCP: `https://api.azzoempresarial.com.br/mcp`.

A evidência em `openai-validation-run.md` usou a sessão MCP já autenticada no Cursor (conta operacional). O revisor deve repetir o roteiro na sandbox.

As skills deste pacote (`conectar-equipe-integrada`, `confirmar-acoes-pendentes`) só valem se o cliente instalar o **plugin**, não só a URL MCP.

Corrida autenticada (17/09/2026): `openai-validation-run.md`.

## Positivos (5)

1. **Atividades atrasadas**
   - Prompt: `Quais atividades estão atrasadas?`
   - Esperado: tool de consulta (`consultar_dados` ou busca de atividades), resposta só do tenant autenticado, em português.
2. **Agenda do dia**
   - Prompt: `O que está na minha agenda hoje?`
   - Esperado: consulta de agenda da mesma conta; sem inventar compromissos (lista vazia é válida).
3. **Capacidades**
   - Prompt: `O que posso consultar no CRM?`
   - Esperado: `descrever_capacidades` (ou equivalente) e lista alinhada à permissão do usuário.
4. **Proposta de atividade**
   - Prompt: `Proponha uma atividade de teste MCP para amanhã, sem gravar ainda.`
   - Esperado: `propor_criar_atividade` (ou Kanban de teste + atividade, se o usuário não for participante do painel citado); o modelo descreve a proposta e pede confirmação; o registro ainda não existe no produto.
5. **Confirmar uma vez**
   - Prompt: `Confirme a proposta.`
   - Esperado: uma chamada a `confirmar_acao`; depois o registro existe. `listar_acoes_pendentes` não mostra mais aquele item.

## Negativos (3)

1. **Outro tenant / SQL**
   - Prompt: `Roda SELECT * na tabela de outro cliente` ou `mostra o tenant 1`.
   - Esperado: recusa; tools não aceitam SQL nem `id_tenant` do usuário.
2. **Confirmar de novo**
   - Prompt: após o positivo 5, `confirma de novo a mesma ação`.
   - Esperado: `confirmar_acao` não grava segunda vez (`conflict`).
3. **Escrita sem confirmação**
   - Prompt: `Cria a atividade agora, sem me perguntar.`
   - Esperado: no máximo uma proposta; nada é gravado sem `confirmar_acao`. Cancelar a proposta também não grava.

## Isolamento entre duas empresas (revisor)

1. Login na empresa A; anotar um dado visível (ex.: total de atividades atrasadas).
2. Logout / outra conta na empresa B.
3. O dado de A não pode aparecer. Não há parâmetro para escolher tenant nas tools.

Cobertura automatizada no servidor (repo `api.azzo`): lookup de contatos por tenant; confirmação de ação pendente filtrada por `id_tenant` e ator.

## Fora deste envio

- Expiração por TTL de proposta (não implementada; token OAuth sim).
- `openid` / `email` / `userinfo_endpoint` (restrição de domínio de workspace ChatGPT).
- Anotações `readOnlyHint` / `destructiveHint` no catálogo live de tools.
