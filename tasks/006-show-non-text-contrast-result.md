# Task: Exibir contraste nao textual no verificador

## Goal

Apresentar o resultado de contraste nao textual no verificador existente com contexto, demonstracao e limites
acessiveis.

## Dependency

- `tasks/005-add-non-text-contrast-evaluation.md` concluida.

## Scope

- Tornar os campos de cor compreensiveis para texto e elementos nao textuais.
- Adicionar uma demonstracao visual nao interativa usando as cores informadas.
- Separar resultados de texto e elementos nao textuais no mesmo painel.
- Exibir o resultado WCAG 1.4.11, nivel AA, com limite de 3:1.
- Explicar os limites da verificacao de componentes, objetos graficos e foco.
- Atualizar metadata, introducao da pagina e documentacao operacional.
- Validar a experiencia completa em modo claro, modo escuro, mobile e desktop.

## Non-goals

- Nao criar seletor ou alternancia entre modos de avaliacao.
- Nao alterar novamente a logica de calculo ou seus limites.
- Nao avaliar automaticamente HTML, CSS, SVG, imagens ou paginas externas.
- Nao validar integralmente o criterio 2.4.13 Aparencia do Foco.
- Nao adicionar dependencia, persistencia, API ou historico de resultados.
- Nao declarar conformidade completa com WCAG.

## Files to create

None.

## Files to modify

- `src/components/ui/ContrastChecker.astro`
- `src/pages/ferramentas/contraste.astro`
- `docs/ACCESSIBILITY_TOOLS.md`

## Implementation details

- Alterar os rotulos principais para `Cor avaliada` e `Cor adjacente`.
- Explicar nos textos de ajuda como as duas cores se aplicam a texto, bordas, icones, indicadores e fundos adjacentes.
- Preservar a previa atual de texto normal e grande.
- Adicionar uma demonstracao nao interativa de elemento nao textual:
  - usar a cor avaliada no indicador visual;
  - usar a cor adjacente no fundo;
  - identificar o bloco como demonstracao, sem afirmar que representa o caso real;
  - ocultar de tecnologias assistivas formas que forem puramente decorativas.
- No painel de resultados, criar grupos visiveis `Texto` e `Elementos nao textuais`.
- Manter os quatro cards atuais no grupo de texto.
- Adicionar um card `WCAG 1.4.11 - AA`, usando `evaluation.nonText.aa`.
- Reutilizar `updateResultCard` e apresentar estado textual `Aprovado - atinge 3:1` ou `Nao atinge 3:1`.
- Manter o ultimo resultado valido quando houver entrada invalida.
- Explicar que foco tambem depende de contraste adjacente, mudanca entre estados, area e espessura.
- Atualizar pagina e `docs/ACCESSIBILITY_TOOLS.md` para refletir exatamente o novo suporte e seus limites.

## Acceptance criteria

- A rota `/ferramentas/contraste` mostra resultados de texto e contraste nao textual ao mesmo tempo.
- O resultado nao textual usa o criterio 1.4.11, nivel AA, sem resultado AAA.
- A demonstracao usa as cores validas atuais e e apresentada como exemplo, nao como auditoria automatica.
- Entradas invalidas continuam associadas aos campos e preservam o ultimo resultado valido.
- A avaliacao de texto normal e grande permanece disponivel.
- Estados aprovados e reprovados possuem texto e nao dependem apenas de cor.
- O conteudo diferencia a verificacao parcial de foco da validacao integral do criterio 2.4.13.
- Metadata, introducao e documentacao nao prometem garantia de conformidade.
- O layout permanece utilizavel em mobile e desktop, nos modos claro e escuro.

## Test cases

- Executar:

```bash
npm run lint:check
npm run test
npm run build
```

- Testar uma combinacao abaixo de 3:1 e confirmar reprovacao nao textual.
- Testar uma combinacao de 3:1 e confirmar aprovacao nao textual.
- Testar uma combinacao acima de 3:1 e confirmar aprovacao nao textual.
- Alterar cores pelos campos textuais e pelos seletores de cor.
- Informar cor invalida e confirmar erro associado e preservacao do resultado anterior.
- Conferir a rota em largura mobile e desktop.
- Conferir a rota em modo claro e modo escuro.

## Accessibility checklist

- Campos mantem `label`, ajuda e erro associados.
- Ordem de tabulacao permanece previsivel.
- Todos os controles mantem foco visivel.
- Resultado e anunciado sem repeticao excessiva durante digitacao.
- Aprovacao e reprovacao possuem texto explicito.
- Formas decorativas usam `aria-hidden="true"`.
- Headings mantem ordem coerente.
- Novos textos, bordas e estados possuem contraste adequado nos dois temas.
- A demonstracao nao recebe nome acessivel que sugira validacao do componente real.

## Review checklist

- A interface nao criou modo ou estado interativo fora da Tech-Spec.
- O resultado nao textual consome a regra entregue pela task 005.
- A ferramenta nao apresenta AAA para contraste nao textual.
- Os textos citam cores adjacentes e informacao visual necessaria.
- As limitacoes de foco estao visiveis e tecnicamente corretas.
- Nenhuma dependencia foi adicionada.
- A documentacao reflete o comportamento publicado.

## Status

- Status: Pendente
