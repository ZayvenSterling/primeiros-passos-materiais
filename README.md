# Primeiros Passos — página de vendas

Página de vendas estática, responsiva e sem dependências para os materiais:

- Destrava Leitura — R$ 27,99
- Movimento em Foco — R$ 27,99
- Combo Primeiros Passos — R$ 39,90

## Configurar os checkouts

Abra `js/checkout-config.js` e substitua os três valores por URLs completas da Cakto ou Kiwify:

```js
window.CHECKOUT_URLS = Object.freeze({
  destrava: "https://seu-checkout-aqui",
  movimento: "https://seu-checkout-aqui",
  combo: "https://seu-checkout-aqui",
});
```

Todos os CTAs são atualizados automaticamente. Enquanto os links começam com `#`, os botões exibem um aviso de checkout em configuração.

## Rodar localmente

Qualquer servidor de arquivos estáticos funciona. Exemplo:

```bash
python -m http.server 3000
```

Depois acesse `http://localhost:3000`.

## Publicação

O projeto não exige build. Na Vercel, use o preset `Other` e mantenha o diretório de saída como `.`.
