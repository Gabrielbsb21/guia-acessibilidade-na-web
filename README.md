# ♿ Guia Acessibilidade na Web

Aplicação web construída em **Astro** com foco em **Acessibilidade na Web (a11y)**.
Aqui você encontra **artigos**, **exemplos práticos de componentes acessíveis** e ferramentas úteis, como um **verificador de contraste de cores** — tudo organizado para ser didático, rápido e fácil de manter.

---

## ✨ O que tem aqui

- **Artigos de acessibilidade** (conceitos + prática)
- **Exemplos de componentes acessíveis**
  - Botões, links e ícones
  - Formulários e validações
  - Modais e dialogs
  - Accordions / Tabs
  - Menus e navegação
  - Tabelas e listas
- **Verificador de contraste de cores**
  - Avalia contraste (ex.: texto vs fundo)
  - Indica nível aproximado (AA/AAA) e sugestões
- **Boas práticas e checklists**
  - Semântica HTML
  - Navegação por teclado
  - Foco visível e ordem de tabulação
  - ARIA quando necessário (sem “ARIA em tudo”)

> Objetivo: ser um guia **prático**, com exemplos que você consegue copiar, adaptar e reaproveitar em projetos reais.

---

## 🧰 Stack

- **Astro** (site/app)
- **TypeScript**
- **CSS**

Ferramentas recomendadas para validação:
- Lighthouse
- Axe DevTools
- Leitor de tela (NVDA/VoiceOver)

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js (recomendado: versão LTS)
- npm / pnpm / yarn (use o gerenciador do projeto)

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

Acesse:
- http://localhost:4321

### Build
```bash
npm run build
```

### Preview do build
```bash
npm run preview
```

---

## 🗂️ Estrutura sugerida do projeto

> Ajuste conforme sua base atual. A ideia é separar **conteúdo**, **exemplos**, **componentes** e **ferramentas**.

```text
src/
  pages/
    index.astro
    artigos/
      index.astro
      [slug].astro
    componentes/
      index.astro
      [categoria]/
        index.astro
    ferramentas/
      contraste.astro

  content/
    artigos/
      *.mdx
    componentes/
      *.mdx

  components/
    ui/
      Button.astro
      Link.astro
      Badge.astro
    examples/
      ModalExample.astro
      FormExample.astro
      TabsExample.astro
    core/
      Heading.astro
    tools/
      ContrastChecker.astro

  lib/
    a11y/
      focus.ts
      aria.ts
    contrast/
      contrast.ts
      wcag.ts

public/
  icons/
  images/
```

---

## 🎨 Verificador de contraste (Contrast Checker)

A ferramenta de contraste pode permitir:

- Inserir **cor do texto** e **cor do fundo**
- Exibir:
  - **taxa de contraste**
  - aprovação aproximada para **WCAG AA/AAA** (texto normal e texto grande)
- Opcional:
  - sugestão de cor alternativa
  - amostras (preview) com diferentes tamanhos/pesos

Sugestão de rota:
- `/ferramentas/contraste`

---

## ✅ Boas práticas que este projeto prioriza

- HTML semântico por padrão
- Componentes com suporte a teclado (Tab, Shift+Tab, Enter, Space, Esc quando aplicável)
- Foco visível e previsível
- ARIA somente quando necessário e corretamente associado (`label`, `controls`, `describedby`)
- Preferência por padrões nativos (ex.: `<button>`, `<dialog>`, `<details>`) antes de reinventar

---

## 🧪 Como validar acessibilidade

### Checklist rápido
- Navegar **somente por teclado** do início ao fim
- Garantir que:
  - o foco aparece sempre
  - a ordem de tabulação faz sentido
  - não existem “armadilhas” (ficar preso em um componente)
- Testar com leitor de tela (NVDA/VoiceOver)
- Rodar um auditor (Lighthouse/Axe)

> Ferramentas automáticas ajudam, mas **não substituem** testes manuais.

---

## 🧩 Adicionando um novo exemplo de componente

1. Crie um arquivo em `src/components/examples/`
2. Documente em `src/content/componentes/` (MD/MDX) com:
   - objetivo do componente
   - requisitos de acessibilidade
   - como usar
   - “erros comuns”
3. Publique a rota em `src/pages/componentes/...`

---

## 📝 Adicionando um novo artigo

1. Crie um arquivo `.md`/`.mdx` em `src/content/artigos/`
2. Inclua frontmatter com:
   - `title`
   - `description`
   - `date`
   - `tags`
3. O artigo aparece na listagem e rota por `slug`

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

- Abra uma Issue com sugestão/correção
- Envie um PR com:
  - descrição do problema
  - prints/gifs quando fizer sentido
  - checklist de acessibilidade do que foi testado

### Convenção sugerida de commits
- `feat: ...`
- `fix: ...`
- `docs: ...`
- `refactor: ...`
- `test: ...`

---

## 🗺️ Roadmap (ideias)

- [ ] Testes automatizados (unit + e2e) para interações a11y

---

## 📄 Licença

MIT.

---

## ✨ Autor

**Gabriel Teixeira**
Engenheiro de Software — foco em Acessibilidade Web (a11y)

> Acessibilidade não é extra. É requisito.
