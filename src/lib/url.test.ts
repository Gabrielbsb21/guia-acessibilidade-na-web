import { describe, expect, it } from 'vitest'
import { withBasePath, withoutBasePath } from './url'

describe('withBasePath', () => {
  it('prefixa rotas internas com o caminho de publicacao', () => {
    expect(withBasePath('/', '/guia-acessibilidade-na-web/')).toBe('/guia-acessibilidade-na-web/')
    expect(withBasePath('/blog', '/guia-acessibilidade-na-web/')).toBe('/guia-acessibilidade-na-web/blog')
  })

  it('preserva rotas locais quando nao existe subcaminho', () => {
    expect(withBasePath('/components', '/')).toBe('/components')
  })

  it('preserva URLs que nao representam rotas internas absolutas', () => {
    expect(withBasePath('https://example.com', '/projeto/')).toBe('https://example.com')
    expect(withBasePath('//cdn.example.com/image.png', '/projeto/')).toBe('//cdn.example.com/image.png')
    expect(withBasePath('#conteudo', '/projeto/')).toBe('#conteudo')
    expect(withBasePath('mailto:contato@example.com', '/projeto/')).toBe('mailto:contato@example.com')
  })
})

describe('withoutBasePath', () => {
  it('remove o caminho de publicacao antes de processar uma rota', () => {
    expect(withoutBasePath('/guia-acessibilidade-na-web/ferramentas/contraste', '/guia-acessibilidade-na-web/')).toBe(
      '/ferramentas/contraste',
    )
  })

  it('converte a raiz publicada para a raiz da aplicacao', () => {
    expect(withoutBasePath('/guia-acessibilidade-na-web', '/guia-acessibilidade-na-web/')).toBe('/')
  })

  it('preserva caminhos fora da base configurada', () => {
    expect(withoutBasePath('/outro-projeto/pagina', '/guia-acessibilidade-na-web/')).toBe('/outro-projeto/pagina')
  })
})
