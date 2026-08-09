# Task: Publicar o site no GitHub Pages

## Goal

Publicar automaticamente o build Astro na URL de projeto do GitHub Pages.

## Scope

- Configurar a URL e o subcaminho de producao do Astro.
- Criar um workflow de deploy acionado por push na `main` ou manualmente.
- Adaptar links internos, imagens publicas, favicon, metadados e breadcrumbs ao subcaminho.
- Adicionar testes unitarios para a transformacao de URLs.

## Non-goals

- Configurar dominio personalizado.
- Manter deploy paralelo na Netlify.
- Alterar conteudo ou design das paginas.
- Adicionar novos testes end-to-end.

## Files to create

- `.github/workflows/deploy-pages.yml`
- `src/lib/url.ts`
- `src/lib/url.test.ts`
- `tasks/008-deploy-to-github-pages.md`

## Files to modify

- `astro.config.mjs`
- `src/components/core/Link.astro`
- `src/components/core/Breadcrumbs/BreadcrumbsItem.astro`
- `src/components/core/Media.astro`
- `src/components/core/SiteMeta.astro`
- `src/components/ui/Logo.astro`
- `src/components/ui/Hero.astro`
- `src/components/ui/PageHeader.astro`
- `src/layouts/DefaultLayout.astro`
- `src/pages/blog.astro`
- `README.md`

## Files to delete

- `netlify.toml`

## Implementation details

- Publicar em `https://gabrielbsb21.github.io/guia-acessibilidade-na-web/`.
- Usar as actions oficiais `configure-pages`, `upload-pages-artifact` e `deploy-pages`.
- Executar o deploy com Node.js 22 e `npm ci`.
- Centralizar a aplicacao e remocao do subcaminho em `src/lib/url.ts`.
- Preservar URLs externas, links de ancora e protocolos especiais.

## Acceptance criteria

- O build gera rotas e assets sob `/guia-acessibilidade-na-web/`.
- Navegacao, breadcrumbs, imagens, fontes, favicon e metadados usam URLs validas no Pages.
- O workflow possui apenas as permissoes necessarias para publicar.
- O deploy e associado ao ambiente `github-pages`.
- Lint, testes e build passam.

## Test cases

- Testar URLs internas com e sem subcaminho.
- Testar preservacao de URL externa, URL de CDN, ancora e `mailto`.
- Testar remocao do subcaminho para breadcrumbs derivados da URL.
- Executar `npm run lint:check`.
- Executar `npm run test`.
- Executar `npm run build`.
- Inspecionar links e assets no HTML e CSS gerados.

## Accessibility checklist

- Preservar nomes e destinos dos links internos.
- Confirmar que breadcrumbs nao incluem o nome tecnico do subcaminho.
- Confirmar que imagens e fontes continuam disponiveis.
- Confirmar que a mudanca nao altera ordem de foco ou semantica.

## Review checklist

- Conferir a URL do proprietario atual do repositorio.
- Conferir permissoes e gatilhos do workflow.
- Conferir que o modo de publicacao do Pages usa GitHub Actions.
- Conferir o site publicado em desktop e mobile apos o merge.

## Status

- [x] Implementada.
- [x] Validada no GitHub Pages.
