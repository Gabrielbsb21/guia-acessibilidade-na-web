# Tech-Spec: Contraste nao textual no verificador

## PRD Relacionado

- PRD: `docs/prd/non-text-contrast-checker.md`
- Status do PRD: Aprovado

## Arquitetura

A mudanca reutilizara o fluxo atual do verificador: duas cores entram pela interface, a logica pura calcula uma unica
taxa e a camada de apresentacao mostra as avaliacoes aplicaveis. Nao sera criado seletor de modo. Resultados de texto e
de elementos nao textuais ficarao visiveis ao mesmo tempo, em grupos distintos, para evitar estado interativo
desnecessario e preservar a consulta atual.

### Logica de dominio

Arquivo: `src/lib/contrast.ts`

- Manter `normalizeHexColor`, `hexToRgb`, `relativeLuminance` e `calculateContrastRatio` sem mudanca de formula.
- Ampliar `ContrastEvaluation` com `nonText.aa`.
- Fazer `evaluateContrast` retornar `nonText.aa: ratio >= 3`, usando o valor real recebido e sem arredondamento.
- Manter os limites existentes:
  - texto normal AA: 4.5:1;
  - texto normal AAA: 7:1;
  - texto grande AA: 3:1;
  - texto grande AAA: 4.5:1.
- Alterar `formatContrastRatio` para truncar, e nao arredondar, em duas casas decimais. Assim, uma taxa real de
  `2.999:1` sera apresentada como `2.99:1` e nao entrara em contradicao com o resultado reprovado.
- Nao adicionar uma funcao separada de calculo para contraste nao textual, pois a formula de taxa e a mesma.

### Interface

Arquivo: `src/components/ui/ContrastChecker.astro`

- Tornar os rotulos dos campos aplicaveis aos dois contextos:
  - `Cor avaliada`;
  - `Cor adjacente`.
- Usar os textos de ajuda para explicar que, em texto, essas cores correspondem ao texto e ao fundo; em elementos nao
  textuais, correspondem a informacao visual necessaria e a cor realmente adjacente.
- Preservar a previa de texto normal e texto grande.
- Adicionar uma demonstracao nao interativa de elemento nao textual usando as mesmas cores. A demonstracao deve ser
  acompanhada de texto que a identifique como exemplo visual, e qualquer forma puramente decorativa deve usar
  `aria-hidden="true"`.
- Separar os resultados no mesmo painel:
  - grupo `Texto`, com os quatro resultados AA e AAA existentes;
  - grupo `Elementos nao textuais`, com um resultado `WCAG 1.4.11 - AA`, limite de 3:1.
- Adicionar o novo elemento ao mapa `resultCards` e atualizar seu estado em `renderValidState`.
- Reutilizar `updateResultCard`, mantendo status textual `Aprovado` ou `Nao atinge 3:1` e o atributo `data-status`.
- Manter o ultimo resultado valido quando uma entrada for invalida.
- Atualizar a nota de limites para diferenciar:
  - contraste contra cores adjacentes no estado visivel;
  - mudanca entre estados com e sem foco;
  - area e espessura do indicador.
- Nao declarar que a demonstracao representa ou valida automaticamente o componente real do usuario.

### Pagina e documentacao

Arquivos:

- `src/pages/ferramentas/contraste.astro`
- `docs/ACCESSIBILITY_TOOLS.md`

Alteracoes:

- Atualizar titulo descritivo, metadata e introducao para mencionar texto e elementos nao textuais.
- Registrar o suporte ao criterio 1.4.11 e seus limites na documentacao operacional.
- Manter explicita a ausencia de auditoria automatica e de garantia de conformidade.

## Alteracoes em Banco de Dados

Nao aplicavel: esta mudanca nao altera persistencia.

## Novos Endpoints/APIs

Nao aplicavel: esta mudanca nao cria nem altera endpoints. A rota existente `/ferramentas/contraste` sera preservada.

## Fluxo de Dados

