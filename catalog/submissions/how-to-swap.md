# Trocar botões para o listing permanente

O app e o README já usam `client.listing || client.href`.

Enquanto `listing` for `null`, o clique vai para o conector custom (Claude pré-preenchido, Cursor deeplink, etc.).

Quando o marketplace aprovar:

```json
"claude": {
  "href": "https://claude.ai/customize/connectors?modal=add-custom-connector&...",
  "listing": "https://claude.ai/directory/connectors/equipe-integrada"
}
```

Depois `npm run prepare-release` e copiar o JSON para o vue-eq. Não é preciso mudar o Vue.
