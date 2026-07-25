# Task: Adicionar avaliacao de contraste nao textual

## Goal

Ampliar a logica pura de contraste para avaliar o limite nao textual de 3:1 e exibir taxas sem arredondamento
contraditorio.

## Scope

- Ampliar `ContrastEvaluation` com o resultado `nonText.aa`.
- Avaliar contraste nao textual com limite minimo real de 3:1.
- Truncar a formatacao visivel da taxa em duas casas decimais.
- Adicionar testes de limite e preservar os testes existentes.

## Non-goals

- Nao alterar a interface do verificador.
- Nao alterar a formula de luminancia ou de taxa de contraste.
- Nao adicionar novos formatos de cor.
- Nao criar uma funcao duplicada de calculo para contraste nao textual.
- Nao atualizar pagina ou documentacao publica nesta task.

## Files to create

None.

## Files to modify

- `src/lib/contrast.ts`
- `src/lib/contrast.test.ts`

## Implementation details

- Adicionar ao contrato `ContrastEvaluation`:

```ts
nonText: {
  aa: boolean
}
```

- Fazer `evaluateContrast` retornar `nonText.aa: ratio >= 3`.
- Usar o valor real da taxa para todas as decisoes.
- Fazer `formatContrastRatio` truncar para duas casas com uma operacao equivalente a
  `Math.floor(ratio * 100) / 100` antes de aplicar duas casas decimais.
- Manter os resultados atuais de texto normal e grande inalterados.

## Acceptance criteria

- `evaluateContrast(2.999).nonText.aa` retorna `false`.
- `evaluateContrast(3).nonText.aa` retorna `true`.
- Valores acima de 3 retornam aprovacao nao textual.
- `formatContrastRatio(2.999)` retorna `2.99:1`.
- Taxas inteiras continuam exibidas com duas casas, como `3.00:1` e `21.00:1`.
- Os limites de texto normal e grande continuam iguais.
- Nenhum arquivo de interface ou documentacao publica e alterado nesta task.

## Test cases

- Adicionar casos unitarios abaixo, iguais e acima de 3:1.
- Adicionar caso unitario para truncamento de `2.999`.
- Preservar casos de preto sobre branco, cores identicas, hex curto e valores invalidos.
- Executar:

```bash
npm run lint:check
npm run test
```

## Accessibility checklist

- Confirmar que a regra nao arredonda uma taxa reprovada para uma apresentacao visual aparentemente aprovada.
- Confirmar que os nomes do contrato diferenciam texto e contraste nao textual.
- Nao aplicavel para teclado, foco ou ARIA: esta task nao altera interface.

## Review checklist

- A formula base de contraste nao foi modificada.
- O limite e aplicado ao valor real, nao ao valor formatado.
- Nao foi criado resultado AAA para o criterio 1.4.11.
- Os testes cobrem exatamente o limite de 3:1.
- A implementacao permanece compativel com os consumidores atuais de `ContrastEvaluation`.

## Status

- Status: Concluida
- Data: 2026-07-25
- Validacoes:
  - `npm run lint:check`
  - `npm run test` (10 testes aprovados)
