# Accessibility tools

Este documento registra o estado atual das ferramentas de acessibilidade existentes no projeto.

## Verificador de contraste

Rota: `/ferramentas/contraste`

Componente: `src/components/ui/ContrastChecker.astro`

Logica central: `src/lib/contrast.ts`

Testes: `src/lib/contrast.test.ts`

Responsabilidades:

- Receber uma cor avaliada e uma cor adjacente em hexadecimal.
- Normalizar valores `#RGB` e `#RRGGBB`.
- Calcular a taxa de contraste entre as duas cores.
- Exibir resultados WCAG AA e AAA para texto normal e texto grande.
- Exibir resultado WCAG 1.4.11, nivel AA, para informacao visual necessaria em componentes de interface e objetos
  graficos.
- Demonstrar como a mesma combinacao aparece em texto e em um elemento nao textual.

Limites:

- A ferramenta mede apenas contraste de cor.
- A pessoa precisa identificar se a informacao visual e necessaria e comparar cores realmente adjacentes.
- O resultado nao avalia automaticamente componentes, estados, imagens, gradientes, transparencias ou antialiasing.
- Para indicadores de foco, o resultado cobre apenas contraste com a cor adjacente. Ele nao valida mudanca entre
  estados, area ou espessura exigidas por outros criterios.
- Um resultado aprovado nao garante que a interface seja acessivel.
- A ferramenta nao valida semantica, foco, teclado, conteudo, zoom, leitor de tela nem fluxo real da tarefa.

Validacoes esperadas:

- `npm run test` para cobrir a logica de contraste.
- Revisao manual dos campos, mensagens de erro, foco e atualizacao visual da ferramenta.
- Conferir os resultados abaixo, iguais e acima de 3:1.
- Conferir as demonstracoes e os resultados em modo claro, modo escuro, mobile e desktop.
- Conferir se mensagens de erro permanecem associadas aos campos via `aria-describedby`.

## Checklist de revisao a11y

Rota: `/ferramentas/checklist-a11y`

Componente: `src/components/ui/A11yChecklist.astro`

Responsabilidades:

- Apoiar revisao manual antes de publicar interfaces.
- Organizar verificacoes de semantica, teclado, foco, formularios, ARIA, conteudo, midia e contraste.
- Comunicar progresso da revisao sem prometer auditoria automatica.
- Reforcar que interfaces geradas com ajuda de IA ainda precisam de validacao humana.

Limites:

- O checklist nao substitui teste com teclado, leitor de tela, zoom, validacao automatizada ou avaliacao com pessoas.
- Marcar todos os itens nao significa conformidade plena com WCAG.
- A ferramenta nao inspeciona codigo nem detecta falhas automaticamente.

Validacoes esperadas:

- Navegar por todos os checkboxes e pelo botao de limpar usando teclado.
- Conferir foco visivel em controles.
- Confirmar que o resumo e o `progress` atualizam conforme itens sao marcados.
- Confirmar que o texto da pagina explicita os limites da ferramenta.

## Criterio para novas ferramentas

Novas ferramentas devem nascer de spec pequena quando alterarem comportamento ou criarem promessa publica relevante.

Toda ferramenta deve:

- declarar o que valida;
- declarar o que nao valida;
- evitar linguagem de garantia completa de acessibilidade;
- usar HTML semantico antes de ARIA;
- manter logica pura em `src/lib` quando houver transformacao testavel;
- incluir testes quando houver regra, calculo ou estado interativo relevante.
