const normalizeBasePath = (basePath: string): string => {
  if (!basePath || basePath === '/') return ''

  return `/${basePath.replace(/^\/+|\/+$/g, '')}`
}

export const withBasePath = (url: string, basePath = import.meta.env.BASE_URL): string => {
  if (!url.startsWith('/') || url.startsWith('//')) return url

  return `${normalizeBasePath(basePath)}${url}`
}

export const withoutBasePath = (pathname: string, basePath = import.meta.env.BASE_URL): string => {
  const normalizedBasePath = normalizeBasePath(basePath)

  if (!normalizedBasePath || !pathname.startsWith(`${normalizedBasePath}/`)) {
    return pathname === normalizedBasePath ? '/' : pathname
  }

  return pathname.slice(normalizedBasePath.length) || '/'
}
