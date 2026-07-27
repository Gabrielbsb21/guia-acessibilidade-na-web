# PRD: Contraste nao textual no verificador

## Objetivo

Ampliar o verificador de contraste para avaliar informacao visual necessaria em componentes de interface e objetos
graficos, preservando a avaliacao existente de texto e comunicando com clareza os limites do resultado.

## Contexto

O verificador atual recebe duas cores, calcula a taxa de contraste e apresenta resultados para texto normal e texto
grande nos niveis AA e AAA. A mesma taxa pode apoiar a verificacao de partes visuais necessarias para identificar
componentes, estados e objetos graficos, mas o criterio aplicavel e diferente.

O criterio de sucesso 1.4.11 da WCAG 2.2, Contraste Nao Textual, e de nivel AA e exige taxa minima de 3:1 entre a
informacao visual necessaria e suas cores adjacentes. O criterio nao se aplica indistintamente a toda borda, icone ou
imagem: componentes inativos, aparencia determinada pelo agente do usuario, elementos decorativos e apresentacoes
graficas essenciais possuem contexto ou excecoes proprias.

Indicadores de foco tambem podem depender de contraste nao textual. Entretanto, apenas comparar duas cores nao valida
integralmente a Aparencia do Foco (2.4.13), pois esse criterio tambem considera area visivel e mudanca entre os estados
sem foco e com foco.

## Casos de Uso

- Como pessoa desenvolvedora, quero verificar o contraste de uma borda ou indicador necessario contra a cor adjacente,
  para identificar combinacoes abaixo de 3:1.
- Como pessoa revisora, quero verificar a cor de um icone informativo ou parte relevante de um grafico contra seu fundo,
  para apoiar a revisao do criterio 1.4.11.
- Como pessoa revisora de foco, quero usar a taxa como uma verificacao parcial do indicador contra a cor adjacente, sem
  receber uma afirmacao incorreta de conformidade completa com o criterio 2.4.13.
- Como usuario atual, quero continuar verificando texto normal e texto grande sem perder os resultados AA e AAA
  existentes.

## Criterios de Aceite

- A ferramenta deve permitir distinguir a avaliacao de texto da avaliacao de elemento nao textual.
- A avaliacao nao textual deve informar aprovacao apenas quando a taxa real, sem arredondamento para a decisao, for
  maior ou igual a 3:1.
- O resultado nao textual deve ser associado ao criterio 1.4.11, nivel AA, sem apresentar um resultado AAA inexistente
  para esse criterio.
- A interface deve explicar que a cor avaliada precisa representar informacao visual necessaria e ser comparada com a
  cor realmente adjacente.
- A interface deve apresentar exemplos curtos de aplicacao, como borda necessaria de controle, icone informativo,
  indicador de estado ou parte relevante de um grafico.
- A ferramenta deve informar que um resultado de 3:1 nao valida sozinho area, espessura, estados, semantica, foco
  visivel ou conformidade integral com WCAG.
- Quando mencionar foco, a ferramenta deve comunicar que a comparacao cobre apenas parte da verificacao e nao valida
  integralmente o criterio 2.4.13.
- A avaliacao existente de texto normal e texto grande deve continuar disponivel com os mesmos limites AA e AAA.
- Entradas invalidas devem continuar produzindo mensagem textual associada ao campo, sem substituir o ultimo resultado
  valido por dados incorretos.
- Mudancas de resultado devem continuar compreensiveis por texto, sem depender apenas de cor.
- A logica deve possuir testes para valores abaixo de 3:1, iguais a 3:1 e acima de 3:1, sem regressao dos testes de
  texto existentes.
- A pagina deve continuar operavel por teclado, com foco visivel e ordem de leitura coerente.

## Fora do Escopo

- Nao inspecionar automaticamente HTML, CSS, SVG, imagens, screenshots ou paginas externas.
- Nao identificar sozinho quais partes visuais sao necessarias para compreender ou operar uma interface.
- Nao avaliar gradientes, transparencias, mistura de cores, antialiasing ou espessura de linhas.
- Nao validar a area de indicadores de foco nem declarar conformidade integral com o criterio 2.4.13.
- Nao adicionar novos formatos de cor alem dos hexadecimais ja aceitos.
- Nao alterar o calculo base de luminancia e taxa de contraste existente.
- Nao criar historico, compartilhamento de resultados ou persistencia de cores.
- Nao declarar que a ferramenta certifica conformidade com WCAG.

## Riscos e Ambiguidades

- Risco: usuarios podem aplicar 3:1 a elementos decorativos ou comparar cores que nao sao adjacentes. A interface deve
  orientar a escolha sem afirmar automaticamente se o elemento esta no escopo do criterio.
- Risco: o arredondamento visual pode exibir `3.00:1` para uma taxa ligeiramente inferior. A decisao deve usar o valor
  nao arredondado, e a apresentacao precisa evitar comunicar aprovacao contraditoria.
- Risco: apresentar foco junto de contraste nao textual pode sugerir uma auditoria completa. O texto de limite deve
  diferenciar contraste adjacente, mudanca entre estados e area do indicador.
- Ambiguidade para a Tech-Spec: definir se a distincao entre texto e elemento nao textual sera feita por seletor de
  contexto, por uma nova secao de resultado ou por ambos, preservando uma experiencia simples.
- Ambiguidade para a Tech-Spec: definir a previa minima de componente ou objeto grafico sem fazer o usuario interpretar
  a demonstracao visual como validacao automatica do caso real.

## Status de Aprovacao

- Status: Aprovado
- Aprovado por: Gabriel Teixeira
- Data: 2026-07-25
