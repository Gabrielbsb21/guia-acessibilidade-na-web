# Guia Acessibilidade na Web

Projeto em **Astro** com foco em **acessibilidade aplicada**.

O objetivo deste repositório é ser uma referência prática para:

- estudar componentes acessíveis
- revisar decisões de semântica, teclado, foco e ARIA
- validar interfaces com checklists simples
- auditar código gerado com ajuda de IA antes de publicar

## Site publicado

O guia está disponível em [gabrielbsb21.github.io/guia-acessibilidade-na-web](https://gabrielbsb21.github.io/guia-acessibilidade-na-web/).

O deploy para o GitHub Pages é executado automaticamente após mudanças integradas à branch `main`.

## O que existe hoje

- landing page com posicionamento do projeto
- página de componentes acessíveis com exemplos práticos
- blog com artigos editoriais conectados ao tema
- verificador de contraste com lógica testada
- checklist de revisão a11y para apoio manual
- declaração de acessibilidade do próprio site

## O que este projeto não tenta ser

- uma cópia resumida da WCAG
- uma coleção de snippets sem contexto
- uma vitrine com promessas de funcionalidades ainda não entregues

## Como rodar

Pré-requisitos:

- Node.js LTS
- npm

Instalação:

```bash
npm install
```

Desenvolvimento:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Verificações:

```bash
npm run lint:check
npm run test
```

## Estrutura atual

```text
src/
  components/
  content/
    blog/
  layouts/
  pages/
    index.astro
    components.astro
    blog.astro
    blog/
      [slug].astro
    ferramentas/
      contraste.astro
      checklist-a11y.astro
    accessibility-statement.astro
  lib/
    contrast.ts
  content.config.ts
```

## Direção do projeto

As prioridades atuais estão no arquivo [ROADMAP.md](/Users/gabrielteixeira/Github/blueprint/guia-acessibilidade-na-web/ROADMAP.md:1).

## Contribuição

Contribuições são bem-vindas.

- abra uma issue com problema ou sugestão
- proponha correções com contexto de acessibilidade
- inclua o que foi validado manualmente e o que foi testado por ferramenta

Convenções sugeridas:

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `refactor: ...`
- `test: ...`