1. A pessoa informa a cor avaliada e a cor adjacente por campo textual ou seletor de cor.
2. `normalizeHexColor` valida e normaliza os valores hexadecimais.
3. Se uma entrada for invalida, a interface associa uma mensagem ao campo e preserva a ultima visualizacao valida.
4. Se ambas forem validas, `calculateContrastRatio` calcula uma unica taxa sem arredondamento.
5. `evaluateContrast` usa a taxa real para avaliar texto normal, texto grande e contraste nao textual.
6. `formatContrastRatio` trunca a exibicao para duas casas decimais.
7. A interface atualiza as cores das demonstracoes, a taxa visivel e cada status textual.

## Impactos em Producao

- A rota e os campos existentes permanecem disponiveis, mas seus rotulos passarao a ser genericos para atender texto e
  elementos nao textuais.
- A interface ganhara uma demonstracao e um resultado, aumentando a altura do painel sem mudar sua estrutura principal.
- O contrato TypeScript de `ContrastEvaluation` sera ampliado. Os consumidores atuais acessam propriedades nomeadas e
  nao devem sofrer regressao.
- A exibicao de taxas deixara de arredondar para cima e passara a truncar. Isso pode mudar a ultima casa decimal de
  alguns resultados, preservando o calculo e evitando aparencia de aprovacao no limite.
- O script continuara executando no cliente e nao adicionara dependencia, requisicao de rede ou persistencia.
- O principal risco de produto e a interpretacao de `3:1` fora do contexto do criterio 1.4.11; textos de ajuda e limites
  devem acompanhar o novo resultado.

## Estrategia de Rollback

- Reverter em conjunto as alteracoes de `ContrastChecker.astro`, `contrast.ts`, `contrast.test.ts`, pagina e
  documentacao.
- Como nao ha persistencia, API ou migracao, o rollback nao exige conversao de dados.
- Se apenas a demonstracao visual apresentar problema, o resultado nao textual ainda nao deve permanecer publicado
  isoladamente sem os textos de contexto previstos no PRD.

## Plano de Testes

### Testes automatizados

Arquivo: `src/lib/contrast.test.ts`

- Confirmar que `evaluateContrast(2.999).nonText.aa` retorna `false`.
- Confirmar que `evaluateContrast(3).nonText.aa` retorna `true`.
- Confirmar que um valor acima de 3 retorna `true`.
- Confirmar que os limites existentes de texto normal e grande permanecem inalterados.
- Confirmar que `formatContrastRatio(2.999)` retorna `2.99:1`.
- Preservar os testes atuais de normalizacao e calculo.

Nao sera adicionada dependencia ou nova infraestrutura de teste end-to-end nesta entrega. O comportamento do componente
sera coberto por logica unitaria e revisao manual direcionada.

### Validacoes manuais

- Informar combinacoes abaixo, iguais e acima de 3:1 e comparar taxa e status.
- Alterar cores pelos campos textuais e pelos seletores de cor.
- Informar valores invalidos e confirmar mensagens associadas e preservacao do ultimo resultado valido.
- Conferir os dois grupos de resultado em larguras mobile e desktop.
- Conferir modo claro e modo escuro.

### Validacoes de acessibilidade

- Percorrer campos e seletores por teclado, confirmando ordem previsivel e foco visivel.
- Confirmar que resultado aprovado ou reprovado possui texto e nao depende apenas da cor da borda.
- Confirmar associacao de ajuda e erro por `aria-describedby`.
- Confirmar que a demonstracao visual nao introduz nome acessivel enganoso.
- Confirmar hierarquia de headings e ordem de leitura entre entrada, previa, resultados e limites.
- Conferir contraste dos novos textos, bordas e estados nos dois temas.
- Confirmar que atualizacoes anunciadas nao se tornam excessivamente repetitivas durante digitacao.

### Comandos obrigatorios

```bash
npm run lint:check
npm run test
npm run build
```

## Status de Aprovacao

- Status: Aprovado
- Aprovado por: Gabriel Teixeira
- Data: 2026-07-25
