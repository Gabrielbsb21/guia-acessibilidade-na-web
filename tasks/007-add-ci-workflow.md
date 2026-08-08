# Task: Adicionar integracao continua

## Goal

Validar automaticamente lint, testes e build antes de integrar mudancas na branch `main`.

## Scope

- Criar um workflow do GitHub Actions para pull requests e pushes na `main`.
- Permitir execucao manual do workflow.
- Instalar dependencias com `npm ci` e cache do npm.
- Executar `npm run lint:check`, `npm run test` e `npm run build`.
- Limitar as permissoes do workflow a leitura do conteudo.

## Non-goals

- Adicionar novos testes unitarios ou end-to-end.
- Fazer deploy do site.
- Alterar scripts, dependencias ou codigo da aplicacao.
- Tornar o check obrigatorio na protecao da branch antes da primeira execucao.

## Files to create

- `.github/workflows/ci.yml`
- `tasks/007-add-ci-workflow.md`

## Files to modify

None.

## Implementation details

- Usar Node.js 22 em `ubuntu-latest`.
- Cancelar execucoes anteriores do mesmo workflow e referencia.
- Definir timeout de 10 minutos para evitar jobs presos.
- Manter lint, testes e build como etapas separadas para facilitar o diagnostico.

## Acceptance criteria

- O workflow e acionado por pull requests destinados a `main`.
- O workflow e acionado por pushes na `main` e por execucao manual.
- Dependencias sao instaladas de forma reproduzivel com `npm ci`.
- Lint, testes e build precisam passar para o job concluir com sucesso.
- O workflow nao recebe permissao de escrita no repositorio.

## Test cases

- Executar `npm ci`.
- Executar `npm run lint:check`.
- Executar `npm run test`.
- Executar `npm run build`.
- Validar a sintaxe e os gatilhos do workflow em revisao.

## Accessibility checklist

- Nao aplicavel diretamente: a tarefa nao altera interface, conteudo ou comportamento acessivel.
- Confirmar que o build de todas as paginas publicas continua concluindo sem erro.

## Review checklist

- Conferir se os gatilhos estao limitados a `main`.
- Conferir se o workflow possui somente `contents: read`.
- Conferir se a versao do Node e compativel com o projeto.
- Conferir se os comandos correspondem aos scripts existentes em `package.json`.

## Status

- [x] Implementada.
- [x] Validada no GitHub Actions.
