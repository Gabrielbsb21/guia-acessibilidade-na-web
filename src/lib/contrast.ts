export interface RgbColor {
  r: number
  g: number
  b: number
}

export interface ContrastEvaluation {
  normalText: {
    aa: boolean
    aaa: boolean
  }
  largeText: {
    aa: boolean
    aaa: boolean
  }
  nonText: {
    aa: boolean
  }
}

const SHORT_HEX_PATTERN = /^#([\da-f]{3})$/i
const FULL_HEX_PATTERN = /^#([\da-f]{6})$/i

export const normalizeHexColor = (value: string): string | null => {
  const trimmed = value.trim()

  if (SHORT_HEX_PATTERN.test(trimmed)) {
    const [, shortHex] = trimmed.match(SHORT_HEX_PATTERN) ?? []

    if (!shortHex) return null

    const expanded = shortHex
      .split('')
      .map((char) => char.repeat(2))
      .join('')

    return `#${expanded.toUpperCase()}`
  }

  if (FULL_HEX_PATTERN.test(trimmed)) {
    return trimmed.toUpperCase()
  }

  return null
}

export const hexToRgb = (value: string): RgbColor | null => {
  const normalized = normalizeHexColor(value)

  if (!normalized) return null

  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
  }
}

const srgbChannelToLinear = (channel: number): number => {
  const normalized = channel / 255

  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
}

export const relativeLuminance = (color: RgbColor): number =>
  0.2126 * srgbChannelToLinear(color.r) +
  0.7152 * srgbChannelToLinear(color.g) +
  0.0722 * srgbChannelToLinear(color.b)

export const calculateContrastRatio = (foreground: string | RgbColor, background: string | RgbColor): number => {
  const foregroundColor = typeof foreground === 'string' ? hexToRgb(foreground) : foreground
  const backgroundColor = typeof background === 'string' ? hexToRgb(background) : background

  if (!foregroundColor || !backgroundColor) {
    throw new Error('Cores inválidas para cálculo de contraste.')
  }

  const foregroundLuminance = relativeLuminance(foregroundColor)
  const backgroundLuminance = relativeLuminance(backgroundColor)
  const lighter = Math.max(foregroundLuminance, backgroundLuminance)
  const darker = Math.min(foregroundLuminance, backgroundLuminance)

  return (lighter + 0.05) / (darker + 0.05)
}

export const evaluateContrast = (ratio: number): ContrastEvaluation => ({
  normalText: {
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
  },
  largeText: {
    aa: ratio >= 3,
    aaa: ratio >= 4.5,
  },
  nonText: {
    aa: ratio >= 3,
  },
})

export const formatContrastRatio = (ratio: number): string => {
  const truncatedRatio = Math.floor(ratio * 100) / 100

  return `${truncatedRatio.toFixed(2)}:1`
}
